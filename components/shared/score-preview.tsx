"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

/*
  A small sample of what the Google listing check returns: a score ring that
  counts up when it scrolls into view, with three sample bars underneath.
  It is a preview only, the numbers are not real results.
*/
const SCORE = 72;
const R = 52;
const C = 2 * Math.PI * R;

const BARS = [
  { label: "Photos", value: 48 },
  { label: "Reviews", value: 82 },
  { label: "Posts", value: 31 },
];

export function ScorePreview({ colour = "#4fd1c5" }: { colour?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? SCORE : 0);

  useEffect(() => {
    if (reduce) return;
    if (!inView) {
      setN(0);
      return;
    }
    const controls = animate(0, SCORE, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const shown = reduce ? SCORE : n;
  const p = shown / 100;

  return (
    <div
      ref={ref}
      className="w-[13.5rem] rounded-[4px] border bg-ink/50 p-5 backdrop-blur-sm"
      style={{
        borderColor: `${colour}55`,
        boxShadow: `0 0 40px -8px ${colour}66, inset 0 1px 0 ${colour}33`,
      }}
      aria-hidden="true"
    >
      <div className="relative mx-auto h-[8rem] w-[8rem]">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" stroke={`${colour}22`} strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            stroke={colour}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - p)}
            style={{ filter: `drop-shadow(0 0 6px ${colour})` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-medium leading-none tracking-[-0.04em] text-paper">
            {shown}
          </span>
          <span className="mt-1 text-[0.625rem] uppercase tracking-[0.14em] text-paper/50">
            out of 100
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-2.5">
        {BARS.map((b) => (
          <li key={b.label}>
            <div className="flex justify-between text-[0.625rem] uppercase tracking-[0.12em] text-paper/55">
              <span>{b.label}</span>
              <span>{reduce || inView ? b.value : 0}</span>
            </div>
            <div className="mt-1 h-[3px] w-full overflow-hidden rounded-full" style={{ backgroundColor: `${colour}1f` }}>
              <div
                className="h-full rounded-full transition-[width] duration-[1600ms] ease-out"
                style={{
                  width: reduce || inView ? `${b.value}%` : "0%",
                  backgroundColor: colour,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-[0.5625rem] uppercase tracking-[0.14em] text-paper/35">
        Sample result
      </p>
    </div>
  );
}
