"use client";

import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";

export function Footer() {
  const { locale } = useI18n();
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 border-t border-fg-base/10 bg-bg-raised/60 py-8 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-xs text-fg-base/60 sm:flex-row">
        <p>
          © {year} Ignacio Hemmings Jiménez. {dictionary.footer.rights[locale]}
        </p>
        <p className="font-mono">{dictionary.footer.built[locale]}</p>
      </div>
    </footer>
  );
}
