"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Magnetic } from "@/components/shared/magnetic";
import { Button } from "@/components/shared/button";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

          <Magnetic strength={12}>
            <Button href="#contact" variant="primary" size="md">
              Start a project
            </Button>
          </Magnetic>
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-24 bg-ink md:hidden"
          >
            <div className="shell flex flex-col gap-2 pt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-4 font-display text-2xl text-paper"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/tools/gbp-check"
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-2xl text-[#4fd1c5]"
              >
                Free listing check
              </Link>

              <div className="mt-8">
                <Button href="#contact" variant="primary" size="lg">
                  Start a project
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
