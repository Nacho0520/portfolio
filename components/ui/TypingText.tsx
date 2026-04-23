"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  caretClassName?: string;
  loop?: boolean;
  pauseAtEnd?: number;
};

export function TypingText({
  text,
  speed = 55,
  startDelay = 200,
  className,
  caretClassName,
  loop = false,
  pauseAtEnd = 2200,
}: Props) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;

    const tick = () => {
      if (i <= text.length) {
        setDisplayed(text.slice(0, i));
        i += 1;
        timerRef.current = setTimeout(tick, speed);
      } else {
        setDone(true);
        if (loop) {
          timerRef.current = setTimeout(() => {
            i = 0;
            setDone(false);
            tick();
          }, pauseAtEnd);
        }
      }
    };

    timerRef.current = setTimeout(tick, startDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, speed, startDelay, loop, pauseAtEnd]);

  return (
    <span className={cn("inline-flex items-baseline", className)}>
      <span aria-label={text}>{displayed}</span>
      <span
        aria-hidden
        className={cn(
          "ml-1 inline-block h-[1em] w-[2px] translate-y-[2px] bg-current",
          done ? "animate-[caretBlink_1s_steps(2,start)_infinite]" : "opacity-100",
          caretClassName,
        )}
      />
    </span>
  );
}
