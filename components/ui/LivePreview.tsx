"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, MonitorPlay, X } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";

type LivePreviewProps = {
  src: string;
  title: string;
};

export function LivePreview({ src, title }: LivePreviewProps) {
  const { locale } = useI18n();
  const [entered, setEntered] = useState(false);
  const displayUrl = src.replace(/^https?:\/\//, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-fg-base/10 bg-bg-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)]"
    >
      {/* ── Browser chrome ── */}
      <div className="flex items-center gap-2 border-b border-fg-base/10 bg-fg-base/[0.04] px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="mx-auto flex w-full max-w-md items-center gap-2 rounded-full border border-fg-base/10 bg-bg-base/60 px-3 py-1">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-teal" />
          <span className="truncate font-mono text-[11px] text-fg-base/70">
            {displayUrl}
          </span>
        </div>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="interactive"
          aria-label={locale === "es" ? "Abrir app completa" : "Open full app"}
          className="inline-grid h-7 w-7 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/70 transition-colors hover:border-accent-orange/60 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* ── Viewport ── */}
      <div className="relative h-[520px] w-full overflow-hidden sm:h-[580px]">

        {/* Iframe — always rendered so it loads in the background */}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          className="h-full w-full border-0"
          style={{
            filter: entered ? "none" : "blur(14px) brightness(0.55) saturate(0.7)",
            transform: entered ? "scale(1)" : "scale(1.05)",
            transition: "filter 0.6s ease, transform 0.6s ease",
            pointerEvents: entered ? "auto" : "none",
          }}
        />

        {/* ── Teaser overlay — visible before entering ── */}
        <AnimatePresence>
          {!entered && (
            <motion.div
              key="teaser"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
            >
              {/* Vignette so blur blends smoothly at edges */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(12,10,9,0.75) 100%)",
                }}
              />

              {/* CTA card */}
              <motion.button
                type="button"
                data-cursor="interactive"
                onClick={() => setEntered(true)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="relative z-10 flex flex-col items-center gap-4 rounded-3xl border border-accent-teal/30 bg-bg-base/70 px-10 py-7 text-center shadow-[0_8px_40px_-10px_rgba(20,184,166,0.35)] backdrop-blur-sm transition-colors hover:border-accent-teal/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/60"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-accent-teal/30 bg-accent-teal/10">
                  <MonitorPlay className="h-7 w-7 text-accent-teal-soft" />
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-lg font-semibold tracking-tight text-fg-base">
                    {locale === "es" ? "Explorar DayClose" : "Explore DayClose"}
                  </span>
                  <span className="text-sm text-fg-base/60">
                    {locale === "es"
                      ? "Haz clic para interactuar con la app"
                      : "Click to interact with the app"}
                  </span>
                </div>
                <span className="rounded-full bg-gradient-to-r from-accent-teal to-teal-400 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-bg-base shadow-[0_4px_20px_-4px_rgba(20,184,166,0.5)]">
                  {locale === "es" ? "Acceder" : "Enter"}
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Exit button — always visible once entered ── */}
        <AnimatePresence>
          {entered && (
            <motion.button
              key="exit"
              type="button"
              data-cursor="interactive"
              onClick={() => setEntered(false)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 inline-flex items-center gap-2 rounded-full border border-fg-base/20 bg-bg-base/85 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-fg-base/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md transition-colors hover:border-fg-base/40 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
            >
              <X className="h-3.5 w-3.5" />
              {locale === "es" ? "Salir de la vista previa" : "Exit preview"}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ── */}
      <div className="flex items-center justify-between gap-3 border-t border-fg-base/10 bg-fg-base/[0.02] px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/50">
          {locale === "es" ? "Vista en vivo" : "Live preview"}
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="interactive"
          className="group inline-flex items-center gap-1.5 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3 py-1.5 text-xs font-semibold text-accent-teal-soft transition-colors hover:border-accent-teal/60 hover:bg-accent-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
        >
          {locale === "es" ? "Abrir app completa" : "Open full app"}
          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
