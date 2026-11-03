"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Item = { src: string; name: string };

/*
  A slow, endless strip of photo cards.

  It is a real horizontally scrolling box, so a phone can swipe it and a
  mouse can drag or use a trackpad. On top of that it drifts by itself,
  pauses while someone hovers, touches or focuses it, and picks up again a
  moment after they let go. It only moves while on screen, and not at all
  for visitors who asked for reduced motion (they can still swipe).

  The loop works with three identical copies of the cards. The visitor is
  always kept inside the middle copy, and whenever they cross into the
  first or third copy the box jumps one copy's width, which looks identical,
  so there is no end to reach.
*/
export function TradeStrip({ items }: { items: Item[] }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;

    const copy = () => el.scrollWidth / 3;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* Start at the first card of the middle copy */
    el.scrollLeft = copy();

    let raf = 0;
    let last = 0;
    let pos = el.scrollLeft;
    let paused = false;
    let visible = false;
    let timer: number | undefined;
    const speed = 30; /* pixels per second */

    function keepInMiddle() {
      const c = copy();
      if (el!.scrollLeft >= c * 2) el!.scrollLeft -= c;
      else if (el!.scrollLeft < c) el!.scrollLeft += c;
    }

    function tick(t: number) {
      raf = requestAnimationFrame(tick);
      if (!last) {
        last = t;
        return;
      }
      const dt = Math.min(t - last, 64);
      last = t;
      if (paused || !visible) return;
      pos += (speed * dt) / 1000;
      const c = copy();
      if (pos >= c * 2) pos -= c;
      el!.scrollLeft = pos;
    }

    function hold() {
      paused = true;
      window.clearTimeout(timer);
    }
    function release(delay: number) {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        pos = el!.scrollLeft;
        paused = false;
      }, delay);
    }

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType !== "touch") hold();
    };
    const onLeave = (e: PointerEvent) => {
      if (e.pointerType !== "touch") release(300);
    };
    const onTouchStart = () => hold();
    const onTouchEnd = () => release(2500);
    const onWheel = () => {
      hold();
      release(2500);
    };
    const onFocusIn = () => hold();
    const onFocusOut = () => release(300);
    const onScroll = () => {
      /* Only the visitor's own scrolling needs the loop kept tidy */
      if (paused) keepInMiddle();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: true });
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    el.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) pos = el.scrollLeft;
      },
      { threshold: 0.1 },
    );
    observer.observe(el);

    if (!reduce) raf = requestAnimationFrame(tick);
    else paused = true;

    /* Fonts and images can change the width after the first paint */
    const onResize = () => {
      pos = el.scrollLeft;
      keepInMiddle();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={box}
      className="flex overflow-x-auto overscroll-x-contain [-webkit-mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {[0, 1, 2].map((copyIndex) => (
        <ul
          key={copyIndex}
          aria-hidden={copyIndex !== 1}
          className="flex shrink-0 gap-4 pr-4"
        >
          {items.map((item) => (
            <li
              key={item.src}
              className="group relative aspect-[436/364] w-[72vw] max-w-[22rem] shrink-0 overflow-hidden rounded-[3px] border border-line md:w-[22rem]"
            >
              <Image
                src={item.src}
                alt=""
                width={436}
                height={364}
                sizes="(max-width: 767px) 72vw, 22rem"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                draggable={false}
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent"
              />
              <span className="absolute bottom-3 left-4 right-4 flex items-center gap-3 font-display text-lg font-medium tracking-[-0.02em] text-paper">
                <span className="h-px w-5 bg-[#ffb938] transition-all duration-500 group-hover:w-9" />
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
