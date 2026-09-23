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
  Layers 
} from 'lucide-react';
import { sampleSettlementData } from '../data/mockData';

export default function SettlementBreakdown({ theme, onOpenDisputeModal }) {
  const [selectedItem, setSelectedItem] = useState(sampleSettlementData.items[0]);

  return (
    <section id="settlement" className="py-3 px-4 max-w-5xl mx-auto w-full">
      <div className="bw-card p-5 sm:p-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-black text-[#00B9F1] dark:bg-white dark:text-black text-xs font-black uppercase tracking-wider mb-1.5 border border-[#00B9F1]/40">
              <Calculator className="w-3.5 h-3.5" />
              Deterministic Rule Engine
            </div>
            <h2 className="text-2xl font-black text-black dark:text-white">
              Settlement Mismatch Attribution
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-0.5 max-w-xl font-medium">
              Traces every single rupee of difference using rules; files automatic claims.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-xl bw-inset text-right border border-neutral-300 dark:border-neutral-800">
              <div className="text-[10px] text-neutral-500 font-bold">
                Settlement ID: {sampleSettlementData.settlementId}
              </div>
              <div className="text-xs font-mono text-black dark:text-[#00B9F1] font-bold">
                UTR: {sampleSettlementData.utrNumber.slice(0, 14)}...
              </div>
            </div>
          </div>
        </div>

        {/* Settlement Math Headline Card */}
        <div className="my-5 p-4 bw-inset border-2 border-neutral-300 dark:border-neutral-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center md:text-left">
            
            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Gross (50 txns)</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.grossAmount.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Expected</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.expectedSettlement.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
              <div className="text-[11px] text-neutral-500 font-bold">Actual Credit</div>
              <div className="text-lg sm:text-xl font-black text-black dark:text-white mt-0.5">
                ₹{sampleSettlementData.actualSettlement.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#00B9F1]/15 text-black dark:bg-white dark:text-black border-2 border-[#00B9F1] dark:border-white">
              <div className="text-[11px] font-black flex items-center gap-1 justify-center md:justify-start">
                <ArrowDownRight className="w-3.5 h-3.5 text-[#008db8] dark:text-black" />
                <span>Detected Gap</span>
              </div>
              <div className="text-xl sm:text-2xl font-black mt-0.5 text-black dark:text-black">
                -₹{sampleSettlementData.totalMismatch.toLocaleString('en-IN')}
              </div>
            </div>

          </div>
        </div>

        {/* 3 Root Causes List & Deep Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Left: 3 Discrepancy Cards */}
          <div className="lg:col-span-7 space-y-2.5">
            <h3 className="text-xs font-black text-neutral-500 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <Layers className="w-3.5 h-3.5 text-[#00B9F1]" />
              <span>3 Root Causes (₹2,340 Total)</span>
            </h3>

            {sampleSettlementData.items.map((item) => {
              const isSelected = selectedItem.id === item.id;
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
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center">
                        <ThinkingOrb 
                          state={item.type === 'HELD_REFUND' ? 'searching' : item.type === 'FAILED_DEBIT' ? 'working' : 'solving'} 
                          size={20} 
                          dark={theme === 'dark'} 
                        />
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs sm:text-sm font-black text-black dark:text-white">{item.title}</h4>
                          <span className="text-[10px] font-black px-2 py-0.2 rounded-full bg-[#00B9F1] text-black">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-sm sm:text-base font-black text-black dark:text-white">
                        ₹{item.amount.toLocaleString('en-IN')}
                      </div>
                      <span className="text-[10px] font-mono text-[#008db8] dark:text-[#00B9F1] font-bold">
                        {item.riskLevel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Selected Cause Deep Inspector & Evidence */}
          <div className="lg:col-span-5 bw-inset p-4 border border-neutral-300 dark:border-neutral-800">
            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200 dark:border-neutral-800 mb-2.5">
              <div className="flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-[#00B9F1]" />
                <span className="text-xs font-black text-black dark:text-white uppercase tracking-wider">
                  Automated Evidence
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#00B9F1] font-bold">
                {selectedItem.id}
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <span className="text-neutral-500 font-bold block text-[11px]">Issue:</span>
                <span className="font-black text-black dark:text-white text-xs sm:text-sm">{selectedItem.title}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-black border border-neutral-300 dark:border-neutral-800">
                <span className="text-[10px] font-mono text-[#00B9F1] font-bold block mb-0.5">
                  Deterministic Rule:
                </span>
                <code className="text-[11px] text-black dark:text-white font-mono break-all font-bold">
                  {selectedItem.ruleTriggered}
                </code>
              </div>

              <div>
                <span className="text-neutral-500 font-bold block text-[11px]">Action Taken:</span>
                <p className="text-neutral-800 dark:text-neutral-200 leading-snug bg-white dark:bg-black p-2 rounded-xl border border-neutral-300 dark:border-neutral-800 font-medium text-[11px]">
                  {selectedItem.actionTaken}
                </p>
              </div>

              <div className="pt-1.5 flex items-center justify-between text-[10px] text-neutral-500 font-bold">
                <span className="flex items-center gap-1 text-[#00B9F1]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Dispute Dispatched
                </span>
                <span className="font-mono">{selectedItem.time}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
