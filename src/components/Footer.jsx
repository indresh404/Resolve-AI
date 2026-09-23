import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';

export default function Footer({ theme }) {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-8 px-4 text-xs text-neutral-600 dark:text-neutral-400">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <ThinkingOrb state="working" size={20} dark={theme === 'dark'} />
              <span className="font-black text-base text-black dark:text-white tracking-tight">
                Resolve <span className="text-[#00B9F1]">AI</span>
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed max-w-md font-medium">
              An autonomous AI back-office teammate for merchants. Built for <strong className="text-black dark:text-white">Build for India Hackathon</strong> (Track 3: Autonomous AI Teammates).
            </p>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-black mb-2 uppercase tracking-wider text-[11px]">
              Partner Tech Stack
            </h4>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
              <li>• <strong className="text-black dark:text-white">n8n:</strong> Multi-agent workflow automation</li>
              <li>• <strong className="text-black dark:text-white">Sarvam AI:</strong> Indic Voice STT/TTS</li>
              <li>• <strong className="text-black dark:text-white">Cognee:</strong> Graph memory engine</li>
            </ul>
          </div>

          <div>
            <h4 className="text-black dark:text-white font-black mb-2 uppercase tracking-wider text-[11px]">
              Architecture
            </h4>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
              <li>• Deterministic Calculations (Zero Gap)</li>
              <li>• 9:00 AM Proactive Audit</li>
              <li>• Human-in-the-Loop Risk Gating</li>
              <li>• Offline-First Sync Queue</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-500 text-[11px]">
          <div>
            © 2026 Resolve AI • Build for India Hackathon
          </div>
          <div className="font-bold text-black dark:text-[#00B9F1]">
            Autonomous Merchant Teammate
          </div>
        </div>

      </div>
    </footer>
  );
}
