import React, { useState, useEffect } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Terminal, 
  ArrowRight, 
  Workflow, 
  ShieldCheck, 
  Calculator, 
  Network, 
  Send, 
  Clock,
  Play,
  CheckCircle2,
  Zap
} from 'lucide-react';
import { agentsList } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function MultiAgentPipeline({ theme }) {
  const [selectedAgent, setSelectedAgent] = useState(agentsList[0]);
  const [runningAgentId, setRunningAgentId] = useState(null);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const runSingleAgent = (agent) => {
    setSelectedAgent(agent);
    setRunningAgentId(agent.id);
    setTimeout(() => {
      setRunningAgentId(null);
    }, 2200);
  };

  const handleRunFullPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    
    // Step through each agent sequentially
    agentsList.forEach((ag, idx) => {
      setTimeout(() => {
        setActiveStepIndex(idx);
        setSelectedAgent(ag);
        setRunningAgentId(ag.id);
      }, idx * 1100);
    });

    setTimeout(() => {
      setIsPipelineRunning(false);
      setRunningAgentId(null);
      try {
        confetti({ particleCount: 35, spread: 50, colors: ['#00B9F1', '#000000', '#ffffff'] });
      } catch (e) {}
    }, agentsList.length * 1100 + 400);
  };

  return (
    <section id="agents" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black text-[#00B9F1] dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/40">
              <Workflow className="w-3.5 h-3.5 text-[#00B9F1] dark:text-black" />
              n8n Multi-Agent Engine
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Autonomous Agent Teammates
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Click any agent or run the full pipeline to watch real-time Thinking Orb execution and webhook handoffs.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunFullPipeline}
              disabled={isPipelineRunning}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 active:scale-95 ${
                isPipelineRunning
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'electric-glow-btn text-black'
              }`}
            >
              {isPipelineRunning ? (
                <>
                  <ThinkingOrb state="working" size={14} dark={true} />
                  <span>Pipeline Executing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-black text-black" />
                  <span>Execute 5-Agent Flow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 5-Agent Interactive Horizontal Pipeline */}
        <div className="my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {agentsList.map((ag, idx) => {
            const isSelected = selectedAgent.id === ag.id;
            const isRunning = runningAgentId === ag.id;
            
            // Dynamic orb state for active execution vs idle
            const currentOrbState = isRunning 
              ? (ag.id === 'monitor' ? 'working' : ag.id === 'reconciler' ? 'searching' : ag.id === 'fraud' ? 'weaving' : ag.id === 'collector' ? 'connecting' : 'solving')
              : ag.state;

            return (
              <div
                key={ag.id}
                onClick={() => runSingleAgent(ag)}
                className={`p-3.5 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isRunning
                    ? 'border-[#00B9F1] bg-[#00B9F1]/15 shadow-[0_0_20px_rgba(0,185,241,0.35)] scale-[1.03] ring-2 ring-[#00B9F1]'
                    : isSelected
                    ? 'border-[#00B9F1] bg-[#00B9F1]/10 dark:bg-neutral-900 shadow-[0_0_15px_rgba(0,185,241,0.25)] ring-1 ring-[#00B9F1]'
                    : 'border-neutral-200 dark:border-neutral-800 bw-inset hover:border-[#00B9F1]'
                }`}
              >
                {/* Active Execution Ping */}
                {isRunning && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                )}

                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    {/* Animated Orb container */}
                    <div className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center shadow-inner">
                      <ThinkingOrb 
                        state={currentOrbState} 
                        size={32} 
                        speed={isRunning ? 2.0 : 0.9} 
                        dark={theme === 'dark'} 
                      />
                    </div>
                    
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                      isRunning
                        ? 'bg-[#00B9F1] text-black border-[#00B9F1] animate-pulse font-black'
                        : isSelected
                        ? 'bg-[#00B9F1]/20 text-[#008db8] dark:text-[#00B9F1] border-[#00B9F1]/40 font-black'
                        : 'bg-neutral-200 dark:bg-black text-neutral-800 dark:text-[#00B9F1] border-neutral-300 dark:border-neutral-800'
                    }`}>
                      {isRunning ? 'RUNNING' : ag.state}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-black mb-0.5 text-black dark:text-white">
                    {ag.name}
                  </h4>
                  <p className="text-[11px] text-[#00B9F1] font-bold leading-tight mb-2">
                    {ag.role}
                  </p>
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[10px] font-bold text-neutral-500 dark:text-neutral-400">
                  <span className="truncate">{isRunning ? 'Processing...' : ag.status}</span>
                  <Play className={`w-3 h-3 text-[#00B9F1] shrink-0 ${isRunning ? 'animate-spin' : ''}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Agent Telemetry & Log Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
          
          {/* Left: Agent Specs */}
          <div className="lg:col-span-5 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-1.5 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center shadow-md">
                <ThinkingOrb 
                  state={runningAgentId === selectedAgent.id ? "working" : selectedAgent.state} 
                  size={44} 
                  speed={runningAgentId === selectedAgent.id ? 2.2 : 1.0} 
                  dark={theme === 'dark'} 
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm sm:text-base font-black text-black dark:text-white">{selectedAgent.name}</h3>
                  {runningAgentId === selectedAgent.id && (
                    <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                  )}
                </div>
                <span className="text-xs text-[#00B9F1] font-bold">{selectedAgent.role}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mb-3 leading-snug">
              {selectedAgent.description}
            </p>

            <div>
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block mb-1.5">
                Equipped Tools:
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedAgent.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-black text-[#00B9F1] dark:bg-white dark:text-black text-[11px] font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Execution Log Terminal */}
          <div className="lg:col-span-7 rounded-2xl p-4 bg-black border-2 border-neutral-800 shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-800 mb-2 text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span className="font-bold text-white text-xs">Telemetry Log: {selectedAgent.name}</span>
              </div>
              <span className="text-[10px] text-[#00B9F1] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B9F1] animate-pulse" />
                n8n Webhook Live
              </span>
            </div>

            <div className="space-y-1.5 text-neutral-200 max-h-36 overflow-y-auto pr-1 text-[11px] font-medium">
              {selectedAgent.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#00B9F1] shrink-0 font-bold">{`>`}</span>
                  <span className="leading-tight">{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-[#00B9F1] pt-0.5 font-bold">
                <span>{`>`}</span>
                <span className="animate-pulse">
                  {runningAgentId === selectedAgent.id ? `Executing ${selectedAgent.name} payload...` : 'Listening for scheduled triggers (09:00 IST)...'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
