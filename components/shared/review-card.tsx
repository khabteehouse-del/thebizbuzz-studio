"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

/*
  Five stars that power up one at a time when the review card scrolls
  into view: each starts dim, flares white-hot with a wide glow, then
  settles to a steady warm glow, powers down and goes again on a loop.
  The stagger and timing are in globals.css (.star).
*/
export function PoweredStars({ starClass = "text-lg" }: { starClass?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const lit = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span ref={ref} className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star ${starClass} leading-none ${lit ? "star-lit" : ""}`}
          style={{ "--i": i } as React.CSSProperties}
        >
          ★
        </span>
      ))}
    </span>
  );
}

export type Review = {
  quote: string;
  client: string;
  rating: number;
  count: number;
  href: string;
};
