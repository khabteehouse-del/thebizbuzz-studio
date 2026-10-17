"use client";

import { useEffect } from "react";

/*
  Pauses every CSS animation inside a section while that section is off
  screen. Looping effects (glowing dashes, icon draws, the button fuse,
  the stars) were running all the time, including on parts of the page
  nobody could see, and on phones that is what made scrolling heavy.

  It sets data-offscreen on each <section> when it leaves the viewport
  (with a margin, so animations are already running by the time you
  arrive). globals.css does the actual pausing.
*/
export function OffscreenPause() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.removeAttribute("data-offscreen");
          } else {
            entry.target.setAttribute("data-offscreen", "");
          }
        }
      },
      { rootMargin: "150px 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return null;
}
