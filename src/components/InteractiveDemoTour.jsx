import React, { useState } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Sparkles, 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Volume2, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight,
  Lightbulb,
  Radio
} from 'lucide-react';
import { demoTourSteps } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function InteractiveDemoTour({ 
  theme, 
  onRunMorningCheck, 
  onOpenVoice, 
  onOpenSoundbox,
  onApproveDispute
}) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const currentStep = demoTourSteps[currentStepIdx];

  const handleNext = () => {
    if (currentStepIdx < demoTourSteps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      scrollToStep(demoTourSteps[nextIdx].targetId);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      scrollToStep(demoTourSteps[prevIdx].targetId);
    }
  };

  const scrollToStep = (targetId) => {
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleStepClick = (idx) => {
    setCurrentStepIdx(idx);
    scrollToStep(demoTourSteps[idx].targetId);
  };

  const executeCurrentStepAction = () => {
    try {
      confetti({ particleCount: 25, spread: 50, colors: ['#00B9F1', '#002E6E', '#FFFFFF'] });
    } catch (e) {}

    switch (currentStep.step) {
      case 1:
        onRunMorningCheck();
        break;
      case 2:
        onOpenVoice();
        break;
      case 3:
        scrollToStep('settlement');
        break;
      case 4:
        scrollToStep('guardrails');
        break;
      case 5:
        scrollToStep('agents');
        break;
      case 6:
        scrollToStep('memory');
        break;
      default:
        scrollToStep(currentStep.targetId);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 w-full mb-4">
      <div className="rounded-2xl bg-white dark:bg-[#0c0c0c] border-2 border-[#00B9F1]/40 shadow-[0_4px_20px_rgba(0,185,241,0.12)] p-4 transition-all">
        
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1 rounded-full bg-[#00B9F1]/15 text-[#008db8] dark:text-[#00B9F1]">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                  2-Minute Hackathon Demo Tour
                </span>
                <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#00B9F1] text-black font-black">
                  Step {currentStep.step} of 6
                </span>
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                Follow the 6 key milestones of Track 3: Autonomous Payment Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-bold text-neutral-500 hover:text-black dark:hover:text-white px-2 py-1 rounded-lg border border-neutral-200 dark:border-neutral-800"
            >
              {isExpanded ? 'Collapse Tour' : 'Expand Tour'}
            </button>
          </div>
        </div>

        {/* Expandable Pitch Navigator */}
        {isExpanded && (
          <div className="mt-3.5 space-y-3">
            
            {/* 6 Step Progress Indicator */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {demoTourSteps.map((s, idx) => {
                const isActive = currentStepIdx === idx;
                const isPast = currentStepIdx > idx;
                return (
                  <button
                    key={s.step}
                    onClick={() => handleStepClick(idx)}
                    className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                      isActive
                        ? 'border-[#00B9F1] bg-[#00B9F1]/15 text-black dark:text-white shadow-sm ring-1 ring-[#00B9F1]'
                        : isPast
                        ? 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300'
                        : 'border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-400 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold">0{s.step}</span>
                      {isPast ? (
                        <CheckCircle2 className="w-3 h-3 text-[#00B9F1]" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                      ) : null}
                    </div>
                    <span className="font-bold text-[11px] truncate leading-tight block">
                      {s.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Step Active Card */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-black border border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs sm:text-sm font-black text-black dark:text-white">
                    {currentStep.title}
                  </h4>
                  <span className="text-[10px] font-mono text-[#008db8] dark:text-[#00B9F1] bg-[#00B9F1]/10 px-2 py-0.5 rounded-full font-bold border border-[#00B9F1]/30">
                    {currentStep.tag}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium leading-snug">
                  {currentStep.desc}
                </p>
              </div>

              {/* Step Action Button & Navigation */}
              <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto justify-end">
                <button
                  onClick={executeCurrentStepAction}
                  className="px-3.5 py-1.5 rounded-xl electric-glow-btn text-black font-black text-xs flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <Play className="w-3 h-3 fill-black text-black" />
                  <span>{currentStep.actionName}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrev}
                    disabled={currentStepIdx === 0}
                    className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={currentStepIdx === demoTourSteps.length - 1}
                    className="p-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 disabled:opacity-30 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* The Pitch Moment Quote Box */}
            <div className="p-2.5 rounded-xl bg-[#00B9F1]/10 border border-[#00B9F1]/30 flex items-start gap-2 text-xs">
              <Lightbulb className="w-4 h-4 text-[#008db8] dark:text-[#00B9F1] shrink-0 mt-0.5" />
              <div className="text-neutral-800 dark:text-neutral-200 leading-tight">
                <strong className="text-black dark:text-[#00B9F1]">The Pitch Moment: </strong>
                <span className="italic">
                  "You're missing ₹2,340 from yesterday's settlement. I found three causes. I've already submitted a ₹640 claim. ₹1,500 requires your approval. ₹200 is still unexplained. I'll keep monitoring the open cases and notify you when the money is recovered."
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
