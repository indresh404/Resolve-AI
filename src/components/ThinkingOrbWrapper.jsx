import React from 'react';
import { ThinkingOrb as OrgThinkingOrb } from 'thinking-orbs';

/**
 * Official Libraries.dev ThinkingOrb Adapter
 * 
 * Props supported:
 * - state: "working" | "searching" | "solving" | "listening" | "connecting" | "weaving" | "composing" | "breathing" | "shaping"
 * - size: 64 (avatar) or 20 (inline) or custom numeric size (auto-scaled)
 * - speed: multiplier for animation clock (default: 1)
 * - dark: boolean | "dark" | "light" | "auto"
 * - paused: boolean
 * - color: custom color tint (optional)
 */
export function ThinkingOrb({
  state = 'working',
  size = 64,
  speed = 1,
  dark = true,
  theme,
  paused = false,
  color,
  className = '',
  style = {},
}) {
  // Translate dark boolean to the library's theme prop ("dark" | "light" | "auto")
  const resolvedTheme = theme || (typeof dark === 'boolean' ? (dark ? 'dark' : 'light') : 'auto');

  // The official library is tuned specifically for 64 (chat avatar) and 20 (inline text).
  const nativeSize = size >= 40 ? 64 : 20;
  const scale = size / nativeSize;

  if (Math.abs(scale - 1) > 0.05) {
    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 select-none pointer-events-none ${className}`}
        style={{
          width: size,
          height: size,
          overflow: 'hidden',
          ...style,
        }}
        title={`ThinkingOrb (${state})`}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center center',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <OrgThinkingOrb
            state={state}
            size={nativeSize}
            theme={resolvedTheme}
            speed={speed}
            paused={paused}
            color={color}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none pointer-events-none ${className}`}
      style={{ width: size, height: size, ...style }}
      title={`ThinkingOrb (${state})`}
    >
      <OrgThinkingOrb
        state={state}
        size={nativeSize}
        theme={resolvedTheme}
        speed={speed}
        paused={paused}
        color={color}
      />
    </div>
  );
}

export default ThinkingOrb;
