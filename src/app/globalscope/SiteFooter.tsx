"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Linkedin } from "lucide-react";
import { SITE, SITEMAP_LINKS, SERVICE_LINKS, BLOG_LINKS } from "./site-config";
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
          gridTemplateColumns: isMobile
            ? "1fr"
            : "minmax(200px, 1.15fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr)",
          gap: isMobile ? "2rem" : "clamp(1.5rem, 4vw, 3rem)",
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
              border: "1px solid rgba(255,255,255,0.10)",
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

        <div style={{ minWidth: 0 }}>
          <p style={columnHeading}>Services</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {SERVICE_LINKS.map((link) => (
              <FooterLink key={link.label} href={link.href} label={link.label} />
            ))}
          </nav>
        </div>

        <div style={{ minWidth: 0 }}>
          <p style={columnHeading}>Newsroom</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            {BLOG_LINKS.map((link) => (
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
