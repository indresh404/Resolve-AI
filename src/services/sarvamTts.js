// Sarvam AI Text-to-Speech (TTS) Service
// Powered by Sarvam AI Bulbul v3 Indian Indic Voice Models (Ritu - Professional Voice)

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "";
const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en-IN', name: 'English (India)', native: 'English', flag: '🇬🇧' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'od-IN', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
];

// Single dedicated voice profile: Ritu (Professional Indic Voice)
export const DEDICATED_SPEAKER = 'ritu';

// Audio in-memory cache to avoid duplicate API calls
const audioCache = new Map();
let currentAudioInstance = null;
let currentAbortController = null;
let globalPlaybackId = 0;

/**
 * Stops any currently playing audio and aborts pending network fetches
 */
export function stopSarvamAudio() {
  globalPlaybackId++; // Invalidate all pending asynchronous requests

  if (currentAbortController) {
    try {
      currentAbortController.abort();
    } catch (e) {}
    currentAbortController = null;
  }

  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
      currentAudioInstance.src = "";
    } catch (e) {}
    currentAudioInstance = null;
  }

  if ('speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {}
  }
}

/**
 * Synthesizes speech using Sarvam AI Bulbul TTS API
 * @param {string} text - Text to synthesize
 * @param {string} languageCode - BCP-47 language code (e.g. 'hi-IN', 'en-IN')
 * @param {number} reqId - Monotonic request ID for race condition protection
 * @returns {Promise<string>} - Base64 audio data URL
 */
export async function synthesizeSarvamSpeech(text, languageCode = 'hi-IN', reqId) {
  if (!text || !text.trim()) return null;

  const cacheKey = `${languageCode}_ritu_${text.trim()}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  if (currentAbortController) {
    try { currentAbortController.abort(); } catch (e) {}
  }
  currentAbortController = new AbortController();

  try {
    const response = await fetch(SARVAM_TTS_URL, {
      method: 'POST',
      signal: currentAbortController.signal,
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text.trim(),
        language_code: languageCode,
        speaker: DEDICATED_SPEAKER,
        model: 'bulbul:v3'
      })
    });

    if (reqId !== globalPlaybackId) return null;

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Sarvam TTS API returned status ${response.status}:`, errText);
      throw new Error(`Sarvam TTS error: ${response.status}`);
    }

    const data = await response.json();
    if (reqId !== globalPlaybackId) return null;

    if (data.audios && data.audios.length > 0) {
      const audioBase64 = data.audios[0];
      const audioUrl = `data:audio/wav;base64,${audioBase64}`;
      audioCache.set(cacheKey, audioUrl);
      return audioUrl;
    } else {
      throw new Error('No audio returned by Sarvam TTS');
    }
  } catch (error) {
    if (error.name === 'AbortError') return null;
    console.error('Failed to synthesize with Sarvam AI:', error);
    throw error;
  }
}

/**
 * Plays audio via Sarvam AI with race-condition prevention & fallback
 * @param {string} text - Text to speak
 * @param {Object} options - { languageCode, onStart, onEnd, onError }
 */
export async function playSarvamSpeech(text, options = {}) {
  const {
    languageCode = 'en-IN',
    onStart = () => {},
    onEnd = () => {},
    onError = () => {}
  } = options;

  // 1. Stop any prior audio and acquire new exclusive token
  stopSarvamAudio();
  const thisPlaybackId = globalPlaybackId;

  try {
    const audioUrl = await synthesizeSarvamSpeech(text, languageCode, thisPlaybackId);
    
    // Check if superseded while fetching
    if (thisPlaybackId !== globalPlaybackId) return;

    if (!audioUrl) throw new Error('Empty audio received');

    onStart();
    const audio = new Audio(audioUrl);
    currentAudioInstance = audio;

    audio.onended = () => {
      if (thisPlaybackId === globalPlaybackId) {
        currentAudioInstance = null;
        onEnd();
      }
    };

    audio.onerror = (e) => {
      if (thisPlaybackId === globalPlaybackId) {
        console.warn('HTML Audio playback error, using Web Speech fallback:', e);
        fallbackWebSpeech(text, languageCode, thisPlaybackId, onEnd);
      }
    };

    await audio.play();
  } catch (err) {
    if (thisPlaybackId === globalPlaybackId) {
      if (err.name !== 'AbortError') {
        console.warn('Sarvam TTS unavailable, activating Web Speech fallback:', err);
        fallbackWebSpeech(text, languageCode, thisPlaybackId, onEnd);
      }
    }
  }
}

/**
 * Web Speech Synthesis fallback (strictly single-instance)
 */
function fallbackWebSpeech(text, languageCode, reqId, onEnd) {
  if (!('speechSynthesis' in window) || reqId !== globalPlaybackId) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel();
  } catch (e) {}

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode || 'en-US';
  utterance.pitch = 1.15;
  utterance.rate = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    (v.name.toLowerCase().includes('ritu') ||
     v.name.toLowerCase().includes('zira') || 
     v.name.toLowerCase().includes('samantha') || 
     v.name.toLowerCase().includes('victoria') || 
     v.name.toLowerCase().includes('jenny') || 
     v.name.toLowerCase().includes('aria') || 
     v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('google')) && 
    (v.lang.startsWith(languageCode.split('-')[0]) || v.lang.startsWith('en'))
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  utterance.onend = () => {
    if (reqId === globalPlaybackId && onEnd) onEnd();
  };
  utterance.onerror = () => {
    if (reqId === globalPlaybackId && onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}
