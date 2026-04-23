"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { LanguageToggle } from "./LanguageToggle";
import { SoundToggle } from "./SoundToggle";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/cn";

const sections = [
  { id: "hero", key: "hero" as const },
  { id: "about", key: "about" as const },
  { id: "services", key: "services" as const },
  { id: "projects", key: "projects" as const },
  { id: "experience", key: "experience" as const },
  { id: "contact", key: "contact" as const },
];

export function Navbar() {
  const { locale } = useI18n();
  const { play } = useSound();
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleNavClick = () => {
    play("click");
    setOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300",
      )}
    >
      <nav
        className={cn(
          "nav-surface flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-300",
          scrolled && "nav-surface--scrolled",
        )}
      >
        <a
          href="#hero"
          onClick={handleNavClick}
          data-cursor="interactive"
          className="group flex items-center gap-2 rounded-full px-2 py-1 text-sm font-semibold tracking-wide"
        >
          <span className="relative grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-accent-orange via-accent-amber to-accent-teal text-[11px] font-bold text-fg-base shadow-[0_0_18px_rgba(249,115,22,0.55)]">
            IH
          </span>
          <span className="hidden text-fg-base sm:inline">
            Ignacio <span className="text-accent-orange-soft">Hemmings</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={handleNavClick}
              data-cursor="interactive"
              className={cn(
                "relative rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                active === s.id ? "text-fg-base" : "text-fg-base/60 hover:text-fg-base",
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="nav-active"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-full bg-fg-base/10"
                />
              )}
              {dictionary.nav[s.key][locale]}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
          <SoundToggle />
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-grid h-9 w-9 place-items-center rounded-full border border-fg-base/10 bg-fg-base/5 text-fg-base/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-violet/60 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          >
            <div className="flex flex-col gap-1">
              <span className={cn("h-0.5 w-4 bg-fg-base transition-transform", open && "translate-y-1.5 rotate-45")} />
              <span className={cn("h-0.5 w-4 bg-fg-base transition-opacity", open && "opacity-0")} />
              <span className={cn("h-0.5 w-4 bg-fg-base transition-transform", open && "-translate-y-1.5 -rotate-45")} />
            </div>
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass absolute top-20 left-4 right-4 rounded-2xl p-3 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={handleNavClick}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-sm font-medium",
                    active === s.id ? "bg-fg-base/10 text-fg-base" : "text-fg-base/70 hover:bg-fg-base/5 hover:text-fg-base",
                  )}
                >
                  {dictionary.nav[s.key][locale]}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}
