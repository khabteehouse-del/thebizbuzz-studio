"use client";

import { motion } from "motion/react";
import { useMediaQuery } from "@/components/shared/use-media-query";

type PinProps = {
  colour?: string;
  size?: number;
};

/*
  A map pin that drops onto the surface and then sends a slow ripple out
  from its base, the way a location settles on a map.

  Two parts:
    the rings, drawn as flattened ellipses so they read as ground rather
    than as circles floating in space
    the pin itself, which drops once on mount and then holds with a very
    small hover. Deliberately not a scroll trigger: a viewport-based
    animation that fails leaves an invisible pin.

  Everything animates transform and opacity only, so it costs nothing
  during scroll. Motion stops entirely when reduced motion is on.
*/
export function MapPinPulse({ colour = "#4fd1c5", size = 120 }: PinProps) {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const rings = [0, 1.3, 2.6];

  return (
    <div
      aria-hidden="true"
      className="relative shrink-0"
      style={{ width: size, height: size }}
    >
      {/* Ground rings, expanding outward from under the pin */}
      <div className="absolute inset-x-0 bottom-[14%] flex justify-center">
        {rings.map((delay) => (
          <motion.span
            key={delay}
            className="absolute rounded-[100%] border"
            style={{
              borderColor: colour,
              width: size * 0.68,
              height: size * 0.24,
            }}
            initial={{ scale: 0.25, opacity: 0 }}
            animate={
              reduceMotion
                ? { scale: 0.8, opacity: 0.25 }
                : { scale: [0.25, 1.1], opacity: [0, 0.45, 0] }
            }
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 3.9,
                    delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }
            }
          />
        ))}
      </div>

      {/* The pin */}
      <motion.svg
        viewBox="0 0 24 24"
        fill="none"
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: size * 0.44, height: size * 0.44 }}
        initial={reduceMotion ? { y: 0, opacity: 1 } : { y: -34, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.75,
          ease: [0.34, 1.4, 0.64, 1],
        }}
      >
        <motion.g
          animate={reduceMotion ? {} : { y: [0, -3, 0] }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
            stroke={colour}
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill={`${colour}1a`}
          />
          <circle cx="12" cy="10" r="2.4" fill={colour} />
        </motion.g>
      </motion.svg>
    </div>
  );
}
