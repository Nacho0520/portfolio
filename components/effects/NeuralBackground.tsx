"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: "orange" | "teal" | "amber";
};

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      const density = Math.min(Math.max(Math.floor((width * height) / 26000), 40), 110);
      particles = Array.from({ length: density }).map(() => {
        const roll = Math.random();
        const hue: Particle["hue"] = roll < 0.55 ? "orange" : roll < 0.85 ? "amber" : "teal";
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.4 + 0.4,
          hue,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const particleColor: Record<Particle["hue"], string> = {
        orange: "rgba(251, 146, 60, 0.9)",
        amber: "rgba(251, 191, 36, 0.9)",
        teal: "rgba(94, 234, 212, 0.9)",
      };
      const linkColor: Record<Particle["hue"], [number, number, number]> = {
        orange: [249, 115, 22],
        amber: [251, 191, 36],
        teal: [20, 184, 166],
      };

      for (const p of particles) {
        if (!prefersReduced) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        ctx.beginPath();
        ctx.fillStyle = particleColor[p.hue];
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const linkDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDist) {
            const alpha = (1 - dist / linkDist) * 0.22;
            const [r, g, bl] = a.hue === b.hue ? linkColor[a.hue] : linkColor.orange;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${bl}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div aria-hidden className="neural-bg pointer-events-none fixed inset-0 z-0">
      <div className="neural-grid absolute inset-0 bg-grid" />
      <canvas ref={canvasRef} className="neural-canvas absolute inset-0" />
      <div className="neural-vignette absolute inset-0" />
      <div className="neural-blob neural-blob--a absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="neural-blob neural-blob--b absolute right-1/4 bottom-10 h-[380px] w-[380px] rounded-full blur-3xl" />
      <div className="neural-blob neural-blob--c absolute left-10 bottom-0 h-[320px] w-[320px] rounded-full blur-3xl" />
    </div>
  );
}
