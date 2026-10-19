"use client";

import { useRef } from "react";
import { useInView } from "motion/react";

/*
  Five stars that power up one at a time when the review card scrolls
  into view: each starts dim, flares white-hot with a wide glow, then
  settles to a steady warm glow, powers down and goes again on a loop.
  The stagger and timing are in globals.css (.star).
*/
function PoweredStars() {
  const ref = useRef<HTMLSpanElement>(null);
  const lit = useInView(ref, { once: true, amount: 0.8 });

  return (
    <span ref={ref} className="flex items-center gap-1" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`star text-lg leading-none ${lit ? "star-lit" : ""}`}
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

/* A verified Google review that opens the Google Maps listing in a new tab. */
export function ReviewCard({
  review,
  className = "",
}: {
  review: Review;
  className?: string;
}) {
  return (
    <a
      href={review.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block w-fit rounded-[3px] border border-[#fbbf24]/30 bg-[#fbbf24]/[0.07] px-4 py-3.5 transition-colors duration-300 hover:bg-[#fbbf24]/[0.12] ${className}`}
    >
      <div className="flex items-center gap-1">
        <PoweredStars />
        <span className="ml-1.5 text-sm font-medium text-paper">
          {review.rating}
        </span>
        <span className="text-xs text-paper/60">({review.count} reviews)</span>
      </div>
      <p className="mt-2 max-w-xs text-xs italic leading-relaxed text-paper/60">
        &ldquo;{review.quote}&rdquo;
      </p>
      <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.1em] text-paper/65">
        {review.client}, verified on Google
      </p>
    </a>
  );
}
