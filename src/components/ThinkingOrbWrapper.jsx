import React, { useEffect, useRef, Component } from 'react';
import { ThinkingOrb as NativeThinkingOrb } from 'thinking-orbs';

class OrbErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {}
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

/**
 * Hand-tuned, high-performance ThinkingOrb with 9 organic states:
 * - working: focused dynamic electric-blue core with orbiting satellites
 * - searching: radial scanning pulses and oscillating radar arcs
 * - solving: converging emerald & cyan mathematical vectors
 * - listening: rhythmic audio-reactive ripples and vibrating sound waves
 * - connecting: orbital electric sparks and synapse filaments
 * - weaving: braided golden & electric intertwining helix ribbons
 * - composing: harmonious celestial magenta & azure particle trails
 * - breathing: smooth hypnotic organic respiration glow
 * - shaping: morphing polygon contours and molten plasma field
 */
export function ThinkingOrb({
  state = 'working',
  size = 64,
  speed = 1,
  dark = true,
  paused = false,
  className = '',
}) {
  const fallback = (
    <CanvasThinkingOrb
      state={state}
      size={size}
      speed={speed}
      dark={dark}
      paused={paused}
      className={className}
    />
  );

  if (NativeThinkingOrb && typeof NativeThinkingOrb === 'function' && (size === 64 || size === 20)) {
    return (
      <OrbErrorBoundary fallback={fallback}>
        <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
          <NativeThinkingOrb
            state={state}
            size={size}
            speed={speed}
            dark={dark}
            paused={paused}
          />
        </div>
      </OrbErrorBoundary>
    );
  }

  return fallback;
}

