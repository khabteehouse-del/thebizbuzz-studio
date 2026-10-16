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

  Built so it stays sharp on any screen:
    - The line is cut into short segments that fade in one after another.
      That is plain vector art, with no mask or clip to rasterise.
    - The shadow is a blurred copy drawn inside the SVG, not a CSS filter
      on the moving element. SVG filters render at the device's own pixel
      density, where a CSS filter on an animating element can be drawn
      small and stretched on phones.

  The segment fades and the keyframes live in globals.css under
  .growth-arrow. Keep SEGMENTS.length in step with the --ga-n rules there.
*/
const SEGMENTS = [
  "M3.95,62.80 L5.38,62.91 L6.80,63.01 L8.20,63.10 L9.59,63.18 L9.61,61.23 L8.24,61.26 L6.86,61.26 L5.46,61.24 L4.05,61.20Z",
  "M8.99,63.14 L10.38,63.21 L11.75,63.26 L13.11,63.30 L14.45,63.32 L14.38,61.01 L13.07,61.09 L11.74,61.16 L10.39,61.21 L9.03,61.25Z",
  "M13.88,63.31 L15.22,63.32 L16.55,63.32 L17.87,63.30 L19.18,63.26 L18.97,60.56 L17.70,60.71 L16.42,60.84 L15.13,60.95 L13.82,61.05Z",
  "M18.62,63.28 L19.92,63.24 L21.21,63.18 L22.50,63.10 L23.77,63.00 L23.37,59.90 L22.16,60.11 L20.93,60.30 L19.69,60.47 L18.43,60.63Z",
  "M23.23,63.05 L24.49,62.94 L25.75,62.82 L27.00,62.69 L28.24,62.54 L27.60,59.03 L26.44,59.30 L25.26,59.54 L24.06,59.78 L22.85,59.99Z",
  "M27.71,62.60 L28.94,62.44 L30.17,62.26 L31.38,62.07 L32.59,61.85 L31.66,57.95 L30.54,58.28 L29.41,58.58 L28.26,58.87 L27.10,59.15Z",
  "M32.08,61.95 L33.28,61.72 L34.47,61.48 L35.66,61.23 L36.84,60.95 L35.56,56.67 L34.49,57.05 L33.40,57.41 L32.30,57.76 L31.18,58.09Z",
  "M36.33,61.07 L37.51,60.79 L38.68,60.49 L39.83,60.17 L40.99,59.83 L39.31,55.19 L38.27,55.63 L37.23,56.05 L36.17,56.45 L35.10,56.84Z",
  "M40.49,59.98 L41.64,59.63 L42.78,59.27 L43.91,58.89 L45.04,58.49 L42.91,53.52 L41.91,54.01 L40.91,54.48 L39.89,54.94 L38.87,55.38Z",
  "M44.56,58.66 L45.68,58.25 L46.79,57.83 L47.90,57.38 L49.00,56.92 L46.38,51.64 L45.42,52.19 L44.45,52.72 L43.47,53.23 L42.48,53.73Z",
  "M48.53,57.12 L49.63,56.65 L50.72,56.16 L51.81,55.65 L52.89,55.12 L49.72,49.58 L48.79,50.18 L47.86,50.76 L46.92,51.33 L45.97,51.88Z",
  "M52.42,55.35 L53.50,54.82 L54.57,54.26 L55.63,53.69 L56.69,53.10 L52.95,47.32 L52.05,47.97 L51.15,48.61 L50.24,49.23 L49.32,49.84Z",
  "M56.24,53.36 L57.29,52.76 L58.34,52.14 L59.38,51.50 L60.41,50.85 L56.07,44.87 L55.21,45.58 L54.33,46.27 L53.45,46.94 L52.56,47.60Z",
  "M59.97,51.13 L61.00,50.47 L62.03,49.79 L63.05,49.09 L64.07,48.38 L59.11,42.23 L58.27,42.99 L57.42,43.73 L56.56,44.46 L55.70,45.18Z",
  "M63.63,48.69 L64.64,47.96 L65.65,47.22 L66.65,46.45 L67.65,45.68 L62.06,39.39 L61.24,40.20 L60.42,41.00 L59.59,41.79 L58.75,42.55Z",
  "M67.23,46.01 L68.22,45.22 L69.21,44.42 L70.20,43.59 L71.18,42.75 L64.95,36.35 L64.15,37.22 L63.34,38.07 L62.53,38.91 L61.71,39.74Z",
  "M70.76,43.12 L71.73,42.27 L72.71,41.40 L73.68,40.51 L74.64,39.61 L67.77,33.11 L66.98,34.04 L66.20,34.95 L65.40,35.84 L64.60,36.72Z",
  "M74.23,40.00 L75.19,39.09 L76.15,38.16 L77.11,37.21 L78.06,36.25 L70.54,29.67 L69.77,30.65 L68.99,31.62 L68.22,32.57 L67.43,33.51Z",
  "M77.65,36.67 L78.60,35.69 L79.54,34.71 L80.49,33.70 L81.43,32.68 L73.27,26.02 L72.51,27.07 L71.75,28.09 L70.98,29.10 L70.21,30.09Z",
  "M81.02,33.12 L81.86,32.20 L82.70,31.26 L83.53,30.31 L84.36,29.35 L75.64,22.65 L74.97,23.62 L74.30,24.59 L73.62,25.54 L72.94,26.47Z",
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

  return (
    <span className={`inline-flex shrink-0 ${className ?? ""}`}>
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

        {/* Depth: a blue glow, then three dark layers, tight to wide, like the headline. */}
        <g className="growth-arrow__shadow">
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
        </g>

        {/* Thin at the tail, heavy toward the head, like the swoosh in the logo. */}
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
