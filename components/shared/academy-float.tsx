"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { ACADEMY_OFFER_PERCENT } from "@/data/academy";
import { CapIcon } from "@/components/academy/icons";

/*
  Floating BizBuzz Academy button, fixed on the right edge, half way down.
  It stays hidden on first load and slides in once a visitor has scrolled
  about one screen. A small close button hides it for the rest of the visit.
  It is not shown on the Academy page itself. No magnet or drift on hover.
  Styles: .acfloat in app/globals.css.
*/

const STORAGE_KEY = "bizbuzz-academy-float-closed";

export function AcademyFloat() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") setClosed(true);
    } catch {
      /* Storage can be blocked. The button just shows again on the next page. */
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.9) setScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/academy")) return null;

  const close = () => {
    setClosed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Not critical. */
    }
  };

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
          <span className="acfloat-title">BizBuzz Academy</span>
          <span className="acfloat-sub">{ACADEMY_OFFER_PERCENT}% launch offer</span>
        </span>
      </Link>
      <button
        type="button"
        className="acfloat-close"
        onClick={close}
        aria-label="Hide the BizBuzz Academy button"
        tabIndex={scrolled && !closed ? 0 : -1}
      >
        <X size={12} aria-hidden="true" />
      </button>
    </div>
  );
}
