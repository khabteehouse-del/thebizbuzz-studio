"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/*
  Scroll-linked fly-in. The tile's position on screen drives the motion,
  so scrolling down flies it in from its own random angle and settles it
  in its slot, and scrolling back up flies it back out the same way.

  Safe by design (the lesson from Reveal):
    - The tile is never fully hidden: it starts at 35% opacity, so the
      content can never be lost if anything goes wrong.
    - At rest it is exactly in its slot (all offsets are zero).
    - Reduced motion: no movement at all.
    - Phones get a lighter rise from below, no tilt, no sideways flight.
    - The angle is fixed per tile (from its index), never re-rolled.
*/

/* Stable pseudo-random number in [0, 1) from a tile index and a salt */
function seeded(index: number, salt: number) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export function FlyIn({
  index,
  children,
  className,
}: {
  index: number;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* 0 when the tile's top edge enters the bottom of the screen,
     1 when it has risen to just over half way up */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.55"],
  });

  const angle = seeded(index, 1) * Math.PI * 2;
  const distance = 280 + seeded(index, 2) * 260;
  const startX = wide ? Math.cos(angle) * distance : 0;
  /* Keep flights from coming from far above, so they never cover the heading */
  const startY = wide ? Math.max(Math.sin(angle) * distance, -60) + 90 : 70;
  const startRotate = wide ? (seeded(index, 3) - 0.5) * 38 : 0;
  const startScale = wide ? 0.8 : 0.96;
  const startOpacity = wide ? 0.35 : 0.5;

  const opts = { ease: easeOut };
  const x = useTransform(scrollYProgress, [0, 1], [startX, 0], opts);
  const y = useTransform(scrollYProgress, [0, 1], [startY, 0], opts);
  const rotate = useTransform(scrollYProgress, [0, 1], [startRotate, 0], opts);
  const scale = useTransform(scrollYProgress, [0, 1], [startScale, 1], opts);
  const opacity = useTransform(scrollYProgress, [0, 1], [startOpacity, 1], opts);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ x, y, rotate, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
