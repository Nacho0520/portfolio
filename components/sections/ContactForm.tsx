"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { contact } from "@/lib/content";
import { useSound } from "@/lib/sounds/SoundProvider";
import { cn } from "@/lib/cn";

type Channel = "email" | "whatsapp";

export function ContactForm() {
  const { locale } = useI18n();
  const { play } = useSound();
  const d = dictionary.contact.form;

  const [channel, setChannel] = useState<Channel>("email");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    play("click");

    if (channel === "email") {
      const body = [
        name ? (locale === "es" ? `De: ${name}` : `From: ${name}`) : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");
      const subj =
        subject ||
        (locale === "es"
          ? "Contacto desde tu portfolio"
          : "Contact from your portfolio");
      const url = `mailto:${contact.email}?subject=${encodeURIComponent(
        subj,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    } else {
      const header = name
        ? locale === "es"
          ? `Hola Ignacio, soy ${name}.`
          : `Hi Ignacio, I'm ${name}.`
        : locale === "es"
        ? "Hola Ignacio,"
        : "Hi Ignacio,";
      const subj = subject
        ? locale === "es"
          ? `Tema: ${subject}`
          : `Topic: ${subject}`
        : "";
      const text = [header, subj, "", message].filter(Boolean).join("\n");
      const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="glass rounded-3xl p-6 md:p-8">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold md:text-xl">{d.title[locale]}</h3>
        <p className="text-sm text-fg-base/60">{d.subtitle[locale]}</p>
      </div>

      <div
        role="tablist"
        aria-label={d.title[locale]}
        className="mt-5 inline-flex rounded-full border border-fg-base/10 bg-fg-base/[0.04] p-1"
      >
        <TabButton
          active={channel === "email"}
          onClick={() => {
            setChannel("email");
            play("switch");
          }}
          icon={<Mail className="h-3.5 w-3.5" />}
          label={d.tabEmail[locale]}
        />
        <TabButton
          active={channel === "whatsapp"}
          onClick={() => {
            setChannel("whatsapp");
            play("switch");
          }}
          icon={<MessageCircle className="h-3.5 w-3.5" />}
          label={d.tabWhatsApp[locale]}
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            id="contact-name"
            label={d.name[locale]}
            placeholder={d.namePh[locale]}
            value={name}
            onChange={setName}
          />
          <Field
            id="contact-subject"
            label={d.subject[locale]}
            placeholder={d.subjectPh[locale]}
            value={subject}
            onChange={setSubject}
          />
        </div>
        <Field
          id="contact-message"
          label={d.message[locale]}
          placeholder={d.messagePh[locale]}
          value={message}
          onChange={setMessage}
          textarea
          required
        />

        <div className="flex flex-col gap-3 pt-1 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-fg-base/55">
            {channel === "email" ? d.emailHint[locale] : d.whatsappHint[locale]}
          </p>

          <AnimatePresence mode="wait" initial={false}>
            <motion.button
              key={channel}
              type="submit"
              data-cursor="interactive"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:scale-[1.02]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60",
                channel === "email"
                  ? "bg-gradient-to-r from-accent-orange to-accent-amber text-[#1a1207] shadow-[0_10px_30px_-10px_rgba(249,115,22,0.7)]"
                  : "bg-gradient-to-r from-[#25D366] to-[#0fa85a] text-fg-base shadow-[0_10px_30px_-10px_rgba(37,211,102,0.7)]",
              )}
            >
              {channel === "email" ? (
                <>
                  <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  {d.sendEmail[locale]}
                </>
              ) : (
                <>
                  <MessageCircle className="h-3.5 w-3.5" />
                  {d.sendWhatsApp[locale]}
                </>
              )}
            </motion.button>
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      data-cursor="interactive"
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
        active ? "text-fg-base" : "text-fg-base/60 hover:text-fg-base",
      )}
    >
      {active && (
        <motion.span
          layoutId="contact-tab-active"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute inset-0 -z-10 rounded-full bg-fg-base/10"
        />
      )}
      {icon}
      {label}
    </button>
  );
}

function Field({
  id,
  label,
  placeholder,
  value,
  onChange,
  textarea,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "w-full rounded-xl border border-fg-base/15 bg-fg-base/[0.05] px-4 py-3 text-sm text-fg-base placeholder:text-fg-base/60 outline-none transition-colors focus:border-accent-orange/70 focus:bg-fg-base/[0.08]";
  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-base/60">
        {label}
      </span>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={shared}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </label>
  );
}
