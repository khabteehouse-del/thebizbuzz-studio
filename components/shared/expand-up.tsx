"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/*
  Grows a card upward. It starts showing only the lower 60%, the lower
  part never moves, and the upper 40% grows out over about a second until
  the card is whole. When you scroll back above it, it folds back to 60%.

  Timed, not tied to scroll speed, so it always plays smoothly whether you
  scroll slowly or fast.

  The card keeps its full size in the page the whole time (only what is
  shown changes), so nothing around it shifts. When open, the clip box is
  pushed outward past the card, so hover lifts and shadows are never cut
  off. Reduced motion shows the whole card. If anything fails, the card is
  shown whole.
*/
const HIDDEN_SHARE = 0.4; // the upper 40% is what grows

export function ExpandUp({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /* Seconds to wait before growing, so two cards can go one after another */
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const node = ref.current;
    if (!node) return;

    const measure = () => setHeight(node.offsetHeight);
    measure();
    setArmed(true);

    const onResize = () => measure();
    window.addEventListener("resize", onResize);

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            /* Open once it is in the lower-middle of the screen, and stay
               open when it has scrolled up past the top. Fold only when it
               goes back below. */
            setOpen(entry.isIntersecting || entry.boundingClientRect.top < 0);
          }
        },
        { rootMargin: "0px 0px -20% 0px", threshold: 0 }
      );
      observer.observe(node);
    } catch {
      setOpen(true);
    }

    /* Failsafe: never leave a card folded if the observer stays silent */
    const failsafe = window.setTimeout(() => setOpen(true), 2500);

    return () => {
      window.removeEventListener("resize", onResize);
      observer?.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [reduce]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const folded = `inset(${Math.round(height * HIDDEN_SHARE)}px 0px 0px 0px round 16px)`;
  const whole = "inset(-30px -30px -30px -30px round 16px)";

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={armed ? { clipPath: open ? whole : folded } : undefined}
      transition={{
        duration: 1.15,
        ease: [0.22, 1, 0.36, 1],
        delay: open ? delay : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
