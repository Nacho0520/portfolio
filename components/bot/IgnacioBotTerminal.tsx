"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, CornerDownLeft, ArrowUpRight } from "lucide-react";
import { runCommand, detectLocale, type BotLine, type FlowState, type SessionMemory } from "./commandRegistry";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/cn";
import { track } from "@vercel/analytics";

// ─── Suggestion sets ──────────────────────────────────────────────────────────

const DEFAULT_SUGGESTIONS = ["help", "presupuesto", "skills", "compare", "contact"];
const FLOW_SUGGESTIONS: Record<number, string[]> = {
  0: ["1", "2", "3", "4"],
  1: ["1", "2", "3"],
  2: ["1", "2", "3"],
  3: ["restaurante", "clínica", "ecommerce"],
  4: ["saltar"],
};

function getSuggestions(flow: FlowState, explored: Set<string>): string[] {
  if (flow?.name === "quote") return FLOW_SUGGESTIONS[flow.step] ?? ["saltar"];
  const all = ["help", "presupuesto", "compare", "faq", "skills", "projects", "experience", "contact", "disponibilidad", "roadmap", "caso"];
  const fresh = all.filter((s) => !explored.has(s));
  return fresh.slice(0, 5).length ? fresh.slice(0, 5) : DEFAULT_SUGGESTIONS;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function IgnacioBotTerminal() {
  const { locale, toggleLocale } = useI18n();
  const { play } = useSound();

  const [lines, setLines] = useState<BotLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const [flowState, setFlowState] = useState<FlowState>(null);
  const [memory, setMemory] = useState<SessionMemory>({
    explored: new Set(),
    interests: [],
    interactionCount: 0,
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Initialise welcome message
  useEffect(() => {
    setLines([{ kind: "system", text: dictionary.bot.welcome[locale] }]);
  }, [locale]);

  // Auto-scroll on new lines
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navH = 80;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH, behavior: "smooth" });
  };

  const submit = (raw?: string) => {
    const value = (raw ?? input).trim();
    if (!value) return;

    // Auto-detect language
    const detectedLocale = detectLocale(value);
    if (detectedLocale && detectedLocale !== locale) {
      toggleLocale(detectedLocale);
    }
    const activeLocale = detectedLocale ?? locale;

    setLines((prev) => [...prev, { kind: "user", text: value }]);
    setHistory((h) => [...h, value]);
    setHistoryIdx(null);

    const result = runCommand(value, {
      locale: activeLocale,
      toggleLocale,
      clear: () => setLines([]),
      memory,
      flowState,
    });

    // Update memory
    const firstWord = value.toLowerCase().split(/\s+/)[0];
    setMemory((m) => ({
      ...m,
      explored: new Set([...m.explored, firstWord]),
      interactionCount: m.interactionCount + 1,
    }));

    // Track analytics event
    try {
      track("bot_command", { command: firstWord, locale: activeLocale });
    } catch {}

    // Handle flow state changes
    if (result.newFlowState !== undefined) {
      setFlowState(result.newFlowState);
    }

    // Handle locale switch
    if (result.switchLocale) {
      toggleLocale(result.switchLocale);
    }

    if (result.lines.length > 0) {
      setLines((prev) => [...prev, ...result.lines]);

      // Auto-open CV
      const cvLink = result.lines.find((l) => l.kind === "link" && l.href === "/api/cv");
      if (cvLink) window.open("/api/cv", "_blank");
    }

    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      play("click");
      submit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(historyIdx - 1, 0);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) { setHistoryIdx(null); setInput(""); }
      else { setHistoryIdx(next); setInput(history[next] ?? ""); }
      return;
    }
    play("key");
  };

  const suggestions = getSuggestions(flowState, memory.explored);

  return (
    <div
      data-cursor="web"
      className="relative flex h-[540px] flex-col overflow-hidden rounded-2xl border border-[#2a241f] bg-[#0f0d0b] font-mono shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-[#2a241f] bg-[#1c1814] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#b5ada3]">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2">
          <TerminalSquare className="h-3.5 w-3.5" />
          <span>ignacio@bot ~ /portfolio</span>
        </div>
        {/* Flow indicator */}
        <AnimatePresence>
          {flowState && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              className="rounded-full border border-[#fb923c]/40 bg-[#fb923c]/10 px-2 py-0.5 text-[10px] text-[#fb923c]"
            >
              {locale === "es" ? `Brief · paso ${flowState.step + 1}/5` : `Brief · step ${flowState.step + 1}/5`}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Output area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 text-[13px] leading-relaxed text-[#e5e1dc]"
      >
        {lines.map((line, i) => (
          <Line key={i} line={line} onScroll={scrollToSection} />
        ))}

        {/* Input form */}
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => { e.preventDefault(); submit(); }}
        >
          <span className="text-[#fb923c]">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={flowState
              ? (locale === "es" ? "Escribe tu respuesta…" : "Type your answer…")
              : dictionary.bot.placeholder[locale]
            }
            data-cursor="text"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-[#f5f1ec] outline-none placeholder:text-[#7a7267]"
            aria-label="Ignacio-Bot command input"
          />
          <span className="inline-block h-4 w-1.5 animate-[caretBlink_1s_steps(2,start)_infinite] bg-[#fb923c]" />
        </form>
      </div>

      {/* Footer bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#2a241f] bg-[#1c1814] px-4 py-2.5 text-[11px] text-[#b5ada3]">
        <span className="flex items-center gap-1.5">
          <CornerDownLeft className="h-3 w-3" />
          {dictionary.contact.terminalHint[locale]}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <motion.button
              key={s}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => { play("click"); submit(s); }}
              data-cursor="interactive"
              className="rounded-full border border-[#2a241f] bg-[#0f0d0b] px-2.5 py-0.5 font-mono text-[10px] text-[#d5cec4] transition-colors hover:border-accent-orange/60 hover:text-[#f5f1ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60"
            >
              {s}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Line renderer ────────────────────────────────────────────────────────────

function Line({ line, onScroll }: { line: BotLine; onScroll: (id: string) => void }) {
  if (line.kind === "user") {
    return (
      <p className="text-[#f5f1ec]">
        <span className="mr-2 text-[#fb923c]">❯</span>
        {line.text}
      </p>
    );
  }

  if (line.kind === "separator") {
    return <div className="my-1.5 border-t border-[#2a241f]" />;
  }

  if (line.kind === "link" && line.href) {
    return (
      <motion.a
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        href={line.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="interactive"
        className="block text-[#fb923c] underline-offset-4 hover:underline"
      >
        ↗ {line.text}
      </motion.a>
    );
  }

  if (line.kind === "action") {
    // Scroll action
    if (line.action?.type === "scroll") {
      const target = line.action.target;
      return (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => onScroll(target)}
          data-cursor="interactive"
          className="my-1 flex items-center gap-2 rounded-lg border border-[#2a241f] bg-[#1c1814] px-3 py-1.5 text-[12px] text-[#5eead4] transition-colors hover:border-[#5eead4]/40 hover:text-[#a7f3d0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-teal/60"
        >
          <ArrowUpRight className="h-3 w-3" />
          {line.text}
        </motion.button>
      );
    }
    // WhatsApp action
    if (line.action?.type === "whatsapp") {
      const url = line.action.message;
      return (
        <motion.a
          href={url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          data-cursor="interactive"
          className="my-1 flex items-center gap-2 rounded-lg border border-[#25D366]/30 bg-[#25D366]/10 px-3 py-1.5 text-[12px] font-semibold text-[#4ade80] transition-colors hover:border-[#25D366]/60 hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/40"
        >
          <ArrowUpRight className="h-3 w-3" />
          {line.text}
        </motion.a>
      );
    }
  }

  const colorClass = {
    bot: "text-[#e5e1dc]",
    system: "text-[#5eead4]",
    success: "text-emerald-300",
    error: "text-rose-300",
    link: "",
    user: "",
    action: "",
    separator: "",
  }[line.kind] ?? "text-[#e5e1dc]";

  return (
    <motion.p
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(colorClass)}
      style={{ whiteSpace: "pre-wrap" }}
    >
      {line.text}
    </motion.p>
  );
}
