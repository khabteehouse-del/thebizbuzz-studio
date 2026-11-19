"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import { Btn, CallButton } from "./ui";
import { brand } from "./data";

/* Shared so the tabs can drive the same smooth scroller. */
export const lenisRef: { current: Lenis | null } = { current: null };

export function scrollToY(y: number) {
  if (lenisRef.current) lenisRef.current.scrollTo(y, { duration: 1.5 });
  else window.scrollTo({ top: y, behavior: "smooth" });
}

/*
  Page shell: smooth scroll, reveal-on-scroll, progress line, floating
  header and the phone book bar.

  Reveal safety (same lesson as the BizBuzz site): content is visible in the
  server HTML. JS only arms the hidden state after mount, and a timer
  forces everything visible if the observer never fires.
*/
export function Shell({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [hide, setHide] = useState(false);
  const [bar, setBar] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"));

    const showAll = () => items.forEach((n) => n.classList.add("is-in"));
    let io: IntersectionObserver | null = null;
    let timer = 0;

    if (reduce || typeof IntersectionObserver === "undefined") {
      showAll();
    } else {
      el.dataset.js = "1";
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
      );
      items.forEach((n) => io!.observe(n));
      timer = window.setTimeout(showAll, 4000);
    }

    let lenis: Lenis | null = null;
    let frame = 0;
    if (!reduce) {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });
      lenisRef.current = lenis;
      const raf = (t: number) => {
        lenis?.raf(t);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    const onAnchor = (ev: MouseEvent) => {
      const a = (ev.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      ev.preventDefault();
      scrollToY(target.getBoundingClientRect().top + window.scrollY - 10);
    };
    document.addEventListener("click", onAnchor);

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHide(y > last && y > 240);
      setBar(y > window.innerHeight * 0.7);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      io?.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("scroll", onScroll);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div ref={root} className="pj">
      <motion.div className="pj-progress" style={{ scaleX: progress }} />

      <header className={`pj-head${hide ? " hide" : ""}`}>
        <div className="bar">
          <a href="#top" className="pj-logo" aria-label="Pretty Jin Aesthetics, home">
            {brand.name}
            <small>Aesthetics</small>
          </a>
          <nav className="pj-nav" aria-label="Sections">
            <a href="#milkyway">Milkyway</a>
            <a href="#services">Services</a>
            <a href="#menu">Treatments</a>
            <a href="#visit">Visit</a>
          </nav>
          <Btn label="Book now" />
        </div>
      </header>

      {children}

      <div className={`pj-bar${bar ? " show" : ""}`}>
        <Btn label="Book on Messenger" />
        <CallButton />
      </div>
    </div>
  );
}
