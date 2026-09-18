"use client";

import { useState } from "react";
import { submitGbpLead, type Lead } from "@/app/actions/gbp-lead";
import type { Answers } from "@/lib/gbp-audit";

type GateProps = {
  answers: Answers;
  seed: { businessName: string; businessType: string; city: string };
  onUnlocked: (emailedProspect: boolean) => void;
  compact?: boolean;
};

/*
  The gate sits AFTER the score, never before it.

  A form in front of the result loses most of the traffic: people arrive
  curious, meet a wall, and leave. Showing the score first creates the
  reason to hand over an email, because they now know they have a
  problem and want the answer.

  Email and business name are required. Everything else is optional and
  visibly marked so, which keeps the form from looking like work.
*/
export function LeadGate({ answers, seed, onUnlocked, compact }: GateProps) {
  const [lead, setLead] = useState<Lead>({
    businessName: seed.businessName,
    email: "",
    phone: "",
    website: "",
    social: "",
    city: seed.city,
    businessType: seed.businessType,
  });
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ready = lead.email.includes("@") && lead.businessName.trim().length > 1;

  async function submit() {
    if (!ready || sending) return;

    /* Bots fill hidden fields, people never see them */
    if (honeypot) {
      onUnlocked(false);
      return;
    }

    setSending(true);
    setError(null);

    const result = await submitGbpLead(answers, lead);

    setSending(false);

    if (result.ok) {
      onUnlocked(result.emailedProspect);
    } else {
      setError(result.error);
    }
  }

  return (
    <div
      className={`rounded-[3px] border border-line bg-paper/[0.03] ${
        compact ? "p-5" : "p-6 sm:p-8 md:p-10"
      }`}
    >
      <p className="section-label">Unlock your plan</p>

      <p
        className={`mt-5 leading-relaxed text-paper/80 ${
          compact ? "text-sm" : "text-sm md:text-base"
        }`}
      >
        We have written five specific actions for your listing, ranked by
        what each one is costing you. Tell us where to send them.
      </p>

      <div className="mt-7 space-y-4">
        <Field
          label="Business name"
          value={lead.businessName}
          onChange={(v) => setLead({ ...lead, businessName: v })}
          placeholder="Al Noor Dental"
        />
        <Field
          label="Email"
          type="email"
          value={lead.email}
          onChange={(v) => setLead({ ...lead, email: v })}
          placeholder="you@business.com"
        />
        <Field
          label="Phone"
          value={lead.phone}
          onChange={(v) => setLead({ ...lead, phone: v })}
          placeholder="03xx xxxxxxx"
          optional
        />
        <Field
          label="Website"
          value={lead.website}
          onChange={(v) => setLead({ ...lead, website: v })}
          placeholder="yourbusiness.com"
          optional
        />
        <Field
          label="Social handle"
          value={lead.social}
          onChange={(v) => setLead({ ...lead, social: v })}
          placeholder="@yourbusiness"
          optional
        />

        {/* Honeypot. Hidden from people, irresistible to bots. */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />
      </div>

      {error && (
        <p className="mt-5 text-sm text-[#e5484d]">{error}</p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={!ready || sending}
        className="group/btn relative mt-7 inline-flex h-12 w-full items-center justify-center gap-3 overflow-hidden rounded-[2px] border border-accent bg-accent text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-35"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-enabled:group-hover/btn:scale-y-100"
        />
        <span className="relative z-10 transition-colors duration-300 group-enabled:group-hover/btn:text-ink">
          {sending ? "Sending" : "Show me the plan"}
        </span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted/70">
        We may follow up about your results. No list, no newsletter, and we
        will not pass your details to anyone.
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  optional,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  optional?: boolean;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.14em] text-muted">
        {label}
        {optional && <span className="ml-2 normal-case">optional</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-sm text-paper placeholder:text-muted/40 focus:border-accent focus:outline-none"
      />
    </label>
  );
}
