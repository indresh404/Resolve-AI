import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Wifi, 
  WifiOff, 
  Sun,
  Moon,
  Play
} from 'lucide-react';

export default function Navbar({ 
  onRunMorningCheck, 
  isMorningCheckRunning, 
  isOffline, 
  setIsOffline, 
  activeTab, 
  setActiveTab,
  theme,
  onToggleTheme
}) {
  return (
    <header className="sticky top-4 z-50 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-capsule rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center justify-between transition-all">
        
        {/* Brand Logo & Subtle Status */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center">
            <ThinkingOrb 
              state={isMorningCheckRunning ? "working" : isOffline ? "breathing" : "searching"} 
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
            { id: 'voice', label: 'Voice' },
            { id: 'agents', label: 'Agents' },
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
                    ? 'bg-black text-[#00B9F1] dark:bg-white dark:text-black font-black shadow-sm'
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
          
          {/* Theme Switcher */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors border border-transparent hover:border-neutral-300 dark:hover:border-neutral-700"
            title={theme === 'dark' ? "Switch to Pure White Theme" : "Switch to Pure Black Theme"}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#00B9F1]" /> : <Moon className="w-4 h-4 text-black" />}
          </button>

          {/* Minimal Connectivity Dot / Toggle */}
          <button
            onClick={() => setIsOffline(!isOffline)}
            className="px-2.5 py-1 rounded-full text-xs font-bold border border-neutral-300 dark:border-neutral-700 hover:border-[#00B9F1] transition-all flex items-center gap-1.5"
            title={isOffline ? "Offline Mode (Click to connect)" : "Online Mode (Click to simulate offline)"}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3 h-3 text-amber-500" />
                <span className="text-[10px] text-amber-600 dark:text-amber-400">Offline</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#00B9F1] shadow-[0_0_8px_#00B9F1]" />
                <span className="text-[10px] text-black dark:text-white">Live</span>
              </>
            )}
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
