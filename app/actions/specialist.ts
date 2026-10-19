"use server";

export type SpecialistResult = { ok: true } | { ok: false; error: string };

/*
  Standby specialist network. These are not sales leads, so this does not
  go through the lead pipeline (no scoring, no CRM). Two steps:

    1. Email to us through Resend. This is the step that matters, and it
       works with the same keys the GBP checker already uses.
    2. A row in the Supabase table "specialists", if SUPABASE_URL and
       SUPABASE_SERVICE_KEY exist. Skipped quietly otherwise, and it can
       never make the form fail.

  Only what is needed is collected: name, email, speciality, portfolio,
  phone or WhatsApp, and an optional short intro (200 words at most).
*/

const TEST_SENDER = "onboarding@resend.dev";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clean(value: FormDataEntryValue | null, max: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export async function submitSpecialist(
  formData: FormData
): Promise<SpecialistResult> {
  /* Honeypot: real people never see or fill this field. Pretend success. */
  if (clean(formData.get("company_site"), 100)) return { ok: true };

  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 200).toLowerCase();
  const phone = clean(formData.get("phone"), 40);
  const speciality = clean(formData.get("speciality"), 160);
  const portfolio = clean(formData.get("portfolio"), 300);
  const intro = clean(formData.get("intro"), 1600);
  const consent = formData.get("consent") === "on";

  if (name.length < 2) return { ok: false, error: "Please add your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { ok: false, error: "Please check your email address." };
  if (speciality.length < 2)
    return { ok: false, error: "Please tell us what you specialise in." };
  if (!/^https?:\/\/\S+\.\S+/i.test(portfolio))
    return {
      ok: false,
      error: "Please add a portfolio link that starts with https://",
    };
  const digits = phone.replace(/\D/g, "");
  if (!/^[+\d][\d\s\-().+]*$/.test(phone) || digits.length < 7 || digits.length > 15)
    return {
      ok: false,
      error: "Please add a phone or WhatsApp number we can reach you on.",
    };
  if (intro && intro.split(" ").length > 200)
    return { ok: false, error: "Please keep your intro to 200 words or fewer." };
  if (!consent)
    return { ok: false, error: "Please tick the box so we can keep your details." };

  const key = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_INBOX ?? "djfaraz@gmail.com";
  const from = process.env.RESEND_FROM ?? TEST_SENDER;

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <p style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#777;margin:0">
        Specialist network
      </p>
      <h1 style="font-size:26px;margin:8px 0 18px">${escapeHtml(name)}: ${escapeHtml(speciality)}</h1>
      <p style="font-size:14px;line-height:1.8;color:#333;margin:0">
        Email: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br>
        Phone or WhatsApp: ${escapeHtml(phone)}<br>
        Portfolio: ${escapeHtml(portfolio)}
      </p>
      ${intro ? `<p style="font-size:14px;line-height:1.7;color:#333;margin:18px 0 0"><strong>About them</strong><br>${escapeHtml(intro)}</p>` : ""}
      <p style="font-size:13px;color:#777;margin:24px 0 0">
        They agreed to be kept on file for project-based work. Reply to reach them.
      </p>
    </div>`;

  let emailed = false;
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
          subject: `Specialist network: ${name}, ${speciality}`,
          html,
          reply_to: email,
        }),
      });
      emailed = response.ok;
    } catch {
      emailed = false;
    }
  }

  let saved = false;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;
  if (url && serviceKey) {
    try {
      const res = await fetch(
        `${url.replace(/\/+$/, "")}/rest/v1/specialists`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: serviceKey,
            Authorization: `Bearer ${serviceKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            speciality,
            portfolio,
            intro,
            consent: true,
            received_at: new Date().toISOString(),
          }),
        }
      );
      saved = res.ok;
      if (!res.ok) console.error("[specialist] supabase status", res.status);
    } catch (err) {
      console.error("[specialist] supabase threw", String(err));
    }
  }

  if (!emailed && !saved) {
    return {
      ok: false,
      error: "We could not save that just now. Please try again shortly.",
    };
  }
  return { ok: true };
}
