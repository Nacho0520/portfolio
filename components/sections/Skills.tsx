"use client";

import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tooltip } from "@/components/ui/Tooltip";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { skillCategories, type SkillItem } from "@/lib/content";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/cn";
import { Brain, Code2, Database } from "lucide-react";

const categoryMeta = {
  ai: { icon: Brain, glow: "from-accent-orange/30 to-transparent", accent: "#f97316" },
  code: { icon: Code2, glow: "from-accent-teal/25 to-transparent", accent: "#14b8a6" },
  data: { icon: Database, glow: "from-accent-amber/25 to-transparent", accent: "#fbbf24" },
} as const;

export function Skills() {
  const { locale } = useI18n();
  const d = dictionary.skills;

  return (
    <section id="skills" data-cursor="ai" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={locale === "es" ? "Stack" : "Stack"}
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, idx) => {
            const meta = categoryMeta[cat.id];
            const Icon = meta.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: idx * 0.08 }}
                className={cn(cat.id === "ai" && "lg:col-span-2")}
              >
                <SpotlightCard className="h-full">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-10 w-10 place-items-center rounded-xl border border-fg-base/10 bg-fg-base/5"
                        style={{ boxShadow: `0 0 24px ${meta.accent}33 inset` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: meta.accent }} />
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {d.categories[cat.id][locale]}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {cat.items.map((item, i) => (
                      <SkillChip key={item.id} item={item} index={i} />
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SkillChip({ item, index }: { item: SkillItem; index: number }) {
  const { locale } = useI18n();
  const tooltip = item.tooltip?.[locale] ?? item.label;
  const brand = item.brandColor ?? "#a78bfa";
  return (
    <Tooltip content={tooltip}>
      <motion.button
        type="button"
        data-cursor="interactive"
        className="group relative flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-fg-base/10 bg-fg-base/[0.04] p-3 text-center transition-colors hover:border-fg-base/25 hover:bg-fg-base/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
        whileHover={{ scale: 1.04 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        <motion.span
          className="text-2xl text-fg-base/70 transition-colors duration-300 group-hover:text-[color:var(--brand)]"
          style={{ ["--brand" as string]: brand }}
          animate={{ y: [0, -3, 0] }}
          transition={{
            duration: 3.6 + (index % 4) * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.12,
          }}
          whileHover={{ rotate: 15, scale: 1.15 }}
        >
          <SkillIcon name={item.icon} className="h-7 w-7" />
        </motion.span>
        <span className="line-clamp-1 text-[10px] font-medium uppercase tracking-[0.12em] text-fg-base/70 group-hover:text-fg-base">
          {item.label}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ boxShadow: `inset 0 0 0 1px ${brand}55, 0 10px 30px -12px ${brand}66` }}
        />
      </motion.button>
    </Tooltip>
  );
}
