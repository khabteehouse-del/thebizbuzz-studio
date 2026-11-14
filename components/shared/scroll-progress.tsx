"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/* A thin blue line along the top of the screen that grows as you scroll. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-[#1e7fd6] via-[#4ea3ec] to-[#7cd4ff] shadow-[0_0_10px_rgba(78,163,236,0.7)]"
    />
  );
}
