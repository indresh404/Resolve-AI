import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  TrendingUp, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Volume2, 
  Store, 
  Radio, 
  Play, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { merchantInfo, recoveryStats } from '../data/mockData';

export default function HeroSection({ theme, onRunMorningCheck, onOpenVoiceModal }) {
  const [orbState, setOrbState] = React.useState('working');
  const [orbSpeed, setOrbSpeed] = React.useState(1);
  const [isPaused, setIsPaused] = React.useState(false);

  const orbStates = [
    { id: 'working', label: 'Working', desc: 'Active reconciliation & ledger audit' },
    { id: 'searching', label: 'Searching', desc: 'Querying Gateway API & bank UTRs' },
    { id: 'solving', label: 'Solving', desc: 'Mathematical root cause attribution' },
    { id: 'listening', label: 'Listening', desc: 'Sarvam Indic voice STT stream' },
    { id: 'connecting', label: 'Connecting', desc: 'n8n webhook dispatching claims' },
    { id: 'weaving', label: 'Weaving', desc: 'Cognee graph pattern correlation' },
    { id: 'composing', label: 'Composing', desc: 'Drafting dispute contest packet' },
    { id: 'breathing', label: 'Breathing', desc: 'Proactive background idle monitor' },
    { id: 'shaping', label: 'Shaping', desc: 'Dynamic merchant risk scoring' },
  ];

  return (
    <section id="overview" className="pt-4 pb-6 px-4 max-w-5xl mx-auto w-full">
      
      {/* Top Merchant Context Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-extrabold text-black dark:text-[#00B9F1] bg-[#00B9F1]/10 px-2.5 py-1 rounded-full border border-[#00B9F1]/30">
            Build for India Hackathon
          </span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-neutral-600 dark:text-neutral-400 font-bold">
            Track 3: Autonomous AI Teammates
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <Store className="w-3.5 h-3.5 text-[#00B9F1]" />
          <span className="font-bold text-black dark:text-white">{merchantInfo.name}</span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-[#00B9F1] font-bold flex items-center gap-1.5 bg-black dark:bg-[#00B9F1]/10 px-2.5 py-0.5 rounded-full border border-[#00B9F1]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00B9F1] animate-pulse" />
            {merchantInfo.soundboxId}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center mb-6">
        
        {/* Left Column: Clear, Minimal Value Proposition */}
        <div className="lg:col-span-7 space-y-3.5">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white leading-tight">
            Autonomous AI Teammate for <span className="text-[#00B9F1]">Merchants</span>
          </h1>

          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-medium max-w-lg leading-snug">
            Reconciles daily settlement mismatches, files gateway disputes, and delivers voice updates in Hindi, Marathi & English.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={onRunMorningCheck}
              className="px-5 py-2.5 rounded-xl electric-glow-btn text-black font-black text-sm flex items-center gap-2 active:scale-95"
            >
              <Play className="w-4 h-4 fill-black text-black" />
              <span>Simulate 9:00 AM Audit</span>
            </button>

            <button
              onClick={onOpenVoiceModal}
              className="px-4 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all flex items-center gap-2 border border-black dark:border-white shadow-sm active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-[#00B9F1]" />
              <span>Voice Copilot</span>
            </button>
          </div>

          {/* Partner Tech Chips */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-bold text-black dark:text-white">
              n8n Workflows
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-bold text-black dark:text-white">
              Sarvam Indic Voice
            </span>
            <span className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 font-bold text-black dark:text-white">
              Cognee Memory
            </span>
          </div>
        </div>

        {/* Right Column: Live Teammate Working Card with Interactive Orb */}
        <div className="lg:col-span-5">
          <div className="bw-card p-5">
            
            {/* Header of Card */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-black dark:text-white">
                  Live AI Thinking Engine
                </span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-black text-[#00B9F1] dark:bg-white dark:text-black font-bold border border-[#00B9F1]/40">
                  {orbState}
                </span>
              </div>

              {/* Speed & Pause Controls */}
              <div className="flex items-center gap-1">
                {[0.5, 1, 2].map((sp) => (
                  <button
                    key={sp}
                    onClick={() => setOrbSpeed(sp)}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold transition-all ${
                      orbSpeed === sp
                        ? 'bg-[#00B9F1] text-black font-black'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isPaused ? 'bg-amber-500 text-black' : 'text-neutral-500 hover:text-black dark:hover:text-white'
                  }`}
                  title={isPaused ? "Resume Animation" : "Pause Animation"}
                >
                  {isPaused ? "Play" : "Pause"}
                </button>
              </div>
            </div>

            {/* Central Animated Orb Display (Size 64) */}
            <div className="py-2 flex flex-col items-center justify-center text-center">
              <div className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-950 border-2 border-neutral-200 dark:border-neutral-800 shadow-inner flex items-center justify-center my-1 relative">
                <ThinkingOrb 
                  state={orbState} 
                  size={64} 
                  speed={orbSpeed} 
                  dark={theme === 'dark'} 
                  paused={isPaused} 
                />
              </div>

              <div className="text-xs font-black text-black dark:text-white mt-2 capitalize">
                State: <span className="text-[#00B9F1]">{orbState}</span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium max-w-xs mt-0.5">
                {orbStates.find((s) => s.id === orbState)?.desc}
              </p>
            </div>

            {/* 9 Interactive State Quick Selector */}
            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold mb-1.5">
                <span>9 Animated States:</span>
                <span>Click to switch</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {orbStates.map((s) => {
                  const isActive = orbState === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setOrbState(s.id)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all flex items-center gap-1 ${
                        isActive
                          ? 'bg-[#00B9F1] text-black font-black shadow-sm ring-1 ring-[#00B9F1]'
                          : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <ThinkingOrb state={s.id} size={12} speed={1} dark={isActive ? false : theme === 'dark'} />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        
        <div className="bw-card p-3.5">
          <div className="text-[11px] text-neutral-500 font-bold">Total Recovered</div>
          <div className="text-xl sm:text-2xl font-black text-black dark:text-white mt-0.5">
            ₹{recoveryStats.totalRecovered.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-[#00B9F1] font-bold mt-0.5 block flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +₹2,340 today
          </span>
        </div>

        <div className="bw-card p-3.5">
          <div className="text-[11px] text-neutral-500 font-bold">Time Saved</div>
          <div className="text-xl sm:text-2xl font-black text-black dark:text-white mt-0.5">
            {recoveryStats.hoursSaved} hrs
          </div>
          <span className="text-[10px] text-neutral-500 font-bold mt-0.5 block flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#00B9F1]" /> Automated
          </span>
        </div>

        <div className="bw-card p-3.5">
          <div className="text-[11px] text-neutral-500 font-bold">Attribution Rate</div>
          <div className="text-xl sm:text-2xl font-black text-black dark:text-white mt-0.5">
            {recoveryStats.mismatchExplainedPercent}%
          </div>
          <span className="text-[10px] text-[#00B9F1] font-bold mt-0.5 block flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> ₹0 unexplained
          </span>
        </div>

        <div className="bw-card p-3.5">
          <div className="text-[11px] text-neutral-500 font-bold">Guardrail Safety</div>
          <div className="text-xl sm:text-2xl font-black text-black dark:text-white mt-0.5">
            {recoveryStats.autoExecutedRate}%
          </div>
          <span className="text-[10px] text-neutral-500 font-bold mt-0.5 block flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#00B9F1]" /> Critic verified
          </span>
        </div>

      </div>

    </section>
  );
}
