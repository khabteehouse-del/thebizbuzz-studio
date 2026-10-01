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
      {/*
        Background flowing-light banner, subtle: low opacity, masked to
        fade into the section's own background at top and bottom, so it
        reads as texture rather than an inserted image.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center opacity-[0.05]"
        style={{
          backgroundImage: "url(/images/banners/banner-3.jpg)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
        }}
      />

      <Orbs tone="mixed" intensity={0.55} />

      <div className="shell relative z-10">
        <div className="grid gap-16 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
          <Reveal>
            <div className="md:sticky md:top-32">
              <p className="section-label">How we work</p>
              <h2 className="mt-7 font-display text-3xl font-medium leading-[1.08] tracking-[-0.03em] text-paper sm:text-4xl md:text-6xl">
                Fewer surprises, by design
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-muted">
                The process below is not a philosophy. It is what we do on
                every engagement, in this order, because it is the sequence
                that stops projects going wrong.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Static track */}
            <div className="absolute left-[21px] top-2 bottom-2 w-px bg-line md:left-[27px]" />
            {/* Fill, grows with scroll progress through the list */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[21px] top-2 w-px bg-gradient-to-b from-accent via-accent-soft to-accent/40 md:left-[27px]"
            />

            <ol ref={listRef} className="space-y-3">
              {approach.map((step, index) => {
                const isHovered = hovered === step.id;
                return (
                  <Reveal key={step.id} delay={index * 0.06}>
                    <li
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
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
