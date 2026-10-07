"use client";

import { useEffect, useRef, useState } from "react";

/*
  The project name on a work tile, styled like an old tube TV.

  1. Power-on: the first time the name scrolls into view it appears as a
     thin bright line that stretches open into the full text, then settles.
  2. Phosphor glow: names carry a faint red and blue fringe on the letter
     edges. The parent lights one name at a time (lit), with a soft cyan
     halo, a quick flicker and a scanline bar sweeping down it. Pointing at
     a name lights it too.

  Only text shadows, opacity and transforms are used, so it is light on
  phones. The name is real text from the first paint; it is hidden only
  once the page is running and the name is still below the fold, and a
  timer forces it visible no matter what.
*/
export function TileTitle({
  text,
  lit = false,
  delay = 0,
}: {
  text: string;
  lit?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /* "idle": plain text, "wait": hidden below the fold, "on": power-on, "done" */
  const [phase, setPhase] = useState<"idle" | "wait" | "on" | "done">("idle");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }

    const el = ref.current;
    if (!el) return;

    const inView = () => {
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight * 0.92;
    };

    if (inView()) {
      setPhase("done");
      return;
    }

    setPhase("wait");

    let raf = 0;
    let settle = 0;
    const reveal = () => {
      setPhase("on");
      cleanup();
      settle = window.setTimeout(() => setPhase("done"), delay + 1300);
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
    return () => {
      cleanup();
      window.clearTimeout(settle);
    };
  }, [delay]);

  return (
    <span
      ref={ref}
      className={`crt-title ${phase === "wait" ? "crt-wait" : ""} ${
        phase === "on" ? "crt-on" : ""
      } ${lit && phase === "done" ? "is-lit" : ""}`}
      style={{ animationDelay: phase === "on" ? `${delay}ms` : undefined }}
    >
      {text}
    </span>
  );
}
