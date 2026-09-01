"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/shared/magnetic";
import { useMediaQuery } from "@/components/shared/use-media-query";
import { site } from "@/data/site";

/*
  The hero pins while the page scrolls past it, then releases.
  The outer section is taller than the viewport; the inner panel is sticky.
  Scroll progress across that extra height drives the type transform.

  Pinning is desktop only. On touch devices a stuck viewport reads as a
  broken page, so small screens get the same hero without the pin.
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

  const words = ["Where", "Brand", "Meets", "Intelligence"];

  return (
    <section
      ref={ref}
      className={pinned ? "relative h-[200vh]" : "relative"}
      aria-label="Introduction"
    >
      <div
        className={`${
          pinned ? "sticky top-0" : ""
        } flex h-dvh items-center overflow-hidden`}
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
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          >
            <source src="/video/hero.webm" type="video/webm" />
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
          <motion.div style={{ opacity: pinned ? contentOpacity : 1 }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="section-label"
            >
              Creative and technology studio
            </motion.p>

            <motion.h1
              style={{
                scale: pinned ? headlineScale : 1,
                y: pinned ? headlineY : 0,
                transformOrigin: "left center",
              }}
              className="mt-8 max-w-5xl font-display text-[3.25rem] font-medium leading-[1.02] tracking-[-0.045em] text-paper md:text-8xl lg:text-[8.5rem]"
            >
              {words.map((word, index) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
                >
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + index * 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                  {index < words.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 max-w-lg text-base leading-relaxed text-muted md:text-lg"
            >
              We build brands, products and AI systems for companies that
              intend to outgrow their market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 flex flex-wrap items-center gap-4"
            >
              <Magnetic strength={14}>
                <Link
                  href="#contact"
                  className="inline-flex h-13 items-center rounded-sm bg-accent px-8 py-4 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-soft"
                >
                  Start a project
                </Link>
              </Magnetic>

              <Magnetic strength={14}>
                <Link
                  href="#work"
                  className="inline-flex h-13 items-center rounded-sm border border-line px-8 py-4 text-sm font-medium text-paper transition-colors duration-200 hover:border-paper/40 hover:bg-paper/5"
                >
                  See our work
                </Link>
              </Magnetic>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue, fades out as soon as the visitor starts scrolling */}
        <motion.div
          style={{ opacity: pinned ? contentOpacity : 1 }}
          className="absolute inset-x-0 bottom-10 flex justify-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
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
