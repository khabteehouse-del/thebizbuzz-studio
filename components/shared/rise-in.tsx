"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";

/*
  A card rises slightly and fades in once, when it scrolls into view.
  Nothing is cut or hidden, so the content is readable the moment it
  appears. Only movement and fade are animated, which every phone and
  computer can do smoothly. The delay lets two cards arrive one after
  another.

  Safe by design: reduced motion shows the card as it is, and a failsafe
  shows it after 2.5 seconds if the observer ever stays silent.
*/
const EASE = [0.22, 1, 0.36, 1] as const;

export function RiseIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  /* Seconds to wait before rising, so two cards can go one after another */
  delay?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const node = scope.current;
    if (!node) return;

    animate(node, { opacity: 0, y: 28 }, { duration: 0 });

    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      animate(node, { opacity: 1, y: 0 }, { duration: 1, ease: EASE, delay });
    };

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            show();
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0 }
      );
      observer.observe(node);
    } catch {
      show();
    }

    const failsafe = window.setTimeout(show, 2500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, delay]);

  return (
    <motion.div ref={scope} className={className}>
      {children}
    </motion.div>
  );
}
