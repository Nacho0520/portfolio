"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type SpotlightCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  function SpotlightCard({ children, className, onMouseMove, ...rest }, ref) {
    const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--spot-x", `${x}%`);
      el.style.setProperty("--spot-y", `${y}%`);
      onMouseMove?.(e);
    };

    return (
      <div
        ref={ref}
        onMouseMove={handleMove}
        className={cn(
          "spotlight glass relative rounded-2xl p-6 transition-transform duration-500 hover:-translate-y-1",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
