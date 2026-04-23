"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { Tooltip } from "@/components/ui/Tooltip";

export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n();
  const { play } = useSound();
  const isEs = locale === "es";

  const handleClick = () => {
    play("switch");
    toggleLocale();
  };

  return (
    <Tooltip content={dictionary.nav.language[locale]}>
      <button
        type="button"
        onClick={handleClick}
        data-cursor="interactive"
        aria-label={dictionary.nav.language[locale]}
        aria-pressed={isEs}
        className="group relative inline-flex h-9 items-center gap-1 rounded-full border border-fg-base/10 bg-fg-base/5 p-1 pr-2 text-xs font-semibold tracking-wide transition-colors hover:border-neon-violet/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-neon-violet to-neon-blue"
          style={{ left: isEs ? "50%" : 4 }}
        />
        <span
          className={`relative z-10 grid h-7 w-9 place-items-center rounded-full transition-colors ${
            !isEs ? "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" : "text-fg-base/65"
          }`}
        >
          EN
        </span>
        <span
          className={`relative z-10 grid h-7 w-9 place-items-center rounded-full transition-colors ${
            isEs ? "text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.35)]" : "text-fg-base/65"
          }`}
        >
          ES
        </span>
      </button>
    </Tooltip>
  );
}
