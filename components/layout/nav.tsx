"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Button } from "@/components/shared/button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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
        scrolled
          ? "border-line bg-ink/80"
          : "border-paper/[0.06] bg-ink/25"
      }`}
    >
      <nav className="shell flex h-24 items-center justify-between gap-8">
        <Link
          href="/"
          className="relative flex h-16 w-[230px] items-center"
          aria-label={`${site.name} home`}
        >
          {/*
            Fixed-height box so swapping the logo file later
            cannot shift the layout.
          */}
          <Image
            src="/images/logo/logo.png"
            alt={site.name}
            fill
            priority
            sizes="230px"
            className="object-contain object-left"
          />
        </Link>

        <ul className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-[0.8125rem] tracking-[0.02em] text-paper/65 transition-colors duration-200 hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/tools/gbp-check"
            className="group flex items-center gap-2 text-[0.8125rem] text-[#4fd1c5] transition-colors duration-200 hover:text-paper"
          >
            Free listing check
            <span className="h-px w-3 bg-[#4fd1c5] transition-all duration-300 group-hover:w-6" />
          </Link>

          <Button href="#contact" variant="primary" size="md">
            Start a project
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center text-paper md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/*
        The menu panel is rendered at the top of the page, outside the
        header. The header uses backdrop blur, and any element inside a
        blurred (or transformed) parent loses its screen-sized fixed
        position, so the panel collapsed and the links floated over the
        hero with no background.
      */}
      {mounted &&
        createPortal(
        <AnimatePresence>
          {open && (
            <>
              {/* Tap outside the box to close it */}
              <motion.div
                key="menu-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm md:hidden"
              />

              {/*
                Compact rounded box that is revealed from the top down
                (clip-path), so it reads as dropping out of the header
                instead of fading in over the whole screen.
              */}
              <motion.div
                key="menu-panel"
                initial={{ clipPath: "inset(0 0 100% 0 round 24px)", opacity: 0, y: -8 }}
                animate={{ clipPath: "inset(0 0 0% 0 round 24px)", opacity: 1, y: 0 }}
                exit={{ clipPath: "inset(0 0 100% 0 round 24px)", opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-4 top-[104px] z-40 max-h-[calc(100dvh-120px)] overflow-y-auto rounded-3xl border border-line bg-ink/95 p-5 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl md:hidden"
              >
                <div className="flex flex-col">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-line py-3 font-display text-lg text-paper"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + navLinks.length * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href="/tools/gbp-check"
                      onClick={() => setOpen(false)}
                      className="block py-3 font-display text-lg text-[#4fd1c5]"
                    >
                      Free listing check
                    </Link>
                  </motion.div>

                  <div className="mt-3" onClick={() => setOpen(false)}>
                    <Button href="#contact" variant="primary" size="md">
                      Start a project
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
