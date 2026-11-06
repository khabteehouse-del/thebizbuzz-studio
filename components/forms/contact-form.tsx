"use client";

import { useState } from "react";
import { Check, Clapperboard, Globe, MapPin, Megaphone, Search, Star } from "lucide-react";
import {
  submitContact,
  type ContactError,
  type ContactKind,
  type ContactTopic,
} from "@/app/actions/contact";
import { GbpChecker } from "@/components/tools/gbp-checker";
import type { Copy } from "@/data/copy-types";
import type { Lang } from "@/data/i18n";

/*
  One form for two jobs, in the BizBuzz enquiry-form style: hairline
  fields, topic chips that light up, a submit button that fills on hover.
  "contact" asks what the visitor needs. "mizar" is the short waitlist.
*/

type Props = {
  lang: Lang;
  kind: ContactKind;
  labels: Copy["form"];
  submitLabel?: string;
  doneTitle?: string;
};

type Topic = Exclude<ContactTopic, "mizar">;

const TOPICS: { id: Topic; Icon: typeof Globe }[] = [
  { id: "audit", Icon: Search },
  { id: "website", Icon: Globe },
  { id: "seo", Icon: MapPin },
  { id: "gbp", Icon: Star },
  { id: "ads", Icon: Megaphone },
  { id: "video", Icon: Clapperboard },
];

const field =
  "mt-2.5 w-full rounded-[2px] border border-line bg-ink px-4 py-3 text-base text-paper placeholder:text-muted/40 focus:border-accent-soft focus:outline-none md:text-sm";
const labelClass = "text-xs uppercase tracking-[0.14em] text-muted";

export function ContactForm({ lang, kind, labels, submitLabel, doneTitle }: Props) {
  const [topic, setTopic] = useState<Topic>("audit");
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

  async function submit(event: React.FormEvent<HTMLFormElement>) {
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

  /* The six topic chips. Choosing the audit swaps the form for the checker. */
  const chips =
    kind === "contact" ? (
      <>
        <p className={labelClass} id="topic-label">
          {labels.topicLabel}
        </p>
        <div role="radiogroup" aria-labelledby="topic-label" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {TOPICS.map(({ id, Icon }) => {
            const active = topic === id;
            return (
              <button
                key={id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTopic(id)}
                className={`flex min-h-[3.5rem] items-center gap-3 rounded-[3px] border px-4 py-3 text-left text-sm font-medium text-paper transition-colors duration-200 ${
                  id === "audit" ? "audit-chip border-[#ffb938]/45" : ""
                } ${
                  active
                    ? id === "audit"
                      ? "bg-accent/15"
                      : "border-accent-soft bg-accent/15"
                    : id === "audit"
                      ? "bg-ink hover:border-[#ffb938]/70"
                      : "border-line bg-ink hover:border-paper/25"
                }`}
              >
                <Icon
                  size={16}
                  aria-hidden="true"
                  className={`shrink-0 ${id === "audit" ? "text-[#ffb938]" : "text-accent-soft"}`}
                />
                {labels.topics[id]}
              </button>
            );
          })}
        </div>
      </>
    ) : null;

  if (kind === "contact" && topic === "audit") {
    return (
      <div className="rounded-[3px] border border-line bg-paper/[0.04] p-6 backdrop-blur-sm md:p-9">
        {chips}
        <div className="mt-8 border-t border-line pt-8">
          <GbpChecker lang={lang} embedded />
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div role="status" className="rounded-[3px] border border-line bg-paper/[0.04] p-7 md:p-9">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#4fd1c5]/60 text-[#4fd1c5]">
          <Check size={20} aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-2xl font-medium tracking-[-0.02em] text-paper">
          {doneTitle ?? labels.doneTitle}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{labels.doneText}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-[3px] border border-line bg-paper/[0.04] p-6 backdrop-blur-sm md:p-9"
    >
      {chips}

      <div className={kind === "contact" ? "mt-6 space-y-4" : "space-y-4"}>
        <label className="block">
          <span className={labelClass}>{labels.nameLabel}</span>
          <input
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={field}
          />
        </label>

        <label className="block">
          <span className={labelClass}>{labels.contactLabel}</span>
          <input
            type="text"
            required
            autoComplete="email"
            inputMode="email"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            className={field}
          />
        </label>

        {kind === "contact" && (
          <>
            <label className="block">
              <span className={labelClass}>
                {labels.businessLabel}
                <span className="ml-2 normal-case">{labels.optional}</span>
              </span>
              <input
                type="text"
                autoComplete="organization"
                value={form.business}
                onChange={(e) => setForm({ ...form, business: e.target.value })}
                className={field}
              />
            </label>

            <label className="block">
              <span className={labelClass}>{labels.messageLabel}</span>
              <textarea
                required
                rows={4}
                maxLength={2000}
                placeholder={labels.messageHint}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={field}
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
        <p role="alert" className="mt-5 text-sm text-[#ff7b80]">
          {errorText(error)}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="group/btn relative mt-7 inline-flex h-12 w-full items-center justify-center overflow-hidden rounded-[2px] border border-accent bg-accent text-xs font-medium uppercase tracking-[0.12em] text-paper transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-bottom scale-y-0 bg-paper transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-enabled/btn:group-hover/btn:scale-y-100"
        />
        <span className="relative z-10 transition-colors duration-300 group-enabled/btn:group-hover/btn:text-ink">
          {sending ? labels.sending : (submitLabel ?? labels.submit)}
        </span>
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted/70">{labels.privacy}</p>
    </form>
  );
}
