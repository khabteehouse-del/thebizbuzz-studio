"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/*
  Scroll reveal, built so it CANNOT hide content.

  The previous version used Framer Motion's whileInView. On short
  screens elements that were already partly visible on load never
  crossed the trigger threshold and stayed at opacity 0 permanently.
  Invisible text is the worst possible failure mode for a website, so
  this version is built defensively:

    1. It uses a plain IntersectionObserver, no animation library.
    2. If IntersectionObserver is missing or throws, content shows.
    3. A 900ms timer forces content visible no matter what the observer
       does. Worst case the animation is skipped. Content always
       appears.
    4. On touch devices and with reduced motion, there is no animation
       at all. Content renders visible on first paint.

  The animation is a nicety. The text is the product.
*/
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(min-width: 768px)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!finePointer || reduceMotion) {
      setVisible(true);
      return;
    }

    setAnimate(true);

    // Safety net: whatever the observer does, show the content
    const failsafe = window.setTimeout(() => setVisible(true), 900);

    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            setVisible(true);
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0 }
      );

      if (ref.current) observer.observe(ref.current);
    } catch {
      setVisible(true);
    }

    return () => {
      window.clearTimeout(failsafe);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        animate
          ? {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
