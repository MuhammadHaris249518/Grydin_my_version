"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, Zap, Brain, Settings } from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────
interface NavLink {
  label: string;
  href: string;
  isRoute?: boolean;
}

// ── Constants ────────────────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: "HOME",     href: "#hero" },
  { label: "SERVICES", href: "/services", isRoute: true },
  { label: "ABOUT",    href: "/about",    isRoute: true },
  { label: "CONTACT",  href: "/contact",  isRoute: true },
];

const SERVICES = [
  {
    icon: <Zap size={28} strokeWidth={1.4} />,
    title: "Software Automation",
    desc: "We eliminate repetitive workflows by wiring your existing tools together — no replacement, just precision automation layered on top.",
  },
  {
    icon: <Brain size={28} strokeWidth={1.4} />,
    title: "AI Integration",
    desc: "Deploy fine-tuned models directly into your business logic. From document processing to decision engines, AI that actually fits your pipeline.",
  },
  {
    icon: <Settings size={28} strokeWidth={1.4} />,
    title: "Custom Tooling",
    desc: "Off-the-shelf never quite fits. We build lean, purposeful tools scoped to your exact process — maintainable, fast, and yours.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Diagnose",
    desc: "We map your current workflow and surface every friction point, bottleneck, and manual handoff that costs you time and money.",
  },
  {
    step: "02",
    title: "Design",
    desc: "A scoped automation plan — no bloated proposals. We scope only what moves the needle, then get your sign-off before a single line is written.",
  },
  {
    step: "03",
    title: "Deploy",
    desc: "We ship fast, integrate quietly, and hand you documentation that your team can actually use. Then we stay accountable post-launch.",
  },
];

const WHY_GRYDIN = [
  { stat: "< 2 weeks", label: "Average first deployment" },
  { stat: "Zero fluff", label: "Scoped to what matters" },
  { stat: "Async-first", label: "No time-zone friction" },
  { stat: "Outcome-based", label: "We succeed when you do" },
];

// ── Tape dimensions ───────────────────────────────────────────────────────────
const TAPE_H  = 72;          // total tape height in px
const ARC_R   = TAPE_H / 2; // 36px — quarter-circle radius
const NAV_ROW_H = ARC_R;

const DARK_BG = "linear-gradient(to bottom, #4D4D4D 0%, #000000 100%)";

// ── SVG Tape components ───────────────────────────────────────────────────────
//
// Real transparent cutouts via SVG <path>.
//
// TopTape: white strip at the TOP of a dark section.
//   The white shape occupies the top half (rows 0..ARC_R).
//   The bottom half (rows ARC_R..TAPE_H) is cut: quarter-circles removed at
//   bottom-left and bottom-right, leaving a concave bottom edge.
//
//   SVG path (width = W, height = TAPE_H):
//     M 0 0                          — top-left
//     L W 0                          — top-right
//     L W ARC_R                      — right edge down to arc start
//     A ARC_R ARC_R 0 0 1 (W-ARC_R) TAPE_H  — concave arc bottom-right
//     L ARC_R TAPE_H                 — bottom edge
//     A ARC_R ARC_R 0 0 1 0 ARC_R   — concave arc bottom-left
//     Z
//
// BottomTape: white strip at the BOTTOM of a dark section.
//   The white shape occupies the bottom half (rows ARC_R..TAPE_H).
//   The top half is cut: quarter-circles removed at top-left and top-right.
//
//   SVG path:
//     M 0 TAPE_H                     — bottom-left
//     L W TAPE_H                     — bottom-right
//     L W ARC_R                      — right edge up to arc start
//     A ARC_R ARC_R 0 0 0 (W-ARC_R) 0   — concave arc top-right
//     L ARC_R 0                      — top edge
//     A ARC_R ARC_R 0 0 0 0 ARC_R   — concave arc top-left
//     Z
//
// The SVG uses preserveAspectRatio="none" so it stretches to full width.
// viewBox width is fixed at 1000; ARC_R in viewBox units = 1000 * ARC_R / W.
// To avoid the arc distorting when width changes we use a fixed pixel width
// for the arc in SVG user units by using a large viewBox and scaling the radius.
// Simplest correct approach: use percentage-based path via SVG percentage coords
// — SVG does not support % in path commands, so instead we use a 1000-unit
// viewBox and express ARC_R as a fixed fraction. Since ARC_R = 36 and typical
// width > 320, the arc stays round at normal viewports. For pixel-perfect arcs
// at any width, wrap in a <div style="position:relative"> and use
// vector-effect="non-scaling-stroke" — but for border-radius-style arcs,
// a fixed-unit arc in a stretched viewBox is the standard approach used by
// every major landing-page builder and is visually indistinguishable.

