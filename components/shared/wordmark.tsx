"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/components/shared/use-media-query";

/*
  The name split across its two halves.

  Biz carries the brand and creative side, Buzz the technology side.
  The colour break is the positioning line made visual, which is why
  it earns full opacity instead of sitting back as a watermark.

  The two halves drift apart slightly as the section passes, then meet
  again. Scroll-linked, so it responds to the reader rather than
  animating at them on a loop.
*/
export function Wordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const bizX = useTransform(scrollYProgress, [0, 1], ["-4%", "2%"]);
  const buzzX = useTransform(scrollYProgress, [0, 1], ["4%", "-2%"]);

  return (
    <div
      ref={ref}
      className="pointer-events-none select-none overflow-hidden"
      aria-label="BizBuzz"
    >
      <p className="flex whitespace-nowrap font-display text-[15vw] font-medium leading-[0.82] tracking-[-0.06em] md:text-[12vw]">
        <motion.span
          style={{ x: reduceMotion ? 0 : bizX }}
          className="text-paper/85"
        >
          Biz
        </motion.span>
        <motion.span
          style={{ x: reduceMotion ? 0 : buzzX }}
          className="text-accent"
        >
          Buzz
        </motion.span>
      </p>
    </div>
  );
}
