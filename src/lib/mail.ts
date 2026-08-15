import nodemailer from "nodemailer";

export type ContactEmailPayload = {
  fullName: string;
  email: string;
  company?: string;
  website?: string;
  inquiryType: string;
  hearAbout: string;
  subject: string;
  message: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing server environment variable: ${name}`);
  }
  return value;
}

function getSmtpConfig() {
  return {
    host: process.env.SMTP_HOST?.trim() || "smtp-relay.brevo.com",
    port: Number(process.env.SMTP_PORT?.trim() || "587"),
    user: requireEnv("SMTP_USER"),
    pass: requireEnv("SMTP_PASS"),
    from: process.env.SMTP_FROM?.trim() || "hello@grydin.co",
    to: process.env.SMTP_TO?.trim() || "hello@grydin.co",
  };
}

function buildContactEmailText(payload: ContactEmailPayload) {
  const lines = [
    "New contact Website form submission — GrydIn website",
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
  ];
  return lines.join("\n");
}

function buildContactEmailHtml(payload: ContactEmailPayload) {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 12px;color:#888;font-size:13px;vertical-align:top;width:160px">${label}</td><td style="padding:8px 12px;color:#111;font-size:14px">${value}</td></tr>`;

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
      <div style="background:#f7f7f7;padding:16px;border-radius:6px;color:#111;font-size:14px;line-height:1.6;white-space:pre-wrap">${payload.message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
    </div>
  `;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const smtp = getSmtpConfig();

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  const mailSubject = `[GrydIn Contact] ${payload.subject}`;

  await transporter.sendMail({
    from: `"GrydIn Website" <${smtp.from}>`,
    to: smtp.to,
    replyTo: `"${payload.fullName}" <${payload.email}>`,
    subject: mailSubject,
    text: buildContactEmailText(payload),
    html: buildContactEmailHtml(payload),
  });
}
