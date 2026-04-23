"use client";

import { motion } from "framer-motion";
import { Tooltip } from "@/components/ui/Tooltip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { Heart, Rocket, Languages, Cpu } from "lucide-react";

type Keyword = {
  label: string;
  tooltip: string;
  icon: React.ReactNode;
};

export function About() {
  const { locale } = useI18n();
  const d = dictionary.about;

  const keywords: Record<string, Keyword> = {
    scalable: {
      label: d.keywords.scalable[locale],
      tooltip: d.tooltips.scalable[locale],
      icon: <Rocket className="h-3.5 w-3.5" />,
    },
    ai: {
      label: d.keywords.ai[locale],
      tooltip: d.tooltips.ai[locale],
      icon: <Cpu className="h-3.5 w-3.5" />,
    },
    bilingual: {
      label: d.keywords.bilingual[locale],
      tooltip: d.tooltips.bilingual[locale],
      icon: <Languages className="h-3.5 w-3.5" />,
    },
  };

  const bio = d.bio[locale];
  const interests = d.interests[locale];

  const renderBioWithKeywords = (text: string) => {
    const pattern = new RegExp(
      `(${Object.values(keywords)
        .map((k) => k.label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
        .join("|")})`,
      "gi",
    );
    const parts = text.split(pattern);
    return parts.map((part, i) => {
      const match = Object.values(keywords).find(
        (k) => k.label.toLowerCase() === part.toLowerCase(),
      );
      if (match) {
        return (
          <Tooltip
            key={i}
            content={
              <span className="flex items-center gap-2">
                {match.icon} {match.tooltip}
              </span>
            }
          >
            <span className="keyword" data-cursor="interactive" tabIndex={0}>
              {part}
            </span>
          </Tooltip>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <section id="about" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
        />

        <div className="grid gap-8 md:grid-cols-[1.6fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="glass rounded-3xl p-8 text-pretty text-lg leading-relaxed text-fg-base/85 md:p-10 md:text-xl"
          >
            <p>{renderBioWithKeywords(bio)}</p>
            <p className="mt-6 text-base text-fg-base/65 md:text-lg">
              <Heart className="mr-2 inline h-4 w-4 text-neon-violet-soft" />
              {interests}
            </p>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <StatCard
              label={locale === "es" ? "Mentalidad" : "Mindset"}
              value={locale === "es" ? "Emprendedora" : "Entrepreneurial"}
            />
            <StatCard
              label={locale === "es" ? "Enfoque" : "Focus"}
              value="AI · Full-stack"
            />
            <StatCard
              label={locale === "es" ? "Idiomas" : "Languages"}
              value="ES · EN"
            />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">{label}</p>
      <p className="mt-2 text-xl font-semibold text-gradient-neon">{value}</p>
    </div>
  );
}
