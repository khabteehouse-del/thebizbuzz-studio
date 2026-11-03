"use client";

import { useRef } from "react";
import Image from "next/image";
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
  const personY = useTransform(scrollYProgress, [0, 1], [0, -50]);

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

        {/* The business owner, standing against the headline (desktop) */}
        <motion.div
          aria-hidden="true"
          initial={intro ? { opacity: 0, x: 60 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{
            opacity: pinned ? contentOpacity : 1,
            y: pinned ? personY : 0,
          }}
          className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden w-[46%] max-w-[46rem] lg:block"
        >
          <span className="absolute inset-x-[10%] bottom-[8%] top-[6%] rounded-full bg-[#ffb938]/25 blur-[110px]" />
          <Image
            src="/images/hero/worker.webp"
            alt=""
            width={1000}
            height={971}
            priority
            sizes="(min-width: 1024px) 46vw, 0px"
            className="relative h-auto w-full [-webkit-mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_82%,transparent_100%)]"
          />
        </motion.div>

        <div className="shell relative z-10 w-full">
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
              <h1 className="-ml-[0.06em] font-display text-[clamp(2.6rem,11vw,6rem)] font-medium italic leading-[0.92] tracking-[-0.055em] text-paper md:text-[clamp(3.6rem,8.6vw,10rem)]">
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
                    size={34}
                    sizeDesktop={80}
                    className="-mb-[6px] ml-1 md:-mb-[13px] md:ml-3"
                  />
                </span>
              </h1>
            </motion.div>

            <motion.p
              {...rise(0.6)}
              className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 md:mt-7 md:text-lg"
            >
              {h.sub}
            </motion.p>

            <motion.div
              {...rise(0.75)}
              className="relative mt-7 flex flex-wrap items-center gap-3 md:mt-9 md:gap-4"
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

            {/* Phones: the same figure, cropped to the face and the cash */}
            <div
              aria-hidden="true"
              className="relative mx-auto mt-8 h-[19rem] w-full max-w-sm overflow-hidden lg:hidden"
            >
              <span className="absolute inset-x-[12%] top-[8%] h-[70%] rounded-full bg-[#ffb938]/25 blur-[80px]" />
              <Image
                src="/images/hero/worker.webp"
                alt=""
                width={1000}
                height={971}
                sizes="(max-width: 1023px) 24rem, 0px"
                className="relative h-auto w-full [-webkit-mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_70%,transparent_100%)]"
              />
            </div>
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
