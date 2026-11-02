"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { LogoMark } from "@/components/ui-kit/logo";
import { alternatePath, type Lang } from "@/data/i18n";

/*
  Client component only because it needs the current path (for the language
  switch and the active link) and the open/closed state of the phone menu.
  The server passes in plain strings, so no copy is shipped to the browser
  that this component does not use.
*/

type NavItem = { label: string; href: string };

type Props = {
  lang: Lang;
  brandMain: string;
  brandRest: string;
  homeHref: string;
  homeLabel: string;
  links: NavItem[];
  cta: NavItem;
  switchLabel: string;
  switchAria: string;
  menuOpen: string;
  menuClose: string;
};

export function SiteHeader({
  lang,
  brandMain,
  brandRest,
  homeHref,
  homeLabel,
  links,
  cta,
  switchLabel,
  switchAria,
  menuOpen,
  menuClose,
}: Props) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other: Lang = lang === "en" ? "es" : "en";
  const switchHref = alternatePath(pathname, other);

  function isActive(href: string): boolean {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-canvas/95 backdrop-blur">
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href={homeHref}
          aria-label={homeLabel}
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold tracking-tight text-ink">
              {brandMain}
            </span>
            <span className="mt-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-muted">
              {brandRest}
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-2 text-[0.95rem] font-semibold transition hover:bg-lilac ${
                isActive(item.href) ? "bg-lilac text-violet-deep" : "text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={switchAria}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md border-2 border-ink bg-white px-3 text-sm font-bold text-ink transition hover:bg-sun"
          >
            <Globe size={16} aria-hidden="true" />
            {switchLabel}
          </Link>

          <Link
            href={cta.href}
            className="hidden min-h-11 items-center rounded-md border-2 border-ink bg-coral px-4 text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_var(--color-ink)] md:inline-flex"
          >
            {cta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? menuClose : menuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border-2 border-ink bg-white text-ink lg:hidden"
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t-2 border-ink bg-canvas lg:hidden">
          <nav aria-label="Mobile" className="shell flex flex-col gap-1 py-4">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-md px-3 py-3 text-lg font-bold ${
                  isActive(item.href) ? "bg-lilac text-violet-deep" : "text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex min-h-12 items-center justify-center rounded-md border-2 border-ink bg-coral px-6 py-3 text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)]"
            >
              {cta.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
