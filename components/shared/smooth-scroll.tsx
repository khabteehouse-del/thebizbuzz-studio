"use client";

import { useEffect } from "react";
import type Lenis from "lenis";

/*
  Mounts Lenis once for the whole app.
  Every scroll animation built from Phase 3 onward is tuned against
  this momentum curve, which is why it lands in the shell and not in polish.
*/
export function SmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    /*
      Lenis loads after the first paint, when the browser is idle, so it
      stays out of the first load. Until it is ready the page scrolls
      natively, and anchor links fall back to the browser.
    */
    let lenis: Lenis | null = null;
    let frame = 0;
    let cancelled = false;

    function raf(time: number) {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    }

    function start() {
      import("lenis").then(({ default: LenisClass }) => {
        if (cancelled) return;
        lenis = new LenisClass({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 1.6,
        });
        frame = requestAnimationFrame(raf);
      });
    }

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 800);

    // Anchor links need to go through Lenis, not the browser
    function handleAnchorClick(event: MouseEvent) {
      const target = (event.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      if (!lenis) return;
      const element = document.querySelector(href);
      if (!element) return;

      event.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -80 });
    }

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      cancelAnimationFrame(frame);
      document.removeEventListener("click", handleAnchorClick);
      lenis?.destroy();
    };
  }, []);

  return null;
}
