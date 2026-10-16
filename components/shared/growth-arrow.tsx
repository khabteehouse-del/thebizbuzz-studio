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
  A swoosh that climbs from a thin tail to a heavy solid arrowhead, drawn
  to match the growth arrow in the BizBuzz logo. It draws itself, the
  arrowhead appears at the peak, it holds, then resets.

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

  /*
    The shadow sits on a wrapper rather than on the svg itself, which is
    the more reliable place for a CSS filter. The wrapper also takes the
    margins from the hero.
  */
  return (
    <span
      className={`inline-flex shrink-0 ${className ?? ""}`}
      style={{
        /* Same three shadow layers as the headline, plus a light blue glow. */
        filter:
          "drop-shadow(0 0 12px rgba(55, 181, 255, 0.35)) drop-shadow(0 3px 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 12px 16px rgba(0, 0, 0, 0.6)) drop-shadow(0 30px 46px rgba(0, 0, 0, 0.65))",
      }}
    >
    <svg
      viewBox="0 0 110 70"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
      className={`growth-arrow overflow-visible ${
        reduceMotion ? "growth-arrow--still" : ""
      }`}
      style={{ height, width: (height * 110) / 70 }}
    >
      <defs>
        <linearGradient
          id="growth-arrow-fill"
          gradientUnits="userSpaceOnUse"
          x1="4"
          y1="62"
          x2="96"
          y2="5"
        >
          <stop offset="0" stopColor="#1e7fd6" />
          <stop offset="0.6" stopColor="#37b5ff" />
          <stop offset="1" stopColor="#6fe3ff" />
        </linearGradient>
        {/* The shaft is revealed by a thick line drawing itself, so the taper stays intact. */}
        <mask id="growth-arrow-reveal" maskUnits="userSpaceOnUse" x="-10" y="-10" width="130" height="90">
          <path
            className="growth-arrow__line"
            d="M4,62 C38,64 60,52 80,26"
            pathLength={120}
            fill="none"
            stroke="#fff"
            strokeWidth="24"
            strokeLinecap="butt"
          />
        </mask>
      </defs>

      {/* Thin at the tail, heavy toward the head, like the swoosh in the logo. */}
      <path
        className="growth-arrow__shaft"
        d="M4.0,62.8 L6.5,63.0 L9.0,63.1 L11.5,63.3 L13.9,63.3 L16.3,63.3 L18.6,63.3 L20.9,63.2 L23.2,63.0 L25.5,62.9 L27.7,62.6 L29.9,62.3 L32.1,61.9 L34.2,61.5 L36.3,61.1 L38.4,60.6 L40.5,60.0 L42.5,59.3 L44.6,58.7 L46.6,57.9 L48.5,57.1 L50.5,56.3 L52.4,55.4 L54.3,54.4 L56.2,53.4 L58.1,52.3 L60.0,51.1 L61.8,49.9 L63.6,48.7 L65.4,47.4 L67.2,46.0 L69.0,44.6 L70.8,43.1 L72.5,41.6 L74.2,40.0 L75.9,38.4 L77.6,36.7 L79.3,34.9 L81.0,33.1 L82.7,31.3 L84.4,29.4 L75.6,22.6 L74.3,24.6 L72.9,26.5 L71.6,28.3 L70.2,30.1 L68.8,31.8 L67.4,33.5 L66.0,35.1 L64.6,36.7 L63.2,38.3 L61.7,39.7 L60.2,41.2 L58.7,42.6 L57.2,43.9 L55.7,45.2 L54.1,46.4 L52.6,47.6 L51.0,48.7 L49.3,49.8 L47.7,50.9 L46.0,51.9 L44.2,52.8 L42.5,53.7 L40.7,54.6 L38.9,55.4 L37.0,56.1 L35.1,56.8 L33.2,57.5 L31.2,58.1 L29.2,58.6 L27.1,59.1 L25.0,59.6 L22.9,60.0 L20.7,60.3 L18.4,60.6 L16.1,60.9 L13.8,61.0 L11.4,61.2 L9.0,61.2 L6.6,61.3 L4.0,61.2Z"
        fill="url(#growth-arrow-fill)"
        mask="url(#growth-arrow-reveal)"
      />
      {/* Solid swept arrowhead, appears once the line reaches the peak. */}
      <path
        className="growth-arrow__tip"
        d="M96.5,4.6 L92.7,33.3 L77.0,30.0 L69.7,15.6Z"
        fill="url(#growth-arrow-fill)"
        strokeLinejoin="round"
      />
    </svg>
    </span>
  );
}
