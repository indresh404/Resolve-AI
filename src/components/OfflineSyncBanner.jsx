import React from 'react';
import { WifiOff, RefreshCw, Database, CheckCircle2 } from 'lucide-react';

export default function OfflineSyncBanner({ isOffline, onSyncNow }) {
  if (!isOffline) return null;

  return (
    <div className="bg-amber-500/10 text-black dark:text-white px-4 py-2.5 text-xs font-black shadow-lg border-b-2 border-amber-500 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <WifiOff className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>
            <strong className="text-amber-600 dark:text-amber-400">Offline Mode Active:</strong> Shop internet is offline. Rule-based detection & disputes are queued locally (IndexedDB/Postgres).
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-amber-600 dark:text-amber-400 font-mono text-[11px] font-bold">
            3 Actions Pending Sync
          </span>
          <button
            onClick={onSyncNow}
            className="px-3 py-1 rounded-lg bg-black text-white dark:bg-white dark:text-black font-black hover:bg-neutral-800 dark:hover:bg-neutral-200 flex items-center gap-1.5 transition-all text-xs active:scale-95"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Simulate Reconnect</span>
          </button>
        </div>
      </div>
    </div>
  );
}
