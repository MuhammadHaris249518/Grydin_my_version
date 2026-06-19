"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const TAPE_H_SLOW_MAX = 72;
const VB_W = 1000;

const Navbar = ({ tapeH, arcR }: { tapeH: number; arcR: number }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
          boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${tapeH}px`,
            overflow: "visible",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${VB_W} ${tapeH}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "block",
            }}
          >
            <path
              d={`M 0 0 L ${VB_W} 0 L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 0 ${VB_W - arcR} ${tapeH} L ${arcR} ${tapeH} A ${arcR} ${arcR} 0 0 0 0 ${arcR} Z`}
              fill="white"
            />
          </svg>

          {/* Logo */}
          <div
            style={{
              position: "absolute",
              top: `${arcR * 0.96}px`,
              left: "clamp(2rem, 4.3vw, 55px)",
              height: `${arcR}px`,
              display: "flex",
              alignItems: "center",
              zIndex: 1,
            }}
          >
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textDecoration: "none",
              }}
            >
              <img
                src="/logo.png"
                alt="GrydIn"
                width={15}
                height={15}
                style={{ objectFit: "contain" }}
              />
              <span
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#0a0a0a",
                  letterSpacing: "-0.02em",
                }}
              >
                GrydIn
              </span>
            </a>
          </div>

          {/* Right – nav links + hamburger */}
          <div
            style={{
              position: "absolute",
              top: `${arcR * 0.96}px`,
              right: "6.5vw",
              height: `${arcR}px`,
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              zIndex: 1,
            }}
          >
            <div
              className="hidden md:flex items-center"
              style={{ gap: "2rem" }}
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs font-semibold tracking-widest transition-opacity duration-150 hover:opacity-50"
                  style={{
                    color: "#0a0a0a",
                    letterSpacing: "0.12em",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                lineHeight: 0,
              }}
            >
              <Menu size={20} color="#0a0a0a" />
            </button>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(0,0,0,0.35)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "fit-content",
          paddingRight: "3.5rem",
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
            position: "absolute",
            top: "14px",
            right: "16px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            lineHeight: 0,
          }}
        >
          <X size={20} color="white" />
        </button>
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            paddingTop: "72px",
            paddingLeft: "28px",
            gap: "1.1rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "white",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.4")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
