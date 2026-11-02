"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import {
  submitContact,
  type ContactError,
  type ContactKind,
  type ContactTopic,
} from "@/app/actions/contact";
import type { Copy } from "@/data/copy-types";
import type { Lang } from "@/data/i18n";

/*
  One form for two jobs. "contact" asks what the visitor needs and what they
  want to change. "mizar" is the short early access list: name and a way to
  reach them, nothing more.
*/

type Props = {
  lang: Lang;
  kind: ContactKind;
  labels: Copy["form"];
  submitLabel?: string;
  doneTitle?: string;
};

const TOPICS: Exclude<ContactTopic, "mizar">[] = [
  "audit",
  "website",
  "seo",
  "gbp",
];

const inputClass =
  "mt-2 w-full rounded-md border-2 border-ink bg-white px-4 py-3 text-base text-ink focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-violet/30";

export function ContactForm({ lang, kind, labels, submitLabel, doneTitle }: Props) {
  const [topic, setTopic] = useState<Exclude<ContactTopic, "mizar">>("audit");
  const [form, setForm] = useState({
    name: "",
    contact: "",
    business: "",
    message: "",
    company_site: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<ContactError | "generic" | null>(null);
  const [done, setDone] = useState(false);

  function errorText(code: ContactError | "generic"): string {
    if (code === "name") return labels.errName;
    if (code === "contact") return labels.errContact;
    if (code === "message") return labels.errMessage;
    if (code === "send") return labels.errSend;
    return labels.errGeneric;
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const result = await submitContact({
        lang,
        kind,
        topic: kind === "mizar" ? "mizar" : topic,
        ...form,
      });
      if (result.ok) setDone(true);
      else setError(result.error);
    } catch {
      setError("generic");
    }
    setSending(false);
  }

  if (done) {
    return (
      <div
        role="status"
        className="rounded-xl border-2 border-ink bg-white p-7 shadow-[6px_6px_0_0_var(--color-ink)] md:p-9"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-mint text-ink">
          <Check size={22} aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-2xl font-extrabold text-ink">
          {doneTitle ?? labels.doneTitle}
        </p>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          {labels.doneText}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-xl border-2 border-ink bg-white p-6 shadow-[6px_6px_0_0_var(--color-ink)] md:p-9"
    >
      {kind === "contact" && (
        <fieldset>
          <legend className="text-sm font-bold text-ink">{labels.topicLabel}</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((id) => (
              <label key={id} className="block cursor-pointer">
                <input
                  type="radio"
                  name="topic"
                  value={id}
                  checked={topic === id}
                  onChange={() => setTopic(id)}
                  className="peer sr-only"
                />
                <span className="flex min-h-12 items-center rounded-md border-2 border-ink bg-canvas px-4 py-2 text-sm font-semibold text-ink transition peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-violet">
                  {labels.topics[id]}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className={kind === "contact" ? "mt-6 space-y-5" : "space-y-5"}>
        <label className="block">
          <span className="text-sm font-bold text-ink">{labels.nameLabel}</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-ink">{labels.contactLabel}</span>
          <input
            type="text"
            required
            autoComplete="email"
            inputMode="email"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className={inputClass}
          />
        </label>

        {kind === "contact" && (
          <>
            <label className="block">
              <span className="text-sm font-bold text-ink">
                {labels.businessLabel}
                <span className="ml-2 font-normal text-muted">({labels.optional})</span>
              </span>
              <input
                type="text"
                autoComplete="organization"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className={inputClass}
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold text-ink">{labels.messageLabel}</span>
              <span className="ml-2 text-sm text-muted">{labels.messageHint}</span>
              <textarea
                required
                rows={4}
                maxLength={2000}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={inputClass}
              />
            </label>
          </>
        )}

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
        <p role="alert" className="mt-5 text-sm font-semibold text-[#b3261e]">
          {errorText(error)}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-md border-2 border-ink bg-coral px-6 py-3 text-base font-bold text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition duration-150 enabled:hover:translate-x-[2px] enabled:hover:translate-y-[2px] enabled:hover:shadow-[2px_2px_0_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? labels.sending : (submitLabel ?? labels.submit)}
      </button>

      <p className="mt-4 text-sm leading-relaxed text-muted">{labels.privacy}</p>
    </form>
  );
}
