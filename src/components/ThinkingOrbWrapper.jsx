import React, { Component } from 'react';
import { ThinkingOrb as OrgThinkingOrb } from 'thinking-orbs';

const VALID_STATES = [
  'working',
  'searching',
  'solving',
  'listening',
  'connecting',
  'weaving',
  'composing',
  'breathing',
  'shaping'
];

const STATE_MAPPINGS = {
  'solved': 'solving',
  'idle': 'breathing',
  'active': 'working',
  'running': 'working',
  'success': 'solving',
  'ready': 'breathing',
  'waiting': 'listening',
  'evaluating': 'shaping'
};

class OrbErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("ThinkingOrb render error suppressed:", error);
  }

  render() {
    if (this.state.hasError) {
      // Elegant fallback pulsing dot with electric blue glow
      return (
        <span className="w-3 h-3 rounded-full bg-[#00B9F1] inline-block animate-pulse shadow-[0_0_8px_#00B9F1]" />
      );
    }
    return this.props.children;
  }
}

/**
 * Official Libraries.dev ThinkingOrb Adapter with full safety normalization
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
  // Normalize state to valid library preset
  let normalizedState = (typeof state === 'string' ? state.toLowerCase() : 'working');
  if (STATE_MAPPINGS[normalizedState]) {
    normalizedState = STATE_MAPPINGS[normalizedState];
  }
  if (!VALID_STATES.includes(normalizedState)) {
    normalizedState = 'working';
  }

  // Translate dark boolean to the library's theme prop ("dark" | "light" | "auto")
  const resolvedTheme = theme || (typeof dark === 'boolean' ? (dark ? 'dark' : 'light') : 'auto');

  // The official library is tuned specifically for 64 (chat avatar) and 20 (inline text).
  const nativeSize = size >= 40 ? 64 : 20;
  const scale = size / nativeSize;

  return (
    <OrbErrorBoundary>
      {Math.abs(scale - 1) > 0.05 ? (
        <div
          className={`relative inline-flex items-center justify-center shrink-0 select-none pointer-events-none ${className}`}
          style={{
            width: size,
            height: size,
            overflow: 'hidden',
            ...style,
          }}
          title={`ThinkingOrb (${normalizedState})`}
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
              state={normalizedState}
              size={nativeSize}
              theme={resolvedTheme}
              speed={speed}
              paused={paused}
              color={color}
            />
          </div>
        </div>
      ) : (
        <div
          className={`relative inline-flex items-center justify-center shrink-0 select-none pointer-events-none ${className}`}
          style={{ width: size, height: size, ...style }}
          title={`ThinkingOrb (${normalizedState})`}
        >
          <OrgThinkingOrb
            state={normalizedState}
            size={nativeSize}
            theme={resolvedTheme}
            speed={speed}
            paused={paused}
            color={color}
          />
        </div>
      )}
    </OrbErrorBoundary>
  );
}

export default ThinkingOrb;
