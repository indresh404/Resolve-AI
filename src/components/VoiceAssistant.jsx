import React, { useState } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { Component as AILoader } from './ui/ai-loader';
import { KineticLoader } from './ui/kinetic-orb-loader';
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
  Headphones,
  Sliders,
  Wifi,
  Eye
} from 'lucide-react';
import { voiceScenarios } from '../data/mockData';

export default function VoiceAssistant({ theme, onOpenSoundboxChime }) {
  const [activeScenario, setActiveScenario] = useState(voiceScenarios[0]);
  const [isRecording, setIsRecording] = useState(false);
  const [loaderText, setLoaderText] = useState('Listening...');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [customQuery, setCustomQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'user',
      text: voiceScenarios[0].query,
      lang: voiceScenarios[0].lang
    },
    {
      sender: 'ai',
      text: voiceScenarios[0].responseAudioText,
      orbState: 'searching',
      time: 'Just now'
    }
  ]);

  const handleSelectScenario = (sc) => {
    setActiveScenario(sc);
    setChatLog([
      {
        sender: 'user',
        text: sc.query,
        lang: sc.lang
      },
      {
        sender: 'ai',
        text: sc.responseAudioText,
        orbState: sc.orbState,
        time: 'Just now'
      }
    ]);
  };

  const playSpeech = (text) => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 3000);
    }
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const userMsg = customQuery;
    setCustomQuery('');
    setChatLog((prev) => [
      ...prev,
      { sender: 'user', text: userMsg, lang: 'Hinglish' },
      {
        sender: 'ai',
        text: `Sarvam AI: Analyzing query "${userMsg}" against Postgres settlement ledger and n8n recovery flows. All calculations verified with deterministic Critic guardrail.`,
        orbState: 'solving',
        time: 'Just now'
      }
    ]);
  };

  const handleMicClick = (txt = "Listening...") => {
    setLoaderText(txt);
    setIsRecording(true);
  };

  return (
    <section id="voice" className="py-3 px-4 max-w-5xl mx-auto w-full relative">
      
      {/* AI Loader Fullscreen Voice Listener Modal */}
      {isRecording && (
        <AILoader 
          size={190} 
          text={loaderText} 
          onClose={() => {
            setIsRecording(false);
            handleSelectScenario(voiceScenarios[0]);
            playSpeech(voiceScenarios[0].responseAudioText);
          }} 
        />
      )}

      <div className="bw-card p-5 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Radio className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1] animate-pulse" />
              Merchant Soundbox 4G Voice Engine
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Multilingual Voice Copilot
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Merchant Soundbox 4G broadcasts daily settlement breakdowns, files claims by voice, and confirms money recoveries in Hindi, Marathi, Hinglish, or English.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleMicClick("Listening...")}
              className="text-xs px-3 py-1.5 rounded-xl electric-glow-btn text-black font-black flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 fill-black" />
              <span>Preview AI Loader</span>
            </button>

            <span className="text-xs px-3 py-1.5 rounded-xl bw-inset text-black dark:text-white font-bold flex items-center gap-1.5 border border-neutral-300 dark:border-neutral-800">
              <Globe className="w-3.5 h-3.5 text-[#00B9F1]" />
              Sarvam AI
            </span>
          </div>
        </div>

        {/* Quick Query Scenarios */}
        <div className="mt-4 mb-3">
          <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block mb-2">
            Merchant Soundbox 4G Spoken Queries:
          </span>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {voiceScenarios.map((sc) => {
              const isSelected = activeScenario.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => {
                    handleSelectScenario(sc);
                    playSpeech(sc.responseAudioText);
                  }}
                  className={`p-2.5 rounded-xl text-left border-2 transition-all text-xs flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#00B9F1] bg-[#00B9F1]/10 dark:bg-neutral-900 shadow-[0_0_12px_rgba(0,185,241,0.25)] ring-1 ring-[#00B9F1]'
                      : 'border-neutral-200 dark:border-neutral-800 bw-inset hover:border-[#00B9F1] text-black dark:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#008db8] dark:text-[#00B9F1] text-[11px] flex items-center gap-1">
                      <span>{sc.flag}</span>
                      <span>{sc.lang}</span>
                    </span>
                    <ThinkingOrb state={isSelected ? "listening" : sc.orbState} size={14} speed={0.9} dark={theme === 'dark'} />
                  </div>
                  <div className="font-bold text-xs truncate text-black dark:text-white">
                    "{sc.query}"
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat / Voice Conversation Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
          
          {/* Left: Chat Stream */}
          <div className="lg:col-span-7 rounded-2xl bw-inset p-4 flex flex-col justify-between min-h-[300px] border border-neutral-300 dark:border-neutral-800">
            
            <div className="space-y-3 overflow-y-auto max-h-[220px] pr-1">
              {chatLog.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="mt-0.5 p-0.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center">
                      <ThinkingOrb state={msg.orbState || 'solving'} size={22} speed={1.2} dark={theme === 'dark'} />
                    </div>
                  )}

                  <div
                    className={`p-3 rounded-2xl max-w-md text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#00B9F1]/15 text-black dark:bg-neutral-900 dark:text-[#00B9F1] border border-[#00B9F1]/40 rounded-tr-none font-bold'
                        : 'bg-white dark:bg-black text-black dark:text-white border-2 border-neutral-300 dark:border-neutral-800 rounded-tl-none font-medium'
                    }`}
                  >
                    {msg.sender === 'user' && (
                      <span className="text-[10px] font-bold text-[#008db8] dark:text-[#00B9F1] block mb-0.5">
                        Merchant ({msg.lang || 'Voice'}):
                      </span>
                    )}
                    <p>{msg.text}</p>

                    {msg.sender === 'ai' && (
                      <div className="mt-1.5 pt-1.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
                        <button
                          onClick={() => playSpeech(msg.text)}
                          className="flex items-center gap-1 text-[#008db8] dark:text-[#00B9F1] hover:underline font-bold"
                        >
                          <Volume2 className="w-3 h-3" />
                          <span>Broadcast on Soundbox 4G</span>
                        </button>
                        <span className="font-mono text-neutral-400">Sarvam Indic TTS</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar with Mic and Text Form */}
            <form onSubmit={handleCustomSubmit} className="mt-3 pt-2.5 border-t border-neutral-300 dark:border-neutral-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMicClick("Listening...")}
                className="p-2.5 rounded-full font-bold transition-all shrink-0 active:scale-95 flex items-center justify-center bg-[#00B9F1] text-black shadow-[0_0_15px_rgba(0,185,241,0.5)] hover:scale-105"
                title="Speak to Merchant Soundbox 4G Voice Engine"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder="Speak or type: 'Sharma ji ke dukaan ka gap explain karo'..."
                className="flex-1 bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 rounded-xl px-3 py-2 text-xs text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#00B9F1] font-medium"
              />

              <button
                type="submit"
                className="p-2 rounded-xl bg-white hover:bg-neutral-100 text-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 border border-neutral-300 dark:border-white transition-all shrink-0 active:scale-95 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              </button>
            </form>
          </div>

          {/* Right: Embedded AI Voice Loader Animation Card */}
          <div className="lg:col-span-5 rounded-2xl bg-gradient-to-b from-[#1a3379]/80 via-[#0f172a] to-black border-2 border-[#00B9F1]/40 p-4 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl">
            
            <div className="w-full flex items-center justify-between pb-2 border-b border-white/10 text-white text-[11px] font-mono">
              <span className="flex items-center gap-1.5 font-bold text-[#00B9F1]">
                <Sparkles className="w-3.5 h-3.5" />
                Live AI Loader Engine
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#00B9F1]/20 text-[#00B9F1] border border-[#00B9F1]/40">
                Active Wave
              </span>
            </div>

            {/* Embedded Live Rotating AI Circular Loader with Letters */}
            <div className="relative my-4 flex items-center justify-center select-none" style={{ width: 140, height: 140 }}>
              <div className="flex items-center justify-center tracking-widest font-black text-sm z-10">
                {"Listening...".split("").map((letter, index) => (
                  <span
                    key={index}
                    className="inline-block text-white opacity-60 animate-loaderLetter font-mono font-bold"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </div>

              {/* Glowing Rotating Inset Ring */}
              <div className="absolute inset-0 rounded-full animate-loaderCircle pointer-events-none" />
            </div>

            <div className="w-full space-y-2">
              <p className="text-[11px] text-neutral-300 font-medium leading-tight">
                Indic Voice Engine active with real-time waveform and rotating inset glow.
              </p>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleMicClick("Listening...")}
                  className="py-1.5 px-2 rounded-xl bg-[#00B9F1] text-black font-black text-xs hover:bg-[#38D4FF] transition-all shadow-md active:scale-95 flex items-center justify-center gap-1"
                >
                  <Mic className="w-3.5 h-3.5" />
                  <span>Start Voice In</span>
                </button>

                <button
                  onClick={onOpenSoundboxChime}
                  className="py-1.5 px-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all border border-white/20 active:scale-95 flex items-center justify-center gap-1"
                >
                  <Radio className="w-3.5 h-3.5 text-[#00B9F1]" />
                  <span>Soundbox 4G</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
