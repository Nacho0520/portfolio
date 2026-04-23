"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { TerminalSquare, CornerDownLeft } from "lucide-react";
import { runCommand, type BotLine } from "./commandRegistry";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { useSound } from "@/lib/sounds/SoundProvider";
import { dictionary } from "@/lib/i18n/dictionary";
import { cn } from "@/lib/cn";

const suggestions = ["help", "skills", "projects", "contact", "download_cv"];

export function IgnacioBotTerminal() {
  const { locale, toggleLocale } = useI18n();
  const { play } = useSound();
  const [lines, setLines] = useState<BotLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setLines([{ kind: "system", text: dictionary.bot.welcome[locale] }]);
  }, [locale]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines]);

  const submit = (raw?: string) => {
    const value = (raw ?? input).trim();
    if (!value) return;
    setLines((prev) => [...prev, { kind: "user", text: value }]);
    setHistory((h) => [...h, value]);
    setHistoryIdx(null);
    const result = runCommand(value, {
      locale,
      toggleLocale,
      clear: () => setLines([]),
    });
    if (result.length > 0) {
      setLines((prev) => [...prev, ...result]);
      const link = result.find((l) => l.kind === "link" && l.href);
      if (link?.href === "/api/cv") {
        if (typeof window !== "undefined") window.open("/api/cv", "_blank");
      }
    }
    setInput("");
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      play("key");
      submit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = historyIdx === null ? history.length - 1 : Math.max(historyIdx - 1, 0);
      setHistoryIdx(next);
      setInput(history[next] ?? "");
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx === null) return;
      const next = historyIdx + 1;
      if (next >= history.length) {
        setHistoryIdx(null);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next] ?? "");
      }
      return;
    }
    play("key");
  };

  return (
    <div
      data-cursor="web"
      className="relative flex h-[520px] flex-col overflow-hidden rounded-2xl border border-[#2a241f] bg-[#0f0d0b] font-mono shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center justify-between border-b border-[#2a241f] bg-[#1c1814] px-4 py-2.5 text-[11px] uppercase tracking-[0.2em] text-[#b5ada3]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2">
          <TerminalSquare className="h-3.5 w-3.5" />
          <span>ignacio@bot ~ /portfolio</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 text-[13px] leading-relaxed text-[#e5e1dc]">
        {lines.map((line, i) => (
          <Line key={i} line={line} />
        ))}
        <form
          className="mt-3 flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <span className="text-[#fb923c]">❯</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKey}
            placeholder={dictionary.bot.placeholder[locale]}
            data-cursor="text"
            autoComplete="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-[#f5f1ec] outline-none placeholder:text-[#7a7267]"
            aria-label="Ignacio-Bot command input"
          />
          <span className="inline-block h-4 w-1.5 animate-[caretBlink_1s_steps(2,start)_infinite] bg-[#fb923c]" />
        </form>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#2a241f] bg-[#1c1814] px-4 py-2.5 text-[11px] text-[#b5ada3]">
        <span className="flex items-center gap-1.5">
          <CornerDownLeft className="h-3 w-3" />
          {dictionary.contact.terminalHint[locale]}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => submit(s)}
              data-cursor="interactive"
              className="rounded-full border border-[#2a241f] bg-[#0f0d0b] px-2.5 py-0.5 font-mono text-[10px] text-[#d5cec4] transition-colors hover:border-accent-orange/60 hover:text-[#f5f1ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60"
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Line({ line }: { line: BotLine }) {
  if (line.kind === "user") {
    return (
      <p className="text-[#f5f1ec]">
        <span className="mr-2 text-[#fb923c]">❯</span>
        {line.text}
      </p>
    );
  }

  const color = {
    bot: "text-[#e5e1dc]",
    system: "text-[#5eead4]",
    success: "text-emerald-300",
    error: "text-rose-300",
    link: "text-[#fb923c] underline-offset-4 hover:underline",
    user: "",
  }[line.kind];

  if (line.kind === "link" && line.href) {
    return (
      <motion.a
        initial={{ opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        href={line.href}
        target="_blank"
        rel="noreferrer"
        data-cursor="interactive"
        className={cn("block", color)}
      >
        ↗ {line.text}
      </motion.a>
    );
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 2 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(color)}
    >
      {line.text}
    </motion.p>
  );
}
