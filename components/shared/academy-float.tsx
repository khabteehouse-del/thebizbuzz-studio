"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CapIcon } from "@/components/academy/icons";

/*
  Floating BizBuzz Academy graduate cap with a small label under it. It keeps
  the same right inset as the Google Business Profile launcher, stays hidden
  on first load, and slides in once a visitor has scrolled about one
  screen. Tapping it opens the Academy page. It is not shown on the Academy
  page itself. No magnet or drift on hover.
  Styles: .acfloat in app/globals.css.
*/

export function AcademyFloat() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
    <div className="acfloat" data-show={scrolled} aria-hidden={!scrolled}>
      <Link
        href="/academy"
        className="acfloat-link"
        aria-label="BizBuzz Academy"
        tabIndex={scrolled ? 0 : -1}
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
    </div>
  );
}
