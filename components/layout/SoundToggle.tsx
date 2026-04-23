"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "@/lib/sounds/SoundProvider";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { Tooltip } from "@/components/ui/Tooltip";

export function SoundToggle() {
  const { enabled, toggle, play } = useSound();
  const { locale } = useI18n();

  const handleClick = () => {
    toggle();
    if (!enabled) {
      setTimeout(() => play("pop"), 40);
    }
  };

  return (
    <Tooltip content={dictionary.nav.sound[locale]}>
      <button
        type="button"
        onClick={handleClick}
        data-cursor="interactive"
        aria-label={dictionary.nav.sound[locale]}
        aria-pressed={enabled}
        className="inline-grid h-9 w-9 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/80 transition-[background-color,border-color,color] hover:border-neon-blue/60 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
      >
        {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </Tooltip>
  );
}
