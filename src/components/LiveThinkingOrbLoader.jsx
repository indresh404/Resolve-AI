import React, { useState, useEffect } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  CheckCircle2, 
  Workflow, 
  Sparkles, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveThinkingOrbLoader({ 
  isOpen, 
  onComplete, 
  theme = 'light' 
}) {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  const TOTAL_DURATION_MS = 4600;

  const stages = [
    {
      startMs: 0,
      endMs: 1100,
      state: 'breathing',
      agent: 'Monitor Agent',
      title: 'Connecting & Ingesting Logs',
      detail: 'Fetching 50 merchant transactions (₹10,000 gross) from Gateway Adapter via n8n webhook...',
      tag: '09:00:01 IST'
    },
    {
      startMs: 1100,
      endMs: 2200,
      state: 'searching',
      agent: 'Reconciler Agent',
      title: 'Settlement Math Audit',
      detail: 'Expected ₹9,800 vs Actual ₹7,460. Tracing ₹2,340 discrepancy across bank UTRs...',
      tag: 'Deterministic Match'
    },
    {
      startMs: 2200,
      endMs: 3300,
      state: 'weaving',
      agent: 'Fraud Agent',
      title: 'Cognee Graph & Pattern Check',
      detail: 'Correlating 30-day customer velocity & shared device MACs. Zero fraud risk detected.',
      tag: 'Graph Memory'
    },
    {
      startMs: 3300,
      endMs: 4200,
      state: 'solving',
      agent: 'Collector + Critic Guardrail',
      title: 'Autonomous Claim Dispatch',
      detail: 'Auto-filing ₹1,500 refund & ₹640 failed debit. Queuing ₹5,400 dispute for 1-tap review.',
      tag: 'HITL Gate Active'
    },
    {
      startMs: 4200,
      endMs: 4600,
      state: 'connecting',
      agent: 'Sarvam AI Voice Copilot',
      title: 'Audit Complete',
      detail: 'Hindi audio brief synthesized. Moving to daily summary...',
      tag: 'Ready'
    }
  ];

  useEffect(() => {
    if (!isOpen) {
      setElapsedMs(0);
      setIsClosing(false);
      return;
    }

    const interval = 50;
    const timer = setInterval(() => {
      setElapsedMs((prev) => {
        const next = prev + interval;
        if (next >= TOTAL_DURATION_MS) {
          clearInterval(timer);
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.5 },
              colors: ['#00B9F1', '#000000', '#ffffff']
            });
          } catch (e) {}
          
          setTimeout(() => {
            setIsClosing(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 300);
          }, 400);
          return TOTAL_DURATION_MS;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  const currentStage = stages.find(
    (s) => elapsedMs >= s.startMs && elapsedMs < s.endMs
  ) || stages[stages.length - 1];

  const progressPercent = Math.min(100, Math.round((elapsedMs / TOTAL_DURATION_MS) * 100));

  const handleSkip = () => {
    setIsClosing(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 200);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isClosing ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.82)'
      }}
    >
      {/* Background Soft Ambient Light Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#00B9F1]/15 blur-3xl pointer-events-none animate-pulse" />

      {/* Centered Modal / Focus Container */}
      <div className="relative max-w-lg w-full text-center flex flex-col items-center justify-center p-6 sm:p-8 rounded-3xl bg-white/95 dark:bg-[#080808]/95 border-2 border-neutral-300 dark:border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,185,241,0.15)]">
        
        {/* Skip button top right */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white px-2.5 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 transition-all flex items-center gap-1"
        >
          <span>Skip</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        {/* Top Active Engine Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B9F1]/15 text-black dark:text-[#00B9F1] border border-[#00B9F1]/40 text-xs font-black uppercase tracking-wider mb-4">
          <Workflow className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1] animate-spin" />
          <span>Autonomous AI Engine Active</span>
        </div>

        {/* Big Centered Live Thinking Orb (Size 112) */}
        <div className="relative my-3 p-3.5 rounded-full bg-neutral-100 dark:bg-neutral-950 border-2 border-[#00B9F1]/40 shadow-[0_0_35px_rgba(0,185,241,0.3)] flex items-center justify-center">
          <ThinkingOrb 
            state={currentStage.state} 
            size={112} 
            speed={1.6} 
            dark={theme === 'dark'} 
          />
          {/* Pulsing ring aura */}
          <span className="absolute inset-0 rounded-full border border-[#00B9F1] animate-ping opacity-30 pointer-events-none" />
        </div>

        {/* Current Agent & Stage Details */}
        <div className="space-y-1.5 mt-3 max-w-sm">
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs font-mono font-bold text-[#008db8] dark:text-[#00B9F1]">
              {currentStage.agent}
            </span>
            <span className="text-neutral-300 dark:text-neutral-700">•</span>
            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
              {currentStage.tag}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white">
            {currentStage.title}
          </h3>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-snug min-h-[40px] flex items-center justify-center">
            {currentStage.detail}
          </p>
        </div>

        {/* Progress Bar with Glowing Needle */}
        <div className="w-full mt-5 space-y-2">
          <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-2 rounded-full overflow-hidden relative">
            <div 
              className="bg-[#00B9F1] h-full rounded-full transition-all duration-100 shadow-[0_0_12px_#00B9F1]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-neutral-500">
            <span className="flex items-center gap-1 text-[#008db8] dark:text-[#00B9F1]">
              <Sparkles className="w-3 h-3" />
              <span>State: {currentStage.state}</span>
            </span>
            <span>{progressPercent}% Complete</span>
          </div>
        </div>

        {/* 4 Steps Indicator Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800 w-full">
          {stages.slice(0, 4).map((s, idx) => {
            const isPast = elapsedMs >= s.endMs;
            const isCurrent = elapsedMs >= s.startMs && elapsedMs < s.endMs;
            return (
              <div 
                key={idx} 
                className={`flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  isCurrent 
                    ? 'bg-[#00B9F1] text-black font-black shadow-sm'
                    : isPast
                    ? 'bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white'
                    : 'text-neutral-400 opacity-60'
                }`}
              >
                {isPast ? (
                  <CheckCircle2 className="w-3 h-3 text-black dark:text-[#00B9F1]" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                )}
                <span>Step 0{idx + 1}</span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
