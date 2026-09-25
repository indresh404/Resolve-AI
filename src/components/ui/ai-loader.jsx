import * as React from "react";

export const AILoader = ({ 
  size = 180, 
  text = "Listening...",
  isModal = true,
  onClose,
  subtext = "Sarvam Indic Voice Engine • Hindi / Marathi / English"
}) => {
  const letters = text.split("");

  const content = (
    <div className="flex flex-col items-center justify-center p-6 text-center select-none">
      {/* Animated Orb Ring Container */}
      <div
        className="relative flex items-center justify-center font-inter select-none my-4"
        style={{ width: size, height: size }}
      >
        {/* Animated Spelled Letters */}
        <div className="flex items-center justify-center tracking-wider font-black text-sm sm:text-base z-10">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block text-black dark:text-[#00B9F1] opacity-70 animate-loaderLetter font-mono font-black"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </div>

        {/* Outer Pulsing Kinetic Glow Ring */}
        <div className="absolute inset-0 rounded-full animate-loaderCircle pointer-events-none" />
        
        {/* Inner Subtle Breathing Core */}
        <div className="absolute w-2/3 h-2/3 rounded-full bg-[#00B9F1]/10 border border-[#00B9F1]/30 animate-pulse pointer-events-none" />
      </div>

      {subtext && (
        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-medium max-w-xs mt-2 animate-pulse">
          {subtext}
        </p>
      )}

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 px-4 py-1.5 rounded-full bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-black dark:text-white text-xs font-bold transition-all"
        >
          Cancel
        </button>
      )}
    </div>
  );

  if (!isModal) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#0a0a0a] border-2 border-[#00B9F1]/40 shadow-[0_0_50px_rgba(0,185,241,0.25)] max-w-sm w-full mx-4 relative">
        {content}
      </div>
    </div>
  );
};

export const Component = AILoader;
export default AILoader;
