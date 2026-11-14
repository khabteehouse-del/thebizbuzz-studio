"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";

/*
  Grows a card from 60% to whole, slowly and smoothly, and folds it back
  the same way. The way it grows depends on where you come from:

    - Scrolling down, the card arrives from below: the lower part stays
      put and the upper part grows UPWARD.
    - Scrolling up, the card arrives from above: the upper part stays put
      and the lower part grows DOWNWARD (the other way around).

  Folding back is shown while the card is still half on screen, so you can
  see it. Timed, not tied to scroll speed.

  The card keeps its full size in the page throughout (only what is shown
  changes), so nothing around it shifts. When whole, the clip box sits
  outside the card, so hover lifts and shadows are never cut off. Reduced
  motion shows the whole card, and a failsafe opens it if anything fails.
*/
const HIDDEN_SHARE = 0.4; // the part of the card that grows
const GROW_SECONDS = 2.1;
const FOLD_SECONDS = 1.7;
const EASE = [0.33, 1, 0.68, 1] as const;

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
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduce) return;
    const node = scope.current;
    if (!node) return;

    const shape = (kind: "whole" | "foldTop" | "foldBottom") => {
      const hidden = Math.round(node.offsetHeight * HIDDEN_SHARE);
      if (kind === "whole") return "inset(-30px -30px -30px -30px round 16px)";
      /* foldTop: the upper part is hidden (lower part stays put) */
      if (kind === "foldTop") return `inset(${hidden}px 0px 0px 0px round 16px)`;
      /* foldBottom: the lower part is hidden (upper part stays put) */
      return `inset(0px 0px ${hidden}px 0px round 16px)`;
    };

    let isOpen = false;
    let started = false;

    /* Start folded, with no animation, before anything is shown */
    animate(node, { clipPath: shape("foldTop") }, { duration: 0 });

    const open = (fromAbove: boolean) => {
      if (isOpen) return;
      isOpen = true;
      started = true;
      animate(node, { clipPath: shape(fromAbove ? "foldBottom" : "foldTop") }, { duration: 0 });
      animate(node, { clipPath: shape("whole") }, { duration: GROW_SECONDS, ease: EASE, delay });
    };

    const fold = (aboveScreen: boolean) => {
      if (!isOpen && started) return;
      isOpen = false;
      animate(
        node,
        { clipPath: shape(aboveScreen ? "foldBottom" : "foldTop") },
        { duration: aboveScreen ? 0 : FOLD_SECONDS, ease: EASE }
      );
    };

    let observer: IntersectionObserver | null = null;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const above = entry.boundingClientRect.top < 0;
            if (entry.isIntersecting) open(above);
            else fold(above);
          }
        },
        /* The card counts as on screen while any of it is in the upper half */
        { rootMargin: "0px 0px -50% 0px", threshold: 0 }
      );
      observer.observe(node);
    } catch {
      open(false);
    }

    /* Failsafe: never leave a card folded if the observer stays silent */
    const failsafe = window.setTimeout(() => {
      if (!started) open(false);
    }, 3500);

    return () => {
      observer?.disconnect();
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, delay]);

  if (reduce) {
    return (
      <div ref={wrapRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={scope} className={className}>
      {children}
    </motion.div>
  );
}
