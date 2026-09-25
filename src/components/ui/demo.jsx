import React from 'react';
import { Component as AILoader } from "@/components/ui/ai-loader";
import KineticLoader from "@/components/ui/kinetic-orb-loader";

export default function DemoOne() {
  return (
    <div className="flex flex-col items-center justify-center p-8 gap-6 bg-black text-white min-h-[300px] rounded-2xl">
      <div className="text-center">
        <h3 className="text-base font-black text-[#00B9F1]">Kinetic Loader</h3>
        <KineticLoader size={36} text="Listening..." />
      </div>

      <div className="w-full max-w-sm">
        <AILoader isModal={false} size={150} text="Listening..." />
      </div>
    </div>
  );
}
