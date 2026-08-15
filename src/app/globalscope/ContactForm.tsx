"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { BRAND_ACCENT, brandAccentAlpha } from "@/lib/brand";

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

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "4px",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#ffffff",
  fontSize: "0.88rem",
  outline: "none",
  transition: "border-color 0.2s ease, background 0.2s ease",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.42)",
  marginBottom: "6px",
};

const focusHandlers = {
  onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
  },
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
  },
};

export const ContactForm = () => {
  const [inquiryType, setInquiryType] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      company: data.get("company"),
      website: data.get("website"),
      inquiryType: data.get("inquiryType"),
      inquiryOther: data.get("inquiryOther"),
      hearAbout: data.get("hearAbout"),
      subject: data.get("subject"),
      message: data.get("message"),
      companyWebsite: data.get("companyWebsite"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Something went wrong.");
      }
      setStatus("success");
      form.reset();
      setInquiryType("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div
        style={{
          marginTop: "2rem",
          padding: "1.6rem",
          borderRadius: "6px",
          border: `1px solid ${brandAccentAlpha(0.35)}`,
          background: brandAccentAlpha(0.08),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.5rem" }}>
          <Check size={18} style={{ color: BRAND_ACCENT }} />
          <p style={{ margin: 0, color: "#ffffff", fontWeight: 600, fontSize: "0.95rem" }}>
            Message sent
          </p>
        </div>
        <p style={{ margin: 0, color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.6 }}>
          Thanks for reaching out. We&apos;ll get back to you within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "1rem",
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.8rem",
            cursor: "pointer",
            padding: 0,
            textDecoration: "underline",
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }} noValidate>
      {/* Honeypot — hidden from users, not exposed in devtools as credential */}
      <input
        type="text"
        name="companyWebsite"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1rem 1.25rem",
        }}
      >
        <div>
          <label htmlFor="fullName" style={labelStyle}>
            Full Name <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            style={fieldStyle}
            {...focusHandlers}
          />
        </div>

        <div>
          <label htmlFor="email" style={labelStyle}>
            Email Address <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            style={fieldStyle}
            {...focusHandlers}
          />
        </div>

        <div>
          <label htmlFor="company" style={labelStyle}>
            Your Company Name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            style={fieldStyle}
            {...focusHandlers}
          />
        </div>

        <div>
          <label htmlFor="website" style={labelStyle}>
            Your Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            style={fieldStyle}
            {...focusHandlers}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="inquiryType" style={labelStyle}>
            What are you reaching out about? <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <select
            id="inquiryType"
            name="inquiryType"
            required
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            style={{ ...fieldStyle, cursor: "pointer" }}
            {...focusHandlers}
          >
            <option value="" disabled style={{ color: "#666" }}>
              Select an option
            </option>
            {INQUIRY_TYPES.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#111" }}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {inquiryType === "Other" && (
          <div style={{ gridColumn: "1 / -1" }}>
            <label htmlFor="inquiryOther" style={labelStyle}>
              Please specify <span style={{ color: BRAND_ACCENT }}>*</span>
            </label>
            <input
              id="inquiryOther"
              name="inquiryOther"
              type="text"
              required
              placeholder="Describe your inquiry type"
              style={fieldStyle}
              {...focusHandlers}
            />
          </div>
        )}

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="hearAbout" style={labelStyle}>
            How did you hear about us? <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <select
            id="hearAbout"
            name="hearAbout"
            required
            defaultValue=""
            style={{ ...fieldStyle, cursor: "pointer" }}
            {...focusHandlers}
          >
            <option value="" disabled style={{ color: "#666" }}>
              Select an option
            </option>
            {HEAR_ABOUT_OPTIONS.map((opt) => (
              <option key={opt} value={opt} style={{ color: "#111" }}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="subject" style={labelStyle}>
            Subject <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            style={fieldStyle}
            {...focusHandlers}
          />
        </div>

        <div style={{ gridColumn: "1 / -1" }}>
          <label htmlFor="message" style={labelStyle}>
            Message <span style={{ color: BRAND_ACCENT }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            style={{ ...fieldStyle, resize: "vertical", minHeight: "120px", lineHeight: 1.6 }}
            {...focusHandlers}
          />
        </div>
      </div>

      {status === "error" && (
        <p style={{ marginTop: "1rem", color: "#f87171", fontSize: "0.85rem" }}>{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          marginTop: "1.5rem",
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          padding: "11px 22px",
          background: status === "loading" ? "rgba(255,255,255,0.6)" : "#ffffff",
          color: "#000000",
          fontWeight: 600,
          fontSize: "0.85rem",
          borderRadius: "2px",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          letterSpacing: "0.04em",
          transition: "gap 0.2s, background 0.2s",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") e.currentTarget.style.gap = "12px";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.gap = "8px";
        }}
      >
        {status === "loading" ? (
          <>
            <Loader2 size={14} className="animate-spin" style={{ animation: "spin 1s linear infinite" }} />
            Sending...
          </>
        ) : (
          <>
            Send message <ArrowRight size={14} strokeWidth={2.2} />
          </>
        )}
      </button>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        select option {
          background: #fff;
          color: #111;
        }
      `}</style>
    </form>
  );
};
