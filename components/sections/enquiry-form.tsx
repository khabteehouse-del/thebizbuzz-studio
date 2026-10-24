"use client";

import { useEffect, useState } from "react";
import { Check, MapPin, Cpu } from "lucide-react";
import {
  submitEnquiry,
  type Enquiry,
  type Pathway,
} from "@/app/actions/enquiry";

/*
  Short enquiry form. Four fields on purpose: only what is needed to decide
  whether and how to reply. The hero buttons pre-select a pathway by sending
  the "enquiry-pathway" event before they scroll here.
*/

const PATHWAYS: { id: Pathway; label: string; hint: string; Icon: typeof MapPin }[] = [
  { id: "local", label: "More local customers", hint: "Google listing, local search, website", Icon: MapPin },
  { id: "ai", label: "An AI or software problem", hint: "AI systems, automation, web apps", Icon: Cpu },
];

export function EnquiryForm() {
  const [pathway, setPathway] = useState<Pathway>("local");
  const [form, setForm] = useState({
    name: "",
    contact: "",
    business: "",
    message: "",
    company_site: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<Pathway>).detail;
      if (detail === "local" || detail === "ai") setPathway(detail);
    };
    window.addEventListener("enquiry-pathway", handler);
    return () => window.removeEventListener("enquiry-pathway", handler);
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    const payload: Enquiry = { pathway, ...form };
    try {
      const result = await submitEnquiry(payload);
      if (result.ok) setDone(true);
      else setError(result.error);
    } catch {
      setError(
        "Something went wrong on our side. Please email contact@thebizbuzz.studio or message us on WhatsApp."
      );
    }
    setSending(false);
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-[3px] border border-line bg-paper/[0.04] p-7 md:p-9"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-soft/60 text-accent-soft">
          <Check size={20} aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-2xl font-medium tracking-[-0.02em] text-paper">
          Received, thank you
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Your note has reached us. We will read it and reply to you directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[3px] border border-line bg-paper/[0.04] p-6 md:p-9"
    >
      <p className="text-xs uppercase tracking-[0.14em] text-muted" id="enq-path">
        What do you need?
      </p>
      <div
        role="radiogroup"
        aria-labelledby="enq-path"
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        {PATHWAYS.map(({ id, label, hint, Icon }) => {
          const active = pathway === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setPathway(id)}
              className={`flex min-h-[4.25rem] flex-col items-start gap-1 rounded-[3px] border px-4 py-3 text-left transition-colors duration-200 ${
                active
                  ? "border-accent-soft bg-accent/15"
                  : "border-line bg-ink hover:border-paper/25"
              }`}
            >
              <span className="flex items-center gap-2 text-sm font-medium text-paper">
                <Icon size={16} aria-hidden="true" className="text-accent-soft" />
                {label}
              </span>
              <span className="text-xs text-muted">{hint}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 space-y-4">
        <Field label="Your name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" required />
        <Field label="Email or WhatsApp number" value={form.contact} onChange={(v) => setForm({ ...form, contact: v })} autoComplete="email" inputMode="email" required />
        <Field label="Business" value={form.business} onChange={(v) => setForm({ ...form, business: v })} autoComplete="organization" optional />
        <label className="block">
          <span className="text-xs uppercase tracking-[0.14em] text-muted">
            What are you trying to change?
          </span>
          <textarea
            required
            rows={4}
            maxLength={2000}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-base text-paper placeholder:text-muted/40 focus:border-accent focus:outline-none md:text-sm"
          />
        </label>

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <input
          type="text"
          name="company_site"
          tabIndex={-1}
          autoComplete="off"
          value={form.company_site}
          onChange={(e) => setForm({ ...form, company_site: e.target.value })}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p role="alert" className="mt-5 text-sm text-[#ff7b80]">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group/btn relative mt-7 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-[2px] border border-accent bg-accent text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-enabled:group-hover/btn:scale-y-100"
        />
        <span className="relative z-10 transition-colors duration-300 group-enabled:group-hover/btn:text-ink">
          {sending ? "Sending" : "Send"}
        </span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted/70">
        Used only to reply to you. No list, no newsletter.
      </p>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  optional,
  required,
  autoComplete,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
  required?: boolean;
  autoComplete?: string;
  inputMode?: "email" | "text";
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-muted">
        {label}
        {optional && <span className="ml-2 normal-case">optional</span>}
      </span>
      <input
        type="text"
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-base text-paper placeholder:text-muted/40 focus:border-accent focus:outline-none md:text-sm"
      />
    </label>
  );
}
