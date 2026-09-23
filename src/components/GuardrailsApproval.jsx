import React, { useState } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Check, 
  X, 
  CheckCircle2, 
  FileCheck2, 
  Share2 
} from 'lucide-react';
import { approvalTasks } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function GuardrailsApproval({ theme, onOpenWhatsAppModal }) {
  const [tasks, setTasks] = useState(approvalTasks);
  const [filter, setFilter] = useState('ALL');

  const handleAction = (id, status) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, status } : t))
    );
    if (status === 'APPROVED') {
      try {
        confetti({ particleCount: 40, spread: 60, colors: ['#00B9F1', '#000000', '#ffffff'] });
      } catch (e) {}
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'WAITING_APPROVAL') return t.status === 'WAITING_APPROVAL' || t.status === 'READY';
    if (filter === 'RESOLVED') return t.status === 'APPROVED' || t.status === 'REJECTED' || t.status === 'AUTO_RESOLVED';
    return true;
  });

  return (
    <section id="guardrails" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <ShieldCheck className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              HITL Guardrails
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Action Approval Queue
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Low-risk actions auto-execute; high-risk actions pause for 1-tap merchant approval.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 bw-inset p-1 rounded-xl text-xs border border-neutral-300 dark:border-neutral-800">
            {['ALL', 'WAITING_APPROVAL', 'RESOLVED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg font-bold transition-all text-xs ${
                  filter === f
                    ? 'bg-[#00B9F1] text-black font-black shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {f === 'ALL' ? 'All' : f === 'WAITING_APPROVAL' ? 'Pending' : 'Done'}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Risk Tier Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 my-4">
          <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-xs">
            <div className="font-bold text-black dark:text-white flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00B9F1]" />
              Low Risk (&lt; ₹1,000)
            </div>
            <p className="text-neutral-500 text-[11px] font-medium leading-snug">
              Auto-dispatched directly to gateway API via n8n.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800 text-xs">
            <div className="font-bold text-black dark:text-white flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00B9F1]" />
              Medium Risk (₹1,000 - ₹5,000)
            </div>
            <p className="text-neutral-500 text-[11px] font-medium leading-snug">
              Critic screens UPI checksum & customer history.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-white dark:bg-black border border-[#00B9F1] text-xs">
            <div className="font-bold text-[#00B9F1] flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-[#00B9F1] animate-ping" />
              High Risk (&gt; ₹5,000)
            </div>
            <p className="text-neutral-500 text-[11px] font-medium leading-snug">
              Pauses in n8n until merchant gives 1-tap approval.
            </p>
          </div>
        </div>

        {/* Task Approval Cards List */}
        <div className="space-y-2.5">
          {filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border-2 transition-all ${
                task.status === 'WAITING_APPROVAL'
                  ? 'border-[#00B9F1] bw-inset shadow-[0_0_12px_rgba(0,185,241,0.15)]'
                  : 'border-neutral-200 dark:border-neutral-800 bw-inset'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                
                {/* Left Task Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-neutral-400">{task.id}</span>
                    <h4 className="text-sm font-black text-black dark:text-white">{task.title}</h4>
                    <span
                      className={`text-[10px] font-black px-2 py-0.2 rounded-full ${
                        task.risk === 'HIGH'
                          ? 'bg-[#00B9F1] text-black'
                          : 'bg-neutral-200 dark:bg-neutral-800 text-black dark:text-neutral-200'
                      }`}
                    >
                      {task.risk}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 font-medium">
                    <strong className="text-black dark:text-white">{task.customer}</strong> • {task.reason}
                  </p>

                  <div className="text-[11px] text-[#00B9F1] font-bold">
                    {task.graphNote}
                  </div>
                </div>

                {/* Right: Amount & Actions */}
                <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                  <div className="text-right">
                    <div className="text-base sm:text-lg font-black text-black dark:text-white">
                      ₹{task.amount.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Decision Controls */}
                  {task.status === 'WAITING_APPROVAL' ? (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleAction(task.id, 'APPROVED')}
                        className="py-1.5 px-3 rounded-lg electric-glow-btn text-black font-black text-xs flex items-center gap-1 active:scale-95"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleAction(task.id, 'REJECTED')}
                        className="py-1.5 px-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-black dark:text-white font-bold text-xs transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  ) : task.status === 'READY' ? (
                    <button
                      onClick={onOpenWhatsAppModal}
                      className="py-1.5 px-3 rounded-lg bg-white hover:bg-neutral-100 text-black dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold text-xs flex items-center gap-1 transition-all active:scale-95 border border-neutral-300 dark:border-white shadow-sm"
                    >
                      <Share2 className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
                      <span>WhatsApp Link</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-[#00B9F1] flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {task.status === 'APPROVED' ? 'Approved' : 'Resolved'}
                    </span>
                  )}

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
