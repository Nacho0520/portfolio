import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type PillProps = {
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
  color?: string;
};

export function Pill({ children, icon, className, color }: PillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-fg-base/15 bg-fg-base/[0.06] px-3 py-1 text-xs font-medium text-fg-base/85 backdrop-blur-sm",
        "transition-colors duration-200 hover:border-fg-base/30 hover:text-fg-base",
        className,
      )}
      style={color ? { boxShadow: `inset 0 0 0 1px ${color}25` } : undefined}
    >
      {icon && <span className="text-[0.9em]">{icon}</span>}
      {children}
    </span>
  );
}
