"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { SITE, SITEMAP_LINKS, SERVICE_LINKS } from "./site-config";
import { GrydInLogo } from "./GrydInLogo";
import { BRAND_ACCENT } from "@/lib/brand";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);
  return isMobile;
}

const columnHeading: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.92)",
  marginBottom: "1.1rem",
};

const footerLink: React.CSSProperties = {
  color: "rgba(255,255,255,0.48)",
  fontSize: "0.88rem",
  textDecoration: "none",
  transition: "color 0.2s ease",
  lineHeight: 1.5,
};

const contactRow: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
  color: "rgba(255,255,255,0.55)",
  fontSize: "0.86rem",
  lineHeight: 1.55,
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    style={footerLink}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = BRAND_ACCENT;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "rgba(255,255,255,0.48)";
    }}
  >
    {label}
  </Link>
);

const PhoneContact = ({ isMobile }: { isMobile: boolean }) => {
  const [copied, setCopied] = useState(false);

  const copyPhone = async () => {
    try {
      await navigator.clipboard.writeText(SITE.phoneTel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  if (isMobile) {
    return (
      <a href={`tel:${SITE.phoneTel}`} style={{ ...contactRow, textDecoration: "none" }}>
        <Phone size={15} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.4)" }} />
        <span>{SITE.phoneDisplay}</span>
      </a>
    );
  }

  return (
    <button
      type="button"
      data-allow-copy
      onClick={copyPhone}
      style={{
        ...contactRow,
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        textAlign: "left",
      }}
      title="Click to copy"
    >
      {copied ? (
        <Check size={15} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: "2px", color: BRAND_ACCENT }} />
      ) : (
        <Phone size={15} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.4)" }} />
      )}
      <span style={{ color: copied ? BRAND_ACCENT : "rgba(255,255,255,0.55)" }}>
        {copied ? "Copied!" : SITE.phoneDisplay}
      </span>
    </button>
  );
};

export const SiteFooter = () => {
  const isMobile = useIsMobile();

  return (
    <footer
      style={{
        width: "100%",
        background: "#000000",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: isMobile
          ? "2.5rem 1rem 1.5rem"
          : "clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 3rem) clamp(1.5rem, 3vw, 2rem)",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "minmax(200px, 1.3fr) minmax(280px, 1fr) minmax(220px, 1fr)",
          gap: isMobile ? "2rem" : "clamp(2rem, 4vw, 3rem)",
          alignItems: "start",
        }}
      >
        <div>
          <GrydInLogo variant="footer" />
          <p style={{ marginTop: "1rem", marginBottom: "1.2rem", fontSize: "0.86rem", lineHeight: 1.65, color: "rgba(255,255,255,0.42)", maxWidth: "240px" }}>
            {SITE.tagline}
          </p>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GrydIn on LinkedIn"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "34px",
              height: "34px",
              borderRadius: "6px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.7)",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${BRAND_ACCENT}22`;
              e.currentTarget.style.color = BRAND_ACCENT;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            <Linkedin size={16} strokeWidth={1.6} />
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(1.25rem, 5vw, 2.5rem)",
            minWidth: 0,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <p style={columnHeading}>Services</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {SERVICE_LINKS.map((link) => (
                <FooterLink key={link.label} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>

          <div style={{ minWidth: 0 }}>
            <p style={columnHeading}>Sitemap</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
              {SITEMAP_LINKS.map((link) => (
                <FooterLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>
        </div>

        <div style={{ minWidth: 0 }}>
          <p style={columnHeading}>Contact</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            <a href={`mailto:${SITE.email}`} style={{ ...contactRow, textDecoration: "none" }}>
              <Mail size={15} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.4)" }} />
              <span style={{ wordBreak: "break-all" }}>{SITE.email}</span>
            </a>
            <PhoneContact isMobile={isMobile} />
            <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ ...contactRow, textDecoration: "none" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.4)" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.418A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>{SITE.phoneDisplay}</span>
            </a>
            <div style={contactRow}>
              <MapPin size={15} strokeWidth={1.6} style={{ flexShrink: 0, marginTop: "2px", color: "rgba(255,255,255,0.4)" }} />
              <span style={{ color: "rgba(255,255,255,0.55)" }}>
                <span style={{ color: BRAND_ACCENT, fontWeight: 600 }}>{SITE.city}</span>
                , Pakistan – working globally
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "2rem auto 0",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
      </div>
    </footer>
  );
};
