import React from 'react';

export const KineticLoader = ({ 
  size = 32, 
  text, 
  className = "" 
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div 
        className="kinetic-loader"
        style={{ width: size, height: size }}
      >
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      {text && (
        <span className="text-xs font-mono font-black text-black dark:text-[#00B9F1] animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

export default KineticLoader;
