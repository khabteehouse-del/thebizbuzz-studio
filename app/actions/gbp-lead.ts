"use server";

import { questions, scoreAnswers, bandFor, buildPlan } from "@/lib/gbp-audit";
import type { Answers } from "@/lib/gbp-audit";

export type Lead = {
  businessName: string;
  email: string;
  phone: string;
  website: string;
  social: string;
  city: string;
  businessType: string;
};

export type LeadResult =
  | { ok: true; emailedProspect: boolean }
  | { ok: false; error: string };

/*
  Captures the lead and emails it to us.

  Two sends, and only the first one always runs:

    1. The lead notification to us. Always sent. This is the one that
       matters commercially.

    2. The plan to the prospect. Only sent once a verified sending
       domain exists. Resend's test sender can only deliver to the
       account owner's own address, so before verification this would
       silently fail for every real prospect.

  Set RESEND_FROM to a verified address (for example
  hello@send.thebizbuzz.studio) to switch the second send on. Until
  then the UI shows the plan on screen and promises nothing it cannot
  deliver.
*/

const TEST_SENDER = "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function send(payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: payload.from,
        to: [payload.to],
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {}),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function submitGbpLead(
  answers: Answers,
  lead: Lead
): Promise<LeadResult> {
  /* Honeypot and basic validation happen client side too, but never
     trust that alone */
  if (!lead.email.includes("@") || lead.businessName.trim().length < 2) {
    return { ok: false, error: "Please check the email and business name." };
  }

  const notifyTo = process.env.LEAD_INBOX ?? "djfaraz@gmail.com";
  const verifiedFrom = process.env.RESEND_FROM;

  const score = scoreAnswers(answers);
  const band = bandFor(score);
  const plan = buildPlan(answers, 5);

  const answerRows = questions
    .map((q) => {
      const chosen = q.options.find((o) => o.value === answers[q.id]);
      return `<tr><td style="padding:4px 12px 4px 0;color:#555">${escapeHtml(
        q.question
      )}</td><td style="padding:4px 0"><strong>${escapeHtml(
        chosen ? chosen.label : "no answer"
      )}</strong></td></tr>`;
    })
    .join("");

  /* ---------- 1. Lead notification to us ---------- */
  const leadHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:640px">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#777;margin:0">
        New GBP check
      </p>
      <h1 style="font-size:30px;margin:8px 0 0">
        ${escapeHtml(lead.businessName)} scored ${score}/100
      </h1>
      <p style="font-size:16px;color:#333;margin:6px 0 24px">
        ${band.label}. ${escapeHtml(band.note)}
      </p>

      <h2 style="font-size:15px;margin:0 0 8px">Contact</h2>
      <p style="font-size:14px;line-height:1.7;color:#333;margin:0 0 24px">
        Email: <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(
          lead.email
        )}</a><br>
        ${lead.phone ? `Phone: ${escapeHtml(lead.phone)}<br>` : ""}
        ${lead.businessType ? `Type: ${escapeHtml(lead.businessType)}<br>` : ""}
        ${lead.city ? `City: ${escapeHtml(lead.city)}<br>` : ""}
        ${lead.website ? `Website: ${escapeHtml(lead.website)}<br>` : ""}
        ${lead.social ? `Social: ${escapeHtml(lead.social)}` : ""}
      </p>

      <h2 style="font-size:15px;margin:0 0 8px">Their weakest areas</h2>
      <ol style="font-size:14px;line-height:1.7;color:#333;padding-left:18px;margin:0 0 24px">
        ${plan
          .map((item) => `<li>${escapeHtml(item.question)}</li>`)
          .join("")}
      </ol>

      <h2 style="font-size:15px;margin:0 0 8px">Full answers</h2>
      <table style="font-size:13px;border-collapse:collapse">${answerRows}</table>

      <p style="font-size:13px;color:#777;margin:28px 0 0">
        Reply directly to this email to reach them.
      </p>
    </div>`;

  const notified = await send({
    from: verifiedFrom ?? TEST_SENDER,
    to: notifyTo,
    subject: `GBP lead: ${lead.businessName} scored ${score}/100`,
    html: leadHtml,
    replyTo: lead.email,
  });

  if (!notified) {
    return {
      ok: false,
      error: "We could not send that just now. Please try again shortly.",
    };
  }

  /* ---------- 2. The plan to the prospect ---------- */
  if (!verifiedFrom) {
    return { ok: true, emailedProspect: false };
  }

  const prospectHtml = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#777;margin:0">
        BizBuzz
      </p>
      <h1 style="font-size:32px;margin:10px 0 0">
        ${escapeHtml(lead.businessName)}: ${score}/100
      </h1>
      <p style="font-size:17px;color:#333;margin:8px 0 28px">
        ${band.label}. ${escapeHtml(band.note)}
      </p>

      <h2 style="font-size:16px;margin:0 0 14px">
        The five things to fix, most important first
      </h2>

      ${plan
        .map(
          (item, index) => `
        <div style="margin:0 0 20px;padding:0 0 20px;border-bottom:1px solid #eee">
          <p style="font-size:15px;color:#111;margin:0 0 6px">
            <strong>${index + 1}.</strong> ${escapeHtml(item.action)}
          </p>
          <p style="font-size:14px;color:#666;margin:0">${escapeHtml(
            item.why
          )}</p>
        </div>`
        )
        .join("")}

      <p style="font-size:15px;line-height:1.7;color:#333;margin:28px 0 0">
        Work through those in order and you will move. If you would rather
        we handled it, reply to this email and tell us a little about the
        business. We will tell you honestly whether it needs an agency or
        an afternoon.
      </p>

      <p style="font-size:13px;color:#999;margin:28px 0 0">
        BizBuzz, Karachi and Dubai. thebizbuzz.studio
      </p>
    </div>`;

  const emailedProspect = await send({
    from: verifiedFrom,
    to: lead.email,
    subject: `Your Google listing scored ${score}/100`,
    html: prospectHtml,
    replyTo: notifyTo,
  });

  return { ok: true, emailedProspect };
}
