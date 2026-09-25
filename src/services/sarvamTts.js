// Sarvam AI Text-to-Speech (TTS) Service
// Powered by Sarvam AI Bulbul v3 Indian Indic Voice Models

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "";
const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";

export const SUPPORTED_LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'en-IN', name: 'English (India)', native: 'English', flag: '🇬🇧', defaultSpeaker: 'priya' },
  { code: 'mr-IN', name: 'Marathi', native: 'मराठी', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'gu-IN', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'bn-IN', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'ml-IN', name: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'pa-IN', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳', defaultSpeaker: 'priya' },
  { code: 'od-IN', name: 'Odia', native: 'ଓଡ଼ିଆ', flag: '🇮🇳', defaultSpeaker: 'priya' }
];

export const FEMALE_SPEAKERS = [
  { id: 'priya', name: 'Priya (Clear Female)', gender: 'Female' },
  { id: 'kavya', name: 'Kavya (Soft Female)', gender: 'Female' },
  { id: 'ritu', name: 'Ritu (Professional)', gender: 'Female' },
  { id: 'shreya', name: 'Shreya (Expressive)', gender: 'Female' },
  { id: 'simran', name: 'Simran (Conversational)', gender: 'Female' },
  { id: 'shubh', name: 'Shubh (Male Anchor)', gender: 'Male' }
];

// Audio in-memory cache to avoid duplicate API calls
const audioCache = new Map();
let currentAudioInstance = null;

/**
 * Synthesizes speech using Sarvam AI Bulbul TTS API
 * @param {string} text - Text to synthesize
 * @param {string} languageCode - BCP-47 language code (e.g. 'hi-IN', 'en-IN')
 * @param {string} speaker - Voice model speaker id
 * @returns {Promise<string>} - Base64 audio data URL
 */
export async function synthesizeSarvamSpeech(text, languageCode = 'hi-IN', speaker = 'priya') {
  if (!text || !text.trim()) return null;

  const cacheKey = `${languageCode}_${speaker}_${text.trim()}`;
  if (audioCache.has(cacheKey)) {
    return audioCache.get(cacheKey);
  }

  try {
    const response = await fetch(SARVAM_TTS_URL, {
      method: 'POST',
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text.trim(),
        language_code: languageCode,
        speaker: speaker || 'priya',
        model: 'bulbul:v3'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`Sarvam TTS API returned status ${response.status}:`, errText);
      throw new Error(`Sarvam TTS error: ${response.status}`);
    }

    const data = await response.json();
    if (data.audios && data.audios.length > 0) {
      const audioBase64 = data.audios[0];
      const audioUrl = `data:audio/wav;base64,${audioBase64}`;
      audioCache.set(cacheKey, audioUrl);
      return audioUrl;
    } else {
      throw new Error('No audio returned by Sarvam TTS');
    }
  } catch (error) {
    console.error('Failed to synthesize with Sarvam AI:', error);
    throw error;
  }
}

/**
 * Stops any currently playing audio
 */
export function stopSarvamAudio() {
  if (currentAudioInstance) {
    try {
      currentAudioInstance.pause();
      currentAudioInstance.currentTime = 0;
    } catch (e) {}
    currentAudioInstance = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Plays audio via Sarvam AI with automatic fallback to Web Speech Synthesis
 * @param {string} text - Text to speak
 * @param {Object} options - { languageCode, speaker, onStart, onEnd, onError }
 */
export async function playSarvamSpeech(text, options = {}) {
  const {
    languageCode = 'en-IN',
    speaker = 'priya',
    onStart = () => {},
    onEnd = () => {},
    onError = () => {}
  } = options;

  stopSarvamAudio();

  try {
    onStart();
    const audioUrl = await synthesizeSarvamSpeech(text, languageCode, speaker);
    if (!audioUrl) throw new Error('Empty audio received');

    const audio = new Audio(audioUrl);
    currentAudioInstance = audio;

    audio.onended = () => {
      currentAudioInstance = null;
      onEnd();
    };

    audio.onerror = (e) => {
      console.warn('HTML Audio playback failed, falling back to Web Speech Synthesis:', e);
      fallbackWebSpeech(text, languageCode, onEnd);
    };

    await audio.play();
  } catch (err) {
    console.warn('Sarvam TTS network failed, using Web Speech API fallback:', err);
    fallbackWebSpeech(text, languageCode, onEnd);
  }
}

/**
 * Web Speech Synthesis fallback
 */
function fallbackWebSpeech(text, languageCode, onEnd) {
  if (!('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCode || 'en-US';
  utterance.pitch = 1.18;
  utterance.rate = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => 
    (v.name.toLowerCase().includes('zira') || 
     v.name.toLowerCase().includes('samantha') || 
     v.name.toLowerCase().includes('victoria') || 
     v.name.toLowerCase().includes('jenny') || 
     v.name.toLowerCase().includes('aria') || 
     v.name.toLowerCase().includes('priya') ||
     v.name.toLowerCase().includes('female') ||
     v.name.toLowerCase().includes('google')) && 
    (v.lang.startsWith(languageCode.split('-')[0]) || v.lang.startsWith('en'))
  );

  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };
  utterance.onerror = () => {
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}
