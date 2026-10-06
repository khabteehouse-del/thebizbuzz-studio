"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/\\|[]{}#$%&*+=";

/* Time before the first letter locks in, and the gap between letters */
const START_MS = 280;
const STEP_MS = 85;
/* How often the unresolved letters change, so they flicker rather than blur */
const SCRAMBLE_MS = 45;

type Props = {
  text: string;
  className?: string;
};

/*
  A heading that decodes itself when it scrolls into view.

  Every letter starts as a cycling cyan glyph and locks into its real
  character from left to right, with a cyan glow behind the word that
  fades as the letters land. Hovering the word runs it again.

  Layout cannot move: the real text stays in the page as an invisible
  sizer, and the scrambled letters are laid over it, so the heading
  always takes exactly the space of its final text.

  Safe without JavaScript and for reduced motion: the real text is what
  the server renders, and it is only hidden once the page is running, the
  word has not yet scrolled into view, and motion is allowed.
*/
export function DecodeText({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const frame = useRef<number | null>(null);

  const [armed, setArmed] = useState(false);
  const [resolved, setResolved] = useState(text.length);
  const [glyphs, setGlyphs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);

  const randomGlyphs = useCallback(
    () =>
      text
        .split("")
        .map(() => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]),
    [text]
  );

  const run = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current);

    const begin = performance.now();
    let lastScramble = 0;
    setRunning(true);
    setResolved(0);
    setGlyphs(randomGlyphs());

    function tick(now: number) {
      const elapsed = now - begin;
      const done = Math.max(
        0,
        Math.min(text.length, Math.floor((elapsed - START_MS) / STEP_MS) + 1)
      );
      setResolved(done);

      if (now - lastScramble > SCRAMBLE_MS) {
        lastScramble = now;
        setGlyphs(randomGlyphs());
      }

      if (done < text.length) {
        frame.current = requestAnimationFrame(tick);
      } else {
        frame.current = null;
        setRunning(false);
      }
    }

    frame.current = requestAnimationFrame(tick);
  }, [text, randomGlyphs]);

  /* Arm only once JavaScript is running and motion is allowed */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    setResolved(0);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  useEffect(() => {
    if (armed && inView) run();
  }, [armed, inView, run]);

  const hidden = armed && !inView;

  return (
    <span
      ref={ref}
      aria-label={text}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => {
        if (armed && !running) run();
      }}
    >
      {/* The real text: sets the width, and is what is seen when idle */}
      <span
        aria-hidden="true"
        className={running || hidden ? "invisible" : undefined}
      >
        {text}
      </span>

      {armed && (running || hidden) && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 whitespace-nowrap"
          style={{
            /* Glow fades out as the letters lock in */
            textShadow: `0 0 24px rgba(29,213,255,${(
              0.55 *
              (1 - resolved / Math.max(text.length, 1))
            ).toFixed(2)})`,
          }}
        >
          {text.split("").map((char, i) => {
            if (char === " ") return " ";
            const locked = !hidden && i < resolved;
            return (
              <span
                key={i}
                style={
                  locked
                    ? undefined
                    : {
                        color: "#1dd5ff",
                        opacity: hidden ? 0 : 0.9,
                      }
                }
              >
                {locked ? char : glyphs[i] ?? char}
              </span>
            );
          })}
        </span>
      )}
    </span>
  );
}
