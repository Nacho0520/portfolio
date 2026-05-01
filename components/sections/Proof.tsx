"use client";

import { motion } from "framer-motion";
import { FileText, ShieldCheck, Rocket, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { BrandLogo } from "@/components/ui/BrandLogos";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { contact } from "@/lib/content";

const proofItems = [
  {
    id: "github",
    icon: GithubIcon,
    accent: "#f97316",
    href: contact.github,
  },
  {
    id: "dayclose",
    icon: Rocket,
    accent: "#14b8a6",
    href: "https://dayclose.vercel.app",
  },
  {
    id: "cv",
    icon: FileText,
    accent: "#fbbf24",
    href: "/api/cv",
  },
  {
    id: "environments",
    icon: ShieldCheck,
    accent: "#fb7185",
    href: "#experience",
  },
] as const;

export function Proof() {
  const { locale } = useI18n();
  const d = dictionary.proof;

  return (
    <section id="proof" className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {proofItems.map((item, index) => {
            const Icon = item.icon;
            const copy = d[item.id];
            const isHash = item.href.startsWith("#");

            return (
              <motion.a
                key={item.id}
                href={item.href}
                target={isHash ? undefined : "_blank"}
                rel={isHash ? undefined : "noreferrer"}
                data-cursor="interactive"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="spotlight glass group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-3xl p-6"
                onClick={(e) => {
                  if (!isHash) return;
                  e.preventDefault();
                  const target = document.getElementById(item.href.slice(1));
                  if (!target) return;
                  window.scrollTo({
                    top: target.getBoundingClientRect().top + window.scrollY - 80,
                    behavior: "smooth",
                  });
                }}
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
                    background: `radial-gradient(circle at 30% 20%, ${item.accent}22 0%, transparent 55%)`,
                  }}
                />

                <div className="flex items-start justify-between gap-3">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-fg-base/10 bg-fg-base/5"
                    style={{ color: item.accent, boxShadow: `0 0 28px ${item.accent}22 inset` }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  {item.id === "environments" ? (
                    <div className="flex items-center gap-1.5">
                      <span className="grid h-8 w-12 place-items-center rounded-lg border border-fg-base/10 bg-bg-base/40 p-1">
                        <BrandLogo id="uog" className="h-full w-full" />
                      </span>
                      <span className="grid h-8 w-12 place-items-center rounded-lg border border-fg-base/10 bg-bg-base/40 p-1">
                        <BrandLogo id="bet365" className="h-full w-full" />
                      </span>
                    </div>
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-fg-base/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg-base" />
                  )}
                </div>

                <div className="mt-8">
                  <span
                    className="mb-3 inline-flex rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ borderColor: `${item.accent}44`, color: item.accent }}
                  >
                    {copy.metric[locale]}
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight">{copy.title[locale]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-fg-base/65">
                    {copy.body[locale]}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
