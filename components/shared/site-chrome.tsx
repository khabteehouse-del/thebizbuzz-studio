"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/*
  Wraps the BizBuzz site shell (nav, footer, cursor, grain, smooth scroll
  and the page wrapper). Client demo pages under /demo carry their own
  design, so none of the BizBuzz chrome should appear on them.
*/
export function SiteChrome({
  top,
  bottom,
  floating,
  children,
}: {
  top: ReactNode;
  bottom: ReactNode;
  floating: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        className="page-wrap"
        style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
      >
        {top}
        <main>{children}</main>
        {bottom}
      </div>
      {floating}
    </>
  );
}
