"use client";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GrydInLogo } from "./GrydInLogo";
import { BRAND_ACCENT, brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";

export const NAVBAR_TOP_OFFSET = 88;

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

const NavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    style={{
      color: "rgba(255,255,255,0.62)",
      fontSize: "0.82rem",
      fontWeight: 500,
      letterSpacing: "0.02em",
      textDecoration: "none",
      transition: "color 0.2s ease",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.color = BRAND_ACCENT;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.color = "rgba(255,255,255,0.62)";
    }}
  >
    {label}
  </Link>
);

const GetStartedButton = ({ onClick }: { onClick?: () => void }) => (
  <Link
    href="/contact"
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "8px 16px",
      borderRadius: "2px",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "rgba(255,255,255,0.88)",
      fontSize: "0.8rem",
      fontWeight: 600,
      letterSpacing: "0.02em",
      textDecoration: "none",
      transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, gap 0.2s ease",
      flexShrink: 0,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = brandAccentAlpha(0.12);
      e.currentTarget.style.borderColor = brandAccentHexAlpha(0.45);
      e.currentTarget.style.color = "#ffffff";
      e.currentTarget.style.gap = "8px";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      e.currentTarget.style.color = "rgba(255,255,255,0.88)";
      e.currentTarget.style.gap = "6px";
    }}
  >
    Get started
    <ArrowRight size={13} strokeWidth={2.2} />
  </Link>
);

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    setEntered(false);
    setMenuOpen(false);
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          padding: "14px clamp(1rem, 3vw, 2rem) 0",
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            minHeight: "52px",
            padding: "8px 10px 8px 18px",
            borderRadius: "2px",
            background: scrolled
              ? "rgba(12,12,12,0.72)"
              : "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.28)"
              : "0 4px 24px rgba(0,0,0,0.12)",
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(-12px)",
            transition:
              "opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1), background 0.3s ease, box-shadow 0.3s ease",
            pointerEvents: "auto",
          }}
        >
          <GrydInLogo />

          <nav
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              alignItems: "center",
              gap: "clamp(1.5rem, 3vw, 2.5rem)",
            }}
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavLink key={link.href} href={link.href} label={link.label} />
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div className="hidden md:block">
              <GetStartedButton />
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "999px",
                cursor: "pointer",
                padding: "8px",
                lineHeight: 0,
                color: "white",
              }}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(0,0,0,0.45)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(168px, 52vw)",
          padding: "1.25rem 1rem 1.25rem 1.25rem",
          zIndex: 100,
          background: "linear-gradient(to bottom, #000000 0%, #4D4D4D 100%)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
          borderTopLeftRadius: "18px",
          borderBottomLeftRadius: "18px",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: "flex-end",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 0,
            color: "white",
          }}
        >
          <X size={20} />
        </button>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "2rem",
            paddingLeft: "0.5rem",
            gap: "1.25rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              onClick={() => setMenuOpen(false)}
            />
          ))}
          <div style={{ marginTop: "0.5rem" }}>
            <GetStartedButton onClick={() => setMenuOpen(false)} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
