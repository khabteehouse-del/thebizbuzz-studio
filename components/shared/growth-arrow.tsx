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
  to match the growth arrow in the BizBuzz logo.

  One 6s loop: the swoosh draws itself along its curve, the arrowhead
  arrives at the peak, the mark holds, then fades away before the loop
  restarts, so nothing ever snaps.

  Built so it stays sharp and smooth on a phone:
    - The line is cut into 60 short segments that fade in one after
      another, eased so the draw starts and ends gently. At that count the
      steps are finer than a frame, so it reads as one continuous stroke.
    - The shadow is a blurred copy drawn inside its own SVG, stacked under
      the arrow. Only that layer's opacity animates, so the blur is drawn
      once and then just composited. It is also not a CSS filter on a
      moving element, which phones can draw small and stretch.

  The fades and keyframes live in globals.css under .growth-arrow.
  SEGMENTS.length must match the ga-seg rules there (60).
*/
const SEGMENTS = [
  "M3.95,62.80 L4.96,62.88 L5.96,62.95 L6.03,61.25 L5.04,61.23 L4.05,61.20Z",
  "M5.65,62.93 L6.65,63.00 L7.63,63.07 L7.69,61.26 L6.71,61.26 L5.73,61.25Z",
  "M7.33,63.05 L8.31,63.11 L9.29,63.16 L9.32,61.24 L8.36,61.25 L7.39,61.26Z",
  "M8.99,63.14 L9.97,63.19 L10.93,63.23 L10.94,61.19 L9.99,61.22 L9.03,61.25Z",
  "M10.64,63.22 L11.60,63.26 L12.56,63.29 L12.53,61.12 L11.59,61.17 L10.65,61.20Z",
  "M12.27,63.28 L13.22,63.30 L14.17,63.32 L14.10,61.03 L13.18,61.09 L12.24,61.14Z",
  "M13.88,63.31 L14.82,63.32 L15.76,63.32 L15.66,60.91 L14.74,60.98 L13.82,61.05Z",
  "M15.47,63.32 L16.41,63.32 L17.34,63.31 L17.19,60.76 L16.29,60.85 L15.38,60.93Z",
  "M17.05,63.31 L17.98,63.30 L18.90,63.27 L18.70,60.60 L17.81,60.70 L16.91,60.79Z",
  "M18.62,63.28 L19.54,63.25 L20.45,63.21 L20.19,60.40 L19.31,60.52 L18.43,60.63Z",
  "M20.17,63.23 L21.08,63.18 L21.98,63.13 L21.66,60.19 L20.80,60.32 L19.92,60.44Z",
  "M21.70,63.15 L22.60,63.09 L23.50,63.03 L23.11,59.95 L22.26,60.09 L21.40,60.23Z",
  "M23.23,63.05 L24.12,62.98 L25.00,62.90 L24.55,59.69 L23.70,59.84 L22.85,59.99Z",
  "M24.73,62.92 L25.62,62.84 L26.49,62.75 L25.96,59.40 L25.13,59.57 L24.29,59.73Z",
  "M26.23,62.77 L27.10,62.68 L27.97,62.57 L27.35,59.09 L26.53,59.27 L25.71,59.45Z",
  "M27.71,62.60 L28.58,62.49 L29.44,62.37 L28.73,58.76 L27.92,58.96 L27.10,59.15Z",
  "M29.18,62.41 L30.04,62.28 L30.89,62.15 L30.09,58.40 L29.29,58.61 L28.48,58.82Z",
  "M30.63,62.19 L31.48,62.05 L32.33,61.90 L31.42,58.02 L30.64,58.25 L29.84,58.47Z",
  "M32.08,61.95 L32.92,61.79 L33.76,61.63 L32.75,57.62 L31.97,57.86 L31.18,58.09Z",
  "M33.51,61.68 L34.35,61.51 L35.18,61.33 L34.05,57.20 L33.28,57.45 L32.51,57.70Z",
  "M34.93,61.39 L35.76,61.20 L36.59,61.01 L35.33,56.76 L34.58,57.02 L33.81,57.28Z",
  "M36.33,61.07 L37.16,60.88 L37.98,60.67 L36.60,56.29 L35.86,56.57 L35.10,56.84Z",
  "M37.73,60.73 L38.55,60.52 L39.37,60.30 L37.85,55.80 L37.12,56.09 L36.37,56.37Z",
  "M39.12,60.37 L39.93,60.14 L40.74,59.91 L39.09,55.29 L38.36,55.59 L37.63,55.89Z",
  "M40.49,59.98 L41.30,59.74 L42.10,59.49 L40.31,54.75 L39.59,55.07 L38.87,55.38Z",
  "M41.86,59.56 L42.66,59.31 L43.46,59.04 L41.51,54.20 L40.80,54.53 L40.09,54.85Z",
  "M43.21,59.13 L44.01,58.86 L44.80,58.58 L42.70,53.62 L42.00,53.97 L41.29,54.30Z",
  "M44.56,58.66 L45.35,58.38 L46.13,58.08 L43.87,53.02 L43.18,53.38 L42.48,53.73Z",
  "M45.89,58.17 L46.68,57.87 L47.46,57.56 L45.03,52.40 L44.35,52.77 L43.66,53.13Z",
  "M47.22,57.66 L48.00,57.34 L48.77,57.02 L46.17,51.76 L45.50,52.14 L44.82,52.52Z",
  "M48.53,57.12 L49.31,56.79 L50.07,56.45 L47.30,51.10 L46.64,51.49 L45.97,51.88Z",
  "M49.84,56.56 L50.61,56.21 L51.37,55.86 L48.42,50.42 L47.76,50.82 L47.10,51.22Z",
  "M51.14,55.97 L51.90,55.61 L52.66,55.24 L49.52,49.71 L48.87,50.13 L48.22,50.54Z",
  "M52.42,55.35 L53.18,54.98 L53.93,54.59 L50.61,48.98 L49.97,49.41 L49.32,49.84Z",
  "M53.70,54.71 L54.45,54.32 L55.20,53.92 L51.69,48.23 L51.05,48.68 L50.42,49.11Z",
  "M54.97,54.05 L55.72,53.64 L56.46,53.23 L52.76,47.46 L52.13,47.92 L51.50,48.37Z",
  "M56.24,53.36 L56.98,52.94 L57.71,52.51 L53.81,46.67 L53.19,47.14 L52.56,47.60Z",
  "M57.49,52.64 L58.22,52.21 L58.96,51.76 L54.86,45.86 L54.24,46.34 L53.62,46.82Z",
  "M58.73,51.90 L59.46,51.45 L60.19,50.99 L55.89,45.02 L55.28,45.52 L54.67,46.01Z",
  "M59.97,51.13 L60.69,50.67 L61.42,50.20 L56.91,44.17 L56.31,44.68 L55.70,45.18Z",
  "M61.20,50.34 L61.92,49.86 L62.64,49.38 L57.92,43.29 L57.33,43.81 L56.73,44.32Z",
  "M62.42,49.53 L63.13,49.03 L63.85,48.53 L58.93,42.39 L58.34,42.92 L57.74,43.45Z",
  "M63.63,48.69 L64.34,48.18 L65.05,47.66 L59.92,41.47 L59.34,42.02 L58.75,42.55Z",
  "M64.84,47.82 L65.54,47.30 L66.25,46.77 L60.91,40.53 L60.33,41.09 L59.75,41.64Z",
  "M66.03,46.93 L66.74,46.39 L67.44,45.84 L61.89,39.56 L61.31,40.13 L60.73,40.70Z",
  "M67.23,46.01 L67.92,45.46 L68.62,44.90 L62.86,38.58 L62.29,39.16 L61.71,39.74Z",
  "M68.41,45.07 L69.10,44.51 L69.80,43.93 L63.82,37.57 L63.25,38.16 L62.68,38.76Z",
  "M69.59,44.11 L70.28,43.53 L70.97,42.94 L64.78,36.54 L64.21,37.15 L63.65,37.75Z",
  "M70.76,43.12 L71.44,42.52 L72.13,41.92 L65.72,35.48 L65.17,36.11 L64.60,36.72Z",
  "M71.92,42.10 L72.60,41.49 L73.29,40.87 L66.67,34.41 L66.11,35.04 L65.55,35.67Z",
  "M73.08,41.06 L73.76,40.44 L74.44,39.81 L67.60,33.31 L67.05,33.96 L66.50,34.60Z",
  "M74.23,40.00 L74.91,39.36 L75.58,38.72 L68.53,32.19 L67.98,32.85 L67.43,33.51Z",
  "M75.37,38.91 L76.05,38.26 L76.72,37.60 L69.46,31.05 L68.91,31.72 L68.36,32.39Z",
  "M76.51,37.80 L77.18,37.14 L77.85,36.46 L70.38,29.88 L69.83,30.57 L69.29,31.25Z",
  "M77.65,36.67 L78.32,35.99 L78.98,35.30 L71.29,28.69 L70.75,29.40 L70.21,30.09Z",
  "M78.78,35.51 L79.44,34.81 L80.11,34.11 L72.20,27.48 L71.66,28.20 L71.13,28.91Z",
  "M79.90,34.32 L80.57,33.61 L81.23,32.90 L73.11,26.25 L72.57,26.98 L72.04,27.70Z",
  "M81.02,33.12 L81.68,32.39 L82.34,31.66 L74.01,24.99 L73.48,25.74 L72.94,26.47Z",
  "M82.14,31.89 L82.80,31.15 L83.45,30.40 L74.91,23.71 L74.38,24.47 L73.85,25.22Z",
  "M83.25,30.63 L83.81,30.00 L84.36,29.35 L75.64,22.65 L75.19,23.30 L74.74,23.95Z",
];

