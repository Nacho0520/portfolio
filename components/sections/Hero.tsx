"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { TypingText } from "@/components/ui/TypingText";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";

const words = ["Ignacio", "Hemmings", "Jiménez"];

export function Hero() {
  const { locale } = useI18n();
  const { play } = useSound();

  return (
    <section
      id="hero"
      data-cursor="ai"
      className="relative flex min-h-[100vh] items-center justify-center overflow-hidden px-6 pt-28"
    >
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-fg-base/10 bg-fg-base/5 px-4 py-1.5 text-xs font-medium text-fg-base/80 backdrop-blur-sm"
        >
          <Sparkles className="h-3.5 w-3.5 text-neon-violet" />
          {locale === "es" ? "Disponible para proyectos 2026" : "Available for projects 2026"}
        </motion.span>

        <h1 className="mb-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
              className="mr-3 inline-block text-gradient-neon"
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-10 font-mono text-base text-fg-base/80 sm:text-lg"
        >
          <TypingText
            text={dictionary.hero.subtitle[locale]}
            startDelay={1000}
            speed={40}
            caretClassName="bg-neon-violet"
          />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="flex flex-col items-center gap-4 sm:flex-row"
        >
          <MagneticButton
            tone="primary"
            onClick={() => {
              play("click");
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {dictionary.hero.cta[locale]}
          </MagneticButton>
          <MagneticButton
            tone="outline"
            onClick={() => {
              play("click");
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {locale === "es" ? "Contactar" : "Get in touch"}
          </MagneticButton>
        </motion.div>
      </div>

    </section>
  );
}
