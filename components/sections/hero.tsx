"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "@/components/shared/button";
import { GrowthArrow } from "@/components/shared/growth-arrow";
import { useMediaQuery } from "@/components/shared/use-media-query";
import { site } from "@/data/site";

/*
  The hero pins while the page scrolls past it, then releases.
  The outer section is taller than the viewport; the inner panel is sticky.
  Scroll progress across that extra height drives the type transform.

  Pinning is desktop only. On touch devices a stuck viewport reads as a
  broken page, so small screens get the same hero without the pin.

  Unpinned, the panel uses min-height rather than a fixed height and
  drops overflow-hidden. On a phone the wordmark, tagline, paragraph and
  two buttons are taller than the screen, and a fixed height with
  overflow hidden simply cut the bottom off.
*/
/* Pre-selects the pathway in the enquiry form before the page scrolls to it */
function choosePathway(pathway: "local" | "ai") {
  window.dispatchEvent(new CustomEvent("enquiry-pathway", { detail: pathway }));
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const isWide = useMediaQuery("(min-width: 1280px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  /*
    Pinning needs the whole hero to fit inside one screen height. On a
    short window (a laptop with a small browser, or a resized window) the
    content is taller than the screen, and the fixed-height pinned panel
    cut the top of the headline off under the nav. Below this height the
    hero falls back to the normal flowing layout, so nothing is clipped.
  */
  const tallEnough = useMediaQuery("(min-height: 780px)");
  const pinned = isWide && tallEnough && !reduceMotion;

  /*
    Entry animations run on desktop only.

    Every one of them starts the element hidden: the words sit at y 100%
    behind a mask, everything else at opacity 0. If the animation does
    not run, the content stays hidden. That is exactly what happened on
    mobile. So on phones nothing animates in, it is simply there.
  */
  const intro = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.92], [1, 0]);
  const veilOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.65]);

  /*
    The name is the hero now, not a sentence about it.

    Biz carries the brand and creative half, Buzz the technology half,
    and the tagline sits underneath as the line it actually is. Having
    the headline here AND an oversized wordmark in the next section was
    two openings competing with each other.
  */
  const words = [
    { text: "Biz", accent: false },
    { text: "Buzz", accent: true },
  ];

  return (
    <section
      ref={ref}
      className={pinned ? "relative h-[106vh]" : "relative"}
      aria-label="Introduction"
    >
      <div
        className={`${
          pinned
            ? "sticky top-0 h-dvh overflow-hidden"
            : "pb-16 xl:min-h-dvh xl:py-32"
        } flex flex-col xl:flex-row xl:items-center`}
      >
        {/* Background stack: colour blooms and bottom fade. The banner sits above it. */}
        <div className="absolute inset-0 -z-10 bg-ink">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]">
            {/* Navy bloom, off-centre so the composition is not symmetrical */}
            <div
              className="absolute left-[-10%] top-[-20%] h-[115vh] w-[80vh] rounded-full opacity-40 blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)",
              }}
            />

            {/* Accent bloom, smaller and lower right */}
            <div
              className="absolute bottom-[-15%] right-[-5%] h-[115vh] w-[55vh] rounded-full opacity-25 blur-[130px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Top scrim: gives the nav something to sit on over the banner */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink via-ink/60 to-transparent" />

          {/* Bottom fade so the hero dissolves into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />
        </div>

        {/*
          The banner replaces the old background video.

          Wide screens (1280 and up): the image is as tall as the hero and
          pinned to the right edge and nudged down a little so the heads clear the nav, and
          the calm dark left side carries the headline. Its left edge is
          feathered into the page colour, so there is no visible edge.

          Below that the banner sits on top and the text follows beneath it,
          the same stacked layout the Academy page uses. Phones show a
          4:3 crop taken from the right so the founders are never cut off.
        */}
        <div className="relative z-0 w-full pt-24 xl:absolute xl:inset-0 xl:overflow-hidden xl:pt-0">
          <div className="hero-banner-mask relative aspect-[4/3] w-full sm:aspect-[16/9] xl:absolute xl:right-0 xl:top-[10%] xl:h-full xl:w-auto">
            {/* Phones: same banner with the wall logo removed, so no half-cut logo shows. */}
            <Image
              src="/images/hero/banner-mobile.webp"
              alt="Faraz Akhtar and Amrit Hayat, the founders of BizBuzz"
              fill
              fetchPriority="high"
              sizes="134vw"
              quality={90}
              className="hero-banner-img object-cover object-right sm:hidden"
            />
            {/* Tablet and desktop: the full banner with the logo. */}
            <Image
              src="/images/hero/banner.webp"
              alt="Faraz Akhtar and Amrit Hayat, the founders of BizBuzz"
              fill
              fetchPriority="high"
              sizes="(min-width: 1280px) 1600px, 100vw"
              quality={90}
              className="hero-banner-img hidden object-cover object-right sm:block"
            />
          </div>
          {/* Wide screens: darkens the left so the text stays easy to read over the blurred background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,#0a0e1a_0%,rgba(10,14,26,0.88)_26%,rgba(10,14,26,0.45)_40%,transparent_54%)] xl:block"
          />
        </div>

        {/* Darkens as you scroll, so the headline hands off cleanly */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: pinned ? veilOpacity : 0 }}
          className="pointer-events-none absolute inset-0 z-[5] bg-ink"
        />

        <div className="shell relative z-10 -mt-3 w-full sm:-mt-8 xl:mt-0">
          <motion.div className="relative" style={{ opacity: pinned ? contentOpacity : 1 }}>
            {/*
              Soft light behind the type, breathing on a long cycle.
              A blurred radial has no edges by definition, so it cannot
              produce the hard band a gradient sweep does. Only opacity
              animates, which the compositor handles without re-rendering
              the blur.

              This glow is not part of the background stack, so it is not
              covered by the bottom fade. On a phone it was tall enough to
              reach past the end of the hero, where the next section (solid
              ink) cut it off in a straight line. It is shorter below the
              md breakpoint. No mask here: a mask clips to the element's
              box and cut the blur into a visible rectangle.
            */}
            <motion.div
              aria-hidden="true"
              animate={
                reduceMotion ? {} : { opacity: [0.35, 0.6, 0.35] }
              }
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute left-0 top-[38%] h-[80vh] w-[55vh] -translate-y-1/2 rounded-full blur-[120px] md:h-[115vh]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                opacity: 0.35,
                willChange: "opacity",
              }}
            />

            <div className="flex items-baseline gap-3 md:gap-5">
              <motion.div
                style={{
                  scale: pinned ? headlineScale : 1,
                  y: pinned ? headlineY : 0,
                  transformOrigin: "left center",
                  /*
                    Depth without decoration: a tight contact shadow for
                    weight, and a wide soft one so the word lifts off the
                    background. On the headline rather than per word,
                    because the gradient Buzz needs a filter, not
                    text-shadow, and its buzz animation owns its own filter.
                  */
                  filter:
                    "drop-shadow(0 2px 2px rgba(0,0,0,0.7)) drop-shadow(0 10px 14px rgba(0,0,0,0.5)) drop-shadow(0 28px 44px rgba(0,0,0,0.6))",
                }}
              className="relative -ml-[0.12em] flex italic font-display text-[clamp(3rem,16vw,16rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper md:text-[clamp(5.5rem,15vw,16rem)] xl:text-[clamp(5rem,7.4vw,8.5rem)]"
            >
              {words.map((word, index) => (
                <span
                  key={word.text}
                  className={`inline-block pb-[0.14em] -mb-[0.14em] pr-[0.08em] align-bottom ${
                    intro ? "overflow-hidden" : ""
                  }`}
                >
                  <motion.span
                    initial={intro ? { y: "100%" } : false}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {word.accent ? (
                      <span className="buzz-word">{word.text}</span>
                    ) : (
                      word.text
                    )}
                  </motion.span>
                </span>
              ))}
              </motion.div>

              {/*
                Sits at the end of the word, matching the logo where the
                growth mark rises off the final letter rather than
                leading the name. The row aligns on the text baseline, so
                the arrow rests on the bottom of the last Z whatever font
                is loaded. The negative bottom margin drops the arrow's box
                by the share of its height that sits under the tail.
              */}
              <GrowthArrow
                size={38}
                sizeDesktop={64}
                className="-mb-[5.5px] -ml-6 md:-mb-[8px] md:-ml-8"
              />
            </div>

            <motion.p
              initial={intro ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-5 font-display text-lg font-medium tracking-[-0.015em] text-paper/90 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] md:mt-7 md:text-3xl"
            >
              Where Brand Meets Intelligence
            </motion.p>

            <motion.div
              initial={intro ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-md text-justify text-sm leading-relaxed text-muted md:mt-8 md:text-left md:text-base"
            >
              {/* The page heading. Styled exactly like the text around it, so it reads as part of the paragraph. */}
              <h1 className="inline">
                Digital Marketing Services &amp; AI Solutions for companies in
                the US, the Gulf and Pakistan.
              </h1>{" "}
              Scoped in writing, built in measured phases, handed over fully
              owned.
            </motion.div>

            <motion.div
              initial={intro ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.78,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mt-9 flex flex-wrap items-center gap-3 md:mt-11 md:gap-4"
            >
              <span onClickCapture={() => choosePathway("local")}>
                <Button
                  href="#contact"
                  variant="primary"
                  size="lg"
                  className="w-[15rem] justify-between md:w-[17rem] xl:w-[13.5rem]"
                >
                  For local businesses
                </Button>
              </span>

              <span onClickCapture={() => choosePathway("ai")}>
                <Button
                  href="#contact"
                  variant="ghost"
                  size="lg"
                  className="w-[15rem] justify-between md:w-[17rem] xl:w-[13.5rem]"
                >
                  For AI and software
                </Button>
              </span>

              {/* The Google Business Profile check launcher lands here on wide screens, under the buttons so it stays clear of the banner */}
              <div
                id="gbp-hero-slot"
                className="hidden xl:block xl:basis-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue, fades out as soon as the visitor starts scrolling */}
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
            <span className="section-label before:hidden">Scroll</span>
            <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
          </motion.div>
        </motion.div>

        <span className="sr-only">{site.tagline}</span>
      </div>
    </section>
  );
}



