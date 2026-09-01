"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";

type MagneticProps = {
  children: ReactNode;
  /* How far the element travels toward the cursor, in pixels */
  strength?: number;
  className?: string;
};

/*
  Wraps any element so it drifts toward the pointer when the pointer is near.
  Pointer events only, so touch devices get the plain element with no penalty.
*/
export function Magnetic({
  children,
  strength = 18,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const element = ref.current;
    if (!element) return;

    const bounds = element.getBoundingClientRect();
    const relativeX = event.clientX - (bounds.left + bounds.width / 2);
    const relativeY = event.clientY - (bounds.top + bounds.height / 2);

    setOffset({
      x: (relativeX / bounds.width) * strength * 2,
      y: (relativeY / bounds.height) * strength * 2,
    });
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
