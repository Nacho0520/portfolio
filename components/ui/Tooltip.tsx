"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={200} skipDelayDuration={150}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  asChild?: boolean;
};

export function Tooltip({
  children,
  content,
  side = "top",
  align = "center",
  asChild = true,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild={asChild}>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          align={align}
          sideOffset={8}
          className={cn(
            "z-[9998] max-w-xs rounded-lg border border-white/10 bg-[#1c1814]/95 px-3 py-2 text-xs leading-snug text-[#f5f1ec]",
            "backdrop-blur-md shadow-lg shadow-neon-violet/10",
            "data-[state=delayed-open]:animate-in data-[state=closed]:animate-out",
            "data-[state=delayed-open]:fade-in-0 data-[state=closed]:fade-out-0",
          )}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-[#1c1814]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
