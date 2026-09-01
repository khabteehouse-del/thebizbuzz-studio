"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { Magnetic } from "@/components/shared/magnetic";

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        scrolled
          ? "border-b border-line bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="shell flex h-20 items-center justify-between">
        <Link
          href="/"
          className="relative flex h-14 w-[180px] items-center"
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
            sizes="180px"
            className="object-contain object-left"
          />
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group relative text-sm text-paper/70 transition-colors duration-200 hover:text-paper"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Magnetic strength={12}>
            <Link
              href="#contact"
              className="inline-flex h-10 items-center rounded-sm bg-accent px-5 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent-soft"
            >
              Start a project
            </Link>
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
            className="fixed inset-0 top-20 bg-ink md:hidden"
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
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex h-12 items-center justify-center rounded-sm bg-accent px-6 text-sm font-medium text-paper"
              >
                Start a project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
