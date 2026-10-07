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
  /*
    Also check the word's position on scroll, in case the browser's own
    visibility check never fires (words inside clipped, rounded cards).
    Used by the work tiles so the name always plays and never stays blank.
  */
  watch?: boolean;
  /* Never plays by itself: the word is plain until you point at it */
  hoverOnly?: boolean;
};

/*
  A heading that decodes itself every time it scrolls into view, whether
  you are scrolling down to it or back up past it.

  Every letter starts as a cycling cyan glyph and locks into its real
  character from left to right, with a cyan glow behind the word that
  fades as the letters land. Hovering the word runs it again.

  Layout cannot move: the real text stays in the page as an invisible
  sizer, and the scrambled letters are laid over it, so the heading
  always takes exactly the space of its final text.

  Safe without JavaScript and for reduced motion: the real text is what
  the server renders, and it is only hidden once the page is running, motion is
  allowed, and the word is off screen waiting to be played.
*/
export function DecodeText({
  text,
  className = "",
  watch = false,
  hoverOnly = false,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  /* Plays once about a third of the word is on screen... */
  const inView = useInView(ref, { amount: 0.35 });
  /* ...and re-arms once it has fully left, so it plays on every pass,
     scrolling down or back up. */
  const onScreen = useInView(ref, { amount: "some" });
  const frame = useRef<number | null>(null);

  const [armed, setArmed] = useState(false);
  const [primed, setPrimed] = useState(false);
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
    if (hoverOnly) return;
    setPrimed(true);
    setResolved(0);
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current);
    };
  }, []);

  /* Fully off screen: reset so the next pass decodes again */
  useEffect(() => {
    if (armed && !hoverOnly && !onScreen) setPrimed(true);
  }, [armed, hoverOnly, onScreen]);

  useEffect(() => {
    if (armed && !hoverOnly && primed && inView) {
      setPrimed(false);
      run();
    }
  }, [armed, primed, inView, run]);

  /* Position check on scroll: plays when the word is on screen, re-arms
     once it has left, whatever the visibility observer reports */
  useEffect(() => {
    if (!watch || !armed || hoverOnly) return;
    let raf = 0;

    const check = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = r.bottom > 0 && r.top < vh * 0.92;
      const gone = r.bottom < -40 || r.top > vh + 40;
      if (visible) {
        setPrimed((p) => {
          if (p) run();
          return false;
        });
      } else if (gone) {
        setPrimed(true);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };

    const first = window.setTimeout(check, 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.clearTimeout(first);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [watch, armed, hoverOnly, run]);

  /* Hidden only while waiting off screen to be played */
  const hidden = armed && primed;

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
