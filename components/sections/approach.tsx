"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { approach } from "@/data/content";
import { Reveal } from "@/components/shared/reveal";
import { Orbs } from "@/components/shared/orbs";

/*
  The numbered list used to be four identical rows: same weight, same
  colour, nothing to look at besides the copy. This version adds:

  - A vertical line that fills in sync with scroll, so the page itself
    shows progress through the four steps rather than just listing them.
  - A badge per step that lights up (border + fill) on hover, matching
    the hover language used on the service tiles elsewhere on the page.
  - A left accent bar on the active row's card, a tap of colour rather
    than a full re-theme, consistent with the site's restrained palette.
*/
export function Approach() {
  const [hovered, setHovered] = useState<string | null>(null);
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.8", "end 0.55"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="approach" className="relative overflow-hidden bg-deep py-20 md:py-36">
      <Orbs tone="mixed" intensity={0.55} />

      <div className="shell relative z-10">
        <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <Reveal>
            <div className="relative md:sticky md:top-32">
              {/*
                Orbits behind the heading, drawn in CSS so they are sharp at
                any size (the old banner image was a low-resolution JPEG
                stretched across the section). Each ring turns at its own
                speed and direction with a glowing node riding on it.
              */}
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
              <p className="section-label relative">How we work</p>
              <h2 className="relative mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
                Fewer surprises, by design
              </h2>
              <p className="relative mt-6 max-w-sm text-base leading-relaxed text-muted">
                The process below is not a philosophy. It is what we do on
                every engagement, in this order, because it is the sequence
                that stops projects going wrong.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Soft glow behind the timeline */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-0 h-[34rem] w-[34rem] rounded-full opacity-[0.16] blur-[60px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
              }}
            />
            {/* Static track */}
            <div className="absolute left-[21px] top-2 bottom-2 w-px bg-line md:left-[27px]" />
            {/* A pulse of light travelling down the track, step 01 to 04, on a loop */}
            <div
              aria-hidden="true"
              className="absolute left-[21px] top-2 bottom-2 w-px overflow-hidden [clip-path:inset(0_-12px)] md:left-[27px]"
            >
              <span className="signal-pulse" />
            </div>
            {/* Fill, grows with scroll progress through the list */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[21px] top-2 w-px bg-gradient-to-b from-accent via-accent-soft to-accent/40 md:left-[27px]"
            />

            <ol ref={listRef} className="space-y-3">
              {approach.map((step, index) => {
                const isHovered = hovered === step.id;
                return (
                  <li key={step.id}>
                    <Reveal delay={index * 0.06}>
                    <div
                      onMouseEnter={() => setHovered(step.id)}
                      onMouseLeave={() => setHovered(null)}
                      className="group relative rounded-[4px] py-6 pl-[52px] pr-4 transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:py-9 md:pl-[66px]"
                      style={{
                        backgroundColor: isHovered
                          ? "color-mix(in srgb, var(--color-accent-soft) 7%, transparent)"
                          : "transparent",
                      }}
                    >
                      {/* Left accent bar, only visible on hover */}
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full bg-accent-soft transition-opacity duration-500"
                        style={{ opacity: isHovered ? 1 : 0 }}
                      />

                      {/* Numbered badge, sits on top of the timeline track */}
                      <span
                        className="absolute left-0 top-6 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-display text-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:top-9"
                        style={{
                          borderColor: isHovered
                            ? "var(--color-accent-soft)"
                            : "var(--color-line)",
                          backgroundColor: isHovered
                            ? "var(--color-accent-soft)"
                            : "var(--color-deep)",
                          color: isHovered ? "var(--color-ink)" : "var(--color-accent-soft)",
                        }}
                      >
                        {step.id}
                      </span>

                      <h3 className="font-display text-xl font-medium tracking-[-0.02em] text-paper transition-colors duration-300 md:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70 md:text-base">
                        {step.body}
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
