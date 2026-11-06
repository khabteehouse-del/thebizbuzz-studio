"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/shared/button";
import { Wordmark } from "@/components/shared/wordmark";
import { alternatePath, type Lang } from "@/data/i18n";

/*
  The BizBuzz header, rebuilt for two languages: fixed, blurs and darkens
  once you scroll, link underlines grow on hover, and the phone menu is a
  portal outside the blurred header so it keeps its full-screen position.
*/

type NavItem = { label: string; href: string };

type Props = {
  lang: Lang;
  brand: string;
  homeHref: string;
  homeLabel: string;
  servicesLabel: string;
  services: NavItem[];
  links: NavItem[];
  cta: NavItem;
  switchLabel: string;
  switchAria: string;
  menuOpen: string;
  menuClose: string;
};

export function Nav({
  lang,
  brand,
  homeHref,
  homeLabel,
  servicesLabel,
  services,
  links,
  cta,
  switchLabel,
  switchAria,
  menuOpen,
  menuClose,
}: Props) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const other: Lang = lang === "en" ? "es" : "en";
  const switchHref = alternatePath(pathname, other);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled ? "border-line bg-ink/80" : "border-paper/[0.06] bg-ink/25"
      }`}
    >
      <nav className="shell flex h-20 items-center justify-between gap-6 md:h-24">
        <Link href={homeHref} aria-label={homeLabel} className="flex items-center">
          <Wordmark name={brand} />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          <li className="group/svc relative">
            <button
              type="button"
              aria-haspopup="true"
              className="flex items-center gap-1.5 text-[0.8125rem] tracking-[0.02em] text-paper/65 transition-colors duration-200 hover:text-paper group-focus-within/svc:text-paper"
            >
              {servicesLabel}
              <ChevronDown
                size={14}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover/svc:rotate-180 group-focus-within/svc:rotate-180"
              />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-5 opacity-0 transition-all duration-200 group-hover/svc:visible group-hover/svc:opacity-100 group-focus-within/svc:visible group-focus-within/svc:opacity-100">
              <ul className="w-64 rounded-[6px] border border-line bg-ink/95 p-2 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                {services.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="block rounded-[4px] px-3 py-2.5 text-[0.8125rem] text-paper/75 transition-colors duration-200 hover:bg-paper/[0.06] hover:text-paper aria-[current=page]:text-accent-soft"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="group relative text-[0.8125rem] tracking-[0.02em] text-paper/65 transition-colors duration-200 hover:text-paper aria-[current=page]:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent-soft transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full group-aria-[current=page]:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href={switchHref}
            hrefLang={other}
            lang={other}
            aria-label={switchAria}
            className="group flex items-center gap-2 text-[0.8125rem] text-[#4fd1c5] transition-colors duration-200 hover:text-paper"
          >
            {switchLabel}
            <span className="hidden h-px w-3 bg-[#4fd1c5] transition-all duration-300 group-hover:w-6 sm:block" />
          </Link>

          <div className="hidden md:block">
            <Button href={cta.href} variant="primary" size="md">
              {cta.label}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center text-paper lg:hidden"
            aria-label={open ? menuClose : menuOpen}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-ink md:top-24 lg:hidden"
              >
                <div className="shell flex flex-col gap-2 pt-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted">{servicesLabel}</p>
                  {services.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-line py-3 font-display text-xl text-paper"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-4" />
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-line py-4 font-display text-2xl text-paper"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="mt-8" onClick={() => setOpen(false)}>
                    <Button href={cta.href} variant="primary" size="lg">
                      {cta.label}
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
