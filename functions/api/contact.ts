const INQUIRY_TYPES = [
  "New Project / Business Inquiry",
  "Partnership / Collaboration",
  "Investor / Investment Inquiry",
  "Career / Job Application",
  "Press / Media Inquiry",
  "Vendor / Supplier",
  "Support / Existing Client",
  "General Inquiry",
  "Other",
];

const HEAR_ABOUT_OPTIONS = [
  "Referral",
  "LinkedIn",
  "Other Social Media",
  "Google",
  "Other",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Env = {
  SMTP_PASS?: string;
  SMTP_FROM?: string;
  SMTP_TO?: string;
};

type ContactPayload = {
  fullName: string;
  email: string;
  company?: string;
  website?: string;
  inquiryType: string;
  hearAbout: string;
  subject: string;
  message: string;
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function buildText(payload: ContactPayload) {
  return [
    "New contact form submission — GrydIn website",
    "",
    `Full Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Company: ${payload.company || "—"}`,
    `Website: ${payload.website || "—"}`,
    `Inquiry Type: ${payload.inquiryType}`,
    `How they heard about us: ${payload.hearAbout}`,
    `Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function buildHtml(payload: ContactPayload) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#888;font-size:13px;vertical-align:top;width:160px">${label}</td><td style="padding:8px 12px;color:#111;font-size:14px">${value}</td></tr>`;

  const safeMessage = payload.message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:640px">
      <h2 style="color:#111;font-size:18px;margin:0 0 16px">New contact form submission</h2>
      <table style="border-collapse:collapse;width:100%;border:1px solid #eee">
        ${row("Full Name", payload.fullName)}
        ${row("Email", `<a href="mailto:${payload.email}">${payload.email}</a>`)}
        ${row("Company", payload.company || "—")}
        ${row("Website", payload.website ? `<a href="${payload.website}">${payload.website}</a>` : "—")}
        ${row("Inquiry Type", payload.inquiryType)}
        ${row("Heard About Us", payload.hearAbout)}
        ${row("Subject", payload.subject)}
      </table>
      <p style="color:#888;font-size:13px;margin:20px 0 8px">Message</p>
      <div style="background:#f7f7f7;padding:16px;border-radius:6px;color:#111;font-size:14px;line-height:1.6;white-space:pre-wrap">${safeMessage}</div>
    </div>
  `;
}

async function parseBody(request: Request) {
  const body = await request.json();

  if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
    return { honeypot: true as const };
  }

  const fullName = String(body.fullName ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const company = String(body.company ?? "").trim();
  const website = String(body.website ?? "").trim();
  const inquiryType = String(body.inquiryType ?? "").trim();
  const inquiryOther = String(body.inquiryOther ?? "").trim();
  const hearAbout = String(body.hearAbout ?? "").trim();
  const subject = String(body.subject ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!fullName || fullName.length > 120) {
    return { error: "Please enter your full name." };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { error: "Please enter a valid email address." };
  }
  if (!INQUIRY_TYPES.includes(inquiryType)) {
    return { error: "Please select a valid inquiry type." };
  }
  if (inquiryType === "Other" && !inquiryOther) {
    return { error: "Please describe your inquiry type." };
  }
  if (!HEAR_ABOUT_OPTIONS.includes(hearAbout)) {
    return { error: "Please select how you heard about us." };
  }
  if (!subject || subject.length > 200) {
    return { error: "Please enter a subject." };
  }
  if (!message || message.length < 10 || message.length > 5000) {
    return { error: "Please enter a message (at least 10 characters)." };
  }

  const resolvedInquiry =
    inquiryType === "Other" ? `Other: ${inquiryOther}` : inquiryType;

  return {
    payload: {
      fullName,
      email,
      company: company || undefined,
      website: website || undefined,
      inquiryType: resolvedInquiry,
      hearAbout,
      subject,
      message,
    } satisfies ContactPayload,
  };
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const parsed = await parseBody(context.request);
    if ("honeypot" in parsed) return json({ ok: true });
    if ("error" in parsed) return json({ error: parsed.error }, 400);

    const apiKey = context.env.SMTP_PASS?.trim();
    if (!apiKey) {
      console.error("[contact] Missing SMTP_PASS env var");
      return json(
        {
          error:
            "Unable to send your message right now. Please try again or email hello@grydin.co directly.",
        },
        500,
      );
    }

    const from = context.env.SMTP_FROM?.trim() || "hello@grydin.co";
    const to = context.env.SMTP_TO?.trim() || "hello@grydin.co";
    const payload = parsed.payload;

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": apiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "GrydIn Website", email: from },
        to: [{ email: to }],
        replyTo: { email: payload.email, name: payload.fullName },
        subject: `[GrydIn Contact] ${payload.subject}`,
        textContent: buildText(payload),
        htmlContent: buildHtml(payload),
      }),
    });

    if (!brevoRes.ok) {
      const detail = await brevoRes.text();
      console.error("[contact] Brevo error", brevoRes.status, detail);
      return json(
        {
          error:
            "Unable to send your message right now. Please try again or email hello@grydin.co directly.",
        },
        500,
      );
    }

    return json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return json(
      {
        error:
          "Unable to send your message right now. Please try again or email hello@grydin.co directly.",
      },
      500,
    );
  }
}
