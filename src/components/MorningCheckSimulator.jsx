import React, { useState, useEffect } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  Clock, 
  Check, 
  X,
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MorningCheckSimulator({ theme, isRunning, onRunCheck, onOpenSoundboxChime }) {
  const [currentStep, setCurrentStep] = useState(isRunning ? 1 : 4);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [approvedChargeback, setApprovedChargeback] = useState(null);

  const steps = [
    {
      num: 1,
      title: "9:00 AM Trigger & Fetch",
      desc: "Pulled 50 txns (₹10,000 gross) from Gateway Adapter via n8n.",
      orbState: "breathing",
      agent: "Monitor Agent"
    },
    {
      num: 2,
      title: "Reconciliation Engine",
      desc: "Expected ₹9,800 vs Actual ₹7,460. ₹2,340 gap parsed.",
      orbState: "searching",
      agent: "Reconciler Agent"
    },
    {
      num: 3,
      title: "Risk & Cognee Graph",
      desc: "Checked 30-day velocity. Flagged repeat refund patterns.",
      orbState: "weaving",
      agent: "Fraud Agent"
    },
    {
      num: 4,
      title: "Autonomous Action",
      desc: "Auto-filed ₹2,140 claims; queued Hindi voice briefing.",
      orbState: "solving",
      agent: "Collector + Critic"
    }
  ];

  useEffect(() => {
    if (isRunning) {
      setCurrentStep(1);
      const t1 = setTimeout(() => setCurrentStep(2), 1200);
      const t2 = setTimeout(() => setCurrentStep(3), 2400);
      const t3 = setTimeout(() => {
        setCurrentStep(4);
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#00B9F1', '#000000', '#ffffff']
          });
        } catch (e) {}
      }, 3800);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isRunning]);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
    if (!isPlayingAudio && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Namaste Sharma ji. Kal kul 10,000 rupaye ke transactions hue the. 2,340 rupaye ka settlement mismatch paya gaya hai. 1,500 ka refund dispute aur 640 ka failed claim darj kar diya gaya hai.");
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <section id="morning-check" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black text-[#00B9F1] dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/40">
              <Clock className="w-3.5 h-3.5 text-[#00B9F1] dark:text-black" />
              Proactive Daily Audit
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              9:00 AM Morning Audit
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Runs automatically every morning via n8n: reviews settlements, files routine claims, and leaves a voice briefing.
            </p>
          </div>

          {/* Trigger button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onRunCheck}
              disabled={isRunning}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all active:scale-95 ${
                isRunning
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'electric-glow-btn'
              }`}
            >
              {isRunning ? (
                <>
                  <ThinkingOrb state="working" size={16} dark={true} />
                  <span>Auditing Books...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>Run Morning Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4-Step Animated Pipeline Visualizer */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isStepActive = isRunning && currentStep === s.num;
            const isStepDone = currentStep > s.num || (!isRunning && currentStep === 4);
            return (
              <div
                key={s.num}
                className={`rounded-2xl p-3.5 border-2 transition-all duration-300 relative overflow-hidden ${
                  isStepActive
                    ? 'border-[#00B9F1] bg-[#00B9F1]/5 shadow-[0_0_15px_rgba(0,185,241,0.25)] scale-[1.02]'
                    : isStepDone
                    ? 'border-black dark:border-neutral-700 bw-inset'
                    : 'border-neutral-200 dark:border-neutral-800 bw-inset opacity-70'
                }`}
              >
                {/* Step Header */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <ThinkingOrb 
                      state={isStepActive ? "working" : s.orbState} 
                      size={20} 
                      speed={isStepActive ? 1.5 : 0.8}
                      dark={theme === 'dark'}
                    />
                    <span className="text-[10px] font-mono font-bold text-neutral-500">
                      Step 0{s.num}
                    </span>
                  </div>
                  {isStepDone ? (
                    <span className="p-0.5 rounded-full bg-black text-[#00B9F1] dark:bg-[#00B9F1] dark:text-black">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  ) : isStepActive ? (
                    <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                  ) : null}
                </div>

                <div className="text-[11px] font-black text-[#00B9F1] mb-0.5">
                  {s.agent}
                </div>
                <h4 className="text-xs sm:text-sm font-black text-black dark:text-white mb-1">
                  {s.title}
                </h4>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium leading-snug">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Morning Audit Output Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          
          {/* Left: Sarvam AI Voice Note Card */}
          <div className="lg:col-span-6 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black text-[#00B9F1] dark:bg-white dark:text-black">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-black dark:text-white flex items-center gap-1.5">
                    Sarvam AI Voice Briefing <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#00B9F1] text-black font-black">Hindi</span>
                  </h3>
                </div>
              </div>

              {/* Audio Play Trigger */}
              <button
                onClick={toggleAudio}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs shadow-sm transition-all active:scale-95"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#00B9F1]" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Spoken Text Quote */}
            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 leading-snug font-sans">
              <p className="italic font-medium">
                "नमस्ते शर्मा जी। कल के ₹10,000 में ₹2,340 कम आए थे। ₹1,500 रिफंड और ₹640 क्लेम दर्ज कर दिए हैं। ₹5,400 चार्जबैक हेतु निर्णय दें।"
              </p>
            </div>

            {/* Soundbox Sound Wave Visualizer */}
            <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
              <span className="font-mono text-[#00B9F1] font-bold">Sarvam Indic TTS (14s)</span>
              <div className="flex items-end gap-1 h-4">
                {[4, 12, 18, 24, 14, 8, 22, 16, 10, 20, 14, 6].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: isPlayingAudio ? `${Math.max(4, (h * 1.2) % 20)}px` : `${Math.max(3, h * 0.25)}px` }}
                    className={`w-1 rounded-full transition-all duration-200 ${
                      isPlayingAudio ? 'bg-[#00B9F1] animate-pulse' : 'bg-neutral-400 dark:bg-neutral-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Today's Action Queue & Merchant Approval Card */}
          <div className="lg:col-span-6 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#00B9F1]" />
                <h3 className="text-xs sm:text-sm font-black text-black dark:text-white">
                  Decision Card (1 Pending)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black text-[#00B9F1] dark:bg-white dark:text-black font-black border border-[#00B9F1]">
                &gt; ₹5,000
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-black text-black dark:text-white flex items-center gap-1.5">
                    <span>Dispute: Rajesh Kumar</span>
                    <span className="text-xs text-[#00B9F1] font-mono font-black">₹5,400</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                    TXN-9941 dispute. Invoice & CCTV ready. Submit contest to bank?
                  </p>
                </div>
              </div>

              {/* Approval status banner or action buttons */}
              {approvedChargeback === 'approved' ? (
                <div className="mt-2.5 p-2 rounded-lg bg-black text-[#00B9F1] dark:bg-white dark:text-black text-xs font-black flex items-center gap-1.5 border border-[#00B9F1]">
                  <CheckCircle2 className="w-4 h-4 text-[#00B9F1] dark:text-black" />
                  <span>Approved! Dispute packet dispatched to bank.</span>
                </div>
              ) : approvedChargeback === 'rejected' ? (
                <div className="mt-2.5 p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white text-xs font-black flex items-center gap-1.5">
                  <X className="w-4 h-4 text-red-500" />
                  <span>Dispute rejected. Amount credited to customer.</span>
                </div>
              ) : (
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setApprovedChargeback('approved');
                      try {
                        confetti({ particleCount: 30, spread: 50, colors: ['#00B9F1', '#000000', '#ffffff'] });
                      } catch (e) {}
                    }}
                    className="flex-1 py-1.5 px-3 rounded-lg electric-glow-btn text-black font-black text-xs flex items-center justify-center gap-1 active:scale-95"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Approve Dispute (₹5,400)</span>
                  </button>

                  <button
                    onClick={() => setApprovedChargeback('rejected')}
                    className="py-1.5 px-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-black dark:text-white text-xs font-bold transition-all"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>

            {/* 2 Auto-Handled Actions summary */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 font-bold px-1">
              <span className="flex items-center gap-1 text-[#00B9F1]">
                <CheckCircle2 className="w-3 h-3" />
                2 Tasks auto-executed (₹2,140)
              </span>
              <span className="font-mono text-neutral-400">n8n #EX-9921</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
