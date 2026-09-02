"use client";

import { motion } from "motion/react";
import { useMediaQuery } from "@/components/shared/use-media-query";

type OrbsProps = {
  /* Which palette the orbs use */
  tone?: "navy" | "accent" | "mixed";
  /* Overall strength. Lower for sections with a lot of content. */
  intensity?: number;
};

/*
  Two large blurred colour blooms drifting slowly behind a section.
  Cycles run 34 to 46 seconds, deliberately mismatched so the pair
  never settles into a visible repeating pattern.

  These sit at z-0 inside a relative parent, with the section content
  lifted to z-10 above them. A negative z-index would put them behind
  the parent's own background colour, where nothing is visible.

  Performance note: these animate x and y only. Animating scale on a
  blurred element forces the browser to re-rasterize the blur every
  frame, which is what makes ambient backgrounds tank scroll smoothness.
  Position changes are handled on the GPU and cost almost nothing.

  Colours lead with the bright accent rather than navy. Navy drifting
  over the ocean panel was invisible: both sit at almost the same
  luminance, so there was nothing to see.
  Motion stops entirely when reduced motion is requested.
*/
export function Orbs({ tone = "navy", intensity = 1 }: OrbsProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const colours =
    tone === "accent"
      ? ["var(--color-accent)", "var(--color-accent-soft)"]
      : tone === "mixed"
        ? ["var(--color-accent)", "#7c5cff"]
        : ["var(--color-accent-soft)", "var(--color-accent)"];

  const drift = reduceMotion
    ? {}
    : {
        animate: {
          x: [0, 70, -35, 0],
          y: [0, -50, 35, 0],
        },
        transition: {
          duration: 38,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  const driftSlow = reduceMotion
    ? {}
    : {
        animate: {
          x: [0, -60, 40, 0],
          y: [0, 55, -30, 0],
        },
        transition: {
          duration: 46,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <motion.div
        {...drift}
        className="absolute left-[-15%] top-[-10%] h-[70vh] w-[70vh] rounded-full blur-[110px]"
        style={{
          opacity: 0.5 * intensity,
          willChange: "transform",
          transform: "translateZ(0)",
          background: `radial-gradient(circle, ${colours[0]} 0%, transparent 70%)`,
        }}
      />
      <motion.div
        {...driftSlow}
        className="absolute bottom-[-20%] right-[-10%] h-[55vh] w-[55vh] rounded-full blur-[110px]"
        style={{
          opacity: 0.38 * intensity,
          willChange: "transform",
          transform: "translateZ(0)",
          background: `radial-gradient(circle, ${colours[1]} 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}
