"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/*
  Two layers: a hard dot that tracks the pointer exactly, and a soft ring
  that lags behind on a spring. The ring expands over interactive elements.
  Disabled entirely on touch devices via CSS and the pointer check below.
*/
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const hasMoved = useRef(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 320, damping: 32, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 32, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    setEnabled(true);

    function onMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      if (!hasMoved.current) {
        hasMoved.current = true;
        setVisible(true);
      }

      const target = event.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='grow']"
      );
      setActive(Boolean(interactive));
    }

    function onLeave() {
      setVisible(false);
    }

    function onEnter() {
      setVisible(true);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div
      className="cursor-layer pointer-events-none fixed inset-0 z-[9999]"
      aria-hidden="true"
    >
      <motion.div
        className="absolute rounded-full bg-paper"
        style={{
          x,
          y,
          width: 6,
          height: 6,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        className="absolute rounded-full border border-accent"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: active ? 48 : 28,
          height: active ? 48 : 28,
          opacity: visible ? (active ? 1 : 0.5) : 0,
        }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
