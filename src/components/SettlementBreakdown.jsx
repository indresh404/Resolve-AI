import React, { useState } from 'react';
import { ThinkingOrb } from './ThinkingOrbWrapper';
import { 
  Calculator, 
  Receipt, 
  ShieldAlert, 
  RefreshCw, 
  CheckCircle2, 
  ArrowDownRight, 
  FileCheck2, 
  Layers,
  Sparkles,
  Radio,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Check
} from 'lucide-react';
import { sampleSettlementData } from '../data/mockData';
import confetti from 'canvas-confetti';

export default function SettlementBreakdown({ theme, onOpenDisputeModal }) {
  const [items, setItems] = useState(sampleSettlementData.items);
  const [selectedItem, setSelectedItem] = useState(sampleSettlementData.items[1]); // Default to ₹640 auto-claim
  const [recoveredTotal, setRecoveredTotal] = useState(640);
  const [lastRecoveredMsg, setLastRecoveredMsg] = useState(null);

  // Transition state: DISPUTE_FILED -> CLAIM_SUBMITTED -> RECOVERED
  const handleAdvanceRecovery = (id) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        let nextState = item.state;
        if (item.state === 'DISPUTE_FILED') nextState = 'CLAIM_SUBMITTED';
        else if (item.state === 'CLAIM_SUBMITTED') {
          nextState = 'RECOVERED';
          setRecoveredTotal(r => r + item.amount);
          setLastRecoveredMsg(`₹${item.amount.toLocaleString('en-IN')} recovered into HDFC Bank Account!`);
          try {
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.7 },
              colors: ['#00B9F1', '#002E6E', '#FFFFFF']
            });
          } catch (e) {}
          if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utt = new SpeechSynthesisUtterance(`Paytm Soundbox alert: Khate me ${item.amount} rupaye prapt hue.`);
            window.speechSynthesis.speak(utt);
          }
        }
        const updated = { ...item, state: nextState };
        if (selectedItem.id === id) setSelectedItem(updated);
        return updated;
      }
      return item;
    }));
  };

  return (
    <section id="settlement" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#00B9F1]/15 text-[#007da8] dark:bg-[#00B9F1]/20 dark:text-[#00B9F1] text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/30">
              <Calculator className="w-3.5 h-3.5 text-[#008db8] dark:text-[#00B9F1]" />
              Step 3: Reconciler Engine
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Settlement Mismatch & Recovery Lifecycle
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Deterministic rule engine computes expected settlement, traces every rupee of difference, and tracks cases until funds actually land.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bw-inset text-right border border-neutral-300 dark:border-neutral-800">
              <div className="text-[10px] text-neutral-500 font-bold">
                Settlement ID: {sampleSettlementData.settlementId}
              </div>
              <div className="text-xs font-mono text-black dark:text-[#00B9F1] font-bold">
                UTR: {sampleSettlementData.utrNumber.slice(0, 16)}...
              </div>
            </div>
          </div>
        </div>

        {/* Deterministic Accounting Formula Visualizer */}
        <div className="my-4 p-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-xs font-mono">
          <div className="flex items-center justify-between text-neutral-500 text-[10px] font-bold uppercase tracking-wider mb-1">
            <span>Deterministic Accounting Model (Zero LLM Hallucination for Money)</span>
            <span className="text-[#008db8] dark:text-[#00B9F1]">Paytm Settlement Formula</span>
          </div>
          <div className="text-neutral-800 dark:text-neutral-200 font-bold leading-relaxed break-words text-[11px]">
            <span className="text-[#008db8] dark:text-[#00B9F1]">expected_settlement</span> = gross_txns (₹10,000) - settled_refunds (₹0) - applicable_fees (₹200) = <strong className="text-black dark:text-white">₹9,800</strong>
          </div>
          <div className="text-neutral-800 dark:text-neutral-200 font-bold leading-relaxed break-words text-[11px] mt-0.5">
            <span className="text-red-500 dark:text-red-400">gap</span> = expected_settlement (₹9,800) - actual_net_received (₹7,460) = <strong className="text-red-600 dark:text-red-400">₹2,340</strong>
          </div>
        </div>

        {/* Settlement Math Headline Card */}
        <div className="my-4 p-4 bw-inset border-2 border-neutral-300 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center md:text-left">
            
            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Gross (50 txns)</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.grossAmount.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">All success POS txns</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Expected Net</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.expectedSettlement.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">Less fee & settled ref</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Bank Credit (HDFC)</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.actualSettlement.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">Actual UTR deposit</span>
            </div>

            <div className="p-3 rounded-xl bg-[#00B9F1]/15 text-black dark:bg-white dark:text-black border-2 border-[#00B9F1] dark:border-white">
              <div className="text-[11px] font-black flex items-center gap-1 justify-center md:justify-start">
                <ArrowDownRight className="w-3.5 h-3.5 text-[#008db8] dark:text-black" />
                <span>Detected Gap</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-0.5 text-black dark:text-black">
                -₹{sampleSettlementData.totalMismatch.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] font-bold text-[#008db8] dark:text-black/80">
                100% Traced by Rules
              </span>
            </div>

          </div>
        </div>

        {/* 3 Root Causes & Deep Inspector with State Machine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: 3 Discrepancy Breakdown Cards */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-black text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span>3 Attributed Causes (₹2,340 Total)</span>
              </h3>
              <span className="text-[10px] text-neutral-400 font-mono">
                Click any case to inspect
              </span>
            </div>

            {items.map((item) => {
              const isSelected = selectedItem.id === item.id;
              const isRecovered = item.state === 'RECOVERED';
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#00B9F1] bg-[#00B9F1]/10 dark:bg-neutral-900 shadow-[0_0_15px_rgba(0,185,241,0.25)] ring-1 ring-[#00B9F1]'
                      : 'border-neutral-200 dark:border-neutral-800 bw-inset hover:border-[#00B9F1]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 flex-1">
                      <div className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center shrink-0 mt-0.5">
                        <ThinkingOrb 
                          state={isRecovered ? 'solved' : item.type === 'HELD_REFUND' ? 'searching' : item.type === 'FAILED_DEBIT' ? 'working' : 'weaving'} 
                          size={22} 
                          dark={theme === 'dark'} 
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-black dark:text-white truncate">
                            {item.title}
                          </h4>
                          <span className={`text-[10px] font-black px-2 py-0.2 rounded-full border ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium mt-0.5 line-clamp-2">
                          {item.description}
                        </p>

                        {/* State indicator chip */}
                        <div className="mt-2 flex items-center gap-1.5 text-[10px] font-mono font-bold">
                          <span className="text-neutral-400">Status:</span>
                          <span className={`px-2 py-0.5 rounded-md ${
                            item.state === 'RECOVERED'
                              ? 'bg-emerald-500 text-black font-black'
                              : item.state === 'CLAIM_SUBMITTED'
                              ? 'bg-[#00B9F1]/20 text-[#008db8] dark:text-[#00B9F1] border border-[#00B9F1]/40'
                              : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}>
                            {item.state}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm sm:text-base font-black text-black dark:text-white">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] font-mono text-[#008db8] dark:text-[#00B9F1] font-bold block">
                        {item.riskBand}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Cause Deep Inspector & Recovery Tracker */}
          <div className="lg:col-span-5 bw-inset p-4 border border-neutral-300 dark:border-neutral-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200 dark:border-neutral-800 mb-2.5">
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#00B9F1]" />
                  <span className="text-xs font-black text-black dark:text-white uppercase tracking-wider">
                    Evidence & Recovery State
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#00B9F1] font-bold">
                  {selectedItem.txnId}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="text-neutral-500 font-bold block text-[11px]">Selected Issue:</span>
                  <span className="font-black text-black dark:text-white text-xs sm:text-sm">
                    {selectedItem.title} (₹{selectedItem.amount})
                  </span>
                </div>

                {/* Evidence Box */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
                  <span className="text-[10px] font-mono text-[#00B9F1] font-bold block mb-0.5">
                    Transaction-Level Evidence:
                  </span>
                  <p className="text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
                    {selectedItem.evidence}
                  </p>
                </div>

                {/* Rule Triggered */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
                  <span className="text-[10px] font-mono text-neutral-400 font-bold block mb-0.5">
                    Accounting Rule Trigger:
                  </span>
                  <code className="text-[10px] text-black dark:text-white font-mono break-all font-bold">
                    {selectedItem.ruleTriggered}
                  </code>
                </div>

                {/* 3-State Recovery Lifecycle Track */}
                <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                    Case Lifecycle State Machine:
                  </span>
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${selectedItem.state === 'DISPUTE_FILED' ? 'bg-[#00B9F1] text-black' : 'text-neutral-400'}`}>
                      FILED
                    </span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <span className={`px-2 py-0.5 rounded font-bold ${selectedItem.state === 'CLAIM_SUBMITTED' ? 'bg-[#00B9F1] text-black' : 'text-neutral-400'}`}>
                      SUBMITTED
                    </span>
                    <ArrowRight className="w-3 h-3 text-neutral-400" />
                    <span className={`px-2 py-0.5 rounded font-bold ${selectedItem.state === 'RECOVERED' ? 'bg-emerald-500 text-black font-black' : 'text-neutral-400'}`}>
                      RECOVERED
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Action: Advance State / Soundbox Announcement */}
            <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
              {selectedItem.state !== 'RECOVERED' ? (
                <button
                  onClick={() => handleAdvanceRecovery(selectedItem.id)}
                  className="w-full py-2 px-3 rounded-xl electric-glow-btn text-black font-black text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>
                    {selectedItem.state === 'DISPUTE_FILED' 
                      ? 'Submit Dispute to Gateway (CLAIM_SUBMITTED)' 
                      : 'Poll Status & Mark RECOVERED (Soundbox Chime)'}
                  </span>
                </button>
              ) : (
                <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Money Officially RECOVERED!</span>
                  </span>
                  <button
                    onClick={onOpenDisputeModal}
                    className="underline text-[11px] hover:text-white"
                  >
                    Replay Soundbox
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
