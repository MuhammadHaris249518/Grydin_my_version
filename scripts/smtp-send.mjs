/**
 * Send a test email via Brevo SMTP.
 * Reads credentials from `.env.local` (same file as the contact form API).
 *
 * Setup: cp .env.example .env.local  →  fill SMTP_USER + SMTP_PASS
 *
 * Usage:
 *   npm run smtp:test
 *
 * With custom subject/message:
 *   node scripts/smtp-send.mjs --subject "Test" --message "Hello"
 */

import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

function readArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

const config = {
  host: process.env.SMTP_HOST ?? "smtp-relay.brevo.com",
  port: Number(process.env.SMTP_PORT ?? "587"),
  user: readArg("--user") ?? process.env.SMTP_USER,
  from: readArg("--from") ?? process.env.SMTP_FROM ?? "hello@grydin.co",
  to: readArg("--to") ?? process.env.SMTP_TO ?? "hello@grydin.co",
  subject: readArg("--subject") ?? process.env.SMTP_SUBJECT ?? "GrydIn SMTP test",
  message:
    readArg("--message") ??
    process.env.SMTP_MESSAGE ??
    "Test email from GrydIn via Brevo SMTP (.env.local credentials).",
};

const pass = process.env.SMTP_PASS?.trim();

if (!config.user || !pass) {
  console.error(`
Missing credentials in .env.local

1. cp .env.example .env.local
2. Add your Brevo SMTP login + key to .env.local
3. Run: npm run smtp:test

File location: ${resolve(__dirname, "../.env.local")}
`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: config.host,
  port: config.port,
  secure: config.port === 465,
  auth: { user: config.user, pass },
  tls: { minVersion: "TLSv1.2" },
});

console.log("Reading from .env.local");
console.log(`  host: ${config.host}:${config.port}`);
console.log(`  user: ${config.user}`);
console.log(`  from: ${config.from} → to: ${config.to}\n`);

try {
  await transporter.verify();
  console.log("SMTP connection OK.\n");
  const info = await transporter.sendMail({
    from: `"GrydIn" <${config.from}>`,
    to: config.to,
    subject: config.subject,
    text: config.message,
    html: `<p>${config.message.replace(/\n/g, "<br>")}</p>`,
  });
  console.log(`Email sent. Message ID: ${info.messageId}`);
} catch (err) {
  console.error("Failed:", err instanceof Error ? err.message : err);
  process.exit(1);
}