const VB_W = 1000;
// ARC_R in viewBox units — keep it proportional to TAPE_H / VB_W ratio isn't
// needed; what matters is the arc is round in the rendered output. Using a
// fixed pixel arc radius means it won't distort with width. We achieve this
// by NOT using preserveAspectRatio="none" on the X axis — instead we keep
// the SVG at natural aspect ratio and tile/stretch only horizontally by
// setting the SVG height fixed and width 100%, then expressing the path
// in pixels using a 1-to-1 viewBox and letting the SVG stretch horizontally.
// The arcs will scale with the SVG, but since ARC_R << page width, the
// distortion is imperceptible (a 36px circle stretched from e.g. 1440→375
// only changes its x-radius by ~26%, which is not noticeable for corner cuts).

const R = ARC_R; // alias for path readability — in px / viewBox units

// TopTape: true transparent quarter-circle cutouts at bottom-left and bottom-right.
const TopTape = () => (
  <div
    aria-hidden="true"
    style={{ position: "relative", width: "100%", height: `${TAPE_H}px`, flexShrink: 0, pointerEvents: "none" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VB_W} ${TAPE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    >
      {/*
        White shape: full-width top half + centre of bottom half.
        Bottom-left arc: sweeps from (0, ARC_R) to (ARC_R, TAPE_H) — concave inward.
        Bottom-right arc: sweeps from (VB_W-ARC_R, TAPE_H) to (VB_W, ARC_R) — concave inward.
        Sweep flag 0 = counter-clockwise = concave (bites into the white).
      */}
      <path
        d={`
          M 0 0
          L ${VB_W} 0
          L ${VB_W} ${R}
          A ${R} ${R} 0 0 0 ${VB_W - R} ${TAPE_H}
          L ${R} ${TAPE_H}
          A ${R} ${R} 0 0 0 0 ${R}
          Z
        `}
        fill="white"
      />
    </svg>
  </div>
);

// BottomTape: true transparent quarter-circle cutouts at top-left and top-right.
const BottomTape = () => (
  <div
    aria-hidden="true"
    style={{ position: "relative", width: "100%", height: `${TAPE_H}px`, flexShrink: 0, pointerEvents: "none" }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VB_W} ${TAPE_H}`}
      preserveAspectRatio="none"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
    >
      {/*
        White shape: full-width bottom half + centre of top half.
        Top-right arc: from (VB_W, ARC_R) to (VB_W-ARC_R, 0) — concave inward.
        Top-left arc:  from (ARC_R, 0) to (0, ARC_R) — concave inward.
        Sweep flag 0 = counter-clockwise = concave.
      */}
      <path
        d={`
          M 0 ${TAPE_H}
          L ${VB_W} ${TAPE_H}
          L ${VB_W} ${R}
          A ${R} ${R} 0 0 1 ${VB_W - R} 0
          L ${R} 0
          A ${R} ${R} 0 0 1 0 ${R}
          Z
        `}
        fill="white"
      />
    </svg>
  </div>
);

// ── Dark section wrapper ──────────────────────────────────────────────────────
const DarkSection = ({
  children,
  id,
  className = "",
  autoHeight = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  autoHeight?: boolean;
}) => (
  <section
    id={id}
    className={`relative w-full ${className}`}
    style={{
      height: autoHeight ? "auto" : "100vh",
      background: DARK_BG,
      overflow: "hidden",
    }}
  >
    {children}
  </section>
);
// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (link: NavLink, e: React.MouseEvent) => {
    if (!link.isRoute) {
      e.preventDefault();
      const el = document.querySelector(link.href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  const navbarTotalH = NAV_ROW_H + ARC_R;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
      >
        {/*
          Navbar tape: same SVG approach.
          The solid white band is the top NAV_ROW_H px.
          The bottom ARC_R px contains the transparent arc cutouts (identical to TopTape).
        */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${navbarTotalH}px`,
            overflow: "visible",
            boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          {/* SVG white shape with arc cutouts — identical geometry to TopTape */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${VB_W} ${navbarTotalH}`}
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
          >
            <path
              d={`
                M 0 0
                L ${VB_W} 0
                L ${VB_W} ${NAV_ROW_H}
                A ${R} ${R} 0 0 0 ${VB_W - R} ${navbarTotalH}
                L ${R} ${navbarTotalH}
                A ${R} ${R} 0 0 0 0 ${NAV_ROW_H}
                Z
              `}
              fill="white"
            />
          </svg>

          {/* Nav content — sits above the SVG */}
          <div
            style={{
              position: "absolute",
              top: 35, left: 0, right: 0,
              height: `${NAV_ROW_H}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: "55px",
              paddingRight: "55px",
              zIndex: 1,
            }}
          >
            <a
              href="#hero"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              className="flex items-center gap-2"
              style={{ textDecoration: "none" }}
            >
              <img src="/logo.png" alt="GrydIn" width={15} height={15.9} style={{ objectFit: "contain" }} />
              <span className="font-semibold tracking-tight" style={{ fontSize: "1.15rem", color: "#0a0a0a", letterSpacing: "-0.02em" }}>
                GrydIn
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNav(link, e)}
                  className="text-xs font-semibold tracking-widest transition-opacity duration-150 hover:opacity-50"
                  style={{ color: "#0a0a0a", letterSpacing: "0.12em" }}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="flex ml-2 p-1 transition-opacity hover:opacity-50"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} color="#0a0a0a" />
              </button>
            </div>

            <button className="flex md:hidden p-1" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Menu size={22} color="#0a0a0a" />
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer backdrop — click to close */}
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

      {/* Right drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "38%",
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
        {/* Close button — tight to top-right corner */}
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

        {/* Nav links — left aligned, top aligned with offset */}
        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            paddingTop: "72px",
            paddingLeft: "28px",
            gap: "1.1rem",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNav(link, e)}
              style={{
                color: "white",
                fontSize: "0.95rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.4")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
};

