"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/shared/magnetic";
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
/*
  Playback speed for the background loop.
  1 is the file's native speed, 0.5 is half, 0.25 is a quarter.
  Slowing it here costs nothing: same file, no re-encode, no quality loss.
*/
const VIDEO_SPEED = 0.5;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const pinned = isDesktop && !reduceMotion;

  /*
    Entry animations run on desktop only.

    Every one of them starts the element hidden: the words sit at y 100%
    behind a mask, everything else at opacity 0. If the animation does
    not run, the content stays hidden. That is exactly what happened on
    mobile. So on phones nothing animates in, it is simply there.
  */
  const intro = isDesktop && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Applied on mount and again on load, since some browsers
    // reset playbackRate when the source finishes buffering
    function applySpeed() {
      if (video) video.playbackRate = VIDEO_SPEED;
    }

    applySpeed();
    video.addEventListener("loadeddata", applySpeed);
    return () => video.removeEventListener("loadeddata", applySpeed);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
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
      className={pinned ? "relative h-[200vh]" : "relative"}
      aria-label="Introduction"
    >
      <div
        className={`${
          pinned ? "sticky top-0 h-dvh overflow-hidden" : "min-h-dvh py-32"
        } flex items-center`}
      >
        {/* Background stack: video, colour blooms, bottom fade, scroll veil */}
        <div className="absolute inset-0 -z-10 bg-ink">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-poster.jpg"
            className="absolute inset-0 h-full w-full object-cover opacity-40 md:fixed md:-z-10"
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>

          {/* Navy bloom, off-centre so the composition is not symmetrical */}
          <div
            className="absolute left-[-10%] top-[-20%] h-[80vh] w-[80vh] rounded-full opacity-40 blur-[120px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-navy) 0%, transparent 70%)",
            }}
          />

          {/* Accent bloom, smaller and lower right */}
          <div
            className="absolute bottom-[-15%] right-[-5%] h-[55vh] w-[55vh] rounded-full opacity-25 blur-[130px]"
            style={{
              background:
                "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
            }}
          />

          {/* Top scrim: gives the nav something to sit on over the video */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink via-ink/60 to-transparent" />

          {/* Bottom fade so the hero dissolves into the next section */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink to-transparent" />

          {/* Darkens as you scroll, so the headline hands off cleanly */}
          <motion.div
            style={{ opacity: pinned ? veilOpacity : 0 }}
            className="absolute inset-0 bg-ink"
          />
        </div>

        <div className="shell w-full">
          <motion.div className="relative" style={{ opacity: pinned ? contentOpacity : 1 }}>
            <motion.p
              initial={intro ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-label"
            >
              Creative and technology studio
            </motion.p>

            {/*
              Soft light behind the type, breathing on a long cycle.
              A blurred radial has no edges by definition, so it cannot
              produce the hard band a gradient sweep does. Only opacity
              animates, which the compositor handles without re-rendering
              the blur.
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
              className="pointer-events-none absolute left-0 top-[38%] h-[45vh] w-[55vh] -translate-y-1/2 rounded-full blur-[120px]"
              style={{
                background:
                  "radial-gradient(circle, var(--color-accent) 0%, transparent 70%)",
                opacity: 0.35,
                willChange: "opacity",
              }}
            />

            <div className="mt-6 flex items-end gap-3 md:mt-8 md:gap-5">
              <motion.h1
                style={{
                  scale: pinned ? headlineScale : 1,
                  y: pinned ? headlineY : 0,
                  transformOrigin: "left center",
                }}
              className="relative flex font-display text-[clamp(3rem,16vw,16rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper md:text-[clamp(5.5rem,15vw,16rem)]"
            >
              {words.map((word, index) => (
                <span
                  key={word.text}
                  className={`inline-block pb-[0.14em] -mb-[0.14em] align-bottom ${
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
                    className={`inline-block ${
                      word.accent ? "text-accent" : "text-paper"
                    }`}
                  >
                    {word.text}
                  </motion.span>
                </span>
              ))}
              </motion.h1>

              {/*
                Sits at the end of the word, matching the logo where the
                growth mark rises off the final letter rather than
                leading the name.
              */}
              <GrowthArrow
                size={38}
                sizeDesktop={96}
                className="mb-[0.18em]"
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
              className="mt-5 font-display text-lg font-medium tracking-[-0.015em] text-paper/70 md:mt-7 md:text-3xl"
            >
              Where Brand Meets Intelligence
            </motion.p>

            <motion.p
              initial={intro ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6 max-w-md text-sm leading-relaxed text-muted md:mt-8 md:text-base"
            >
              A creative and technology studio in Karachi and Dubai. We get
              businesses found, and we build what people find when they get
              there.
            </motion.p>

            <motion.div
              initial={intro ? { opacity: 0, y: 16 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.78,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-wrap items-center gap-3 md:mt-11 md:gap-4"
            >
              <Magnetic strength={14}>
                <Button href="#contact" variant="primary" size="lg">
                  Start a project
                </Button>
              </Magnetic>

              <Magnetic strength={14}>
                <Button href="#work" variant="ghost" size="lg">
                  See our work
                </Button>
              </Magnetic>
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
