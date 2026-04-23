"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { BrandLogo, type BrandLogoId } from "@/components/ui/BrandLogos";
import { educationTimeline, workTimeline, skillCategories, type TimelineEntry } from "@/lib/content";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { GraduationCap, Briefcase, Users, CheckCircle2 } from "lucide-react";

function kindMeta(kind: TimelineEntry["kind"]) {
  switch (kind) {
    case "education": return { Icon: GraduationCap, color: "#fbbf24" };
    case "work":      return { Icon: Briefcase,    color: "#14b8a6" };
    case "leadership":return { Icon: Users,        color: "#f97316" };
  }
}

function logoIdForEntry(id: string): BrandLogoId | null {
  if (id === "uog")      return "uog";
  if (id === "bet365")   return "bet365";
  if (id === "concert")  return "concert";
  if (id === "piscina")  return "piscina";
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

  return (
    <section id="experience" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* ── EDUCATION ── */}
          <SubTimeline
            label={d.badges.education[locale]}
            accentColor="#fbbf24"
            entries={educationTimeline}
            locale={locale}
          />

          {/* ── WORK & LEADERSHIP ── */}
          <SubTimeline
            label={locale === "es" ? "Experiencia laboral" : "Work experience"}
            accentColor="#14b8a6"
            entries={workTimeline}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}

function SubTimeline({
  label,
  accentColor,
  entries,
  locale,
}: {
  label: string;
  accentColor: string;
  entries: TimelineEntry[];
  locale: "en" | "es";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 15%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div>
      {/* Sub-section header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4 }}
        className="mb-8 flex items-center gap-3"
      >
        <span
          className="h-px flex-1"
          style={{ background: `linear-gradient(to right, ${accentColor}88, transparent)` }}
        />
        <span
          className="rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em]"
          style={{ borderColor: `${accentColor}55`, color: accentColor }}
        >
          {label}
        </span>
        <span
          className="h-px flex-1"
          style={{ background: `linear-gradient(to left, ${accentColor}88, transparent)` }}
        />
      </motion.div>

      <div ref={containerRef} style={{ position: "relative" }} className="pl-9">
        {/* Track */}
        <div
          className="absolute left-3 top-0 bottom-0 w-px"
          style={{ background: `${accentColor}22` }}
        />
        {/* Animated fill */}
        <motion.div
          style={{
            height: lineHeight,
            background: `linear-gradient(to bottom, ${accentColor}, transparent)`,
          }}
          className="absolute left-3 top-0 w-px"
        />

        <div className="flex flex-col gap-8">
          {entries.map((entry, i) => (
            <TimelineNode key={entry.id} entry={entry} index={i} locale={locale} />
          ))}
        </div>
      </div>
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const { Icon, color } = kindMeta(entry.kind);
  const logoId = logoIdForEntry(entry.id);

  return (
    <div ref={ref} className="relative">
      {/* Node dot */}
      <div className="absolute -left-9 top-5 grid h-6 w-6 place-items-center">
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ type: "spring", stiffness: 380, damping: 20, delay: index * 0.04 }}
          className="relative z-10 grid h-6 w-6 place-items-center rounded-full border border-fg-base/15 bg-bg-base"
          style={{ boxShadow: `0 0 14px ${color}88` }}
        >
          <Icon className="h-3 w-3" style={{ color }} />
        </motion.span>
        {inView && (
          <motion.span
            aria-hidden
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 2.4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: color }}
          />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="glass rounded-2xl p-5"
      >
        {/* Header row */}
        <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold leading-tight tracking-tight md:text-lg">
              {entry.title[locale]}
            </h3>
            <p className="text-xs text-fg-base/60">{entry.org}</p>
          </div>
          {logoId && (
            <div
              className="grid h-10 w-20 flex-shrink-0 place-items-center rounded-lg border border-fg-base/10 bg-bg-base/40 p-1.5"
            >
              <BrandLogo id={logoId} className="h-full w-full text-fg-base" />
            </div>
          )}
        </div>

        <span className="inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-fg-base/50">
          {entry.period[locale]}
        </span>

        <p className="mt-2 text-sm leading-relaxed text-fg-base/75">
          {entry.description[locale]}
        </p>

        {/* Bullet points */}
        {entry.bullets && (
          <ul className="mt-3 flex flex-col gap-1.5">
            {entry.bullets[locale].map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-fg-base/70">
                <CheckCircle2
                  className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
                  style={{ color }}
                />
                {b}
              </li>
            ))}
          </ul>
        )}

        {/* Tech pills */}
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
