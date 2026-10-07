"use client";

import { useEffect, useRef, useState } from "react";
import { DecodeText } from "@/components/shared/decode-text";

/*
  The project name on a work tile.

  First time it scrolls into view the letters rise and fade in one after
  another, a calm reveal that stays easy on the eye when there are many
  tiles. After that it is plain text, and pointing at it plays the
  original decode effect as a small reward.

  Safe by design: the name is real text from the first paint, only hidden
  once the page is running and the name is still below the fold, and a
  timer forces it visible no matter what.
*/
export function TileTitle({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  /* "idle": plain text, "wait": hidden below the fold, "show": revealing */
  const [phase, setPhase] = useState<"idle" | "wait" | "show">("idle");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.92;
    };

    if (inView()) {
      setDone(true);
      return;
    }

    setPhase("wait");

    let raf = 0;
    const reveal = () => {
      setPhase("show");
      cleanup();
      window.setTimeout(() => setDone(true), 1400);
    };
    const check = () => {
      raf = 0;
      if (inView()) reveal();
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const failsafe = window.setTimeout(reveal, 12000);
    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearTimeout(failsafe);
      if (raf) cancelAnimationFrame(raf);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return cleanup;
  }, []);

  if (done) {
    return <DecodeText text={text} hoverOnly />;
  }

  const words = text.split(" ");
  let index = 0;

  return (
    <span ref={ref} aria-label={text}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((ch) => {
              const i = index++;
              return (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    opacity: phase === "wait" ? 0 : 1,
                    transform:
                      phase === "wait" ? "translateY(0.4em)" : "translateY(0)",
                    transition: `opacity 0.6s ease ${i * 40}ms, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 40}ms`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </span>
  );
}
