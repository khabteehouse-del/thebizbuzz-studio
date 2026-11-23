"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CapIcon } from "@/components/academy/icons";

/*
  Floating BizBuzz Academy graduate cap with a small label under it. It keeps
  the same right inset as the Google Business Profile launcher, stays hidden
  on first load, and slides in once a visitor has scrolled about one
  screen (and slides out again when they scroll back to the top). Tapping it opens the Academy page. A small "Hide" label (no cross) hides it until the page is reloaded. It is not shown on the Academy
  page itself. No magnet or drift on hover.
  Styles: .acfloat in app/globals.css.
*/

export function AcademyFloat() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    /* Shown only once the first screen is behind the visitor, and tucked away
       again when they scroll back up, so it never sits on top of the hero. */
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/academy")) return null;

  const show = scrolled && !closed;

  return (
    <div
      className="acfloat"
      data-show={show}
      aria-hidden={!show}
    >
      <Link
        href="/academy"
        className="acfloat-link"
        aria-label="BizBuzz Academy"
        tabIndex={show ? 0 : -1}
      >
        <span className="acfloat-orb">
          <span className="acfloat-ring" aria-hidden="true" />
          <span className="acfloat-ring acfloat-ring--2" aria-hidden="true" />
          <span className="acfloat-disc">
            <CapIcon className="acfloat-cap" width={30} height={30} />
          </span>
        </span>
        <span className="acfloat-label">BizBuzz Academy</span>
      </Link>
      <button
        type="button"
        className="acfloat-hide"
        onClick={() => setClosed(true)}
        aria-label="Hide the BizBuzz Academy button until the page is reloaded"
        tabIndex={show ? 0 : -1}
      >
        Hide
      </button>
    </div>
  );
}
