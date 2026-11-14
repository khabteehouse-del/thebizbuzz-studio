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

/*
  Gather-in, for the Selected work tiles. Each tile slides in from beyond
  the edge of the screen on its own side, meets the others in the middle
  of the screen, then moves out to its own slot and sets down there.
  Tied to scroll, so scrolling back up reverses it.

  Same safety as FlyIn: at rest every offset is zero, the tile never drops
  below 35% opacity, and reduced motion means no movement. Phones have a
  single column already in the middle, so there each tile just slides in
  from alternating sides.
*/
export function GatherIn({
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
  /* Distances in pixels, measured from the unmoved grid, kept in a ref so
     the scroll functions below always read the latest values */
  const geo = useRef<{ out: number; mid: number } | null>(null);

  useEffect(() => {
    const measure = () => {
      const node = ref.current;
      const grid = node?.parentElement;
      if (!node || !grid) return;
      const vw = window.innerWidth;
      const rect = grid.getBoundingClientRect();
      const left = index % 2 === 0;

      if (vw >= 768) {
        const gap = 24;
        const colW = (rect.width - gap) / 2;
        const slotLeft = rect.left + (left ? 0 : colW + gap);
        const slotCenter = slotLeft + colW / 2;
        geo.current = {
          out: left ? -(slotLeft + colW + 40) : vw - slotLeft + 40,
          mid: vw / 2 - slotCenter,
        };
      } else {
        geo.current = { out: left ? -vw : vw, mid: 0 };
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [index]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const x = useTransform(scrollYProgress, (p) => {
    const g = geo.current;
    if (!g) return 0;
    if (p < 0.5) return g.out + (g.mid - g.out) * easeOut(p / 0.5);
    return g.mid * (1 - easeOut((p - 0.5) / 0.5));
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [90, 40, 0], { ease: easeOut });
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? -7 : 7, 0, 0],
    { ease: easeOut }
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 0.94, 1], { ease: easeOut });
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [0.35, 1, 1], { ease: easeOut });

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
