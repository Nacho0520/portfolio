"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { cn } from "@/lib/cn";

type Bilingual = { en: string; es: string };

type Props = {
  value: Bilingual;
  stagger?: boolean;
  className?: string;
};

export function LocalizedText({ value, stagger = false, className }: Props) {
  const { locale } = useI18n();
  const text = value[locale];

  if (!stagger) {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key={`${locale}-${text}`}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn("inline-block", className)}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    );
  }

  const letters = Array.from(text);
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={locale}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.012 } },
          exit: { transition: { staggerChildren: 0.006, staggerDirection: -1 } },
        }}
        className={cn("inline-block", className)}
        aria-label={text}
      >
        {letters.map((ch, i) => (
          <motion.span
            key={`${locale}-${i}-${ch}`}
            variants={{
              hidden: { opacity: 0, y: 6 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -4 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="inline-block"
            style={{ whiteSpace: ch === " " ? "pre" : "normal" }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.span>
    </AnimatePresence>
  );
}
