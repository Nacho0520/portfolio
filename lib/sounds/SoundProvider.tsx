"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type SoundName = "click" | "key" | "pop" | "switch";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (v: boolean) => void;
  play: (name: SoundName) => void;
};

const SoundContext = createContext<SoundContextValue | null>(null);
const STORAGE_KEY = "portfolio.sound";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "1") setEnabledState(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
  }, [enabled]);

  const ensureCtx = useCallback(() => {
    if (typeof window === "undefined") return null;
    if (!ctxRef.current) {
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctxRef.current = new Ctor();
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(
    (name: SoundName) => {
      if (!enabled) return;
      const ctx = ensureCtx();
      if (!ctx) return;
      if (ctx.state === "suspended") void ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const presets: Record<SoundName, { type: OscillatorType; freq: number; dur: number; peak: number }> = {
        click: { type: "triangle", freq: 520, dur: 0.05, peak: 0.05 },
        key: { type: "square", freq: 840, dur: 0.035, peak: 0.035 },
        pop: { type: "sine", freq: 680, dur: 0.08, peak: 0.06 },
        switch: { type: "sawtooth", freq: 360, dur: 0.07, peak: 0.04 },
      };
      const preset = presets[name];

      osc.type = preset.type;
      osc.frequency.setValueAtTime(preset.freq, now);
      osc.frequency.exponentialRampToValueAtTime(preset.freq * 0.55, now + preset.dur);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(preset.peak, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + preset.dur);

      osc.start(now);
      osc.stop(now + preset.dur + 0.02);
    },
    [enabled, ensureCtx],
  );

  const toggle = useCallback(() => setEnabledState((v) => !v), []);
  const setEnabled = useCallback((v: boolean) => setEnabledState(v), []);

  const value = useMemo(
    () => ({ enabled, toggle, setEnabled, play }),
    [enabled, toggle, setEnabled, play],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error("useSound must be used within <SoundProvider>");
  return ctx;
}
