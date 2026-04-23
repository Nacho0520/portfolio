"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Info, Loader2 } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";

type LivePreviewProps = {
  src: string;
  title: string;
};

/**
 * Interactive embedded preview of a live website, rendered inside a mocked
 * browser window. Sandbox is intentionally restrictive (no allow-same-origin)
 * to keep the preview exploratory while preventing persistent sessions /
 * account creation from within the portfolio.
 */
export function LivePreview({ src, title }: LivePreviewProps) {
  const { locale } = useI18n();
  const d = dictionary.projects;
  const [loaded, setLoaded] = useState(false);

  const displayUrl = src.replace(/^https?:\/\//, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="overflow-hidden rounded-2xl border border-fg-base/10 bg-bg-raised shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
    >
      {/* Browser chrome */}
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
          aria-label={d.openFull[locale]}
          className="inline-grid h-7 w-7 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/70 transition-colors hover:border-accent-orange/60 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
        >
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* Preview notice */}
      <div className="flex items-start gap-2 border-b border-fg-base/10 bg-accent-amber/[0.06] px-4 py-2 text-[11px] leading-snug text-fg-base/75">
        <Info className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-accent-amber" />
        <span>{d.previewNotice[locale]}</span>
      </div>

      {/* Iframe viewport */}
      <div className="relative h-[520px] w-full bg-bg-base sm:h-[560px]">
        {!loaded && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="flex flex-col items-center gap-3 text-fg-base/60">
              <Loader2 className="h-5 w-5 animate-spin text-accent-orange" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em]">
                {locale === "es" ? "Cargando…" : "Loading…"}
              </span>
            </div>
          </div>
        )}
        <iframe
          src={src}
          title={title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          sandbox="allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          className="h-full w-full border-0"
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-fg-base/10 bg-fg-base/[0.02] px-4 py-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
          {d.livePreview[locale]}
        </span>
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="interactive"
          className="group inline-flex items-center gap-1.5 rounded-full border border-accent-teal/30 bg-accent-teal/10 px-3 py-1.5 text-xs font-semibold text-accent-teal-soft transition-colors hover:border-accent-teal/60 hover:bg-accent-teal/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
        >
          {d.openFull[locale]}
          <ExternalLink className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </motion.div>
  );
}
