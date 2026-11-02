"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/shared/button";
import { GrowthArrow } from "@/components/shared/growth-arrow";
import { useMediaQuery } from "@/components/shared/use-media-query";
import { copy } from "@/data/copy";
import { path, type Lang } from "@/data/i18n";

/*
  The BizBuzz hero, same mechanics: it pins while the page scrolls past,
  the headline eases down and fades, and the colour blooms breathe behind
  the type. Pinning is desktop only and only when the screen is tall
  enough, so nothing is ever clipped. On touch devices and for reduced
  motion nothing animates in: the content is simply there.
*/

export function Hero({ lang }: { lang: Lang }) {
  const c = copy[lang];
  const h = c.home;
  const ref = useRef<HTMLElement>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const tallEnough = useMediaQuery("(min-height: 780px)");
  const pinned = isDesktop && tallEnough && !reduceMotion;
  const intro = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.65]);

  const lineOne = h.h1Before.trim();

  const rise = (delay: number) => ({
    initial: intro ? { opacity: 0, y: 16 } : false,
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      ref={ref}
      className={pinned ? "relative h-[106vh]" : "relative"}
      aria-label={c.nav.home}
    >
      <div
        className={`${
          pinned ? "sticky top-0 h-dvh overflow-hidden" : "min-h-dvh py-32"
        } flex items-center`}
      >
        {/* Background: colour blooms, bottom fade, scroll veil */}
        <div className="absolute inset-0 -z-10 bg-ink">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]">
            <div
              className="absolute left-[-10%] top-[-20%] h-[115vh] w-[80vh] rounded-full opacity-40 blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute bottom-[-15%] right-[-5%] h-[115vh] w-[55vh] rounded-full opacity-25 blur-[130px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute right-[18%] top-[8%] h-[60vh] w-[40vh] rounded-full opacity-[0.14] blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, #ffb938 0%, transparent 70%)",
              }}
            />
          </div>
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink via-ink/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
          <motion.div
            style={{ opacity: pinned ? veilOpacity : 0 }}
            className="absolute inset-0 bg-ink"
          />
        </div>

        <div className="shell w-full">
          <motion.div
            className="relative"
            style={{ opacity: pinned ? contentOpacity : 1 }}
          >
            {/* Soft light behind the type, breathing on a long cycle */}
            <motion.div
              aria-hidden="true"
              animate={reduceMotion ? {} : { opacity: [0.3, 0.55, 0.3] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-0 top-[38%] h-[80vh] w-[55vh] -translate-y-1/2 rounded-full blur-[120px] md:h-[115vh]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                opacity: 0.3,
                willChange: "opacity",
              }}
            />

            <motion.p {...rise(0.1)} className="section-label relative">
              {h.eyebrow}
            </motion.p>

            <motion.div
              style={{
                scale: pinned ? headlineScale : 1,
                y: pinned ? headlineY : 0,
                transformOrigin: "left center",
                filter:
                  "drop-shadow(0 2px 2px rgba(0,0,0,0.7)) drop-shadow(0 10px 14px rgba(0,0,0,0.5)) drop-shadow(0 28px 44px rgba(0,0,0,0.6))",
              }}
              className="relative mt-6 md:mt-8"
            >
              <h1 className="-ml-[0.06em] font-display text-[clamp(3rem,13.5vw,13rem)] font-medium italic leading-[0.9] tracking-[-0.055em] text-paper md:text-[clamp(4.5rem,11vw,12rem)]">
                <span
                  className={`block pb-[0.12em] -mb-[0.12em] pr-[0.08em] ${
                    intro ? "overflow-hidden" : ""
                  }`}
                >
                  <motion.span
                    initial={intro ? { y: "100%" } : false}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    {lineOne}
                  </motion.span>
                </span>
                <span
                  className={`flex items-baseline gap-2 pb-[0.14em] -mb-[0.14em] pr-[0.08em] md:gap-4 ${
                    intro ? "overflow-hidden" : ""
                  }`}
                >
                  <motion.span
                    initial={intro ? { y: "100%" } : false}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-block"
                  >
                    <span className="buzz-word">{h.h1Mark}</span>
                    {h.h1After}
                  </motion.span>
                  <GrowthArrow
                    size={40}
                    sizeDesktop={104}
                    className="-mb-[6px] -ml-5 md:-mb-[13px] md:-ml-10"
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              {...rise(0.6)}
              className="mt-7 max-w-xl text-base leading-relaxed text-paper/75 md:mt-9 md:text-lg"
            >
              {h.sub}
            </motion.p>

            <motion.div
              {...rise(0.75)}
              className="relative mt-9 flex flex-wrap items-center gap-3 md:mt-11 md:gap-4"
            >
              <Button
                href={path("contact", lang)}
                variant="primary"
                size="lg"
                className="w-[15.5rem] justify-between md:w-[18rem]"
              >
                {c.common.freeAudit}
              </Button>
              <Button
                href="#services"
                variant="ghost"
                size="lg"
                className="w-[15.5rem] justify-between md:w-[18rem]"
              >
                {c.common.seeServices}
              </Button>
            </motion.div>

            <motion.p {...rise(0.9)} className="mt-6 text-sm text-muted">
              {h.note}
            </motion.p>
          </motion.div>
        </div>

        {/* Scroll cue, fades as soon as the visitor starts scrolling */}
        <motion.div
          style={{ opacity: pinned ? contentOpacity : 1 }}
          className="absolute inset-x-0 bottom-10 hidden justify-center md:flex"
        >
          <motion.div
            initial={intro ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="flex flex-col items-center gap-3"
          >
            <span className="h-10 w-px bg-gradient-to-b from-accent-soft to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
