"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { BrandLogo, type BrandLogoId } from "@/components/ui/BrandLogos";
import { timeline, skillCategories, type TimelineEntry } from "@/lib/content";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { GraduationCap, Briefcase, Users } from "lucide-react";

function kindMeta(kind: TimelineEntry["kind"]) {
  switch (kind) {
    case "education":
      return { Icon: GraduationCap, color: "#fbbf24" };
    case "work":
      return { Icon: Briefcase, color: "#14b8a6" };
    case "leadership":
      return { Icon: Users, color: "#f97316" };
  }
}

function logoIdForEntry(entryId: string): BrandLogoId | null {
  if (entryId === "uog") return "uog";
  if (entryId === "bet365") return "bet365";
  if (entryId === "concert") return "concert";
  if (entryId === "piscina") return "piscina";
  return null;
}

function findSkill(id: string) {
  for (const cat of skillCategories) {
    const item = cat.items.find((s) => s.id === id);
    if (item) return item;
  }
  return null;
}

export function Experience() {
  const { locale } = useI18n();
  const d = dictionary.experience;
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow={locale === "es" ? "Trayectoria" : "Journey"}
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        {/* Featured environments strip — UoG + Bet365 hero + two supporting */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-fg-base/60">
            {d.featured[locale]}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <FeaturedLogoCard
              id="uog"
              label="University of Gibraltar"
              sub={locale === "es" ? "BSc Computing & Entrepreneurship" : "BSc Computing & Entrepreneurship"}
              accent="#c9302c"
            />
            <FeaturedLogoCard
              id="bet365"
              label="Bet365"
              sub={locale === "es" ? "Prácticas · CRM & Segmentación" : "Internship · CRM & Segmentation"}
              accent="#ffe900"
            />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <SupportingLogoCard id="concert" />
            <SupportingLogoCard id="piscina" />
          </div>
        </motion.div>

        <div
          ref={containerRef}
          style={{ position: "relative" }}
          className="pl-10 sm:pl-16"
        >
          <div className="absolute left-3 top-0 bottom-0 w-px bg-fg-base/10 sm:left-6" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-3 top-0 w-px bg-gradient-to-b from-accent-orange via-accent-amber to-accent-teal sm:left-6"
          />

          <div className="flex flex-col gap-10">
            {timeline.map((entry, i) => (
              <TimelineNode key={entry.id} entry={entry} index={i} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedLogoCard({
  id,
  label,
  sub,
  accent,
}: {
  id: BrandLogoId;
  label: string;
  sub: string;
  accent: string;
}) {
  return (
    <div
      className="spotlight glass group relative flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5 md:p-6"
      style={{ ["--spot-x" as string]: "50%", ["--spot-y" as string]: "50%" }}
    >
      <div
        className="grid h-16 w-28 flex-shrink-0 place-items-center rounded-xl border border-fg-base/10 bg-bg-base/60 p-2 md:h-20 md:w-32"
        style={{ boxShadow: `0 0 40px ${accent}22 inset` }}
      >
        <BrandLogo id={id} className="h-full w-full text-fg-base" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-base font-semibold md:text-lg">{label}</p>
        <p className="mt-0.5 truncate text-xs text-fg-base/60 md:text-sm">{sub}</p>
      </div>
    </div>
  );
}

function SupportingLogoCard({ id }: { id: BrandLogoId }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-fg-base/5 bg-fg-base/[0.02] px-5 py-3 text-fg-base/55 transition-colors hover:border-fg-base/15 hover:text-fg-base/85">
      <BrandLogo id={id} className="h-10 w-auto max-w-[200px]" />
    </div>
  );
}

function TimelineNode({
  entry,
  index,
  locale,
}: {
  entry: TimelineEntry;
  index: number;
  locale: "en" | "es";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-35% 0px -35% 0px" });
  const { Icon, color } = kindMeta(entry.kind);
  const badgeLabel = dictionary.experience.badges[entry.kind][locale];
  const logoId = logoIdForEntry(entry.id);
  const isFeatured = entry.id === "uog" || entry.id === "bet365";

  return (
    <div ref={ref} className="relative">
      <div className="absolute -left-10 top-1 grid h-6 w-6 place-items-center sm:-left-16 sm:h-8 sm:w-8">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 380, damping: 20 }}
          className="relative z-10 grid h-full w-full place-items-center rounded-full border border-fg-base/15 bg-bg-base"
          style={{ boxShadow: `0 0 18px ${color}88` }}
        >
          <Icon className="h-3.5 w-3.5" style={{ color }} />
        </motion.span>
        {inView && (
          <motion.span
            aria-hidden
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.6, opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        className={`glass rounded-2xl p-6 ${isFeatured ? "ring-1 ring-accent-orange/20" : ""}`}
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ borderColor: `${color}55`, color }}
          >
            {badgeLabel}
          </span>
          <span className="font-mono text-[11px] text-fg-base/50">{entry.period[locale]}</span>
        </div>

        <div className="flex items-start gap-4">
          {logoId && (
            <div className="grid h-12 w-20 flex-shrink-0 place-items-center rounded-lg border border-fg-base/10 bg-bg-base/40 p-1.5 md:h-14 md:w-24">
              <BrandLogo id={logoId} className="h-full w-full text-fg-base" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold tracking-tight md:text-xl">
              {entry.title[locale]}
            </h3>
            <p className="mt-1 text-sm text-fg-base/60">{entry.org}</p>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-fg-base/75 md:text-base">
          {entry.description[locale]}
        </p>
        {entry.stack && entry.stack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.stack.map((sid) => {
              const skill = findSkill(sid);
              return (
                <Pill
                  key={sid}
                  color={skill?.brandColor}
                  icon={skill ? <SkillIcon name={skill.icon} className="h-3 w-3" /> : null}
                >
                  {skill?.label ?? sid}
                </Pill>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
