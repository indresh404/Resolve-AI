import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Sun,
  Moon,
  Play,
  Radio,
  Zap,
  Sparkles
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
  const navTabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'morning-check', label: '1. Audit' },
    { id: 'voice', label: '2. Voice AI' },
    { id: 'settlement', label: '3. Reconcile' },
    { id: 'guardrails', label: '4. Guardrails' },
    { id: 'agents', label: '5. Agents' },
    { id: 'memory', label: '6. Memory' },
  ];

  return (
    <header className="sticky top-3 z-50 px-4 max-w-6xl mx-auto w-full transition-all">
      <div className="bw-capsule rounded-2xl sm:rounded-full px-4 py-2.5 sm:px-6 sm:py-3 flex items-center justify-between transition-all backdrop-blur-xl shadow-lg">
        
        {/* Brand Logo & Live Status */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => {
          const el = document.getElementById('overview');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}>
          <div className="relative flex items-center justify-center">
            <ThinkingOrb 
              state={isMorningCheckRunning ? "working" : "searching"} 
              size={26} 
              speed={isMorningCheckRunning ? 2.0 : 0.8}
              dark={theme === 'dark'}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00B9F1] ring-2 ring-black dark:ring-white animate-pulse" />
          </div>
          
          <div className="flex items-baseline gap-1">
            <span className="font-black text-lg sm:text-xl tracking-tight text-black dark:text-white">
              Resolve
            </span>
            <span className="font-black text-lg sm:text-xl text-[#00B9F1]">
              AI
            </span>
            <span className="hidden lg:inline text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#00B9F1]/15 text-[#008db8] dark:text-[#00B9F1] border border-[#00B9F1]/30 ml-1">
              Autonomous
            </span>
          </div>
        </div>

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100 dark:bg-neutral-900/90 p-1 rounded-full text-xs border border-neutral-200 dark:border-neutral-800 shadow-inner">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-full font-bold transition-all text-xs ${
                  isActive
                    ? 'bg-[#00B9F1] text-black font-black shadow-[0_0_12px_rgba(0,185,241,0.4)] scale-102'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5">
          
          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700 active:scale-95"
            title={theme === 'dark' ? "Switch to Pure White Theme" : "Switch to Pure Black Theme"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#00B9F1]" /> : <Moon className="w-4 h-4 text-black" />}
          </button>

          {/* Primary Action Button: Electric Blue Glow */}
          <button
            onClick={onRunMorningCheck}
            disabled={isMorningCheckRunning}
            className={`px-4 py-2 rounded-full text-xs font-black transition-all flex items-center gap-2 active:scale-95 shadow-sm ${
              isMorningCheckRunning
                ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                : 'electric-glow-btn'
            }`}
          >
            {isMorningCheckRunning ? (
              <>
                <ThinkingOrb state="working" size={14} speed={2.0} dark={true} />
                <span>Auditing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-black text-black" />
                <span className="font-black">Run Audit</span>
              </>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
