"use client";

import { motion } from "framer-motion";
import { Globe, Workflow, MessagesSquare, Sparkles, Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { services } from "@/lib/content";
import type { ServiceId } from "@/lib/content";

const iconFor = (icon: string) => {
  switch (icon) {
    case "globe":
      return <Globe className="h-6 w-6" />;
    case "workflow":
      return <Workflow className="h-6 w-6" />;
    case "chat":
      return <MessagesSquare className="h-6 w-6" />;
    default:
      return <Sparkles className="h-6 w-6" />;
  }
};

export function Services() {
  const { locale } = useI18n();
  const d = dictionary.services;

  return (
    <section id="services" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((svc, i) => {
            const content = d[svc.id];
            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <SpotlightCard className="group flex h-full flex-col rounded-3xl p-7">
                  <div
                    className="mb-5 grid h-12 w-12 place-items-center rounded-2xl border border-fg-base/10 bg-fg-base/5 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      color: svc.accent,
                      boxShadow: `0 0 28px ${svc.accent}22 inset`,
                    }}
                  >
                    {iconFor(svc.icon)}
                  </div>

                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                    {content.title[locale]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-base/65 md:text-base">
                    {content.description[locale]}
                  </p>

                  <ul className="mt-5 flex flex-col gap-2">
                    {content.bullets[locale].map((bullet: string) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2 text-sm text-fg-base/80"
                      >
                        <Check
                          className="h-3.5 w-3.5 flex-shrink-0"
                          style={{ color: svc.accent }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 flex flex-col items-center gap-5 rounded-3xl border border-dashed border-accent-orange/30 bg-accent-orange/[0.03] p-6 text-center md:p-8"
        >
          <p className="max-w-2xl text-base text-fg-base/85 md:text-lg">
            <Sparkles className="mr-2 inline h-4 w-4 text-accent-orange-soft" />
            {d.adapt[locale]}
          </p>
          <a
            href="#contact"
            data-cursor="interactive"
            className="group inline-flex items-center gap-2 rounded-full border border-fg-base/15 bg-fg-base/5 px-5 py-2.5 text-sm font-semibold text-fg-base transition-[background-color,border-color] hover:border-accent-orange/60 hover:bg-accent-orange/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
          >
            {d.cta[locale]}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
