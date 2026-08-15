import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

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
] as const;

const HEAR_ABOUT_OPTIONS = [
  "Referral",
  "LinkedIn",
  "Other Social Media",
  "Google",
  "Other",
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — bots fill hidden fields; humans leave empty
    if (typeof body.companyWebsite === "string" && body.companyWebsite.trim()) {
      return NextResponse.json({ ok: true });
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
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!INQUIRY_TYPES.includes(inquiryType as (typeof INQUIRY_TYPES)[number])) {
      return NextResponse.json({ error: "Please select a valid inquiry type." }, { status: 400 });
    }
    if (inquiryType === "Other" && !inquiryOther) {
      return NextResponse.json({ error: "Please describe your inquiry type." }, { status: 400 });
    }
    if (!HEAR_ABOUT_OPTIONS.includes(hearAbout as (typeof HEAR_ABOUT_OPTIONS)[number])) {
      return NextResponse.json({ error: "Please select how you heard about us." }, { status: 400 });
    }
    if (!subject || subject.length > 200) {
      return NextResponse.json({ error: "Please enter a subject." }, { status: 400 });
    }
    if (!message || message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: "Please enter a message (at least 10 characters)." },
        { status: 400 }
      );
    }

    const resolvedInquiry =
      inquiryType === "Other" ? `Other: ${inquiryOther}` : inquiryType;

    await sendContactEmail({
      fullName,
      email,
      company: company || undefined,
      website: website || undefined,
      inquiryType: resolvedInquiry,
      hearAbout,
      subject,
      message,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again or email hello@grydin.co directly." },
      { status: 500 }
    );
  }
}