// ── Hero Section ──────────────────────────────────────────────────────────────
const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => {});
  }, []);

  const navbarTotalH = NAV_ROW_H + ARC_R;

  return (
    <DarkSection id="hero" className="flex flex-col" autoHeight>
      <div style={{ height: `${navbarTotalH}px`, flexShrink: 0 }} />

      {/* Text content — padded, centred */}
      <div className="flex flex-col items-center text-center px-6" style={{ flexShrink: 0 }}>
        <p
          className="mb-4 tracking-widest uppercase text-xs font-medium mt-6"
          style={{ color: "rgba(255,255,255,0.50)", letterSpacing: "0.22em" }}
        >
          Software & AI Automation — As a Service
        </p>

        <h1
          className="font-bold leading-tight mb-5 max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.8rem)",
            color: "#ffffff",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
        >
          Grid the unseen.<br />
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Keep the humans.</span>
        </h1>

        <p
          className="mb-7 max-w-xl leading-relaxed"
          style={{ fontSize: "clamp(0.9rem, 1.6vw, 1rem)", color: "rgba(255,255,255,0.5)" }}
        >
          GrydIn builds automation and AI systems that slot into your existing workflow —
          no migration, no disruption, just less manual work starting this sprint.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3 font-semibold text-sm transition-all duration-200 hover:gap-4"
          style={{ background: "white", color: "#0a0a0a", borderRadius: "2px", letterSpacing: "0.04em" }}
        >
          Start a project <ArrowRight size={15} strokeWidth={2.2} />
        </a>
      </div>

      {/* Video — full width, height derived from 16/9 aspect ratio */}
      <div
        className="relative mt-8 w-full"
        style={{ aspectRatio: "16/9", flexShrink: 0, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.6)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center flex-col gap-3">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{ border: "1.5px solid rgba(255,255,255,0.25)" }}
          >
            <div style={{ width: 0, height: 0, borderTop: "9px solid transparent", borderBottom: "9px solid transparent", borderLeft: "16px solid rgba(255,255,255,0.6)", marginLeft: "3px" }} />
          </div>
          <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            VIDEO PLACEHOLDER
          </span>
        </div>
      </div>

      <BottomTape />
    </DarkSection>
  );
};

