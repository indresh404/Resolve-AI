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
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-neutral-700 dark:text-neutral-300 font-semibold">
            By <strong className="text-black dark:text-white">Indresh Suresh</strong> & <strong className="text-black dark:text-white">Divya Sharma</strong>
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
          <Store className="w-3.5 h-3.5 text-[#00B9F1]" />
          <span className="font-bold text-black dark:text-white">{merchantInfo.name}</span>
          <span className="text-neutral-300 dark:text-neutral-700">•</span>
          <span className="text-[#008db8] dark:text-[#00B9F1] font-bold flex items-center gap-1.5 bg-[#00B9F1]/10 px-2.5 py-0.5 rounded-full border border-[#00B9F1]/30">
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
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-sm transition-all flex items-center gap-2 border-2 border-neutral-300 dark:border-white shadow-sm active:scale-95"
            >
              <Radio className="w-4 h-4 text-[#008db8] dark:text-[#00B9F1] animate-pulse" />
              <span>Voice Copilot (Hindi Demo)</span>
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

        {/* Right Column: Live Autonomous Teammate Activity Hub */}
        <div className="lg:col-span-5">
          <div className="bw-card p-5 space-y-3.5">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                <ThinkingOrb state="working" size={20} dark={theme === 'dark'} />
                <span className="text-xs font-black text-black dark:text-white">
                  Autonomous Teammate Feed
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Sync
              </span>
            </div>

            {/* Quick Ledger Snapshot */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bw-inset text-center border border-neutral-200 dark:border-neutral-800 text-xs">
              <div>
                <span className="text-[10px] text-neutral-500 font-bold block">Expected</span>
                <span className="font-black text-black dark:text-white text-xs">₹9,800</span>
              </div>
              <div>
                <span className="text-[10px] text-neutral-500 font-bold block">Settled</span>
                <span className="font-black text-black dark:text-white text-xs">₹7,460</span>
              </div>
              <div>
                <span className="text-[10px] text-[#008db8] dark:text-[#00B9F1] font-bold block">Disputed</span>
                <span className="font-black text-[#008db8] dark:text-[#00B9F1] text-xs">₹2,340</span>
              </div>
            </div>

            {/* Live Event Timeline */}
            <div className="space-y-2 text-xs">
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block">
                Today's Autonomous Actions:
              </span>

              <div className="space-y-2">
                <div className="flex items-start gap-2 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="p-1 rounded-full bg-[#00B9F1]/15 text-[#008db8] dark:text-[#00B9F1] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <strong className="text-black dark:text-white font-bold">50 Txns Audited</strong>
                      <span className="text-[10px] font-mono text-neutral-400">09:00 AM</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      Reconciler matched bank UTRs with zero manual work.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                  <span className="p-1 rounded-full bg-[#00B9F1]/15 text-[#008db8] dark:text-[#00B9F1] shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <strong className="text-black dark:text-white font-bold">₹2,140 Claims Filed</strong>
                      <span className="text-[10px] font-mono text-neutral-400">09:01 AM</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      Auto-dispatched refund dispute & failed debit claim.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-2 rounded-xl bg-white dark:bg-neutral-900 border border-[#00B9F1]/40">
                  <span className="p-1 rounded-full bg-[#00B9F1]/20 text-[#008db8] dark:text-[#00B9F1] shrink-0 mt-0.5">
                    <ShieldCheck className="w-3 h-3" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <strong className="text-black dark:text-white font-bold">1 Decision Queued</strong>
                      <span className="text-[10px] font-mono text-[#008db8] dark:text-[#00B9F1] font-bold">Pending</span>
                    </div>
                    <p className="text-[11px] text-neutral-500 truncate">
                      ₹5,400 chargeback awaiting 1-tap merchant approval.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quick Run Action */}
            <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
              <button
                onClick={onRunMorningCheck}
                className="w-full py-2 px-3 rounded-xl electric-glow-btn text-black font-black text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Execute Morning Check (9:00 AM)</span>
              </button>
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
