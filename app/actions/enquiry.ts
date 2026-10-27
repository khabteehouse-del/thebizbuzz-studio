"use server";

import { after } from "next/server";
import { runLeadPipeline } from "@/lib/lead-pipeline";

export type Pathway = "local" | "ai";

export type Enquiry = {
  pathway: Pathway;
  name: string;
  /* An email address or a WhatsApp number, whichever the visitor prefers */
  contact: string;
  business: string;
  message: string;
  /* Honeypot. People never see it, bots fill it. */
  company_site: string;
};

export type EnquiryResult = { ok: true } | { ok: false; error: string };

/*
  The short enquiry form at the bottom of the home page.

  Same delivery rule as the Google listing check: the email to us is the
  primary path and decides success. The lead pipeline (scoring, HubSpot,
  Supabase) runs after the response and can never make this fail. If the
  email cannot be sent the visitor is told, so no lead is lost silently.
*/

const TEST_SENDER = "onboarding@resend.dev";

const PATHWAY_LABEL: Record<Pathway, string> = {
  local: "Local business growth",
  ai: "AI and software",
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function submitEnquiry(input: Enquiry): Promise<EnquiryResult> {
  /* A filled honeypot gets a fake success so bots learn nothing */
  if (clean(input.company_site, 100)) return { ok: true };

  const pathway: Pathway = input.pathway === "ai" ? "ai" : "local";
  const name = clean(input.name, 120);
  const contact = clean(input.contact, 200);
  const business = clean(input.business, 160);
  const message = clean(input.message, 2000);

  const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact);
  const digits = contact.replace(/\D/g, "");
  const isPhone = !isEmail && digits.length >= 7 && digits.length <= 15;

  if (name.length < 2) return { ok: false, error: "Please add your name." };
  if (!isEmail && !isPhone) {
    return {
      ok: false,
      error: "Please add an email address or a WhatsApp number we can reach.",
    };
  }
  if (message.length < 10) {
    return {
      ok: false,
      error: "Please tell us a little about what you are trying to change.",
    };
  }

  const key = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_INBOX ?? "djfaraz@gmail.com";
  const from = process.env.RESEND_FROM ?? TEST_SENDER;
  const label = PATHWAY_LABEL[pathway];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#777;margin:0">
        New website enquiry
      </p>
      <h1 style="font-size:26px;margin:8px 0 0">${escapeHtml(name)}${
        business ? `, ${escapeHtml(business)}` : ""
      }</h1>
      <p style="font-size:15px;color:#333;margin:6px 0 24px">Pathway: <strong>${escapeHtml(
        label
      )}</strong></p>
      <p style="font-size:14px;line-height:1.7;color:#333;margin:0 0 24px">
        ${
          isEmail
            ? `Email: <a href="mailto:${escapeHtml(contact)}">${escapeHtml(contact)}</a>`
            : `WhatsApp / phone: ${escapeHtml(contact)}`
        }
      </p>
      <h2 style="font-size:15px;margin:0 0 8px">What they want to change</h2>
      <p style="font-size:14px;line-height:1.7;color:#333;white-space:pre-wrap;margin:0">${escapeHtml(
        message
      )}</p>
      <p style="font-size:13px;color:#777;margin:28px 0 0">
        ${isEmail ? "Reply directly to this email to reach them." : "They left a number, not an email. Reach them on WhatsApp."}
      </p>
    </div>`;

  let sent = false;
  if (key) {
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
          subject: `Enquiry (${label}): ${name}${business ? `, ${business}` : ""}`,
          html,
          ...(isEmail ? { reply_to: contact } : {}),
        }),
      });
      sent = response.ok;
      if (!sent) console.error("[enquiry] resend status", response.status);
    } catch (err) {
      console.error("[enquiry] resend threw", String(err));
    }
  } else {
    console.error("[enquiry] RESEND_API_KEY is missing");
  }

  if (!sent) {
    return {
      ok: false,
      error:
        "We could not send that just now. Please try again, or email contact@thebizbuzz.studio or message us on WhatsApp.",
    };
  }

  /* The pipeline needs an email address, so a phone-only lead skips it */
  if (isEmail) {
    after(() =>
      runLeadPipeline({
        name,
        email: contact,
        business,
        message: `Pathway: ${label}. ${message}`,
        source: "enquiry-form",
      })
    );
  }

  return { ok: true };
}
