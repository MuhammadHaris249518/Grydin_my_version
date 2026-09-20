"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";

const WhatsAppIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
    style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.45)" }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);
import { SITE } from "./site-config";
import { BRAND_ACCENT, brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";

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
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = () => {
    const text = SITE.email;

    const showCopied = () => {
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    };

    const legacyCopy = (): boolean => {
      try {
        const input = document.createElement("input");
        input.value = text;
        input.readOnly = true;
        input.style.position = "fixed";
        input.style.top = "0";
        input.style.left = "0";
        input.style.opacity = "0";
        input.style.pointerEvents = "none";
        document.body.appendChild(input);
        input.focus();
        input.select();
        input.setSelectionRange(0, text.length);
        const ok = document.execCommand("copy");
        document.body.removeChild(input);
        return ok;
      } catch {
        return false;
      }
    };

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText && window.isSecureContext) {
      void navigator.clipboard.writeText(text).then(showCopied).catch(() => {
        if (legacyCopy()) showCopied();
        else setErrorMsg("Could not copy email. Please copy it manually.");
      });
      return;
    }

    if (legacyCopy()) showCopied();
    else setErrorMsg("Could not copy email. Please copy it manually.");
  };

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

      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "1rem 1.75rem",
        }}
      >
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
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
            flexShrink: 0,
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

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1.25rem 2.25rem",
            minWidth: 0,
            flex: "1 1 200px",
          }}
        >
          <button
            type="button"
            onClick={() => void copyEmail()}
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: "10px",
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              textAlign: "left",
              minWidth: 0,
            }}
            aria-label={`Copy email ${SITE.email}`}
          >
            <Mail
              size={18}
              strokeWidth={1.8}
              style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.45)" }}
              aria-hidden
            />
            <span style={{ display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.4,
                }}
              >
                Or mail us directly at
              </span>
              <span
                style={{
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: emailCopied ? BRAND_ACCENT : "rgba(255,255,255,0.58)",
                  borderBottom: `1px solid ${brandAccentHexAlpha(emailCopied ? 0.55 : 0.28)}`,
                  paddingBottom: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
              >
                {emailCopied ? "Copied!" : SITE.email}
              </span>
            </span>
          </button>

          <a
            href={SITE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "flex-start",
              gap: "10px",
              textDecoration: "none",
              minWidth: 0,
            }}
            onMouseEnter={(e) => {
              const link = e.currentTarget.querySelector(".contact-alt-link") as HTMLElement | null;
              if (link) {
                link.style.color = BRAND_ACCENT;
                link.style.borderBottomColor = brandAccentHexAlpha(0.55);
              }
            }}
            onMouseLeave={(e) => {
              const link = e.currentTarget.querySelector(".contact-alt-link") as HTMLElement | null;
              if (link) {
                link.style.color = "rgba(255,255,255,0.58)";
                link.style.borderBottomColor = brandAccentHexAlpha(0.28);
              }
            }}
          >
            <WhatsAppIcon size={18} />
            <span style={{ display: "flex", flexDirection: "column", gap: "0.2rem", minWidth: 0 }}>
              <span
                style={{
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.4,
                }}
              >
                Or click to message on WhatsApp
              </span>
              <span
                style={{
                  fontSize: "0.86rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.58)",
                  borderBottom: `1px solid ${brandAccentHexAlpha(0.28)}`,
                  paddingBottom: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                }}
                className="contact-alt-link"
              >
                {SITE.phoneDisplay}
              </span>
            </span>
          </a>
        </div>
      </div>

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
