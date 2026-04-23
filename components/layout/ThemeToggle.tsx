"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Tooltip } from "@/components/ui/Tooltip";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { locale } = useI18n();
  const { play } = useSound();

  const tooltip =
    theme === "dark"
      ? dictionary.nav.themeLight[locale]
      : dictionary.nav.themeDark[locale];

  return (
    <Tooltip content={tooltip}>
      <button
        type="button"
        onClick={() => {
          toggle();
          play("switch");
        }}
        data-cursor="interactive"
        aria-label={dictionary.nav.theme[locale]}
        aria-pressed={theme === "light"}
        className="relative inline-grid h-9 w-9 place-items-center overflow-hidden rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/80 transition-[background-color,border-color,color] hover:border-accent-orange/60 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ opacity: 0, y: -8, rotate: -30 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 8, rotate: 30 }}
            transition={{ duration: 0.2 }}
            className="grid place-items-center"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-accent-amber" />
            ) : (
              <Moon className="h-4 w-4 text-accent-orange" />
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </Tooltip>
  );
}
