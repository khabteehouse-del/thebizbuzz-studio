"use client";

import { useEffect, useRef, useState } from "react";
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

  /*
    Which video file to load. Chosen once on mount, so a desktop never
    downloads the phone file and a phone never downloads the desktop one.
    Until then the poster shows, which is also the video's own poster, so
    nothing visibly changes when the video takes over.
  */
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    setVideoSrc(desktop ? "/video/hero.mp4" : "/video/hero-mobile.mp4");
  }, []);

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
  }, [videoSrc]);

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
          pinned ? "sticky top-0 h-dvh overflow-hidden" : "min-h-dvh py-32"
        } flex items-center`}
      >
        {/* Background stack: video, colour blooms, bottom fade, scroll veil */}
        <div className="absolute inset-0 -z-10 bg-ink">
          {/*
            Everyone gets the loop. Desktop loads the 1080p file, phones load
            a smaller portrait file cropped from the centre of the same video.

            The video is absolute inside the hero, not fixed. This page sits
            inside a transformed wrapper (layout.tsx), and a fixed element
            inside a transform is sized to the whole page, which zoomed the
            video about 8x and turned the fine dots into blurry blobs.

            Its width is capped at 2000px and it sits centred. On ultrawide
            screens it is not stretched to fill the width; the side edges
            fade into the background instead (see .hero-video in globals.css).
          */}
          {/*
            Video and colour blooms sit in one masked layer that fades to
            nothing at the bottom, so the hero ends on the plain page
            colour instead of on the edge of the video. The next section
            is opaque ink, so any leftover tint here showed as a hard line.
          */}
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_55%,transparent_100%)]">
            {videoSrc ? (
              <video
                key={videoSrc}
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster="/images/hero-poster.jpg"
                src={videoSrc}
                className="hero-video pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-[2000px] -translate-x-1/2 object-cover opacity-40"
              />
            ) : (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-40"
                style={{ backgroundImage: "url(/images/hero-poster.jpg)" }}
              />
            )}

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

            <div className="mt-6 flex items-end gap-3 md:mt-8 md:gap-5">
              <motion.h1
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
                    "drop-shadow(0 2px 3px rgba(0,0,0,0.55)) drop-shadow(0 20px 36px rgba(0,0,0,0.5))",
                }}
              className="relative flex italic font-display text-[clamp(3rem,16vw,16rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper md:text-[clamp(5.5rem,15vw,16rem)]"
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
              </motion.h1>

              {/*
                Sits at the end of the word, matching the logo where the
                growth mark rises off the final letter rather than
                leading the name.
              */}
              <GrowthArrow
                size={38}
                sizeDesktop={96}
                className="mb-[0.3em]"
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



