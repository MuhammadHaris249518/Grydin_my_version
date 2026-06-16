"use client";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ArrowRight, Zap, Brain, CheckCircle, Repeat, Layers, Plug, Code } from "lucide-react";
import { useTypewriter } from "../globalscope/typewriter";
import { Menu, X } from "lucide-react";

// ── Tape sizing (identical to about/contact) ──────────────────────────────────
const TAPE_H_MAX = 72;
const TAPE_H_MIN = 48;
const VW_COEFF   = 4;

const NAV_LINKS = [
  { label: "HOME",     href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT",    href: "/about" },
  { label: "CONTACT",  href: "/contact" },
];

function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H_MAX, Math.max(TAPE_H_MIN, vw));
}

const TapeCtx = createContext({ tapeH: TAPE_H_MAX, arcR: TAPE_H_MAX / 2 });
const useTape = () => useContext(TapeCtx);

const DARK_BG = "linear-gradient(to bottom, #4D4D4D 0%, #000000 100%)";
const VB_W    = 1000;

// ── Tapes ─────────────────────────────────────────────────────────────────────
const TopTape = ({ setMenuOpen }: { setMenuOpen: (v: boolean) => void }) => {
  const { tapeH, arcR } = useTape();
  return (
    <div
      aria-hidden="false"
      style={{
        position: "relative",
        width: "100%",
        height: `${tapeH}px`,
        flexShrink: 0,
        pointerEvents: "none",
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
      <div
        style={{
          position: "absolute",
          top: TAPE_H_MAX / 4,
          left: "clamp(2rem, 4.3vw, 55px)",
          height: `${arcR}px`,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "auto",
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
            width={16}
            height={16}
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
      <div
        style={{
          position: "absolute",
          top: TAPE_H_MAX / 4,
          right: "6.5vw",
          height: `${arcR}px`,
          display: "flex",
          alignItems: "center",
          gap: "2rem",
          pointerEvents: "auto",
          zIndex: 1,
        }}
      >
        <div className="hidden md:flex items-center" style={{ gap: "2rem" }}>
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
  );
};

const BottomTape = () => {
  const { tapeH, arcR } = useTape();
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: `${tapeH}px`,
        flexShrink: 0,
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
          d={`M 0 ${tapeH} L ${VB_W} ${tapeH} L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 1 ${VB_W - arcR} 0 L ${arcR} 0 A ${arcR} ${arcR} 0 0 1 0 ${arcR} Z`}
          fill="white"
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: `${arcR * 1.25}px`,
          right: `${arcR * 1.25}px`,
          height: `${arcR}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <img
            src="/logo.png"
            alt="GrydIn"
            width={10}
            height={10}
            style={{ objectFit: "contain" }}
          />
          <span
            style={{
              fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
              color: "rgba(0,0,0,.6)",
              letterSpacing: "0.05em",
            }}
          >
            GrydIn © {new Date().getFullYear()}
          </span>
        </div>
        <span
          style={{
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            color: "rgba(0,0,0,.6)",
            letterSpacing: "0.06em",
          }}
        >
          Built for the gaps in your business.
        </span>
      </div>
    </div>
  );
};


const useDividerAnimation = () => {
  const [phase, setPhase] = useState<"waiting" | "tracing" | "blinking" | "holding" | "done">("waiting");
  const [traceProgress, setTraceProgress] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number>(0);
  const glowRafRef = useRef<number>(0);
const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const TRACE_DURATION = 2800;
    const HOLD_DURATION  = 10000;
    const WAIT_DURATION  = 3000;
    const GLOW_PERIOD    = 2000;

    let glowStart = 0;
    let glowActive = false;

    const animateGlow = (now: number) => {
      if (!glowActive) return;
      if (!glowStart) glowStart = now;
      const t = ((now - glowStart) % GLOW_PERIOD) / GLOW_PERIOD;
      const opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
      setGlowOpacity(opacity);
      glowRafRef.current = requestAnimationFrame(animateGlow);
    };

    const startGlow = () => {
      glowActive = true;
      glowStart = 0;
      glowRafRef.current = requestAnimationFrame(animateGlow);
    };

    const stopGlow = () => {
      glowActive = false;
      cancelAnimationFrame(glowRafRef.current);
      setGlowOpacity(0);
    };

    const runCycle = () => {
      // TRACE
      setPhase("tracing");
      setTraceProgress(0);
      setVisible(true);
      startGlow();
      const traceStart = performance.now();

      const animateTrace = (now: number) => {
        const p = Math.min((now - traceStart) / TRACE_DURATION, 1);
        setTraceProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(animateTrace);
        } else {
          
            setPhase("holding");
            timerRef.current = setTimeout(() => {
              // DONE
              stopGlow();
              setPhase("done");
              setTraceProgress(0);
              setVisible(false);
              // WAIT then restart
              timerRef.current = setTimeout(() => {
                setVisible(true);
                runCycle();
              }, WAIT_DURATION);
            }, HOLD_DURATION);
        }
      };
      rafRef.current = requestAnimationFrame(animateTrace);
    };

    runCycle();
    return () => {
  if (rafRef.current) cancelAnimationFrame(rafRef.current);
  if (glowRafRef.current) cancelAnimationFrame(glowRafRef.current);
  if (timerRef.current) clearTimeout(timerRef.current);
};
  }, []);

  return { phase, traceProgress, glowOpacity, visible };
};

const AnimatedDivider = () => {
  const { phase, traceProgress, glowOpacity, visible } = useDividerAnimation();

  return (
    <div style={{ width: "100%", margin: "3rem 0", position: "relative", height: "5px", display: "flex", alignItems: "center" }}>
      {/* Default grey line – always present except during animation */}
      <div style={{
        position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)",
        height: "1px",
        background: phase === "done" || phase === "waiting" ? "rgba(255,255,255,0.08)" : "transparent",
      }} />

      {/* Traced line with glow */}
      {(phase === "tracing" || phase === "blinking" || phase === "holding") && visible && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)" }}>
          {/* glow top */}
          <div style={{
            position: "absolute", left: `${(1 - traceProgress) * 50}%`, right: `${(1 - traceProgress) * 50}%`,
            top: "-2px", height: "1px",
            background: `rgba(255,255,255,${glowOpacity * 0.3})`,
          }} />
          {/* main line */}
          <div style={{
            position: "absolute", left: `${(1 - traceProgress) * 50}%`, right: `${(1 - traceProgress) * 50}%`,
            top: 0, height: "1px",
            background: `rgba(255,255,255,${0.4 + glowOpacity * 0.55})`,
            boxShadow: `0 0 ${4 + glowOpacity * 6}px rgba(255,255,255,${glowOpacity * 0.6})`,
          }} />
          {/* glow bottom */}
          <div style={{
            position: "absolute", left: `${(1 - traceProgress) * 50}%`, right: `${(1 - traceProgress) * 50}%`,
            top: "2px", height: "1px",
            background: `rgba(255,255,255,${glowOpacity * 0.3})`,
          }} />
        </div>
      )}
    </div>
  );
};

// ── Services data ─────────────────────────────────────────────────────────────
const SERVICES = [
  {
    color: "#22d3ee",
    icon: <Zap size={22} strokeWidth={1.4} />,
    title: "AI Agents",
    summary:
      "Autonomous agents that think, decide, and act – handling complex, multi-step tasks end-to-end without human intervention.",
    deliverables: [
      "Custom agent design scoped to your specific workflow",
      "Multi-step task execution with decision-making logic",
      "Integration with your existing tools, APIs, and data sources",
      "Monitoring, logging, and fallback handling built in",
    ],
    suited:
      "Teams drowning in repetitive decision-making, approvals, or multi-tool coordination that eats hours daily.",
  },
  {
    color: "#f59e0b",
    icon: <Repeat size={22} strokeWidth={1.4} />,
    title: "Workflow Automation",
    summary:
      "We map every gap between your tools, teams, and decisions – then automate them. No migration. No disruption. Just less manual work.",
    deliverables: [
      "End-to-end workflow mapping and friction audit",
      "Cross-platform automation using Make.com, n8n, or custom code",
      "Trigger-based systems that run silently in the background",
      "Handoff documentation your team can actually maintain",
    ],
    suited:
      "Teams spending hours on manual data movement, status updates, reporting, or tool-switching that should already be automated.",
  },
  {
    color: "#10b981",
    icon: <Brain size={22} strokeWidth={1.4} />,
    title: "AI Integration",
    summary:
      "Fine-tuned models deployed directly into your business logic. From document processing to decision engines – AI that fits your pipeline.",
    deliverables: [
      "LLM integration into existing products or internal tools",
      "Document processing, extraction, and classification pipelines",
      "Custom prompt engineering and model fine-tuning",
      "AI-powered decision engines scoped to your data",
    ],
    suited:
      "Teams with high-volume documents, classification tasks, or complex decisions that don't need a human every single time.",
  },
  {
    color: "#3b82f6",
    icon: <Layers size={22} strokeWidth={1.4} />,
    title: "Custom Software",
    summary:
      "Built around how your business actually works. No templates, no off-the-shelf fixes – just the right system for your exact problem.",
    deliverables: [
      "Full-stack web and mobile application development",
      "Backend architecture, database design, and API development",
      "Admin dashboards, internal tools, and operator panels",
      "Scalable, maintainable codebases with clean documentation",
    ],
    suited:
      "Businesses with a workflow no existing product covers – or teams that have outgrown their current tools and need something built right.",
  },
  {
    color: "#f43f5e",
    icon: <Plug size={22} strokeWidth={1.4} />,
    title: "System Integration",
    summary:
      "Connect your entire stack into one coherent, automated operation. APIs, platforms, databases – wired together cleanly.",
    deliverables: [
      "API design, development, and third-party integration",
      "Legacy system connections without full replacement",
      "Real-time data sync across platforms and services",
      "Webhook infrastructure and event-driven architecture",
    ],
    suited:
      "Teams running disconnected tools that require manual syncing, duplicate data entry, or constant context switching between platforms.",
  },
  {
    color: "#a855f7",
    icon: <Code size={22} strokeWidth={1.4} />,
    title: "Full-Stack Development",
    summary:
      "End-to-end product builds – backend, frontend, and everything in between. Lean, scalable, and production-ready from day one.",
    deliverables: [
      "Web and mobile app development (Flutter, React, Node.js)",
      "REST and GraphQL API development",
      "Cloud deployment, CI/CD pipelines, and infrastructure setup",
      "Performance optimization and post-launch support",
    ],
    suited:
      "Startups building their first product, or businesses replacing a broken system with something built properly from the ground up.",
  },
];

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/923296637320?text=Hi%20GrydIn%2C%20I%20came%20across%20your%20website%20and%20I%20think%20there%27s%20a%20gap%20in%20my%20business%20you%20might%20be%20able%20to%20close.%20I%27d%20like%20to%20discuss%20it.`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    style={{
      position: "fixed",
      bottom: "44px",
      right: "28px",
      zIndex: 200,
      width: "48px",
      height: "48px",
      background: "white",
      borderRadius: "2px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 2px 16px rgba(0,0,0,0.18)",
      transition: "background 0.2s, transform 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "#181717";
      e.currentTarget.style.transform = "scale(1.08)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "white";
      e.currentTarget.style.transform = "scale(1)";
    }}
  >
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: "#000000" }}
    >
      <path
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
        fill="currentColor"
      />
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.978-1.418A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  </a>
);

// ── Services Page ─────────────────────────────────────────────────────────────
export default function Services() {
  const [tapeH, setTapeH] = useState(TAPE_H_MAX);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
  const styleId = "scrollbar-hide-style";

  const hide = () => {
    if (!document.getElementById(styleId)) {
      const s = document.createElement("style");
      s.id = styleId;
      s.innerHTML = `*::-webkit-scrollbar-thumb { background: transparent !important; transition: background 0.5s ease; }`;
      document.head.appendChild(s);
    }
  };

  const show = () => {
    document.getElementById(styleId)?.remove();
  };

  let t: ReturnType<typeof setTimeout>;
  hide();

  const handler = () => {
    show();
    clearTimeout(t);
    t = setTimeout(hide, 1000);
  };

  window.addEventListener("scroll", handler, { passive: true });
  document.addEventListener("scroll", handler, { passive: true });

  return () => {
    window.removeEventListener("scroll", handler);
    document.removeEventListener("scroll", handler);
    clearTimeout(t);
  };
}, []);
  useEffect(() => {
    const update = () => setTapeH(computeTapeH(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  const arcR = tapeH / 2;
 const { displayed: typed, ref: typeRef } = useTypewriter(
   "Scoped to your problem.",
 );
  return (
    <TapeCtx.Provider value={{ tapeH, arcR }}>
      <main
        style={{
          background: "white",
          overflowX: "hidden",
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Drawer backdrop */}
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
        <section style={{ background: DARK_BG, width: "100%" }}>
          <TopTape setMenuOpen={setMenuOpen} />

          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: "4rem 2rem 5rem",
            }}
          >
            {/* ── Eyebrow + Intro ── */}
            <p
              style={{
                fontSize: "0.72rem",
                color: "#000000",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              Built for
            </p>
            <h1
              ref={typeRef}
              className="font-bold leading-tight mb-5 max-w-3xl"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.8rem)",
                color: "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {typed}
              <span
                style={{
                  borderRight: "2px solid rgba(255,255,255,0.6)",
                  marginLeft: "2px",
                  animation: "blink 1s step-end infinite",
                }}
              />
              <br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                Not the other way around.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "540px",
                marginBottom: 0,
                textAlign: "justify",
              }}
            >
              Every system we build starts with your workflow – not a template,
              not a platform, not a package. We scope exactly what's needed,
              build it clean, and deploy it quietly.
            </p>

            <AnimatedDivider />

            {/* ── Service blocks ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {SERVICES.map((service, i) => (
                <div key={service.title}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "3rem",
                      alignItems: "start",
                    }}
                  >
                    {/* Left – title + summary + suited for */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.6rem",
                          color: service.color,
                        }}
                      >
                        {service.icon}
                        <h2
                          style={{
                            fontSize: "1.05rem",
                            color: "#ffffff",
                            fontWeight: 600,
                            letterSpacing: "-0.01em",
                            margin: 0,
                          }}
                        >
                          {service.title}
                        </h2>
                      </div>
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.8,
                          margin: 0,
                          textAlign: "justify",
                        }}
                      >
                        {service.summary}
                      </p>
                      <div style={{ marginTop: "0.5rem" }}>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            color: "rgba(255,255,255,0.55)",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            marginBottom: "0.4rem",
                          }}
                        >
                          Suited for
                        </p>
                        <p
                          style={{
                            fontSize: "0.84rem",
                            color: "rgba(255,255,255,0.38)",
                            lineHeight: 1.7,
                            margin: 0,
                            textAlign: "justify",
                          }}
                        >
                          {service.suited}
                        </p>
                      </div>
                    </div>

                    {/* Right – deliverables */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          color: "rgba(255,255,255,0.45)",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          marginBottom: "0.6rem",
                        }}
                      >
                        What's included
                      </p>
                      {service.deliverables.map((d, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "0.6rem",
                          }}
                        >
                          <CheckCircle
                            size={13}
                            strokeWidth={1.6}
                            style={{
                              color: service.color,
                              marginTop: "3px",
                              flexShrink: 0,
                            }}
                          />
                          <span
                            style={{
                              fontSize: "0.86rem",
                              color: "rgba(255,255,255,0.45)",
                              lineHeight: 1.65,
                              textAlign: "justify",
                            }}
                          >
                            {d}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {i < SERVICES.length - 1 && <AnimatedDivider />}
                </div>
              ))}
            </div>

            <AnimatedDivider />

            {/* ── Engagement model ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "2rem",
              }}
            >
              Built on four principles.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "2rem",
                textAlign: "justify",
              }}
            >
              {[
                {
                  label: "Diagnosis first.",
                  body: "Every engagement starts with mapping your workflow. We don't write a single line until we understand exactly what's broken and why.",
                },
                {
                  label: "Fixed scope.",
                  body: "We agree on what gets built before anything starts. No scope creep, no surprise invoices, no moving goalposts.",
                },
                {
                  label: "Fast to first deploy.",
                  body: "Most projects ship a working first deployment within two weeks. We move fast without cutting corners.",
                },
                {
                  label: "Post-launch accountability.",
                  body: "We don't disappear after handoff. Documentation is always included. Follow-on support is always available.",
                },
              ].map((item) => (
                <div key={item.label}>
                  <h3
                    style={{
                      fontSize: "0.88rem",
                      color: "#ffffff",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "rgba(255,255,255,0.4)",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <AnimatedDivider />

            {/* ── Pricing note ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              Pricing.
            </p>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "520px",
                margin: 0,
                textAlign: "justify",
              }}
            >
              Every project is scoped before it's priced. We don't publish fixed
              rates because no two problems are identical – and a number without
              context is just a guess. After an initial diagnosis call, you get
              a clear, fixed quote. No ranges, no retainer traps, no surprises
            </p>

            <AnimatedDivider />

            {/* ── CTA ── */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxWidth: "480px",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)",
                  color: "#ffffff",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                Not sure where to start?
              </p>
              <p
                style={{
                  fontSize: "0.88rem",
                  color: "rgba(255,255,255,0.42)",
                  lineHeight: 1.75,
                  margin: 0,
                  textAlign: "justify",
                }}
              >
                Describe what's slowing your business down. We'll map it to the
                right system – or tell you honestly if we're not the right fit.
              </p>
              <a
                href="/contact"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 24px",
                  background: "white",
                  color: "#000000",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  borderRadius: "2px",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  width: "fit-content",
                  transition: "gap 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.gap = "1rem";
                  e.currentTarget.style.background = "#181717";
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.gap = "0.5rem";
                  e.currentTarget.style.background = "white";
                  e.currentTarget.style.color = "#000000";
                }}
              >
                Start a conversation <ArrowRight size={14} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          <BottomTape />
        </section>
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}