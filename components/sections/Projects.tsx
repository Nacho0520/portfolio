"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Plus, X, Brain, Calendar, GraduationCap, Globe } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Pill } from "@/components/ui/Pill";
import { Tooltip } from "@/components/ui/Tooltip";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { projects, skillCategories, type Project } from "@/lib/content";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/cn";
import { LivePreview } from "@/components/ui/LivePreview";

const iconFor = (key: string) => {
  switch (key) {
    case "brain":
      return <Brain className="h-7 w-7" />;
    case "calendar":
      return <Calendar className="h-7 w-7" />;
    case "graduation-cap":
      return <GraduationCap className="h-7 w-7" />;
    case "globe":
      return <Globe className="h-7 w-7" />;
    default:
      return <Brain className="h-7 w-7" />;
  }
};

function findSkill(id: string) {
  for (const cat of skillCategories) {
    const item = cat.items.find((s) => s.id === id);
    if (item) return item;
  }
  return null;
}

export function Projects() {
  const { locale } = useI18n();
  const d = dictionary.projects;
  const [expanded, setExpanded] = useState<string | null>("dayclose");

  return (
    <section id="projects" data-cursor="web" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow={locale === "es" ? "Proyectos" : "Projects"}
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              expanded={expanded === project.id}
              onToggle={() =>
                setExpanded((v) => (v === project.id ? null : project.id))
              }
              locale={locale}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  expanded,
  onToggle,
  locale,
}: {
  project: Project;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  locale: "en" | "es";
}) {
  const d = dictionary.projects;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      className={cn(
        "spotlight glass group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1",
        expanded && "md:col-span-2",
      )}
      onMouseMove={(e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--spot-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
        el.style.setProperty("--spot-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${project.accent}22 0%, transparent 55%)`,
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className="grid h-14 w-14 place-items-center rounded-2xl border border-fg-base/10 bg-fg-base/5"
          style={{
            color: project.accent,
            boxShadow: `0 0 32px ${project.accent}22 inset`,
          }}
        >
          {iconFor(project.icon)}
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
            {project.kind[locale]}
          </span>
          <div className="flex items-center gap-2">
            {project.links?.github && (
              <Tooltip content={d.viewRepo[locale]}>
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  className="inline-grid h-8 w-8 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/75 transition-colors hover:border-fg-base/25 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  aria-label={d.viewRepo[locale]}
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                </a>
              </Tooltip>
            )}
            {project.links?.demo && (
              <Tooltip content={d.viewDemo[locale]}>
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="interactive"
                  className="inline-grid h-8 w-8 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/75 transition-colors hover:border-fg-base/25 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
                  aria-label={d.viewDemo[locale]}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Tooltip>
            )}
          </div>
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold tracking-tight md:text-2xl">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-base/65 md:text-base">
        {project.short[locale]}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((sid) => {
          const skill = findSkill(sid);
          return (
            <Pill
              key={sid}
              color={skill?.brandColor}
              icon={
                skill ? (
                  <SkillIcon name={skill.icon} className="h-3 w-3" />
                ) : null
              }
            >
              {skill?.label ?? sid}
            </Pill>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-5">
              <div className="rounded-2xl border border-fg-base/5 bg-bg-base/30 p-5 text-sm leading-relaxed text-fg-base/75 md:text-base">
                {project.long[locale]}
              </div>
              {project.livePreview && (
                <LivePreview src={project.livePreview} title={project.title} />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          data-cursor="interactive"
          className="inline-flex items-center gap-2 rounded-full border border-fg-base/10 bg-fg-base/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-fg-base/80 transition-colors hover:border-fg-base/25 hover:text-fg-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <X className="h-3.5 w-3.5" /> {d.collapse[locale]}
            </>
          ) : (
            <>
              <Plus className="h-3.5 w-3.5" /> {d.expand[locale]}
            </>
          )}
        </button>
        <ArrowUpRight className="h-4 w-4 text-fg-base/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg-base" />
      </div>
    </motion.article>
  );
}
