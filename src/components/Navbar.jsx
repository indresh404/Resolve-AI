import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Sun,
  Moon,
  Play,
  Radio
} from 'lucide-react';

export default function Navbar({ 
  onRunMorningCheck, 
  isMorningCheckRunning, 
  activeTab, 
  setActiveTab,
  theme,
  onToggleTheme,
  onOpenSoundboxChime
}) {
  return (
    <header className="sticky top-4 z-50 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-capsule rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between transition-all">
        
        {/* Brand Logo & Subtle Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center">
            <ThinkingOrb 
              state={isMorningCheckRunning ? "working" : "searching"} 
              size={22} 
              dark={theme === 'dark'}
            />
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="font-black text-base sm:text-lg tracking-tight text-black dark:text-white">
              Resolve
            </span>
            <span className="font-black text-base sm:text-lg text-[#00B9F1]">
              AI
            </span>
          </div>
        </div>

        {/* Minimal Nav Links */}
        <nav className="hidden sm:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900 p-1 rounded-full text-xs border border-neutral-200 dark:border-neutral-800">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'morning-check', label: 'Audit' },
            { id: 'settlement', label: 'Reconciliation' },
            { id: 'guardrails', label: 'Guardrails' },
            { id: 'agents', label: 'Agents' },
            { id: 'voice', label: 'Voice' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3.5 py-1 rounded-full font-semibold transition-all ${
                  isActive
                    ? 'bg-[#00B9F1] text-black font-black shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Streamlined Right Controls */}
        <div className="flex items-center gap-2">
          
          {/* Soundbox 4G Voice Engine Direct Trigger */}
          <button
            onClick={onOpenSoundboxChime}
            className="p-1.5 px-2.5 rounded-full bg-neutral-100 hover:bg-[#00B9F1]/20 dark:bg-neutral-900 text-black dark:text-white border border-neutral-300 dark:border-neutral-700 hover:border-[#00B9F1] transition-all flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="Merchant Soundbox 4G Voice Engine (Click to broadcast)"
          >
            <Radio className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1] animate-pulse" />
            <span className="hidden md:inline font-mono text-[11px]">Soundbox 4G</span>
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
            title={theme === 'dark' ? "Switch to Pure White Theme" : "Switch to Pure Black Theme"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#00B9F1]" /> : <Moon className="w-4 h-4 text-black" />}
          </button>

          {/* Primary Action Button: Electric Blue Glow */}
          <button
            onClick={onRunMorningCheck}
            disabled={isMorningCheckRunning}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 ${
              isMorningCheckRunning
                ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                : 'electric-glow-btn'
            }`}
          >
            {isMorningCheckRunning ? (
              <>
                <ThinkingOrb state="working" size={14} dark={true} />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black text-black" />
                <span>Run Audit</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
