import React from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { Users, Sparkles, Heart } from 'lucide-react';
import { teamMembers } from '../data/mockData';

export default function Footer({ theme }) {
  return (
    <footer className="mt-12 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black py-8 px-4 text-xs text-neutral-600 dark:text-neutral-400">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Top Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-5 space-y-2">
            <div className="flex items-center gap-2">
              <ThinkingOrb state="working" size={20} dark={theme === 'dark'} />
              <span className="font-black text-base text-black dark:text-white tracking-tight">
                Resolve <span className="text-[#00B9F1]">AI</span>
              </span>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs leading-relaxed max-w-md font-medium">
              An autonomous AI payment-operations teammate for Paytm merchants. Built for <strong className="text-black dark:text-white">Paytm Build for India Hackathon</strong> (Track 3: Autonomous AI Teammates).
            </p>
            
            {/* Team Attribution Box */}
            <div className="pt-2">
              <div className="flex items-center gap-1.5 text-[11px] font-black text-black dark:text-white uppercase tracking-wider mb-1.5">
                <Users className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span>Hackathon Team</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {teamMembers.map((member, i) => (
                  <div 
                    key={i}
                    className="p-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center gap-2 text-xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#00B9F1]/20 text-[#008db8] dark:text-[#00B9F1] font-black flex items-center justify-center text-[10px]">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-black text-black dark:text-white leading-tight">
                        {member.name}
                      </div>
                      <div className="text-[10px] text-neutral-500 font-medium leading-tight">
                        {member.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-black dark:text-white font-black mb-2 uppercase tracking-wider text-[11px]">
              Partner Tech Stack
            </h4>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
              <li>• <strong className="text-black dark:text-white">n8n:</strong> Multi-agent workflow automation & webhook handoffs</li>
              <li>• <strong className="text-black dark:text-white">Sarvam AI:</strong> Indic Voice STT/TTS (Hindi, Marathi, English)</li>
              <li>• <strong className="text-black dark:text-white">Cognee:</strong> Semantic graph memory & fraud detection</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-black dark:text-white font-black mb-2 uppercase tracking-wider text-[11px]">
              Core Principles
            </h4>
            <ul className="space-y-1.5 text-neutral-700 dark:text-neutral-300 text-xs font-medium">
              <li>• Deterministic Math (Zero Hallucination)</li>
              <li>• Bounded Autonomy (🟢 / 🟡 / 🔴)</li>
              <li>• 9:00 AM Standing Morning Job</li>
              <li>• Tracking to RECOVERED State</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-neutral-500 text-[11px]">
          <div>
            Built by <strong className="text-black dark:text-white">Indresh Suresh</strong> & <strong className="text-black dark:text-white">Divya Sharma</strong> • Paytm Build for India Hackathon
          </div>
          <div className="font-bold text-black dark:text-[#00B9F1]">
            Track 3: Autonomous AI Teammates
          </div>
        </div>

      </div>
    </footer>
  );
}
