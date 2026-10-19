"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Plus, X } from "lucide-react";
import { Reveal } from "@/components/shared/reveal";
import { submitSpecialist } from "@/app/actions/specialist";

/*
  Standby specialist network card. Sits in the "Working with us" row, next
  to the specialists. It is a call for people we can phone when a project
  needs a skill we do not have in house. It never promises work or pay.
*/

const CHIPS = ["Photography", "3D and motion", "Translation", "Legal and finance"];

const FIELD =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3.5 py-3 text-base text-paper placeholder:text-paper/40 focus:border-[#7cc4ff] focus:outline-none sm:text-sm";

export function SpecialistCard({ index }: { index: number }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
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
    startTransition(async () => {
      try {
        const result = await submitSpecialist(data);
        if (result.ok) {
          setDone(true);
          form.reset();
        } else {
          setError(result.error);
        }
      } catch {
        setError("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <Reveal delay={index * 0.06}>
      <div className="flex h-full flex-col rounded-sm border border-dashed border-[#7cc4ff]/40 bg-[#7cc4ff]/[0.04] p-5 shadow-[0_0_40px_-18px_#7cc4ff]">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-[#7cc4ff]/60 text-[#7cc4ff]"
          >
            <Plus size={18} strokeWidth={1.6} />
          </span>
          <h3 className="font-display text-base font-medium leading-snug tracking-[-0.01em] text-paper">
            Join our specialist network
          </h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Need a skill we do not have in house? Tell us what you do well, and
          we will reach out when a project fits.
        </p>
        <ul
          className="mt-4 flex flex-wrap gap-2"
          aria-label="Examples of specialists we call on"
        >
          {CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-[#7cc4ff]/30 px-3 py-1 text-xs text-[#7cc4ff]"
            >
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => {
              setDone(false);
              setOpen(true);
            }}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-[#7cc4ff]/60 bg-[#7cc4ff]/15 px-4 py-3 font-display text-sm font-medium text-paper transition-colors hover:bg-[#7cc4ff]/25 focus-visible:outline focus-visible:outline-2"
          >
            Add yourself to the list
          </button>
          <p className="mt-3 text-xs text-paper/50">
            Project-based. No obligation.
          </p>
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
        className="m-auto max-h-[92dvh] w-[min(94vw,30rem)] max-w-none overflow-y-auto rounded-2xl border border-white/15 bg-[#0b1020] p-0 text-paper backdrop:bg-black/75 backdrop:backdrop-blur-sm"
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
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="grid gap-1.5 text-xs text-paper/70">
                    Phone or WhatsApp (optional)
                    <input name="phone" type="tel" maxLength={40} autoComplete="tel" className={FIELD} />
                  </label>
                  <label className="grid gap-1.5 text-xs text-paper/70">
                    Rate range (optional)
                    <input name="rate" maxLength={80} placeholder="For example: per day or per project" className={FIELD} />
                  </label>
                </div>
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
