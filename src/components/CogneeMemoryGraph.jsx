import React, { useState } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Brain, 
  User, 
  Smartphone, 
  Store, 
  Info, 
  Sparkles 
} from 'lucide-react';
import { cogneeGraphNodes } from '../data/mockData';

export default function CogneeMemoryGraph({ theme }) {
  const [selectedNode, setSelectedNode] = useState(cogneeGraphNodes[1]);

  return (
    <section id="memory" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Brain className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              Graph Memory
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Customer Pattern & Fraud Graph
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Tracks 30-day velocity, shared devices, and repeat dispute patterns in Cognee.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bw-inset text-black dark:text-white font-mono flex items-center gap-1.5 font-bold border border-neutral-300 dark:border-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-[#00B9F1]" />
              Cognee Semantic Graph
            </span>
          </div>
        </div>

        {/* Interactive Graph Canvas + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
          
          {/* Left: Visual Graph Canvas */}
          <div className="lg:col-span-8 rounded-2xl bg-neutral-50 dark:bg-black border-2 border-neutral-200 dark:border-neutral-800 p-4 relative overflow-hidden min-h-[300px] flex items-center justify-center shadow-inner">
            
            {/* SVG Connecting Links */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-neutral-300 dark:stroke-neutral-700 stroke-2">
              <line x1="50%" y1="50%" x2="20%" y2="25%" stroke="#00B9F1" strokeWidth="2" strokeDasharray="4,4" />
              <line x1="50%" y1="50%" x2="80%" y2="25%" stroke={theme === 'dark' ? '#FFFFFF' : '#64748B'} strokeWidth="1.5" />
              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#00B9F1" strokeWidth="1.5" />
              <line x1="20%" y1="25%" x2="12%" y2="50%" stroke="#00B9F1" strokeWidth="2" />
              <line x1="50%" y1="50%" x2="75%" y2="78%" stroke={theme === 'dark' ? '#FFFFFF' : '#64748B'} strokeWidth="2" />
            </svg>

            {/* Nodes Layout */}
            <div className="relative w-full h-full min-h-[250px] flex flex-wrap items-center justify-around gap-4 z-10">
              
              {cogneeGraphNodes.map((node) => {
                const isSelected = selectedNode.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-2.5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-2.5 ${
                      isSelected
                        ? 'bg-white dark:bg-neutral-900 text-black dark:text-white border-[#00B9F1] shadow-[0_0_18px_rgba(0,185,241,0.35)] scale-105 ring-2 ring-[#00B9F1]'
                        : node.risk === 'high'
                        ? 'bg-white dark:bg-neutral-900 border-[#00B9F1] text-black dark:text-white shadow-sm hover:scale-102'
                        : 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700 text-black dark:text-white hover:border-[#00B9F1] shadow-sm hover:scale-102'
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-xl ${
                        node.type === 'merchant'
                          ? 'bg-[#00B9F1] text-black font-black'
                          : node.risk === 'high'
                          ? 'bg-[#00B9F1] text-black'
                          : 'bg-neutral-100 dark:bg-neutral-800 text-black dark:text-white border border-neutral-200 dark:border-neutral-700'
                      }`}
                    >
                      {node.type === 'merchant' ? (
                        <Store className="w-3.5 h-3.5" />
                      ) : node.type === 'device' ? (
                        <Smartphone className="w-3.5 h-3.5" />
                      ) : (
                        <User className="w-3.5 h-3.5" />
                      )}
                    </div>

                    <div className="text-left">
                      <div className="text-xs font-bold leading-tight text-black dark:text-white">
                        {node.label}
                      </div>
                      <span className="text-[10px] text-[#008db8] dark:text-[#00B9F1] font-mono capitalize font-bold">
                        {node.risk}
                      </span>
                    </div>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Right: Selected Node Deep Inspector */}
          <div className="lg:col-span-4 bw-inset p-4 flex flex-col justify-between border border-neutral-300 dark:border-neutral-800">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800 mb-3">
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#00B9F1]" />
                  <span className="text-xs font-black text-black dark:text-white uppercase tracking-wider">
                    Entity Inspector
                  </span>
                </div>
                <span className="text-[10px] font-mono text-black dark:text-[#00B9F1] font-bold">
                  {selectedNode.id}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-neutral-500 font-bold block text-[10px]">Entity:</span>
                  <div className="text-xs sm:text-sm font-black text-black dark:text-white">{selectedNode.label}</div>
                </div>

                <div>
                  <span className="text-neutral-500 font-bold block text-[10px]">Pattern:</span>
                  <p className="text-neutral-800 dark:text-neutral-200 bg-white dark:bg-black p-2 rounded-xl border border-neutral-300 dark:border-neutral-800 leading-snug font-medium text-[11px]">
                    {selectedNode.details || "Connected central merchant node for Sharma General Store."}
                  </p>
                </div>

                <div className="p-2 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 space-y-0.5 text-[10px] text-neutral-600 dark:text-neutral-400 font-medium">
                  <div>• 30-day velocity check</div>
                  <div>• Device MAC linkage</div>
                  <div>• Dispute history scoring</div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 text-[10px] text-neutral-500 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1">
                <ThinkingOrb state="weaving" size={12} dark={theme === 'dark'} />
                <span>Memory Sync Active</span>
              </span>
              <span className="font-mono text-[#00B9F1]">Cognee</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
