"use client";

import { useMediaQuery } from "@/components/shared/use-media-query";

type GrowthArrowProps = {
  /* Height in px on phones */
  size?: number;
  /* Height in px from the md breakpoint up */
  sizeDesktop?: number;
  className?: string;
};

/*
  A line that climbs, dips, then climbs higher, with the arrowhead
  appearing once it reaches the peak. Draws itself, holds, resets.

  Built with stroke-dashoffset rather than a JS animation, so it runs
  entirely on the compositor and costs nothing during scroll. The
  keyframes live in globals.css under .growth-arrow.

  Deliberately one quiet gesture rather than a cluster of bars. Next to
  a wordmark at 17rem, anything busier competes with the type.
*/
export function GrowthArrow({
  size = 44,
  sizeDesktop = 104,
  className,
}: GrowthArrowProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const height = isDesktop ? sizeDesktop : size;

  return (
    <svg
      viewBox="0 0 110 70"
      aria-hidden="true"
      className={`growth-arrow shrink-0 overflow-visible ${
        reduceMotion ? "growth-arrow--still" : ""
      } ${className ?? ""}`}
      style={{ height, width: (height * 110) / 70 }}
    >
      <polyline
        className="growth-arrow__line"
        points="6,62 32,44 58,50 84,20"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        className="growth-arrow__tip"
        d="M74 18 L86 17 L85 29"
        fill="none"
        stroke="var(--color-accent-soft)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="growth-arrow__tip"
        cx="84"
        cy="20"
        r="4"
        fill="var(--color-accent-soft)"
      />
    </svg>
  );
}
