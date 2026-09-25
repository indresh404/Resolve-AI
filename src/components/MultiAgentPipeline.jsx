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
  Zap,
  Layers,
  Database,
  Check,
  AlertCircle
} from 'lucide-react';
import { agentsList } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function MultiAgentPipeline({ theme }) {
  const [selectedAgent, setSelectedAgent] = useState(agentsList[0]);
  const [runningAgentId, setRunningAgentId] = useState(null);
  const [isPipelineRunning, setIsPipelineRunning] = useState(false);
  const [activeWorkflowNode, setActiveWorkflowNode] = useState(null);

  const workflowNodes = [
    {
      id: "node_1",
      name: "n8n Cron Scheduler",
      type: "TRIGGER",
      detail: "09:00 AM IST Daily Cron",
      icon: "Clock",
      status: "Active"
    },
    {
      id: "node_2",
      name: "Postgres Ledger Adapter",
      type: "DATA",
      detail: "Fetch 50 txns (₹10,000 gross)",
      icon: "Database",
      status: "Connected"
    },
    {
      id: "node_3",
      name: "Deterministic Reconciler",
      type: "ENGINE",
      detail: "Calculates ₹2,340 discrepancy",
      icon: "Calculator",
      status: "Zero-LLM Math"
    },
    {
      id: "node_4",
      name: "Cognee Knowledge Graph",
      type: "MEMORY",
      detail: "30-day velocity & device checks",
      icon: "Network",
      status: "Sync"
    },
    {
      id: "node_5",
      name: "Critic Policy Guardrail",
      type: "GATE",
      detail: "6/6 Checkpoints verified",
      icon: "ShieldCheck",
      status: "Enforced"
    },
    {
      id: "node_6",
      name: "Action Branch & Dispatch",
      type: "OUTPUT",
      detail: "₹640 auto-claimed • ₹1,500 approval",
      icon: "Send",
      status: "Dispatched"
    }
  ];

  const runSingleAgent = (agent) => {
    setSelectedAgent(agent);
    setRunningAgentId(agent.id);
    setTimeout(() => {
      setRunningAgentId(null);
    }, 2000);
  };

  const handleRunFullPipeline = () => {
    if (isPipelineRunning) return;
    setIsPipelineRunning(true);
    
    // Step through each n8n workflow node sequentially
    workflowNodes.forEach((node, idx) => {
      setTimeout(() => {
        setActiveWorkflowNode(node.id);
        const correspondingAgent = agentsList[Math.min(idx, agentsList.length - 1)];
        if (correspondingAgent) {
          setSelectedAgent(correspondingAgent);
          setRunningAgentId(correspondingAgent.id);
        }
      }, idx * 750);
    });

    setTimeout(() => {
      setIsPipelineRunning(false);
      setRunningAgentId(null);
      setActiveWorkflowNode(null);
      try {
        confetti({ particleCount: 40, spread: 60, colors: ['#00B9F1', '#000000', '#ffffff'] });
      } catch (e) {}
    }, workflowNodes.length * 750 + 400);
  };

  return (
    <section id="agents" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-7">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Workflow className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              Demo Step 05: n8n Workflow & Multi-Agent Engine
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              n8n Autonomous Workflow Pipeline
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Autonomous coordination between scheduled triggers, deterministic math rules, Cognee memory graphs, and Critic safety gates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunFullPipeline}
              disabled={isPipelineRunning}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 active:scale-95 shadow-sm ${
                isPipelineRunning
                  ? 'bg-neutral-800 text-neutral-400 cursor-wait'
                  : 'electric-glow-btn text-black'
              }`}
            >
              {isPipelineRunning ? (
                <>
                  <ThinkingOrb state="working" size={14} speed={2.0} dark={true} />
                  <span>Executing Pipeline...</span>
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 fill-black text-black" />
                  <span>Execute n8n Flow</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            PROPER n8n VISUAL WORKFLOW CANVAS
           ========================================================================= */}
        <div className="my-5 p-5 rounded-2xl bg-neutral-50 dark:bg-[#070707] border-2 border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
            <div className="flex items-center gap-2 font-mono font-bold text-black dark:text-white">
              <Workflow className="w-4 h-4 text-[#00B9F1]" />
              <span>n8n Workflow Execution Graph (#WF-RESOLVE-2026)</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00B9F1]/15 text-[#008db8] dark:text-[#00B9F1] font-bold border border-[#00B9F1]/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00B9F1] animate-pulse" />
              Webhook Active
            </span>
          </div>

          {/* Node Progression Sequence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 relative">
            {workflowNodes.map((node, idx) => {
              const isActive = activeWorkflowNode === node.id;
              const isPast = isPipelineRunning && workflowNodes.findIndex(n => n.id === activeWorkflowNode) > idx;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    const ag = agentsList[Math.min(idx, agentsList.length - 1)];
                    if (ag) runSingleAgent(ag);
                  }}
                  className={`p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-[#00B9F1] bg-[#00B9F1]/20 shadow-[0_0_18px_rgba(0,185,241,0.4)] scale-105 ring-2 ring-[#00B9F1]'
                      : isPast
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-black dark:text-white'
                      : 'border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black hover:border-[#00B9F1]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-black uppercase px-1.5 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {node.type}
                      </span>
                      {isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
                      ) : isPast ? (
                        <Check className="w-3 h-3 text-emerald-500 stroke-[3]" />
                      ) : (
                        <span className="text-[9px] font-mono text-neutral-400">0{idx + 1}</span>
                      )}
                    </div>

                    <h4 className="text-xs font-black text-black dark:text-white leading-tight mb-1">
                      {node.name}
                    </h4>

                    <p className="text-[10px] text-neutral-600 dark:text-neutral-400 font-medium leading-tight">
                      {node.detail}
                    </p>
                  </div>

                  <div className="mt-2 pt-1.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[9px] font-mono font-bold text-[#008db8] dark:text-[#00B9F1]">
                    <span>{node.status}</span>
                    {idx < workflowNodes.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-neutral-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5-Agent Interactive Horizontal Cards */}
        <div className="my-4">
          <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block mb-2">
            Specialized Autonomous Teammates:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {agentsList.map((ag) => {
              const isSelected = selectedAgent.id === ag.id;
              const isRunning = runningAgentId === ag.id;

              return (
                <div
                  key={ag.id}
                  onClick={() => runSingleAgent(ag)}
                  className={`p-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isRunning
                      ? 'border-[#00B9F1] bg-[#00B9F1]/15 shadow-[0_0_15px_rgba(0,185,241,0.3)] scale-[1.02] ring-1 ring-[#00B9F1]'
                      : isSelected
                      ? 'border-[#00B9F1] bg-[#00B9F1]/10 dark:bg-neutral-900 shadow-sm'
                      : 'border-neutral-200 dark:border-neutral-800 bw-inset hover:border-[#00B9F1]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="p-1 rounded-full bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 shadow-sm">
                        <ThinkingOrb 
                          state={isRunning ? 'working' : ag.state} 
                          size={26} 
                          speed={isRunning ? 2.2 : 0.9} 
                          dark={theme === 'dark'} 
                        />
                      </div>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold">
                        {isRunning ? 'RUNNING' : ag.state}
                      </span>
                    </div>

                    <h4 className="text-xs font-black text-black dark:text-white mb-0.5">
                      {ag.name}
                    </h4>
                    <p className="text-[10px] text-[#008db8] dark:text-[#00B9F1] font-bold leading-tight mb-1">
                      {ag.role}
                    </p>
                  </div>

                  <div className="pt-1.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[9px] font-bold text-neutral-500">
                    <span className="truncate">{isRunning ? 'Processing...' : ag.status}</span>
                    <Play className="w-2.5 h-2.5 text-[#00B9F1]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Agent Telemetry & Log Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-2">
          
          {/* Left: Agent Specs */}
          <div className="lg:col-span-5 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="p-1.5 rounded-full bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 shadow-sm">
                <ThinkingOrb 
                  state={runningAgentId === selectedAgent.id ? "working" : selectedAgent.state} 
                  size={38} 
                  speed={runningAgentId === selectedAgent.id ? 2.2 : 1.0} 
                  dark={theme === 'dark'} 
                />
              </div>
              <div>
                <h3 className="text-sm font-black text-black dark:text-white">{selectedAgent.name}</h3>
                <span className="text-xs text-[#008db8] dark:text-[#00B9F1] font-bold">{selectedAgent.role}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium mb-3 leading-snug">
              {selectedAgent.description}
            </p>

            <div>
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-wider block mb-1">
                Equipped Tools:
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedAgent.tools.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md bg-[#00B9F1]/15 text-black dark:bg-neutral-800 dark:text-[#00B9F1] border border-[#00B9F1]/30 dark:border-neutral-700 text-[10px] font-mono font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Live Execution Log Terminal */}
          <div className="lg:col-span-7 rounded-2xl p-4 bg-neutral-950 dark:bg-black border-2 border-neutral-800 shadow-inner font-mono text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-800 mb-2 text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span className="font-bold text-white text-xs">n8n Execution Stream: {selectedAgent.name}</span>
              </div>
              <span className="text-[10px] text-[#00B9F1] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00B9F1] animate-pulse" />
                Live Node Webhook
              </span>
            </div>

            <div className="space-y-1 text-neutral-200 max-h-32 overflow-y-auto pr-1 text-[11px] font-medium">
              {selectedAgent.logs.map((log, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span className="text-[#00B9F1] shrink-0 font-bold">{`>`}</span>
                  <span className="leading-tight">{log}</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 text-[#00B9F1] pt-0.5 font-bold">
                <span>{`>`}</span>
                <span className="animate-pulse">
                  {runningAgentId === selectedAgent.id ? `Executing ${selectedAgent.name} node payload...` : 'Listening for scheduled n8n triggers (09:00 IST)...'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
