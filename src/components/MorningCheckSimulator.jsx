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
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  Workflow 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSarvamSpeech, stopSarvamAudio } from '../services/sarvamTts';

export default function MorningCheckSimulator({ theme, isRunning, onRunCheck, onOpenSoundboxChime }) {
  const [currentStep, setCurrentStep] = useState(4);
  const [localRunning, setLocalRunning] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [approvedChargeback, setApprovedChargeback] = useState(null);

  const steps = [
    {
      num: 1,
      title: "09:00 AM Cron & Ingestion",
      desc: "Pulled 50 merchant txns (₹10,000 gross) via n8n webhook trigger.",
      orbState: "breathing",
      agent: "Monitor Agent",
      time: "09:00:01 IST"
    },
    {
      num: 2,
      title: "Deterministic Reconciler",
      desc: "Expected ₹9,800 vs Actual ₹7,460. Net ₹2,340 discrepancy detected.",
      orbState: "searching",
      agent: "Reconciler Agent",
      time: "09:00:03 IST"
    },
    {
      num: 3,
      title: "Risk Scoring & Cognee Graph",
      desc: "Checked 30-day velocity. Customer profiles verified with zero fraud flags.",
      orbState: "weaving",
      agent: "Fraud Agent",
      time: "09:00:05 IST"
    },
    {
      num: 4,
      title: "Autonomous Claim Dispatch",
      desc: "Auto-dispatched ₹640 claim; queued ₹1,500 held refund for merchant approval.",
      orbState: "solving",
      agent: "Collector + Critic",
      time: "09:00:07 IST"
    }
  ];

  // When external isRunning or internal run is triggered
  const startSimulation = () => {
    setLocalRunning(true);
    setCurrentStep(1);

    const t1 = setTimeout(() => setCurrentStep(2), 1000);
    const t2 = setTimeout(() => setCurrentStep(3), 2000);
    const t3 = setTimeout(() => {
      setCurrentStep(4);
      setLocalRunning(false);
      try {
        confetti({
          particleCount: 45,
          spread: 65,
          origin: { y: 0.6 },
          colors: ['#00B9F1', '#000000', '#ffffff']
        });
      } catch (e) {}
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  useEffect(() => {
    if (isRunning) {
      startSimulation();
    }
  }, [isRunning]);

  const toggleAudio = async () => {
    if (isPlayingAudio) {
      stopSarvamAudio();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      const textToSpeak = "Good morning Divya ji. Out of ₹10,000 in yesterday's settlement, a ₹2,340 discrepancy was detected. A ₹640 claim has been submitted automatically. The ₹1,500 refund dispute is awaiting your 1-tap approval.";
      await playSarvamSpeech(textToSpeak, {
        languageCode: 'en-IN',
        speaker: 'priya',
        onStart: () => setIsPlayingAudio(true),
        onEnd: () => setIsPlayingAudio(false),
        onError: () => setIsPlayingAudio(false)
      });
    }
  };

  const activeExecution = isRunning || localRunning;

  return (
    <section id="morning-check" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-7">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Clock className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              Demo Step 01: Proactive 9:00 AM Audit
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              9:00 AM Proactive Morning Audit
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Runs automatically every morning: ingests settlement files, reconciles accounting math, and executes routine recovery claims.
            </p>
          </div>

          {/* Trigger button */}
          <div className="flex items-center gap-3">
            <button
              onClick={startSimulation}
              disabled={activeExecution}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black flex items-center gap-2 transition-all active:scale-95 ${
                activeExecution
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'electric-glow-btn'
              }`}
            >
              {activeExecution ? (
                <>
                  <ThinkingOrb state="working" size={16} speed={2.0} dark={true} />
                  <span>Auditing Step 0{currentStep}...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-black text-black" />
                  <span>Simulate 9:00 AM Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4-Step Animated Pipeline Visualizer Running Inside Card */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isStepActive = activeExecution && currentStep === s.num;
            const isStepDone = currentStep > s.num || (!activeExecution && currentStep === 4);
            return (
              <div
                key={s.num}
                className={`rounded-2xl p-4 border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                  isStepActive
                    ? 'border-[#00B9F1] bg-[#00B9F1]/10 shadow-[0_0_20px_rgba(0,185,241,0.35)] scale-[1.03] ring-2 ring-[#00B9F1]'
                    : isStepDone
                    ? 'border-neutral-300 dark:border-neutral-700 bg-white dark:bg-black'
                    : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 opacity-60'
                }`}
              >
                {/* Step Header */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2">
                      <ThinkingOrb 
                        state={isStepActive ? "working" : s.orbState} 
                        size={22} 
                        speed={isStepActive ? 2.2 : 0.8}
                        dark={theme === 'dark'}
                      />
                      <span className="text-[10px] font-mono font-bold text-neutral-500">
                        Step 0{s.num}
                      </span>
                    </div>

                    {isStepDone ? (
                      <span className="p-1 rounded-full bg-black text-[#00B9F1] dark:bg-[#00B9F1] dark:text-black">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    ) : isStepActive ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00B9F1] animate-ping" />
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

                <div className="pt-2 mt-2 border-t border-neutral-200 dark:border-neutral-800 text-[10px] font-mono text-neutral-400">
                  {s.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Morning Audit Output Results (English Briefing + Decision Card) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
          
          {/* Left: English Voice Briefing Card */}
          <div className="lg:col-span-6 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] border border-[#00B9F1]/30">
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-black dark:text-white flex items-center gap-1.5">
                    Soundbox 4G Voice Briefing <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#00B9F1] text-black font-black">English Audio</span>
                  </h3>
                </div>
              </div>

              {/* Audio Play Trigger */}
              <button
                onClick={toggleAudio}
                className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-neutral-100 text-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs shadow-sm transition-all active:scale-95 border border-neutral-300 dark:border-white"
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
                    <span>Play Audio</span>
                  </>
                )}
              </button>
            </div>

            {/* Spoken Text Quote */}
            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-xs text-neutral-800 dark:text-neutral-200 leading-snug font-sans">
              <p className="italic font-medium">
                "Good morning Divya ji. Out of ₹10,000 in yesterday's settlement, ₹2,340 is missing. I have submitted the ₹640 failed debit claim automatically. The ₹1,500 refund dispute is awaiting your approval."
              </p>
            </div>

            {/* Soundbox Sound Wave Visualizer */}
            <div className="mt-2.5 pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] text-neutral-500">
              <span className="font-mono text-[#008db8] dark:text-[#00B9F1] font-bold">English Speech Synthesis (12s)</span>
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

          {/* Right: Decision Card */}
          <div className="lg:col-span-6 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
                <h3 className="text-xs sm:text-sm font-black text-black dark:text-white">
                  Decision Card (1 Pending)
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] font-black border border-[#00B9F1]/40">
                &gt; ₹1,000
              </span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-xs font-black text-black dark:text-white flex items-center gap-1.5">
                    <span>Dispute: Indresh Suresh (Held Refund)</span>
                    <span className="text-xs text-[#008db8] dark:text-[#00B9F1] font-mono font-black">₹1,500</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 dark:text-neutral-400 mt-0.5 font-medium">
                    Refund deducted from merchant ledger but stuck in gateway. Dispatch formal dispute packet?
                  </p>
                </div>
              </div>

              {/* Approval status banner or action buttons */}
              {approvedChargeback === 'approved' ? (
                <div className="mt-2.5 p-2 rounded-lg bg-[#00B9F1]/15 text-black dark:bg-white dark:text-black text-xs font-black flex items-center gap-1.5 border border-[#00B9F1]">
                  <CheckCircle2 className="w-4 h-4 text-[#008db8] dark:text-black" />
                  <span>Approved! Dispute packet dispatched to settlement gateway.</span>
                </div>
              ) : approvedChargeback === 'rejected' ? (
                <div className="mt-2.5 p-2 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white text-xs font-black flex items-center gap-1.5">
                  <X className="w-4 h-4 text-red-500" />
                  <span>Dispute rejected by merchant.</span>
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
                    <span>Approve Claim (₹1,500)</span>
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

            {/* Auto-Handled Actions summary */}
            <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-500 font-bold px-1">
              <span className="flex items-center gap-1 text-[#00B9F1]">
                <CheckCircle2 className="w-3 h-3" />
                ₹640 Auto-claim submitted
              </span>
              <span className="font-mono text-neutral-400">n8n #EX-9921</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
