"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { Users, X } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { submitSpecialist } from "@/app/actions/specialist";

/*
  Standby specialist network card. Sits in the "Working with us" row, next
  to the specialists. It is a call for people we can phone when a project
  needs a skill we do not have in house. It never promises work or pay.
*/


const FIELD =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 text-base text-paper placeholder:text-paper/40 focus:border-[#7cc4ff] focus:outline-none sm:text-sm";

export function SpecialistCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [intro, setIntro] = useState("");
  const words = intro.trim() ? intro.trim().split(/\s+/).length : 0;
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  /* Belt and braces for the smooth scroller: wheel and touch events that start
     inside the dialog never reach the page-level listener. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const stop = (event: Event) => event.stopPropagation();
    dialog.addEventListener("wheel", stop, { passive: true });
    dialog.addEventListener("touchmove", stop, { passive: true });
    return () => {
      dialog.removeEventListener("wheel", stop);
      dialog.removeEventListener("touchmove", stop);
    };
  }, []);

  /* The site uses smooth scrolling that captures the mouse wheel for the
     page. While the form is open, freeze the page behind it (the form itself
     opts out of the smooth scroller with data-lenis-prevent). */
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setError("");
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setError("");
    if (words > 200) {
      setError("Please keep your intro to 200 words or fewer.");
      return;
    }
    startTransition(async () => {
      try {
        const result = await submitSpecialist(data);
        if (result.ok) {
          setDone(true);
          form.reset();
          setIntro("");
        } else {
          setError(result.error);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Reveal delay={index * 0.06} className="sm:col-span-2">
      <div className="relative flex h-full flex-col rounded-sm border border-dashed border-[#7cc4ff]/40 bg-[#7cc4ff]/[0.04] p-5 shadow-[0_0_40px_-18px_#7cc4ff] sm:p-7">
        {/* A live badge in the top right corner: a soft ring pulses out from it. */}
        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#7cc4ff]/50 bg-[#7cc4ff]/10 text-[#7cc4ff] sm:right-6 sm:top-6"
        >
          <span className="absolute inset-0 rounded-full border border-[#7cc4ff]/60 motion-safe:animate-ping" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80] motion-safe:animate-pulse" />
          <Users size={18} strokeWidth={1.6} />
        </span>

        <h3 className="max-w-[calc(100%-3.5rem)] font-display text-xl font-medium leading-snug tracking-[-0.01em] text-paper sm:text-2xl">
          Join our specialist network
        </h3>

        <div className="mt-5 grid flex-1 items-end gap-5 sm:grid-cols-2 sm:gap-6">
          {/* Left: the message, left aligned and strong */}
          <div className="flex h-full flex-col justify-between gap-6 sm:self-stretch">
            <p className="font-display text-lg font-medium leading-snug text-paper sm:text-xl">
              Need a skill we do not have in house? Tell us what you do well,
              and we will reach out when a project fits.
            </p>
            <p className="hidden text-xs text-paper/55 sm:block">
              Project-based. No obligation.
            </p>
          </div>

          {/* Right: her picture, with the button right under her pointing hands */}
          <div className="flex flex-col items-center">
            <div aria-hidden="true" className="relative w-full max-w-[15rem]">
              <Image
                src="/images/anchor/specialist-pointing-v4.png"
                alt=""
                width={1029}
                height={969}
                quality={90}
                sizes="(min-width: 640px) 15rem, 70vw"
                className="h-auto w-full [-webkit-mask-image:linear-gradient(to_bottom,black_93%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_93%,transparent_100%)]"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                setDone(false);
                setOpen(true);
              }}
              className="inline-flex min-h-12 w-full max-w-[15rem] items-center justify-center rounded-lg border border-[#7cc4ff]/60 bg-[#7cc4ff]/15 px-4 py-3 font-display text-sm font-medium text-paper transition-colors hover:bg-[#7cc4ff]/25 focus-visible:outline focus-visible:outline-2"
            >
              Add yourself to the list
            </button>
            <p className="mt-3 text-xs text-paper/55 sm:hidden">
              Project-based. No obligation.
            </p>
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        onClose={close}
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label="Join our specialist network"
        data-lenis-prevent
        className="m-auto max-h-[92dvh] w-[min(94vw,30rem)] max-w-none overflow-y-auto overscroll-contain rounded-2xl border border-white/15 bg-[#0b1020] p-0 text-paper backdrop:bg-black/75 backdrop:backdrop-blur-sm"
      >
        {open && (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-base font-medium text-[#7cc4ff]">
                  Join our specialist network
                </p>
                <p className="mt-1 text-xs text-paper/60">
                  Project-based. We reach out only when a project fits.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close form"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/15 focus-visible:outline focus-visible:outline-2"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            {done ? (
              <div className="py-8 text-center">
                <p className="font-display text-lg text-paper">Thank you.</p>
                <p className="mt-2 text-sm text-paper/70">
                  You are on our list. If a project fits, we will contact you.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-6 min-h-11 rounded-lg border border-[#7cc4ff]/60 bg-[#7cc4ff]/15 px-6 text-sm text-paper hover:bg-[#7cc4ff]/25"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 grid gap-3" noValidate>
                {/* Honeypot, hidden from people */}
                <input
                  type="text"
                  name="company_site"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />
                <label className="grid gap-1.5 text-xs text-paper/70">
                  Name
                  <input name="name" required maxLength={120} autoComplete="name" className={FIELD} />
                </label>
                <label className="grid gap-1.5 text-xs text-paper/70">
                  Email
                  <input name="email" type="email" required maxLength={200} autoComplete="email" className={FIELD} />
                </label>
                <label className="grid gap-1.5 text-xs text-paper/70">
                  What do you specialise in?
                  <input name="speciality" required maxLength={160} placeholder="For example: product photography" className={FIELD} />
                </label>
                <label className="grid gap-1.5 text-xs text-paper/70">
                  Portfolio link
                  <input name="portfolio" type="url" required maxLength={300} placeholder="https://" inputMode="url" className={FIELD} />
                </label>
                <label className="grid gap-1.5 text-xs text-paper/70">
                  Phone or WhatsApp
                  <input name="phone" type="tel" required maxLength={40} autoComplete="tel" inputMode="tel" placeholder="Include your country code" className={FIELD} />
                </label>
                <label className="grid gap-1.5 text-xs text-paper/70">
                  <span className="flex items-center justify-between">
                    <span>About you (optional)</span>
                    <span className={words > 200 ? "text-[#ff8a8a]" : "text-paper/50"}>
                      {words}/200 words
                    </span>
                  </span>
                  <textarea
                    name="intro"
                    rows={4}
                    maxLength={1600}
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                    placeholder="A short intro: what you do, who you have worked with."
                    className={FIELD}
                  />
                </label>
                <label className="flex items-start gap-3 text-xs leading-relaxed text-paper/70">
                  <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-[#7cc4ff]" />
                  I agree BizBuzz may keep these details to contact me about project work.
                </label>
                {error && (
                  <p role="alert" className="text-sm text-[#ff8a8a]">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="mt-1 min-h-12 rounded-lg border border-[#7cc4ff]/60 bg-[#7cc4ff]/20 px-4 font-display text-sm font-medium text-paper transition-colors hover:bg-[#7cc4ff]/30 disabled:opacity-60"
                >
                  {pending ? "Sending..." : "Add me to the list"}
                </button>
              </form>
            )}
          </div>
        )}
      </dialog>
    </Reveal>
  );
}
