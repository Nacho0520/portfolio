"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tooltip } from "@/components/ui/Tooltip";
import { IgnacioBotTerminal } from "@/components/bot/IgnacioBotTerminal";
import { ContactForm } from "@/components/sections/ContactForm";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { contact } from "@/lib/content";

export function Contact() {
  const { locale } = useI18n();
  const d = dictionary.contact;

  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}`;

  return (
    <section id="contact" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={<span className="text-gradient-neon">{d.heading[locale]}</span>}
          lead={d.lead[locale]}
        />

        <div className="grid gap-6 lg:grid-cols-[1fr_1.35fr]">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="glass flex flex-col rounded-3xl p-7 md:p-8"
          >
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
                {d.directTitle[locale]}
              </h3>

              <div className="mt-6 flex flex-col gap-4">
                <ContactRow
                  icon={<Mail className="h-5 w-5" />}
                  label={d.emailLabel[locale]}
                  value={contact.email}
                  href={`mailto:${contact.email}`}
                />
                <ContactRow
                  icon={<MessageCircle className="h-5 w-5" />}
                  label={d.whatsappLabel[locale]}
                  value={contact.phone}
                  href={whatsappUrl}
                  external
                  accent="#25D366"
                />
                <ContactRow
                  icon={<Phone className="h-5 w-5" />}
                  label={d.phoneLabel[locale]}
                  value={contact.phone}
                  href={`tel:${contact.phoneE164}`}
                />
                <ContactRow
                  icon={<LinkedinIcon className="h-5 w-5" />}
                  label={d.linkedinLabel[locale]}
                  value="linkedin.com/in/ignaciohemmings"
                  href={contact.linkedin}
                  external
                />
                <ContactRow
                  icon={<GithubIcon className="h-5 w-5" />}
                  label={d.githubLabel[locale]}
                  value="github.com/Nacho0520"
                  href={contact.github}
                  external
                />
                <ContactRow
                  icon={<MapPin className="h-5 w-5" />}
                  label={d.location[locale]}
                  value={contact.locations.join(" · ")}
                />
              </div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mt-6"
        >
          <IgnacioBotTerminal />
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  accent?: string;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  const extras = href
    ? { href, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) }
    : {};

  return (
    <Tag
      {...extras}
      data-cursor={href ? "interactive" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-transparent px-2 py-2 transition-colors hover:border-fg-base/10 hover:bg-fg-base/[0.03] focus-visible:border-fg-base/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60"
    >
      <span
        className="grid h-11 w-11 place-items-center rounded-xl border border-fg-base/10 bg-fg-base/5 text-neon-violet-soft transition-colors group-hover:text-neon-blue-soft"
        style={accent ? { color: accent } : undefined}
      >
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
          {label}
        </span>
        <span className="text-sm text-fg-base/85 group-hover:text-fg-base md:text-base">
          {value}
        </span>
      </div>
    </Tag>
  );
}