const SHAFT =
  "M3.95,62.80 L6.07,62.96 L8.16,63.10 L10.23,63.20 L12.27,63.28 L14.28,63.32 L16.27,63.32 L18.23,63.29 L20.17,63.23 L22.09,63.13 L23.98,62.99 L25.85,62.81 L27.71,62.60 L29.54,62.36 L31.35,62.07 L33.15,61.75 L34.93,61.39 L36.68,60.99 L38.43,60.55 L40.15,60.08 L41.86,59.56 L43.55,59.01 L45.23,58.42 L46.89,57.79 L48.53,57.12 L50.16,56.41 L51.78,55.66 L53.38,54.87 L54.97,54.05 L56.55,53.18 L58.11,52.27 L59.66,51.33 L61.20,50.34 L62.72,49.32 L64.23,48.26 L65.74,47.15 L67.23,46.01 L68.70,44.83 L70.17,43.61 L71.63,42.36 L73.08,41.06 L74.52,39.73 L75.95,38.36 L77.37,36.95 L78.78,35.51 L80.18,34.02 L81.58,32.50 L82.97,30.95 L84.36,29.35 L75.64,22.65 L74.52,24.27 L73.40,25.85 L72.26,27.40 L71.13,28.91 L69.98,30.39 L68.83,31.83 L67.67,33.23 L66.50,34.60 L65.32,35.94 L64.13,37.24 L62.93,38.51 L61.71,39.74 L60.49,40.94 L59.25,42.10 L58.00,43.23 L56.73,44.32 L55.45,45.39 L54.15,46.41 L52.83,47.41 L51.50,48.37 L50.14,49.30 L48.77,50.19 L47.38,51.05 L45.97,51.88 L44.53,52.67 L43.07,53.43 L41.59,54.16 L40.09,54.85 L38.56,55.51 L37.00,56.13 L35.42,56.72 L33.81,57.28 L32.18,57.80 L30.52,58.28 L28.82,58.73 L27.10,59.15 L25.35,59.52 L23.57,59.87 L21.76,60.17 L19.92,60.44 L18.05,60.67 L16.15,60.87 L14.21,61.02 L12.24,61.14 L10.24,61.22 L8.21,61.26 L6.15,61.25 L4.05,61.20Z";