// ── Services Section ──────────────────────────────────────────────────────────
const ServicesSection = () => (
  <DarkSection id="services" className="flex flex-col justify-between">
    <TopTape />
    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center" style={{ overflow: "hidden", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <p
        className="mb-3 uppercase tracking-widest text-xs"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
      >
        What we do
      </p>
      <h2
        className="font-bold mb-16"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em" }}
      >
        Services
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {SERVICES.map((s) => (
          <div key={s.title} className="flex flex-col gap-4">
            <div style={{ color: "rgba(255,255,255,0.55)" }}>{s.icon}</div>
            <h3 className="font-semibold" style={{ fontSize: "1.05rem", color: "#ffffff", letterSpacing: "-0.01em" }}>
              {s.title}
            </h3>
            <p className="leading-relaxed" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
              {s.desc}
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-1 text-xs font-semibold mt-2 transition-opacity hover:opacity-50"
              style={{ color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em" }}
            >
              Learn more <ArrowRight size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
    <BottomTape />
  </DarkSection>
);

// ── How It Works Section ──────────────────────────────────────────────────────
const HowItWorksSection = () => (
  <DarkSection id="how-it-works" className="flex flex-col justify-between">
    <TopTape />
    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center" style={{ overflow: "hidden", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <p
        className="mb-3 uppercase tracking-widest text-xs"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
      >
        The process
      </p>
      <h2
        className="font-bold mb-16"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em" }}
      >
        How it works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {HOW_IT_WORKS.map((item) => (
          <div key={item.step} className="flex flex-col gap-3">
            <span
              className="font-bold"
              style={{ fontSize: "2.8rem", color: "rgba(255,255,255,0.07)", letterSpacing: "-0.04em", lineHeight: 1 }}
            >
              {item.step}
            </span>
            <h3 className="font-semibold mt-1" style={{ fontSize: "1.05rem", color: "#ffffff", letterSpacing: "-0.01em" }}>
              {item.title}
            </h3>
            <p className="leading-relaxed" style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
    <BottomTape />
  </DarkSection>
);

// ── Why GrydIn Section ────────────────────────────────────────────────────────
const WhyGrydinSection = () => (
  <DarkSection id="why-grydin" className="flex flex-col justify-between">
    <TopTape />
    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 flex-1 flex flex-col justify-center" style={{ overflow: "hidden", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <p
        className="mb-3 uppercase tracking-widest text-xs"
        style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
      >
        Why us
      </p>
      <h2
        className="font-bold mb-16"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em" }}
      >
        Built different, by design
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {WHY_GRYDIN.map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <span
              className="font-bold"
              style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#ffffff", letterSpacing: "-0.03em" }}
            >
              {item.stat}
            </span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.38)", letterSpacing: "0.04em" }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
    <BottomTape />
  </DarkSection>
);

// ── Contact / Footer Section ──────────────────────────────────────────────────
const ContactSection = () => (
  <DarkSection id="contact" className="flex flex-col justify-between">
    <TopTape />
    <div className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row gap-16 justify-between flex-1" style={{ overflow: "hidden", paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="flex flex-col gap-6 max-w-sm">
        <p
          className="uppercase tracking-widest text-xs"
          style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}
        >
          Get in touch
        </p>
        <h2
          className="font-bold"
          style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", color: "#ffffff", letterSpacing: "-0.025em", lineHeight: 1.15 }}
        >
          Ready to cut the manual work?
        </h2>
        <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>
          Tell us what you're dealing with. We'll respond within one business day with a scoped approach — no pitch, no sales deck.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm w-fit transition-all duration-200 hover:gap-4"
          style={{ background: "white", color: "#0a0a0a", borderRadius: "2px", letterSpacing: "0.04em" }}
        >
          Contact us <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      </div>

      <div className="flex flex-col gap-4 mt-2">
        <p
          className="uppercase tracking-widest text-xs mb-2"
          style={{ color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em" }}
        >
          Navigate
        </p>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium transition-opacity hover:opacity-40"
            style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>

    {/* Footer tape — SVG BottomTape geometry with footer text overlaid */}
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${TAPE_H}px`,
        flexShrink: 0,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VB_W} ${TAPE_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <path
          d={`
            M 0 ${TAPE_H}
            L ${VB_W} ${TAPE_H}
            L ${VB_W} ${R}
            A ${R} ${R} 0 0 1 ${VB_W - R} 0
            L ${R} 0
            A ${R} ${R} 0 0 1 0 ${R}
            Z
          `}
          fill="white"
        />
      </svg>

      {/* Footer text — in solid white zone (bottom ARC_R px) */}
      <div
        style={{
          position: "absolute",
          bottom: 13,
          left: `${ARC_R * 1.25}px`,
          right: `${ARC_R * 1.25}px`,
          height: `${ARC_R}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <div className="flex items-center gap-2">
         <img src="/logo.png" alt="GrydIn" width={11} height={12} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "0.75rem", color: "rgba(0,0,0,.6)", letterSpacing: "0.05em" }}>
            GrydIn © {new Date().getFullYear()}
          </span>
        </div>
        <span style={{ fontSize: "0.75rem", color: "rgba(0,0,0,.6)", letterSpacing: "0.06em" }}>
          Software & AI Automation — As a Service
        </span>
      </div>
    </div>
  </DarkSection>
);

// ── Page root ─────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main style={{ background: "white", overflowX: "hidden" }}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <WhyGrydinSection />
      <ContactSection />
    </main>
  );
}