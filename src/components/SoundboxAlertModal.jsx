import React, { useState } from 'react';
import { 
  Volume2, 
  VolumeX,
  X, 
  Radio, 
  Sparkles, 
  Play, 
  CheckCircle2, 
  IndianRupee,
  Wifi,
  BatteryCharging,
  Sliders
} from 'lucide-react';
import { KineticLoader } from './ui/kinetic-orb-loader';
import confetti from 'canvas-confetti';

export default function SoundboxAlertModal({ theme, isOpen, onClose }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedLang, setSelectedLang] = useState('Hindi');
  const [currentScenario, setCurrentScenario] = useState({
    amount: 640,
    title: "Failed Debit Auto-Recovery",
    hindiText: "Paytm par chheh sau chaalees rupaye prapt hue. Failed payment safalta se recover hua.",
    marathiText: "Paytm var sahshe chalees rupaye jama zale. Failed payment recover zala.",
    englishText: "Rupees six hundred forty received on Paytm. Recovery claim credited successfully."
  });

  if (!isOpen) return null;

  const scenarios = [
    {
      amount: 640,
      title: "₹640 Claim Recovered",
      type: "RECOVERED",
      hindiText: "Paytm par chheh sau chaalees rupaye prapt hue. Failed debit claim recover ho gaya!",
      marathiText: "Paytm var sahshe chalees rupaye prapt zale. Failed payment recover zale!",
      englishText: "Rupees six hundred forty credited to your bank account. Failed debit recovered!"
    },
    {
      amount: 1500,
      title: "₹1,500 Stuck Refund Recovered",
      type: "RECOVERED",
      hindiText: "Paytm par ek hazaar paanch sau rupaye prapt hue. Held refund claim manzoor ho gaya!",
      marathiText: "Paytm var ek hazaar paanchshe rupaye prapt zale. Refund claim manzoor zale!",
      englishText: "Rupees one thousand five hundred received. Held refund dispute approved and credited!"
    },
    {
      amount: 2340,
      title: "₹2,340 Morning Audit Briefing",
      type: "AUDIT",
      hindiText: "Namaste Sharma ji, kal ke settlement me do hazaar teen sau chaalees rupaye ka gap paya gaya. Chheh sau chaalees ka claim darj kar diya gaya hai.",
      marathiText: "Namaskar Sharma ji, kalchya settlement madhe doan hazaar teen-she chalees cha farak aala ahe.",
      englishText: "Morning audit complete: ₹2,340 settlement mismatch detected. ₹640 claim submitted automatically."
    },
    {
      amount: 1200,
      title: "₹1,200 Customer Udhaar Paid",
      type: "PAYMENT",
      hindiText: "Paytm par Suresh Verma se ek hazaar do sau rupaye prapt hue.",
      marathiText: "Paytm var Suresh Verma kadun ek hazaar don-she rupaye jama zale.",
      englishText: "Rupees one thousand two hundred received from Suresh Verma on Paytm QR."
    }
  ];

  const playVoiceChime = (sc) => {
    setIsPlaying(true);
    setCurrentScenario(sc);
    
    let spokenText = sc.hindiText;
    if (selectedLang === 'Marathi') spokenText = sc.marathiText;
    else if (selectedLang === 'English') spokenText = sc.englishText;

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.rate = 0.95;
      utterance.pitch = 1.05;
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlaying(false), 2800);
    }

    try {
      confetti({ 
        particleCount: 40, 
        spread: 60, 
        colors: ['#00B9F1', '#002E6E', '#FFFFFF'] 
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-[#0a0a0a] rounded-3xl max-w-lg w-full border-2 border-neutral-300 dark:border-neutral-800 p-6 shadow-2xl relative">
        
        {/* Close button */}
        <button
          onClick={() => {
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-black dark:text-white transition-all z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Soundbox Device Badge */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider border border-[#00B9F1]/40">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#008db8] dark:text-[#00B9F1]" />
            <span>Merchant Soundbox 4G Voice Engine</span>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500">
            <span className="flex items-center gap-1 text-emerald-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              4G Active
            </span>
            <span>•</span>
            <span className="font-bold text-neutral-700 dark:text-neutral-300">SB-4G-9921</span>
          </div>
        </div>

        {/* Realistic Physical Soundbox Device Mockup */}
        <div className="p-5 rounded-2xl bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-300 dark:border-neutral-800 text-center relative overflow-hidden shadow-inner">
          
          {/* LED Ring Glow & Speaker Grille */}
          <div className="w-28 h-28 mx-auto rounded-full bg-white dark:bg-black border-4 border-[#00B9F1] shadow-[0_0_25px_rgba(0,185,241,0.4)] flex items-center justify-center relative mb-3">
            
            {/* Concentric Speaker Rings */}
            <div className="w-20 h-20 rounded-full border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center">
              {isPlaying ? (
                <KineticLoader size={32} />
              ) : (
                <Volume2 className="w-8 h-8 text-[#008db8] dark:text-[#00B9F1]" />
              )}
            </div>

            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-[#00B9F1] animate-ping opacity-75 pointer-events-none" />
            )}
          </div>

          {/* Spoken Alert Announcement */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#00B9F1] font-bold block">
              {currentScenario.title}
            </span>
            <h3 className="text-xl font-black text-black dark:text-white">
              ₹{currentScenario.amount.toLocaleString('en-IN')} Received
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium italic max-w-sm mx-auto leading-snug pt-1">
              "{selectedLang === 'Hindi' ? currentScenario.hindiText : selectedLang === 'Marathi' ? currentScenario.marathiText : currentScenario.englishText}"
            </p>
          </div>

          {/* Language Selector Tabs */}
          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-center gap-1.5 text-xs">
            <span className="text-[10px] font-bold text-neutral-500 uppercase mr-1">Language:</span>
            {['Hindi', 'Marathi', 'English'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all ${
                  selectedLang === lang
                    ? 'bg-[#00B9F1] text-black font-black shadow-sm'
                    : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-800 hover:border-[#00B9F1]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

        </div>

        {/* Quick Trigger Preset Scenarios */}
        <div className="mt-4 space-y-2">
          <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block">
            Select Soundbox Recovery & Audit Preset:
          </span>

          <div className="grid grid-cols-2 gap-2">
            {scenarios.map((sc, i) => (
              <button
                key={i}
                onClick={() => playVoiceChime(sc)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                  currentScenario.amount === sc.amount && currentScenario.title === sc.title
                    ? 'border-[#00B9F1] bg-[#00B9F1]/10 shadow-sm'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 hover:border-[#00B9F1]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs font-black text-black dark:text-white">
                    ₹{sc.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-[#00B9F1]/20 text-[#008db8] dark:text-[#00B9F1]">
                    {sc.type}
                  </span>
                </div>
                <div className="text-[11px] font-medium text-neutral-600 dark:text-neutral-400 truncate">
                  {sc.title}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Broadcast Action Button */}
        <button
          onClick={() => playVoiceChime(currentScenario)}
          className="w-full mt-4 py-2.5 rounded-xl electric-glow-btn text-black font-black text-xs shadow-sm flex items-center justify-center gap-2 active:scale-95"
        >
          <Play className="w-4 h-4 fill-black text-black" />
          <span>Broadcast Soundbox 4G Announcement Now</span>
        </button>

      </div>
    </div>
  );
}
