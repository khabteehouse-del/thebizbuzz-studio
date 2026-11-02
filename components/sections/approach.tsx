"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";
import { copy } from "@/data/copy";
import type { Lang } from "@/data/i18n";

/*
  How it works, the BizBuzz way: a line that fills with scroll progress, a
  pulse of light travelling down the track, orbit rings behind the heading,
  and a badge and accent bar that light up on hover.
*/
export function Approach({ lang }: { lang: Lang }) {
  const h = copy[lang].home;
  const [hovered, setHovered] = useState<number | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-deep py-14 md:py-20">
      <Orbs tone="mixed" intensity={0.55} />

      <div className="shell relative z-10">
        <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16">
          <Reveal>
            <div className="relative md:sticky md:top-32">
              <div
                aria-hidden="true"
                className="orbit-system pointer-events-none absolute -left-20 -top-28 h-[26rem] w-[26rem] md:-left-28 md:-top-36 md:h-[36rem] md:w-[36rem]"
              >
                <span className="orbit-ring orbit-a">
                  <i className="orbit-dot orbit-dot-cyan" />
                </span>
                <span className="orbit-ring orbit-b">
                  <i className="orbit-dot orbit-dot-indigo" />
                  <i className="orbit-dot orbit-dot-white orbit-dot-far" />
                </span>
                <span className="orbit-ring orbit-c">
                  <i className="orbit-dot orbit-dot-cyan" />
                </span>
              </div>
              <p className="section-label relative">{h.stepsEyebrow}</p>
              <h2 className="relative mt-5 font-display text-2xl font-medium leading-[1.12] tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                {h.stepsTitle}
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-[60px]"
              style={{
                background: "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
              }}
            />
            <div className="absolute bottom-2 left-[21px] top-2 w-px bg-line md:left-[27px]" />
            <div
              aria-hidden="true"
              className="absolute bottom-2 left-[21px] top-2 w-px overflow-hidden [clip-path:inset(0_-12px)] md:left-[27px]"
            >
              <span className="signal-pulse" />
            </div>
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[21px] top-2 w-px bg-gradient-to-b from-accent via-accent-soft to-accent/40 md:left-[27px]"
            />

            <ol ref={listRef} className="space-y-3">
              {h.steps.map((step, index) => {
                const isHovered = hovered === index;
                return (
                  <li key={step.title}>
                    <Reveal delay={index * 0.06}>
                      <div
                        onMouseEnter={() => setHovered(index)}
                        onMouseLeave={() => setHovered(null)}
                        className="group relative rounded-[4px] py-4 pl-[52px] pr-4 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:py-6 md:pl-[66px]"
                        style={{
                          backgroundColor: isHovered
                            ? "color-mix(in srgb, var(--color-accent-soft) 7%, transparent)"
                            : "transparent",
                        }}
                      >
                        <span
                          aria-hidden="true"
                          className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-accent-soft transition-opacity duration-500"
                          style={{ opacity: isHovered ? 1 : 0 }}
                        />
                        <span
                          className="absolute left-0 top-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-display text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-6"
                          style={{
                            borderColor: isHovered ? "var(--color-accent-soft)" : "var(--color-line)",
                            backgroundColor: isHovered ? "var(--color-accent-soft)" : "var(--color-deep)",
                            color: isHovered ? "var(--color-ink)" : "var(--color-accent-soft)",
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-paper md:text-2xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70 md:text-base">
                          {step.text}
                        </p>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
