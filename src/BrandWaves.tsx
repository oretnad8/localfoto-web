'use client';

import React, { useEffect, useRef } from 'react';

interface BrandWavesProps {
  height?: number | string; // default: 88
  className?: string;       // clases CSS adicionales
  mirrored?: boolean;       // si debe tener reflejo inferior
}

interface WaveConfig {
  colorKey: string;
  alpha: number;
  speed: number;
  amp: number;
  freq: number;
  yBase: number;
}

const BASE_WAVES: WaveConfig[] = [
  { colorKey: '--brand-500', alpha: 0.28, speed: 1.2, amp: 22, freq: 0.011, yBase: 0.62 },
  { colorKey: '--brand-400', alpha: 0.22, speed: 0.8, amp: 18, freq: 0.015, yBase: 0.72 },
  { colorKey: '--brand-600', alpha: 0.20, speed: 1.7, amp: 26, freq: 0.008, yBase: 0.56 },
  { colorKey: '--brand-300', alpha: 0.30, speed: 0.5, amp: 14, freq: 0.021, yBase: 0.80 },
  { colorKey: '--brand-400', alpha: 0.18, speed: 1.5, amp: 30, freq: 0.006, yBase: 0.50 },
];

const parseColor = (color: string) => {
  const trimmed = color.trim();
  // Handle rgb/rgba
  if (trimmed.startsWith('rgb')) {
    const values = trimmed.match(/\d+/g);
    if (values && values.length >= 3) {
      return { r: parseInt(values[0]), g: parseInt(values[1]), b: parseInt(values[2]) };
    }
  }
  // Handle hex
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(trimmed);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

const BrandWaves: React.FC<BrandWavesProps> = ({ height = 88, className = "", mirrored = false }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | undefined>(undefined);
  const offsetsRef = useRef<number[]>(BASE_WAVES.map(() => Math.random() * 1000));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Apply multipliers
    const waves = BASE_WAVES.map(w => ({
      ...w,
      alpha: w.alpha * 1.44,
      speed: w.speed * 0.33
    }));

    const updateCanvasSize = () => {
      const container = containerRef.current;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;

      const width = container.clientWidth;
      const height = container.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(updateCanvasSize);
    });
    if (containerRef.current) ro.observe(containerRef.current);

    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, w, h);

      const rootStyle = getComputedStyle(document.documentElement);

      waves.forEach((wave, i) => {
        const colorHex = rootStyle.getPropertyValue(wave.colorKey).trim() || '#f97316';
        const { r, g, b } = parseColor(colorHex);
        const offset = offsetsRef.current[i];
        const period = (2 * Math.PI) / wave.freq;
        const startX = -(offset % period) - period;

        // Altura base ajustada para que las ondas estén en los extremos si es espejo
        const adjustedYBase = mirrored ? wave.yBase * 0.25 : wave.yBase;

        ctx.beginPath();
        const topY = (x: number) => adjustedYBase * h + Math.sin((x + offset) * wave.freq) * wave.amp;

        if (mirrored) {
          const bottomY = (x: number) => h - (adjustedYBase * h + Math.sin((x + offset) * wave.freq) * wave.amp);

          // Empezar por la línea superior de izquierda a derecha
          ctx.moveTo(startX, topY(startX));
          for (let x = startX; x <= w + period; x += 2) {
            ctx.lineTo(x, topY(x));
          }

          // Bajar a la línea inferior y recorrerla de derecha a izquierda
          for (let x = w + period; x >= startX; x -= 2) {
            ctx.lineTo(x, bottomY(x));
          }
          ctx.closePath();
        } else {
          // Comportamiento original: de la onda hacia el borde superior (y=0)
          ctx.moveTo(startX, 0);
          for (let x = startX; x <= w + period; x += 2) {
            ctx.lineTo(x, topY(x));
          }
          ctx.lineTo(w + period, 0);
          ctx.closePath();
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${wave.alpha})`;
        ctx.fill();

        offsetsRef.current[i] += wave.speed;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    updateCanvasSize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      ro.disconnect();
    };
  }, []);

  const containerHeight = typeof height === 'number' ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 left-0 w-full overflow-hidden ${mirrored ? 'bg-transparent' : 'bg-gradient-to-b from-[#fff7ed] to-white'} ${className}`}
      style={{ height: containerHeight }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
    </div>
  );
};

export default BrandWaves;
