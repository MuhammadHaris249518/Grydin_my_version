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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 123.86 30.24"
                  role="img"
                  aria-label="GrydIn"
                  style={{ height: "14px", width: "auto", display: "block" }}
                >
                  <defs>
                    <linearGradient id="navbar-logo-gradient-1" x1="99.59" y1="13.45" x2="99.59" y2="13.34" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#4d4d4d" />
                      <stop offset="1" />
                    </linearGradient>
                    <linearGradient id="navbar-logo-gradient-2" x1="102" y1="5.79" x2="102" y2="2.68" xlinkHref="#navbar-logo-gradient-1" />
                    <linearGradient id="navbar-logo-gradient-3" x1="25.45" y1="24.53" x2="25.45" y2="10.49" gradientUnits="userSpaceOnUse">
                      <stop offset="0" stopColor="#8c8c8c" />
                      <stop offset="1" stopColor="#333" />
                    </linearGradient>
                    <linearGradient id="navbar-logo-gradient-6" x1="9.78" y1="12.73" x2="27.74" y2="12.73" gradientUnits="userSpaceOnUse">
                      <stop offset="0" />
                      <stop offset="1" stopColor="#333" />
                    </linearGradient>
                    <linearGradient id="navbar-logo-gradient-7" x1="99.85" y1="24.54" x2="99.85" y2="0.1" xlinkHref="#navbar-logo-gradient-1" />
                  </defs>
                  <path d="M99.59,13.34a.45.45,0,0,1,0,.11s0-.08,0-.11Z" fillRule="evenodd" fill="url(#navbar-logo-gradient-1)" />
                  <path d="M102,5.66a.28.28,0,0,1,0,.13.28.28,0,0,0,0-.13c0-1,0-2,0-3C102,3.67,102,4.67,102,5.66Z" fillRule="evenodd" fill="url(#navbar-logo-gradient-2)" />
                  <path d="M27.78,18.82c0,.92,0,1.83,0,2.75-.19,2.31-2.55,3.16-4.58,2.92a.16.16,0,0,1-.06-.13V15.62c0-.12,0-.23,0-.35a2.17,2.17,0,0,1,0-.26.17.17,0,0,0,.16-.06,3.55,3.55,0,0,1,1.18-1.65l.08-.08c.32-.37,3.16-2.61,3.2-2.73a.15.15,0,0,1,.05.13c0,1.32,0,2.63,0,3.94V15.8c0,.54,0,1.07,0,1.6Z" fillRule="evenodd" fill="url(#navbar-logo-gradient-3)" />
                  <path d="M51.59,13.13a.41.41,0,0,0-.1.14A.33.33,0,0,1,51.59,13.13Z" fill="#010101" fillRule="evenodd" />
                  <path d="M27.28,0H18q-3,0-6,0C2.84.65-3.14,10.71,1.74,18.83a12.47,12.47,0,0,0,4.35,4.25,11.32,11.32,0,0,0,2.23,1,7.54,7.54,0,0,0,1.13.3c2.2.42,4.65.15,6.89.24.32,0,.43-.12.61-.34.88-1.07,1.76-2.14,2.65-3.2.07-.06.28-.29,0-.28q-3.81,0-7.62,0a9.44,9.44,0,0,1-1.91-.34,8,8,0,0,1-2.81-1.56,8.4,8.4,0,0,1-2.51-4A8.88,8.88,0,0,1,12.84,3.76H23.5A2.54,2.54,0,0,0,25.28,3c.8-.94,1.6-1.87,2.41-2.79a.11.11,0,0,0,0-.13A1.63,1.63,0,0,0,27.28,0ZM14.59.29a.11.11,0,0,1-.1-.06.08.08,0,0,1,.09,0h.3a.08.08,0,0,0-.07,0,.14.14,0,0,0,.12.06C14.82.3,14.7.29,14.59.29Zm1.56,0h0Zm.59-.12a.71.71,0,0,1-.38,0l.34,0c.15,0,.29,0,.42.06Zm8,0H22.06A.24.24,0,0,1,22.28.1h2.5C24.92.14,24.92.17,24.77.19Z" fill="#010101" fillRule="evenodd" />
                  <path d="M92.57,0H88.22a.22.22,0,0,0-.2.08q0,3.54,0,7.08a.62.62,0,0,1-.07.33.83.83,0,0,1-.34.07H80.78A9.5,9.5,0,0,0,76.2,8.75,7.72,7.72,0,0,0,73.09,12c-1.7,3.42-1.19,8.08,1.86,10.59a8.73,8.73,0,0,0,4.72,2c.37,0,.74.06,1.11.07h6.38a5.67,5.67,0,0,0,4.58-2,5,5,0,0,0,1-2.85q0-9.81,0-19.62A.21.21,0,0,0,92.57,0ZM84.29,21.11c-1.22,0-2.43,0-3.64,0a4.1,4.1,0,0,1-3.79-4.18c-.12-2.19.14-4.11,2.19-5.29a4.81,4.81,0,0,1,1.82-.51H88a.11.11,0,0,1,.06.11c0,1.76,0,3.52,0,5.28,0,.53,0,1.06,0,1.59a3.26,3.26,0,0,1-.58,1.49A3.89,3.89,0,0,1,84.29,21.11Z" fill="#010101" fillRule="evenodd" />
                  <path d="M72.87,7.73q-6.7,10-13.32,20.08a6.21,6.21,0,0,1-1.29,1.32,5.6,5.6,0,0,1-2.78,1.05c-1.1.1-2.38,0-3.5,0q-.1-.06,0-.18l.31-.44c1.45-2,2.88-3.94,4.29-5.92a1.08,1.08,0,0,0-.11-1.31c-1.14-1.71-2.26-3.42-3.38-5.13-.71-1.07-1.42-2.13-2.12-3.2L46.65,7.61a.09.09,0,0,1,.09-.05c1.61,0,3.27,0,4.88,0a13.17,13.17,0,0,1,1.56,2.1c.69,1,1.37,1.95,2,2.92q2,2.84,4,5.68a.69.69,0,0,0,1.23-.08l7.2-10.33a.57.57,0,0,1,.58-.32c1.54,0,3.08,0,4.62,0Q73,7.58,72.87,7.73Z" fill="#010101" fillRule="evenodd" />
                  <path d="M44.4,11c0,.19-.24.13-.36.14H40a4.81,4.81,0,0,0-.84.1,3.94,3.94,0,0,0-1.68.79l-.09.09a2.59,2.59,0,0,0-.82,1.63c0,3.54,0,7.08,0,10.63,0,.11-.06.16-.18.16H32a.2.2,0,0,1-.19-.09q0-6,0-12.08a5.78,5.78,0,0,1,.38-1.79,5.21,5.21,0,0,1,.89-1.34,5.37,5.37,0,0,1,3.75-1.65h7a1.23,1.23,0,0,1,.38,0C44.52,7.84,44.35,10.46,44.4,11Z" fill="#010101" fillRule="evenodd" />
                  <path d="M123.85,24.09a.5.5,0,0,1-.13.39,1,1,0,0,1-.3,0H119.6a.21.21,0,0,1-.21-.09c0-3.14,0-6.29,0-9.43v-.09a3.66,3.66,0,0,0-.75-2,3.78,3.78,0,0,0-2.26-1.45,3.18,3.18,0,0,0-.62-.07c-1.64,0-3.28,0-4.92,0a.17.17,0,0,0-.19.09q0,6.33,0,12.66a1.54,1.54,0,0,1,0,.3c-.07.13-.26.12-.39.13h-3.55a1,1,0,0,1-.38-.05.48.48,0,0,1-.11-.38q0-7.89,0-15.78a2.88,2.88,0,0,1,0-.59.12.12,0,0,1,.11,0l1.05,0c3.09,0,6.18,0,9.26,0a7.39,7.39,0,0,1,7.12,6.42,7,7,0,0,1,.08,1.12C123.83,18.18,123.83,21.13,123.85,24.09Z" fill="#010101" fillRule="evenodd" />
                  <path d="M27.74,10.49c0,.12-2.88,2.36-3.2,2.73l-.08.08A3.55,3.55,0,0,0,23.28,15a.17.17,0,0,1-.16.06,2.83,2.83,0,0,0,0-.77,34.17,34.17,0,0,0-4.74-.11H9.87c-.09,0-.11,0-.07-.1.3-.28.59-.56.9-.83.7-.64,1.39-1.29,2.08-1.94a3.72,3.72,0,0,1,2.81-.78h2.92l8.74,0A4,4,0,0,1,27.74,10.49Z" fillRule="evenodd" fill="url(#navbar-logo-gradient-6)" />
                  <path d="M102.06,19.52V7.11c0-2.25,0-4.5,0-6.75,0-.08,0-.34-.13-.25-.46.39-.92.79-1.36,1.2l-.52.46c-.33.28-.66.56-1,.85-.84.71-1.47,1.08-1.45,2.32V19.6c0,1.59,0,3.17,0,4.75,0,.25.42.14.55.17h3.46a.79.79,0,0,0,.37-.07A39.38,39.38,0,0,0,102.06,19.52Zm-2.48-6.08v-.11h0A.41.41,0,0,0,99.58,13.44Z" fillRule="evenodd" fill="url(#navbar-logo-gradient-7)" />
                </svg>
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
