import React, { useState, useEffect, useRef } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Mic, 
  Volume2, 
  VolumeX, 
  Send, 
  Globe, 
  Radio, 
  Play, 
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowRight,
  User,
  Square,
  Cpu,
  Headphones
} from 'lucide-react';
import { multilingualVoiceScenarios } from '../data/mockData';
import { 
  SUPPORTED_LANGUAGES, 
  DEDICATED_SPEAKER,
  playSarvamSpeech, 
  stopSarvamAudio 
} from '../services/sarvamTts';

export default function VoiceAssistant({ theme, triggerDemoCount = 0 }) {
  const [selectedLangCode, setSelectedLangCode] = useState('hi-IN');
  
  const currentScenarios = multilingualVoiceScenarios[selectedLangCode] || multilingualVoiceScenarios['hi-IN'];
  const [activeScenario, setActiveScenario] = useState(currentScenarios[0]);
  const [voiceState, setVoiceState] = useState('idle'); // 'idle' | 'listening' | 'thinking' | 'speaking'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const [chatLog, setChatLog] = useState([
    {
      id: 'init-1',
      sender: 'user',
      text: currentScenarios[0].query,
      time: '09:00 AM'
    },
    {
      id: 'init-2',
      sender: 'ai',
      text: currentScenarios[0].responseAudioText,
      orbState: 'searching',
      time: '09:00 AM'
    }
  ]);

  const streamIntervalRef = useRef(null);
  const timeoutsRef = useRef([]);
  const messagesContainerRef = useRef(null);
  const prevTriggerCount = useRef(triggerDemoCount);

  // Clear all pending timeouts and streaming intervals to eliminate glitches & double audio
  const clearAllPendingTimers = () => {
    timeoutsRef.current.forEach(t => clearTimeout(t));
    timeoutsRef.current = [];
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
  };

  // Safely scroll internal chat container without touching window scroll
  const scrollChatToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollChatToBottom();
  }, [chatLog, streamingText]);

  // When language changes, update scenarios and re-initialize chat cleanly
  const handleLanguageChange = (newLangCode) => {
    clearAllPendingTimers();
    stopCurrentAudio();
    setSelectedLangCode(newLangCode);
    const newScenarios = multilingualVoiceScenarios[newLangCode] || multilingualVoiceScenarios['hi-IN'];
    setActiveScenario(newScenarios[0]);
    setChatLog([
      {
        id: `init-${Date.now()}-1`,
        sender: 'user',
        text: newScenarios[0].query,
        time: 'Just now'
      },
      {
        id: `init-${Date.now()}-2`,
        sender: 'ai',
        text: newScenarios[0].responseAudioText,
        orbState: 'searching',
        time: 'Just now'
      }
    ]);
  };

  // React to triggerDemoCount changes from navigation
  useEffect(() => {
    if (triggerDemoCount > 0 && triggerDemoCount !== prevTriggerCount.current) {
      prevTriggerCount.current = triggerDemoCount;
      const targetScenarios = multilingualVoiceScenarios[selectedLangCode] || multilingualVoiceScenarios['hi-IN'];
      runAutomaticVoiceDemo(targetScenarios[0]);
    }
  }, [triggerDemoCount, selectedLangCode]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearAllPendingTimers();
      stopSarvamAudio();
    };
  }, []);

  const stopCurrentAudio = () => {
    clearAllPendingTimers();
    stopSarvamAudio();
    setIsPlayingAudio(false);
    setIsStreaming(false);
    setVoiceState('idle');
  };

  const speakWithSarvam = async (text, onEndCallback) => {
    setIsPlayingAudio(true);
    setVoiceState('speaking');
    
    await playSarvamSpeech(text, {
      languageCode: selectedLangCode,
      onStart: () => {
        setIsPlayingAudio(true);
        setVoiceState('speaking');
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setVoiceState('idle');
        if (onEndCallback) onEndCallback();
      },
      onError: () => {
        setIsPlayingAudio(false);
        setVoiceState('idle');
        if (onEndCallback) onEndCallback();
      }
    });
  };

  // Progressive streaming typewriter function (like ChatGPT)
  const streamAIResponse = (fullText, sc) => {
    clearAllPendingTimers();
    setIsStreaming(true);
    setStreamingText('');
    setVoiceState('speaking');
    
    // Play speech concurrently via Sarvam AI (Ritu voice)
    speakWithSarvam(fullText, () => {
      setIsStreaming(false);
      setVoiceState('idle');
    });

    let index = 0;
    const words = fullText.split(' ');
    
    streamIntervalRef.current = setInterval(() => {
      if (index < words.length) {
        const currentSlice = words.slice(0, index + 1).join(' ');
        setStreamingText(currentSlice);
        index++;
      } else {
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        setIsStreaming(false);
        setChatLog((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender: 'ai',
            text: fullText,
            orbState: sc.orbState || 'solving',
            time: 'Just now'
          }
        ]);
        setStreamingText('');
      }
    }, 85);
  };

  // Full automatic voice demo simulation
  const runAutomaticVoiceDemo = (sc) => {
    clearAllPendingTimers();
    stopCurrentAudio();
    const scenarioToUse = sc || currentScenarios[0];
    setActiveScenario(scenarioToUse);
    setVoiceState('listening');

    // Add User query to chat after brief listening simulation
    const t1 = setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          sender: 'user',
          text: scenarioToUse.query,
          time: 'Just now'
        }
      ]);

      // Transition to Thinking state for 0.6s
      setVoiceState('thinking');

      const t2 = setTimeout(() => {
        // Transition to Speaking state with real-time ChatGPT streaming & Sarvam TTS
        streamAIResponse(scenarioToUse.responseAudioText, scenarioToUse);
      }, 600);
      timeoutsRef.current.push(t2);

    }, 900);
    timeoutsRef.current.push(t1);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuery.trim() || isStreaming) return;

    const userMsg = customQuery;
    setCustomQuery('');
    clearAllPendingTimers();
    stopCurrentAudio();

    // 1. Add user query
    setChatLog((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userMsg,
        time: 'Just now'
      }
    ]);

    // 2. Set thinking
    setVoiceState('thinking');

    const t1 = setTimeout(() => {
      let aiReply = '';
      if (selectedLangCode === 'hi-IN') {
        aiReply = `आपके प्रश्न "${userMsg}" का विश्लेषण: कल के सेटलमेंट में ₹2,340 का अंतर है। ₹640 का क्लेम स्वतः दर्ज हो चुका है, और ₹1,500 के रिफंड विवाद के लिए आपकी एक-टैप स्वीकृति आवश्यक है।`;
      } else if (selectedLangCode === 'mr-IN') {
        aiReply = `तुमच्या प्रश्न "${userMsg}" चे विश्लेषण: कालच्या सेटलमेंटमध्ये ₹2,340 चा फरक आहे. ₹640 चा क्लेम दाखल झाला आहे आणि ₹1,500 साठी तुमची मंजुरी हवी आहे.`;
      } else if (selectedLangCode === 'gu-IN') {
        aiReply = `તમારા પ્રશ્ન "${userMsg}" નું વિશ્લેષણ: ગઈકાલના સેટલમેન્ટમાં ₹2,340 નો તફાવત છે. ₹640 નો ક્લેમ આપમેળે દાખલ થયો છે અને ₹1,500 માટે તમારી મંજૂરી જરૂરી છે.`;
      } else if (selectedLangCode === 'ta-IN') {
        aiReply = `உங்கள் கேள்வி "${userMsg}" ஆய்வு செய்யப்பட்டது: நேற்றைய செட்டில்மெண்டில் ₹2,340 இடைவெளி உள்ளது. ₹640 கோரப்பட்டது, ₹1,500 ஒப்புதலுக்கு காத்திருக்கிறது.`;
      } else if (selectedLangCode === 'te-IN') {
        aiReply = `మీ ప్రశ్న "${userMsg}" విశ్లేషణ: నిన్నటి సెటిల్మెంట్లో ₹2,340 వ్యత్యాసం ఉంది. ₹640 ఆటో-క్లెయిమ్ చేయబడింది మరియు ₹1,500 మీ ఆమోదం కోసం వేచి ఉంది.`;
      } else {
        aiReply = `Analyzing your query regarding "${userMsg}". Total settlement mismatch is ₹2,340. ₹640 claim is auto-submitted to gateway, and ₹1,500 held refund is paused for your 1-tap authorization.`;
      }
      streamAIResponse(aiReply, { orbState: 'solving' });
    }, 700);
    timeoutsRef.current.push(t1);
  };

  // Center text for the circular letter loader orb (always in clean English)
  const getOrbDisplayText = () => {
    switch (voiceState) {
      case 'listening':
        return 'Listening...';
      case 'thinking':
        return 'Thinking...';
      case 'speaking':
        return 'Speaking...';
      default:
        return isPlayingAudio ? 'Speaking...' : 'Ready...';
    }
  };

  const displayText = getOrbDisplayText();
  const letters = displayText.split('');
  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedLangCode) || SUPPORTED_LANGUAGES[0];

  return (
    <section id="voice" className="py-3 px-4 max-w-5xl mx-auto w-full relative">
      <div className="bw-card p-5 sm:p-7">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Radio className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1] animate-pulse" />
              Demo Step 02: Sarvam Indic Voice Copilot
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white flex items-center gap-2">
              <span>Merchant Soundbox Voice Copilot</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Cpu className="w-3 h-3" />
                Sarvam AI Live
              </span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Multi-lingual spoken financial briefings and settlement inquiry engine. Delivers real-time accounting explanations across 11 Indian Indic languages.
            </p>
          </div>

          {/* Top Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => runAutomaticVoiceDemo(currentScenarios[0])}
              className="text-xs px-3.5 py-2 rounded-xl electric-glow-btn text-black font-black flex items-center gap-2 active:scale-95 shadow-md"
              title="Click to automatically simulate spoken inquiry and Sarvam AI response"
            >
              <Zap className="w-3.5 h-3.5 fill-black text-black" />
              <span>⚡ Auto-Demo Voice Flow</span>
            </button>
          </div>
        </div>

        {/* =========================================================================
            TOP LANGUAGE SELECTOR BAR (11 Indic Languages) & DEDICATED RITU VOICE
           ========================================================================= */}
        <div className="mt-4 p-3.5 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-inner">
          
          {/* Language Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-black text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Globe className="w-4 h-4 text-[#00B9F1]" />
              <span>Select Language:</span>
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isActive = lang.code === selectedLangCode;
                return (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 active:scale-95 ${
                      isActive
                        ? 'bg-[#00B9F1] text-black font-black shadow-[0_0_12px_rgba(0,185,241,0.4)] scale-105'
                        : 'bg-white dark:bg-black/60 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 hover:border-[#00B9F1]'
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.native}</span>
                    <span className="text-[10px] opacity-75">({lang.name})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dedicated Voice Badge: Ritu (Professional Female Voice) */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <div className="px-3 py-1 rounded-xl bg-white dark:bg-black text-black dark:text-white border border-neutral-300 dark:border-neutral-800 text-xs font-bold flex items-center gap-1.5 shadow-sm">
              <Headphones className="w-3.5 h-3.5 text-[#00B9F1]" />
              <span>Voice: <strong className="text-[#008db8] dark:text-[#00B9F1]">Ritu (Professional)</strong></span>
            </div>
          </div>

        </div>

        {/* =========================================================================
            STAGE 1: Animated Rotating Circular Letter Loader Orb
           ========================================================================= */}
        <div className="my-4 p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-[#0a1931]/90 via-[#0a0f1d] to-black border-2 border-[#00B9F1]/40 text-center relative overflow-hidden flex flex-col items-center justify-center select-none shadow-xl">
          
          {/* Ambient Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00B9F1]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Top Status Bar */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-white/10 text-white text-xs font-mono mb-2 z-10">
            <span className="flex items-center gap-1.5 font-bold text-[#00B9F1]">
              <Sparkles className="w-4 h-4" />
              <span>Sarvam AI Bulbul v3 ({activeLangObj.name} • Ritu)</span>
            </span>

            <div className="flex items-center gap-2">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border transition-all flex items-center gap-1.5 ${
                voiceState === 'speaking' || isPlayingAudio
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 animate-pulse font-black'
                  : voiceState === 'listening'
                  ? 'bg-[#00B9F1]/20 text-[#00B9F1] border-[#00B9F1]/40 font-black'
                  : 'bg-white/10 text-neutral-300 border-white/20'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  voiceState === 'speaking' || isPlayingAudio ? 'bg-emerald-400 animate-ping' : voiceState === 'listening' ? 'bg-[#00B9F1] animate-pulse' : 'bg-neutral-400'
                }`} />
                {displayText}
              </span>

              {isPlayingAudio && (
                <button
                  onClick={stopCurrentAudio}
                  className="px-2 py-0.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40 text-[10px] font-bold flex items-center gap-1 transition-all active:scale-95"
                >
                  <Square className="w-2.5 h-2.5 fill-red-400" />
                  <span>Stop</span>
                </button>
              )}
            </div>
          </div>

          {/* Circular Letter Loader Orb */}
          <div className="relative my-4 flex items-center justify-center select-none" style={{ width: 140, height: 140 }}>
            {/* Animated Spelled Letters in Center */}
            <div className="flex items-center justify-center tracking-wider font-black text-sm sm:text-base z-10">
              {letters.map((letter, index) => (
                <span
                  key={`${displayText}-${index}`}
                  className={`inline-block font-mono font-black ${
                    voiceState === 'speaking' || isPlayingAudio
                      ? 'text-emerald-400 animate-loaderLetterFast'
                      : voiceState === 'listening'
                      ? 'text-[#00B9F1] animate-loaderLetterFast'
                      : 'text-white opacity-80 animate-loaderLetter'
                  }`}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>

            {/* Glowing Rotating Inset Ring */}
            <div
              className={`absolute inset-0 rounded-full pointer-events-none ${
                voiceState === 'speaking' || voiceState === 'listening' || isPlayingAudio
                  ? 'animate-loaderCircleFast'
                  : 'animate-loaderCircle'
              }`}
            />

            {/* Inner Breathing Core */}
            <div className="absolute w-2/3 h-2/3 rounded-full bg-[#00B9F1]/10 border border-[#00B9F1]/30 animate-pulse pointer-events-none" />
          </div>

          {/* Dynamic Subtext */}
          <div className="text-center space-y-1 my-1 z-10">
            <h3 className="text-base sm:text-lg font-black text-white flex items-center justify-center gap-2">
              <span>{displayText}</span>
              {(voiceState === 'speaking' || isPlayingAudio) && (
                <Volume2 className="w-4 h-4 text-[#00B9F1] animate-bounce" />
              )}
            </h3>
            <p className="text-xs text-neutral-300 font-medium max-w-md">
              {voiceState === 'speaking' 
                ? `Broadcasting Sarvam AI Indic voice output in ${activeLangObj.name} (${activeLangObj.native})...` 
                : voiceState === 'listening' 
                ? `Listening and transcribing merchant speech in ${activeLangObj.name}...` 
                : `Tap any of the 4 ${activeLangObj.name} demo inquiries below:`}
            </p>
          </div>

          {/* Sound Wave Bars Indicator */}
          <div className="flex items-center justify-center gap-1.5 h-6 my-2 z-10">
            {[8, 16, 26, 12, 30, 20, 10, 32, 18, 24, 10, 28, 14, 8, 22, 12].map((h, i) => (
              <div
                key={i}
                style={{
                  height: (voiceState === 'speaking' || voiceState === 'listening' || isPlayingAudio)
                    ? `${Math.max(6, (h * 1.1) % 24)}px`
                    : '4px'
                }}
                className={`w-1 rounded-full transition-all duration-150 ${
                  (voiceState === 'speaking' || voiceState === 'listening' || isPlayingAudio)
                    ? 'bg-[#00B9F1]'
                    : 'bg-neutral-600'
                }`}
              />
            ))}
          </div>

          {/* =========================================================================
              4 Dedicated Demo Voice Query Buttons (In Active Language)
             ========================================================================= */}
          <div className="w-full pt-3 mt-2 border-t border-white/10 z-10">
            <div className="flex items-center justify-between mb-2 text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span>4 {activeLangObj.name} ({activeLangObj.native}) Voice Inquiries:</span>
              </span>
              <span className="text-[#00B9F1] font-bold">1-Tap Sarvam Trigger</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {currentScenarios.map((sc) => {
                const isSelected = activeScenario.id === sc.id;
                return (
                  <button
                    key={sc.id}
                    onClick={() => runAutomaticVoiceDemo(sc)}
                    className={`p-2.5 rounded-xl text-left border transition-all text-xs flex flex-col justify-between active:scale-95 ${
                      isSelected
                        ? 'border-[#00B9F1] bg-[#00B9F1]/20 text-white shadow-[0_0_15px_rgba(0,185,241,0.3)] ring-1 ring-[#00B9F1]'
                        : 'border-white/15 bg-white/5 hover:border-[#00B9F1] text-neutral-200 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-black text-[#00B9F1] text-[11px] flex items-center gap-1">
                        <span>{sc.flag || activeLangObj.flag}</span>
                        <span>{sc.title}</span>
                      </span>
                      <Play className="w-3 h-3 text-[#00B9F1] fill-[#00B9F1]" />
                    </div>
                    <div className="font-medium text-xs text-white line-clamp-2">
                      "{sc.query}"
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* =========================================================================
            STAGE 2: ChatGPT-Style Conversational Stream & Input Bar
           ========================================================================= */}
        <div className="space-y-3">
          
          {/* Chat Stream Card with Isolated Internal Scroll */}
          <div 
            ref={messagesContainerRef}
            className="rounded-2xl bw-inset p-4 sm:p-5 border border-neutral-300 dark:border-neutral-800 flex flex-col justify-between min-h-[220px] max-h-[320px] overflow-y-auto space-y-3"
          >
            <div className="space-y-3 pr-1">
              {chatLog.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="mt-1 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center shrink-0 shadow-sm">
                      <ThinkingOrb state={msg.orbState || 'solving'} size={22} speed={1.2} dark={theme === 'dark'} />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed transition-all shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-[#00B9F1]/15 text-black dark:bg-neutral-900 dark:text-[#00B9F1] border border-[#00B9F1]/40 rounded-tr-none font-bold'
                        : 'bg-white dark:bg-black text-black dark:text-white border-2 border-neutral-300 dark:border-neutral-800 rounded-tl-none font-medium'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#008db8] dark:text-[#00B9F1]">
                        {msg.sender === 'user' 
                          ? `Merchant (${activeLangObj.name} Inquiry):` 
                          : `Resolve AI (Sarvam Ritu Speech):`}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {msg.time || 'Just now'}
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] leading-relaxed font-sans">{msg.text}</p>

                    {msg.sender === 'ai' && (
                      <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                        <button
                          onClick={() => isPlayingAudio ? stopCurrentAudio() : speakWithSarvam(msg.text)}
                          className="flex items-center gap-1.5 text-[#008db8] dark:text-[#00B9F1] hover:underline font-bold"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>Replay Sarvam Voice</span>
                        </button>
                        <span className="font-mono text-neutral-400">Sarvam Bulbul v3 (Ritu)</span>
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="mt-1 p-1.5 rounded-full bg-[#00B9F1] text-black shrink-0 flex items-center justify-center font-black shadow-sm">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}

              {/* Live Progressive ChatGPT Streaming Bubble */}
              {isStreaming && streamingText && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="mt-1 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center shrink-0">
                    <ThinkingOrb state="solving" size={22} speed={2.2} dark={theme === 'dark'} />
                  </div>

                  <div className="p-3.5 rounded-2xl max-w-lg text-xs leading-relaxed bg-white dark:bg-black text-black dark:text-white border-2 border-[#00B9F1] rounded-tl-none font-medium shadow-sm">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[10px] font-bold text-[#008db8] dark:text-[#00B9F1] flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                        Sarvam AI Synthesizing Speech (Ritu)...
                      </span>
                    </div>

                    <p className="text-xs sm:text-[13px] leading-relaxed font-sans">
                      {streamingText}
                      <span className="inline-block w-1.5 h-3.5 bg-[#00B9F1] ml-1 animate-pulse align-middle" />
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Modern Input Bar below */}
          <form onSubmit={handleCustomSubmit} className="flex items-center gap-2 p-1.5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800 shadow-inner">
            
            <button
              type="button"
              onClick={() => runAutomaticVoiceDemo(currentScenarios[0])}
              className="p-3 rounded-xl font-black transition-all shrink-0 active:scale-95 flex items-center justify-center bg-[#00B9F1] text-black shadow-[0_0_15px_rgba(0,185,241,0.5)] hover:scale-105"
              title="Speak or Auto-Simulate Voice Inquiry"
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              placeholder={
                selectedLangCode === 'hi-IN'
                  ? "प्रश्न पूछें: 'कल का ₹2,340 का सेटलमेंट अंतर समझाओ'..."
                  : selectedLangCode === 'mr-IN'
                  ? "प्रश्न विचारा: 'कालच्या सेटलमेंटचा हिशोब सांगा'..."
                  : selectedLangCode === 'gu-IN'
                  ? "પ્રશ્ન પૂછો: 'ગઈકાલના સેટલમેન્ટનો હિસાબ જણાવો'..."
                  : selectedLangCode === 'ta-IN'
                  ? "கேள்வி கேளுங்கள்: 'செட்டில்மெண்ட் விவரங்களை விளக்குங்கள்'..."
                  : selectedLangCode === 'te-IN'
                  ? "ప్రశ్న అడగండి: 'నిన్నటి సెటిల్మెంట్ లెక్కలు చెప్పండి'..."
                  : "Ask anything: 'Explain ₹2,340 settlement gap' or 'Check claim status'..."
              }
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none font-medium"
            />

            <button
              type="submit"
              disabled={!customQuery.trim() || isStreaming}
              className="p-2.5 px-3.5 rounded-xl electric-glow-btn text-black font-black transition-all shrink-0 active:scale-95 shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 text-xs"
            >
              <span>Ask AI</span>
              <Send className="w-3.5 h-3.5" />
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}
