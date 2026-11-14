"use client";

import { useEffect, useRef, useState } from "react";

/*
  Headline reveal: the words rise out of a mask one after another, so a
  headline appears line by line as it scrolls into view.

  Built so it cannot hide text (same lesson as Reveal): the server render
  is fully visible, a timer forces it visible after 1.2s whatever the
  observer does, and reduced motion skips the animation entirely.
  Screen readers get the whole sentence from the label.
*/
export function LineReveal({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);

    const failsafe = window.setTimeout(() => setShown(true), 1200);
    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setShown(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0 }
      );
      if (ref.current) observer.observe(ref.current);
    } catch {
      setShown(true);
    }
    return () => {
      window.clearTimeout(failsafe);
      observer?.disconnect();
    };
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="inline-block overflow-hidden pb-[0.14em] align-bottom [margin-bottom:-0.14em]">
            <span
              className="inline-block"
              style={
                armed
                  ? {
                      transform: shown ? "translateY(0)" : "translateY(112%)",
                      transition: `transform 0.85s cubic-bezier(0.22,1,0.36,1) ${i * 0.06}s`,
                    }
                  : undefined
              }
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
