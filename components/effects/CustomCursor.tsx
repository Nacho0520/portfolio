"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Variant = "default" | "interactive" | "ai" | "web" | "text";

const VARIANT_ATTR = "data-cursor";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.3 });
  const [variant, setVariant] = useState<Variant>("default");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;
    document.body.classList.add("cursor-hidden");
    setVisible(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const el = target.closest<HTMLElement>(`[${VARIANT_ATTR}], a, button, [role="button"], input, textarea, [data-magnetic]`);
      if (!el) {
        setVariant("default");
        return;
      }
      const attr = el.getAttribute(VARIANT_ATTR) as Variant | null;
      if (attr) {
        setVariant(attr);
      } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        setVariant("text");
      } else {
        setVariant("interactive");
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mouseenter", onEnter);

    return () => {
      document.body.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (!visible) return null;

  const sizeByVariant: Record<Variant, number> = {
    default: 10,
    interactive: 46,
    ai: 54,
    web: 52,
    text: 4,
  };
  const size = sizeByVariant[variant];

  return (
    <>
      <motion.div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          width: size,
          height: variant === "text" ? 22 : size,
          background:
            variant === "default"
              ? "radial-gradient(circle, #fff 0%, rgba(255,255,255,0.6) 60%, transparent 100%)"
              : "transparent",
          border: variant !== "default" && variant !== "text" ? "1px solid rgba(255,255,255,0.7)" : "none",
          backdropFilter: variant !== "default" && variant !== "text" ? "invert(1) blur(6px)" : "none",
          WebkitBackdropFilter: variant !== "default" && variant !== "text" ? "invert(1) blur(6px)" : "none",
          boxShadow: variant === "default" ? "0 0 14px rgba(139, 92, 246, 0.55)" : "none",
          transition: "width 180ms cubic-bezier(.2,.8,.2,1), height 180ms cubic-bezier(.2,.8,.2,1)",
        }}
      >
        {variant === "ai" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <NeuralPulse />
          </span>
        )}
        {variant === "web" && (
          <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-tight text-fg-base">
            &lt;/&gt;
          </span>
        )}
        {variant === "text" && (
          <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-fg-base" />
        )}
      </motion.div>
    </>
  );
}

function NeuralPulse() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-fg-base/90">
      <circle cx="5" cy="5" r="1.4" fill="currentColor" />
      <circle cx="19" cy="6" r="1.1" fill="currentColor" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
      <circle cx="5" cy="19" r="1.1" fill="currentColor" />
      <circle cx="19" cy="18" r="1.4" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.7">
        <line x1="5" y1="5" x2="12" y2="12" />
        <line x1="19" y1="6" x2="12" y2="12" />
        <line x1="12" y1="12" x2="5" y2="19" />
        <line x1="12" y1="12" x2="19" y2="18" />
      </g>
    </svg>
  );
}