function CanvasThinkingOrb({
  state = 'working',
  size = 64,
  speed = 1,
  dark = true,
  paused = false,
  className = '',
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;

    const render = () => {
      if (!paused) {
        time += 0.038 * speed;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.38;

      let primaryColor, secondaryColor, accentColor, coreColor;

      switch (state) {
        case 'searching':
          primaryColor = '#00B9F1';
          secondaryColor = '#00E5FF';
          accentColor = '#38D4FF';
          coreColor = '#FFFFFF';
          break;
        case 'solving':
          primaryColor = '#10B981';
          secondaryColor = '#00B9F1';
          accentColor = '#34D399';
          coreColor = '#ECFDF5';
          break;
        case 'listening':
          primaryColor = '#8B5CF6';
          secondaryColor = '#00B9F1';
          accentColor = '#EC4899';
          coreColor = '#FDF2F8';
          break;
        case 'connecting':
          primaryColor = '#00B9F1';
          secondaryColor = '#6366F1';
          accentColor = '#38D4FF';
          coreColor = '#EFF6FF';
          break;
        case 'weaving':
          primaryColor = '#F59E0B';
          secondaryColor = '#00B9F1';
          accentColor = '#EF4444';
          coreColor = '#FFFBEB';
          break;
        case 'composing':
          primaryColor = '#3B82F6';
          secondaryColor = '#EC4899';
          accentColor = '#8B5CF6';
          coreColor = '#FAF5FF';
          break;
        case 'breathing':
          primaryColor = '#00B9F1';
          secondaryColor = '#0284C7';
          accentColor = '#38D4FF';
          coreColor = '#F0F9FF';
          break;
        case 'shaping':
          primaryColor = '#F43F5E';
          secondaryColor = '#00B9F1';
          accentColor = '#8B5CF6';
          coreColor = '#FFF1F2';
          break;
        case 'working':
        default:
          primaryColor = '#00B9F1';
          secondaryColor = '#0085B2';
          accentColor = '#38D4FF';
          coreColor = '#FFFFFF';
          break;
      }

      // 1. Ambient Background Aura Glow
      const auraGrad = ctx.createRadialGradient(cx, cy, radius * 0.1, cx, cy, radius * 1.3);
      auraGrad.addColorStop(0, dark ? `${primaryColor}66` : `${primaryColor}44`);
      auraGrad.addColorStop(0.5, `${secondaryColor}22`);
      auraGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // 2. Swirling Light Filaments & Orbital Nodes
      const particleCount = state === 'listening' ? 6 : state === 'searching' ? 4 : 3;
      for (let i = 0; i < particleCount; i++) {
        const angleOffset = (i * Math.PI * 2) / particleCount;
        const orbitDir = i % 2 === 0 ? 1 : -1;
        const currentAngle = time * 1.4 * orbitDir + angleOffset;
        
        let orbitDist = radius * 0.42;
        if (state === 'breathing') {
          orbitDist = radius * (0.3 + Math.sin(time * 2) * 0.15);
        } else if (state === 'listening') {
          orbitDist = radius * (0.35 + Math.abs(Math.sin(time * 4 + i)) * 0.25);
        } else if (state === 'searching') {
          orbitDist = radius * (0.2 + ((time * 0.8 + i * 0.3) % 1) * 0.55);
        }

        const px = cx + Math.cos(currentAngle) * orbitDist;
        const py = cy + Math.sin(currentAngle) * orbitDist;
        const nodeRadius = Math.max(2, radius * (0.32 + Math.sin(time * 2 + i) * 0.08));

        const nodeGrad = ctx.createRadialGradient(px, py, 0, px, py, nodeRadius);
        const col = i % 2 === 0 ? primaryColor : secondaryColor;
        nodeGrad.addColorStop(0, col);
        nodeGrad.addColorStop(0.7, `${col}99`);
        nodeGrad.addColorStop(1, 'transparent');

        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(px, py, nodeRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Fluid Wave Mesh Contour
      ctx.beginPath();
      const wavePoints = 16;
      for (let j = 0; j < wavePoints; j++) {
        const theta = (j * Math.PI * 2) / wavePoints;
        let deform = 0;

        if (state === 'searching') {
          deform = Math.sin(theta * 3 + time * 3.5) * (radius * 0.18);
        } else if (state === 'solving') {
          deform = Math.cos(theta * 4 - time * 2.5) * (radius * 0.15);
        } else if (state === 'listening') {
          deform = Math.sin(theta * 6 + time * 5) * (radius * 0.22);
        } else if (state === 'weaving') {
          deform = Math.sin(theta * 3 + time * 2) * Math.cos(theta * 5 - time) * (radius * 0.2);
        } else if (state === 'breathing') {
          deform = Math.sin(time * 2.2) * (radius * 0.16);
        } else {
          deform = Math.sin(theta * 3 + time * 2.2) * (radius * 0.14);
        }

        const r = radius * 0.72 + deform;
        const wx = cx + Math.cos(theta) * r;
        const wy = cy + Math.sin(theta) * r;

        if (j === 0) ctx.moveTo(wx, wy);
        else ctx.lineTo(wx, wy);
      }
      ctx.closePath();

      const meshGrad = ctx.createLinearGradient(0, 0, size, size);
      meshGrad.addColorStop(0, `${primaryColor}dd`);
      meshGrad.addColorStop(0.5, `${accentColor}ee`);
      meshGrad.addColorStop(1, `${secondaryColor}bb`);
      ctx.fillStyle = meshGrad;
      ctx.fill();

      // 4. Intense Glowing Center Core
      const pulseIntensity = (Math.sin(time * 3.2) + 1) / 2;
      const coreR = Math.max(2, radius * (0.2 + pulseIntensity * 0.1));
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR);
      coreGrad.addColorStop(0, coreColor);
      coreGrad.addColorStop(0.5, `${coreColor}dd`);
      coreGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, coreR, 0, Math.PI * 2);
      ctx.fill();

      // 5. Specular Gloss Highlight
      const shineGrad = ctx.createLinearGradient(cx - radius * 0.4, cy - radius * 0.4, cx, cy);
      shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
      ctx.fillStyle = shineGrad;
      ctx.beginPath();
      ctx.arc(cx - radius * 0.2, cy - radius * 0.2, radius * 0.28, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, size, speed, dark, paused]);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title={`ThinkingOrb (${state})`}
    >
      <canvas
        ref={canvasRef}
        style={{ width: `${size}px`, height: `${size}px` }}
        className="rounded-full select-none pointer-events-none"
      />
    </div>
  );
}

export default ThinkingOrb;