const HEAD =
  "M96.5,4.6 L92.7,33.3 L77.0,30.0 L69.7,15.6Z";

export function GrowthArrow({
  size = 44,
  sizeDesktop = 104,
  className,
}: GrowthArrowProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const height = isDesktop ? sizeDesktop : size;
  const box = { height, width: (height * 110) / 70 };
  const still = reduceMotion ? "growth-arrow--still" : "";

  return (
    <span
      className={`relative inline-flex shrink-0 ${className ?? ""}`}
      style={box}
    >
      {/* Depth: a blue glow, then three dark layers from tight to wide, like the headline. */}
      <svg
        viewBox="0 0 110 70"
        aria-hidden="true"
        className={`growth-arrow__shadow absolute inset-0 overflow-visible ${still}`}
        style={box}
      >
        <defs>
          <filter
            id="growth-arrow-blur-sm"
            filterUnits="userSpaceOnUse"
            x="-60"
            y="-60"
            width="240"
            height="200"
          >
            <feGaussianBlur stdDeviation="2.2" />
          </filter>
          <filter
            id="growth-arrow-blur-md"
            filterUnits="userSpaceOnUse"
            x="-60"
            y="-60"
            width="240"
            height="200"
          >
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter
            id="growth-arrow-blur-lg"
            filterUnits="userSpaceOnUse"
            x="-60"
            y="-60"
            width="240"
            height="200"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <g id="growth-arrow-shape">
            <path d={SHAFT} />
            <path d={HEAD} />
          </g>
        </defs>
        <use
          href="#growth-arrow-shape"
          fill="#37b5ff"
          opacity="0.5"
          filter="url(#growth-arrow-blur-md)"
        />
        <use
          href="#growth-arrow-shape"
          fill="#000"
          opacity="0.75"
          filter="url(#growth-arrow-blur-sm)"
          transform="translate(0 2)"
        />
        <use
          href="#growth-arrow-shape"
          fill="#000"
          opacity="0.55"
          filter="url(#growth-arrow-blur-md)"
          transform="translate(0 7)"
        />
        <use
          href="#growth-arrow-shape"
          fill="#000"
          opacity="0.5"
          filter="url(#growth-arrow-blur-lg)"
          transform="translate(0 18)"
        />
      </svg>

      {/* Thin at the tail, heavy toward the head, like the swoosh in the logo. */}
      <svg
        viewBox="0 0 110 70"
        aria-hidden="true"
        shapeRendering="geometricPrecision"
        className={`growth-arrow relative overflow-visible ${still}`}
        style={box}
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
        </defs>
        <g fill="url(#growth-arrow-fill)" className="growth-arrow__mark">
          {SEGMENTS.map((d, i) => (
            <path
              key={i}
              d={d}
              className={`growth-arrow__seg growth-arrow__seg--${i}`}
            />
          ))}
          <path className="growth-arrow__tip" d={HEAD} />
        </g>
      </svg>
    </span>
  );
}
