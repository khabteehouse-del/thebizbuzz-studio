"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ACADEMY_OFFER_PERCENT } from "@/data/academy";
import { CapIcon } from "@/components/academy/icons";

/*
  Floating BizBuzz Academy button, lined up with the Google Business Profile launcher (above it on phones, below it on larger screens).
  It stays hidden on first load and slides in once a visitor has scrolled
  about one screen. A small "Hide" label (no cross) hides it until the page
  is reloaded, the same as the Google Business Profile launcher.
  It is not shown on the Academy page itself. No magnet or drift on hover.
  Styles: .acfloat in app/globals.css.
*/

export function AcademyFloat() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) setScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/academy")) return null;

  return (
    <div
      className="acfloat"
      data-show={scrolled && !closed}
      aria-hidden={!(scrolled && !closed)}
    >
      <Link
        href="/academy"
        className="acfloat-link"
        aria-label={`BizBuzz Academy, ${ACADEMY_OFFER_PERCENT} percent launch offer`}
        tabIndex={scrolled && !closed ? 0 : -1}
      >
        <span className="acfloat-ico" aria-hidden="true">
          <CapIcon width={20} height={20} />
        </span>
        <span className="acfloat-text">
          <span className="acfloat-sub">{ACADEMY_OFFER_PERCENT}% launch offer</span>
          <span className="acfloat-title">BizBuzz Academy</span>
        </span>
      </Link>
      <button
        type="button"
        className="acfloat-hide"
        onClick={() => setClosed(true)}
        aria-label="Hide the BizBuzz Academy button until the page is reloaded"
        tabIndex={scrolled && !closed ? 0 : -1}
      >
        Hide
      </button>
    </div>
  );
}
