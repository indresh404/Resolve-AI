import React, { useState } from 'react';
import { 
  Volume2, 
  X, 
  Radio, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  IndianRupee 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SoundboxAlertModal({ theme, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(1500);

  if (!isOpen) return null;

  const playVoiceChime = (amt) => {
    setIsPlaying(true);
    setCurrentAmount(amt);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`Account me ${amt} rupaye prapt hue.`);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 2500);
    }
    try {
      confetti({ particleCount: 30, spread: 60, colors: ['#00B9F1', '#002E6E'] });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl max-w-md w-full border-2 border-neutral-300 dark:border-neutral-800 p-6 shadow-2xl relative text-center">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Soundbox Device Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider border border-[#00B9F1]/40 mb-4">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#008db8] dark:text-[#00B9F1]" />
          Merchant Soundbox 4G Voice Engine
        </div>

        {/* Animated Speaker Visualizer */}
        <div className="w-28 h-28 mx-auto rounded-full bg-neutral-100 dark:bg-black border-4 border-[#00B9F1] shadow-[0_0_20px_rgba(0,185,241,0.35)] flex items-center justify-center relative my-4">
          <div className="w-20 h-20 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
            <Volume2 className={`w-8 h-8 text-[#008db8] dark:text-[#00B9F1] ${isPlaying ? 'animate-bounce scale-110' : ''}`} />
          </div>

          {isPlaying && (
            <span className="absolute inset-0 rounded-full border-2 border-[#00B9F1] animate-ping opacity-75" />
          )}
        </div>

        <h3 className="text-lg font-black text-black dark:text-white mt-2">
          "Account me ₹{currentAmount.toLocaleString('en-IN')} प्राप्त हुए"
        </h3>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 max-w-xs mx-auto font-medium">
          Spoken audio confirmation triggered instantly whenever a settlement dispute or customer payment succeeds.
        </p>

        {/* Quick Amount Chime Buttons */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { label: '₹1,500 Dispute', amount: 1500 },
            { label: '₹640 Claim', amount: 640 },
            { label: '₹1,200 Udhaar', amount: 1200 },
          ].map((c) => (
            <button
              key={c.amount}
              onClick={() => playVoiceChime(c.amount)}
              className="p-2.5 rounded-xl bg-neutral-100 hover:bg-[#00B9F1]/20 text-black dark:bg-neutral-900 dark:hover:bg-white dark:hover:text-black border border-neutral-300 dark:border-neutral-800 text-xs font-black transition-all active:scale-95 shadow-sm"
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Spoken Action Button */}
        <button
          onClick={() => playVoiceChime(currentAmount)}
          className="w-full mt-4 py-2.5 rounded-xl electric-glow-btn text-black font-black text-xs shadow-sm flex items-center justify-center gap-2 active:scale-95"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>Broadcast Soundbox Chime</span>
        </button>

      </div>
    </div>
  );
}
