"use server";

/*
  Handles the contact form and the Mizar early access list.

  The email to us is the one thing that decides success. The server never
  sends text meant for the visitor, only an error code, so the form can show
  the message in the visitor's own language.

  Needs RESEND_API_KEY and a destination in ACCENTUATE_LEAD_INBOX (or
  LEAD_INBOX). On a Vercel preview with no key, it accepts the form and logs
  it, so the preview can be shown without email setup. On production, a
  missing key is reported as a send error so no lead is lost silently.
*/

export type ContactKind = "contact" | "mizar";
export type ContactTopic = "audit" | "website" | "seo" | "gbp" | "ads" | "video" | "mizar";
export type ContactError = "name" | "contact" | "message" | "send";

export type ContactInput = {
  lang: "en" | "es";
  kind: ContactKind;
  topic: ContactTopic;
  name: string;
  contact: string;
  business: string;
  message: string;
  /* Honeypot. People never see it, bots fill it. */
  company_site: string;
};

export type ContactResult = { ok: true } | { ok: false; error: ContactError };

const TOPIC_LABEL: Record<ContactTopic, string> = {
  audit: "Free Google profile audit",
  website: "Website",
  seo: "Local SEO",
  gbp: "Google Business Profile",
  ads: "Ad campaigns",
  video: "Video and UGC ads",
  mizar: "Mizar early access",
};

const TEST_SENDER = "onboarding@resend.dev";

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitContact(input: ContactInput): Promise<ContactResult> {
  /* A filled honeypot gets a fake success so bots learn nothing */
  if (clean(input.company_site, 100)) return { ok: true };

  const kind: ContactKind = input.kind === "mizar" ? "mizar" : "contact";
  const lang = input.lang === "es" ? "es" : "en";
  const topic: ContactTopic =
    kind === "mizar"
      ? "mizar"
      : input.topic in TOPIC_LABEL && input.topic !== "mizar"
        ? input.topic
        : "audit";

  const name = clean(input.name, 120);
  const contact = clean(input.contact, 200);
  const business = clean(input.business, 160);
  const message = clean(input.message, 2000);

  const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact);
  const digits = contact.replace(/\D/g, "");
  const isPhone = !isEmail && digits.length >= 7 && digits.length <= 15;

  if (name.length < 2) return { ok: false, error: "name" };
  if (!isEmail && !isPhone) return { ok: false, error: "contact" };
  if (kind === "contact" && message.length < 10) {
    return { ok: false, error: "message" };
  }

  const key = process.env.RESEND_API_KEY;
  const notifyTo = process.env.ACCENTUATE_LEAD_INBOX ?? process.env.LEAD_INBOX;
  const from = process.env.RESEND_FROM ?? TEST_SENDER;
  const label = TOPIC_LABEL[topic];

  /* Preview without email setup: accept and log, so the page can be demoed */
  if ((!key || !notifyTo) && process.env.VERCEL_ENV === "preview") {
    console.log("[contact] preview mode, not emailed", { topic, lang });
    return { ok: true };
  }

  if (!key || !notifyTo) {
    console.error("[contact] RESEND_API_KEY or lead inbox is missing");
    return { ok: false, error: "send" };
  }

  const html = `
 <div style="font-family:system-ui,sans-serif;max-width:640px">
 <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#777;margin:0">
 New enquiry from the Accentuate site
 </p>
 <h1 style="font-size:26px;margin:8px 0 0">${escapeHtml(name)}${
 business ? `, ${escapeHtml(business)}` : ""
 }</h1>
 <p style="font-size:15px;color:#333;margin:6px 0 4px">Topic: <strong>${escapeHtml(
 label
 )}</strong></p>
 <p style="font-size:15px;color:#333;margin:0 0 24px">Site language: <strong>${
 lang === "es" ? "Spanish" : "English"
 }</strong></p>
 <p style="font-size:14px;line-height:1.7;color:#333;margin:0 0 24px">
 ${
 isEmail
 ? `Email: <a href="mailto:${escapeHtml(contact)}">${escapeHtml(contact)}</a>`
 : `Phone: ${escapeHtml(contact)}`
 }
 </p>
 ${
 message
 ? `<h2 style="font-size:15px;margin:0 0 8px">What they want to change</h2>
      <p style="font-size:14px;line-height:1.7;color:#333;white-space:pre-wrap;margin:0">${escapeHtml(
        message
      )}</p>`
 : ""
 }
 </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from,
        to: [notifyTo],
        subject: `[Accentuate] ${label}: ${name}${business ? `, ${business}` : ""}`,
        html,
        ...(isEmail ? { reply_to: contact } : {}),
      }),
    });
    if (!response.ok) {
      console.error("[contact] resend status", response.status);
      return { ok: false, error: "send" };
    }
  } catch (err) {
    console.error("[contact] resend threw", String(err));
    return { ok: false, error: "send" };
  }

  return { ok: true };
}
