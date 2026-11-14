"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
  Unfolds a card upward as you scroll. It starts showing only the lower
  60%, the lower part never moves, and the upper 40% opens out until the
  card is whole. Tied to scroll, so scrolling back up folds it again.

  The card keeps its full size in the page the whole time (only what is
  shown changes), so nothing around it shifts. At rest there is no clip at
  all, so hover lifts and shadows are never cut off. Reduced motion shows
  the whole card.
*/
const START_VISIBLE = 60; // percent of the card shown at the start

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function ExpandUp({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });

  const clipPath = useTransform(scrollYProgress, (p) => {
    const hidden = (100 - START_VISIBLE) * (1 - easeOut(Math.min(Math.max(p, 0), 1)));
    return hidden < 0.05 ? "none" : `inset(${hidden}% 0% 0% 0% round 16px)`;
  });

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ clipPath }} className={className}>
      {children}
    </motion.div>
  );
}
