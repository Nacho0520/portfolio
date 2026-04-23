"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { SoundProvider } from "@/lib/sounds/SoundProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <SoundProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </SoundProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
