"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/cn";

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "onDragEnter"
  | "onDragLeave"
  | "onDragOver"
  | "onDragExit"
  | "onDrop"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
>;

type MagneticButtonProps = NativeButtonProps & {
  as?: "button" | "a" | "link";
  href?: string;
  strength?: number;
  threshold?: number;
  children: ReactNode;
  tone?: "primary" | "ghost" | "outline" | "plain";
  icon?: ReactNode;
};

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  function MagneticButton(
    {
      children,
      className,
      tone = "primary",
      strength = 0.35,
      threshold = 80,
      icon,
      onMouseMove,
      onMouseLeave,
      ...rest
    },
    ref,
  ) {
    const innerRef = useRef<HTMLButtonElement | null>(null);
    useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 280, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 280, damping: 18, mass: 0.4 });

    const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = innerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const pull = Math.min(1, Math.max(0, 1 - dist / (rect.width + threshold)));
      x.set(dx * strength * pull);
      y.set(dy * strength * pull);
      onMouseMove?.(e);
    };

    const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      x.set(0);
      y.set(0);
      onMouseLeave?.(e);
    };

    const tones: Record<NonNullable<MagneticButtonProps["tone"]>, string> = {
      primary:
        "bg-gradient-to-r from-accent-orange via-accent-amber to-accent-orange text-fg-base shadow-[0_10px_30px_-10px_rgba(249,115,22,0.65)] hover:shadow-[0_20px_40px_-8px_rgba(249,115,22,0.6)]",
      ghost: "bg-fg-base/5 text-fg-base hover:bg-fg-base/10 border border-fg-base/10",
      outline:
        "border border-fg-base/15 text-fg-base hover:border-accent-orange/80 hover:text-accent-orange-soft",
      plain: "text-fg-base/80 hover:text-fg-base",
    };

    return (
      <motion.button
        ref={innerRef}
        data-magnetic
        data-cursor="interactive"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ x: springX, y: springY }}
        className={cn(
          "group relative inline-flex select-none items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-[color,box-shadow,background-color,border-color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-violet",
          tones[tone],
          className,
        )}
        {...rest}
      >
        {icon && <span className="grid place-items-center">{icon}</span>}
        <span className="relative z-10">{children}</span>
      </motion.button>
    );
  },
);
