"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { Btn, Lines, Up } from "./ui";
import { Orb, Petals, useHeroScroll, useSceneParallax } from "./scene";
import { brand } from "./data";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const { scrollYProgress, bgY, bgScale, copyY, copyOpacity } = useHeroScroll(ref);
  useSceneParallax(scene);

  return (
    <section ref={ref} id="top" className="pj-hero">
      {/* Replace hero-desktop.webp and hero-mobile.webp with the generated images, same file names. */}
      <motion.div className="bg" style={{ y: bgY, scale: bgScale }}>
        <picture>
          {/* Phone uses the desktop image for now. When the matching 4:5 hero exists, restore:
              <source media="(max-width: 760px)" srcSet="/images/pretty-jin/hero-mobile.webp" /> */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/pretty-jin/hero-desktop.webp"
            alt="A woman with glowing, even skin in a soft spa robe"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </motion.div>

      <div ref={scene} className="pj-scene" aria-hidden>
        <Orb size="clamp(120px, 19vw, 280px)" x="64%" y="12%" depth={1.4} scroll={scrollYProgress} rise={160} orb="#fff, #f9c4d0 50%, #e58aa5" dur={10} />
        <Orb size="clamp(54px, 8vw, 120px)" x="52%" y="62%" depth={2} scroll={scrollYProgress} rise={260} orb="#fff, #f3dfae 50%, #d9a94a" delay={1.2} dur={8} />
        <Orb size="clamp(90px, 12vw, 190px)" x="84%" y="58%" depth={0.8} scroll={scrollYProgress} rise={90} orb="#fff, #f7b9c8 55%, #d9738f" delay={0.6} dur={11} blur={1.5} />
        <Orb size="clamp(30px, 4vw, 60px)" x="72%" y="40%" depth={2.4} scroll={scrollYProgress} rise={320} orb="#fff, #f3dfae 50%, #c9a15b" delay={2} dur={7} />
      </div>
      <Petals count={26} />

      <div className="wrap">
        <motion.div className="copy" style={{ y: copyY, opacity: copyOpacity }}>
          <Up>
            <span className="eyebrow">North Caloocan &middot; Korean-inspired aesthetics</span>
          </Up>
          <Lines
            as="h1"
            lines={[<>Radiance,</>, <span key="r" className="em">refined.</span>]}
          />
          <Up d={2}>
            <p className="lead">
              Facials, laser, body care and our signature Milkyway glow, in a calm,
              clean studio built around you.
            </p>
          </Up>
          <Up d={3} className="cta">
            <Btn />
            <Btn variant="ghost" label="Discover Milkyway" href="#milkyway" external={false} />
          </Up>
        </motion.div>
      </div>

      <div className="scroll-cue" aria-hidden>
        <i /> Scroll
      </div>
      <span className="sr-only" style={{ position: "absolute", left: -9999 }}>
        {brand.full}
      </span>
    </section>
  );
}
