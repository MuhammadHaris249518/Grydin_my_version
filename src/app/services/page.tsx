"use client";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ArrowRight, Zap, Brain, Repeat, Layers, Plug, Code, ChevronDown } from "lucide-react";
import { useTypewriter } from "../globalscope/typewriter";
import { X } from "lucide-react";
import DotGrid from "./../globalscope/DotGrid";
import Navbar, { NAVBAR_TOP_OFFSET } from "./../globalscope/Navbar";
import { PrincipleCards } from "../globalscope/PrincipleCards";
import { AccentWord } from "../globalscope/AccentWord";
import { BRAND_ACCENT, brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";
import { DARK_PAGE_BG } from "@/lib/theme";

// ── Tape sizing (identical to about/contact) ──────────────────────────────────
const TAPE_H_MAX = 72;
const TAPE_H_MIN = 58;
const VW_COEFF = 6;

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H_MAX, Math.max(TAPE_H_MIN, vw));
}

const TapeCtx = createContext({ tapeH: TAPE_H_MAX, arcR: TAPE_H_MAX / 2 });
const useTape = () => useContext(TapeCtx);

const VB_W = 1000;


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
    const HOLD_DURATION = 10000;
    const WAIT_DURATION = 3000;
    const GLOW_PERIOD = 2000;

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
        background: "rgba(255,255,255,0.38)",
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


const PRINCIPLES = [
  {
    num: "01",
    label: "Diagnosis first.",
    body: "Every engagement starts with mapping your workflow. We don't write a single line until we understand exactly what's broken and why.",
  },
  {
    num: "02",
    label: "Fixed scope.",
    body: "We agree on what gets built before anything starts. No scope creep, no surprise invoices, no moving goalposts.",
  },
  {
    num: "03",
    label: "Fast to first deploy.",
    body: "Most projects ship a working first deployment within two weeks. We move fast without cutting corners.",
  },
  {
    num: "04",
    label: "Post-launch accountability.",
    body: "We don't disappear after handoff. Documentation is always included. Follow-on support is always available.",
  },
];

const CHECK_D = "M6.5 12.5l3.5 3.5l7.5-7.5";
const CIRCLE_R = 10;

const AnimatedTick = ({
  color,
  active,
  singleShot = false,
  delay = 0,
}: {
  color: string;
  active: boolean;
  singleShot?: boolean;
  delay?: number;
}) => {
  const checkRef = useRef<SVGPathElement>(null);
  const [checkLen, setCheckLen] = useState(0);
  const [circleProgress, setCircleProgress] = useState(0);
  const [checkProgress, setCheckProgress] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopRef = useRef(0);

  useEffect(() => {
    if (checkRef.current) setCheckLen(checkRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!active || !checkLen) {
      setCircleProgress(0);
      setCheckProgress(0);
      setOpacity(0);
      loopRef.current = 0;
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    const CIRCLE_DURATION = 500;
    const CHECK_DURATION = 300;
    const HOLD_DURATION = singleShot ? 999999999 : 5000;
    const FADE_DURATION = 400;
    const WAIT_DURATION = singleShot ? 999999999 : 3000;
    const MAX_LOOPS = singleShot ? 0 : 2;

    const runCircle = () => {
      setOpacity(1);
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / CIRCLE_DURATION, 1);
        setCircleProgress(p);
        if (p < 1) rafRef.current = requestAnimationFrame(tick);
        else runCheck();
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const runCheck = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / CHECK_DURATION, 1);
        setCheckProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else if (singleShot || loopRef.current >= MAX_LOOPS) {
          // settled — stays fully drawn
        } else {
          timerRef.current = setTimeout(runFade, HOLD_DURATION);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const runFade = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / FADE_DURATION, 1);
        setOpacity(1 - p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setCircleProgress(0);
          setCheckProgress(0);
          timerRef.current = setTimeout(() => {
            loopRef.current += 1;
            runCircle();
          }, WAIT_DURATION);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    loopRef.current = 0;
    const boot = setTimeout(runCircle, delay);
    return () => {
      clearTimeout(boot);
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, checkLen, singleShot, delay]);

  const circumference = 2 * Math.PI * CIRCLE_R;

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: "2px", opacity }}>
      <circle
        cx="12" cy="12" r={CIRCLE_R} fill="none" stroke={color} strokeWidth="1.6"
        strokeLinecap="round" transform="rotate(-90 12 12)"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - circleProgress)}
      />
      <path
        ref={checkRef} d={CHECK_D} fill="none" stroke={color} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray={checkLen}
        strokeDashoffset={checkLen * (1 - checkProgress)}
      />
    </svg>
  );
};

const SERVICE_AUTO_MS = 7000;

const ServiceDetailPanel = ({
  service,
  showHeading = true,
  cycleKey,
}: {
  service: (typeof SERVICES)[number];
  showHeading?: boolean;
  cycleKey: number;
}) => (
  <div
    key={service.title}
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      animation: "serviceDetailIn 0.45s cubic-bezier(0.16,1,0.3,1)",
    }}
  >
    {showHeading && (
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", color: BRAND_ACCENT }}>
        {service.icon}
        <h2 style={{ fontSize: "clamp(1.15rem, 2vw, 1.35rem)", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
          {service.title}
        </h2>
      </div>
    )}
    <p style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.52)", lineHeight: 1.85, margin: 0 }}>
      {service.summary}
    </p>
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
        padding: "1.25rem",
        borderRadius: "8px",
        border: `1px solid ${brandAccentHexAlpha(0.22)}`,
        background: "rgba(0,0,0,0.28)",
      }}
    >
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: BRAND_ACCENT, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.55rem" }}>
          Suited for
        </p>
        <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.42)", lineHeight: 1.75, margin: 0 }}>
          {service.suited}
        </p>
      </div>
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "0.65rem" }}>
          What&apos;s included
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {service.deliverables.map((d, j) => (
            <div key={`${cycleKey}-${j}`} style={{ display: "flex", alignItems: "flex-start", gap: "0.55rem" }}>
              <AnimatedTick key={`${cycleKey}-${j}`} color={BRAND_ACCENT} active singleShot delay={j * 100} />
              <span style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.48)", lineHeight: 1.65 }}>
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
    <style jsx>{`
      @keyframes serviceDetailIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  </div>
);

const ServicesExplorer = () => {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / SERVICE_AUTO_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(0);
        if (isMobile) {
          setMobileOpen((prev) => (prev === null ? 0 : (prev + 1) % SERVICES.length));
        } else {
          setActive((i) => (i + 1) % SERVICES.length);
        }
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, mobileOpen, paused, isMobile]);

  const selectDesktop = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setActive(i);
    setPaused(false);
  };

  const selectMobile = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setMobileOpen(i);
    setPaused(false);
  };

  const progressIndex = isMobile ? (mobileOpen ?? 0) : active;

  if (isMobile) {
    return (
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          {SERVICES.map((service, i) => {
            const open = mobileOpen === i;
            return (
              <div
                key={service.title}
                style={{
                  borderRadius: "8px",
                  border: open ? `1px solid ${brandAccentHexAlpha(0.45)}` : "1px solid rgba(255,255,255,0.08)",
                  background: open ? brandAccentAlpha(0.08) : "rgba(255,255,255,0.02)",
                  overflow: "hidden",
                  transition: "border-color 0.25s, background 0.25s",
                }}
              >
                <button
                  type="button"
                  onClick={() => (open ? setMobileOpen(null) : selectMobile(i))}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.65rem",
                    padding: "1rem 1.1rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "0.68rem", fontWeight: 700, color: open ? BRAND_ACCENT : "rgba(255,255,255,0.35)", letterSpacing: "0.12em" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ color: open ? BRAND_ACCENT : "rgba(255,255,255,0.55)" }}>{service.icon}</span>
                  <span style={{ flex: 1, fontSize: "0.95rem", fontWeight: 600, color: open ? "#ffffff" : "rgba(255,255,255,0.78)" }}>
                    {service.title}
                  </span>
                  <ChevronDown
                    size={18}
                    style={{
                      flexShrink: 0,
                      color: "rgba(255,255,255,0.45)",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s ease",
                    }}
                  />
                </button>
                {open && (
                  <div style={{ padding: "0 1.1rem 1.15rem" }}>
                    <ServiceDetailPanel service={service} showHeading={false} cycleKey={i} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          {SERVICES.map((_, i) => (
            <div
              key={i}
              style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.12)", overflow: "hidden", cursor: "pointer" }}
              onClick={() => selectMobile(i)}
            >
              <div
                style={{
                  height: "100%",
                  width: i < progressIndex ? "100%" : i === progressIndex ? `${progress * 100}%` : "0%",
                  background: i === progressIndex ? BRAND_ACCENT : "rgba(255,255,255,0.5)",
                  transition: i === progressIndex ? "none" : "width 0.3s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(200px, 5fr) minmax(0, 7fr)",
          gap: "clamp(1.25rem, 3vw, 2rem)",
          alignItems: "start",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: "5.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.35rem",
            paddingTop: "3.65rem",
          }}
        >
          {SERVICES.map((service, i) => {
            const selected = i === active;
            return (
              <button
                key={service.title}
                type="button"
                onClick={() => selectDesktop(i)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  padding: "0.85rem 0.95rem",
                  borderRadius: "6px",
                  border: selected ? `1px solid ${brandAccentHexAlpha(0.5)}` : "1px solid rgba(255,255,255,0.07)",
                  background: selected
                    ? `linear-gradient(135deg, ${brandAccentAlpha(0.16)} 0%, rgba(255,255,255,0.03) 100%)`
                    : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                  transform: selected ? "translateX(4px)" : "none",
                }}
              >
                <span style={{ fontSize: "0.65rem", fontWeight: 700, color: selected ? BRAND_ACCENT : "rgba(255,255,255,0.3)", letterSpacing: "0.14em", minWidth: "1.4rem" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span style={{ color: selected ? BRAND_ACCENT : "rgba(255,255,255,0.45)" }}>{service.icon}</span>
                <span style={{ fontSize: "0.88rem", fontWeight: selected ? 700 : 500, color: selected ? "#ffffff" : "rgba(255,255,255,0.62)", letterSpacing: "-0.01em" }}>
                  {service.title}
                </span>
              </button>
            );
          })}
        </div>
        <ServiceDetailPanel service={SERVICES[active]} cycleKey={active} />
      </div>
      <div style={{ display: "flex", gap: "5px" }}>
        {SERVICES.map((_, i) => (
          <div
            key={i}
            style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.12)", overflow: "hidden", cursor: "pointer" }}
            onClick={() => selectDesktop(i)}
          >
            <div
              style={{
                height: "100%",
                width: i < active ? "100%" : i === active ? `${progress * 100}%` : "0%",
                background: i === active ? BRAND_ACCENT : "rgba(255,255,255,0.5)",
                transition: i === active ? "none" : "width 0.3s ease",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};


// ── Services Page ─────────────────────────────────────────────────────────────
export default function Services() {
  const [tapeH, setTapeH] = useState(TAPE_H_MAX);
  const [menuOpen, setMenuOpen] = useState(false);

  const REVEAL_DURATION = 1100;
  const [mounted, setMounted] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [revealDuration, setRevealDuration] = useState(REVEAL_DURATION);
  const seenRef = useRef<boolean | null>(null);

  useEffect(() => {
    const key = "grydin-revealed-services";

    if (seenRef.current === null) {
      try {
        seenRef.current = sessionStorage.getItem(key) === "1";
      } catch (e) {
        seenRef.current = false;
      }
      if (!seenRef.current) {
        try { sessionStorage.setItem(key, "1"); } catch (e) { }
      }
    }

    const alreadySeen = seenRef.current;

    if (alreadySeen) {
      setRevealDuration(0);
      setMounted(true);
      setStartTyping(true);
      return;
    }

    const t1 = requestAnimationFrame(() => setMounted(true));
    const t2 = setTimeout(() => setStartTyping(true), REVEAL_DURATION);
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, []);

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
    startTyping ? "Scoped to your problem." : "",
  );

  const renderScopedHeadline = (text: string) => {
    const prefix = "Scoped to your ";
    if (text.length <= prefix.length) return text;
    const rest = text.slice(prefix.length);
    const word = rest.replace(/\.$/, "");
    const showDot = rest.includes(".");
    return (
      <>
        {prefix}
        <AccentWord>{word}</AccentWord>
        {showDot ? "." : ""}
      </>
    );
  };

  return (
    <TapeCtx.Provider value={{ tapeH, arcR }}>
      <main
        style={{
          background: "white",
          overflowX: "hidden",
          fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        }}
      >
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <DotGrid contentBottom={tapeH} animate={false} />
        </div>
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
        <section
          style={{ background: DARK_PAGE_BG, width: "100%" }}
        >
          <Navbar />
          <div style={{ height: NAVBAR_TOP_OFFSET }} />

          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              padding: "4rem 2rem 5rem",
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(28px)",
              filter: mounted ? "blur(0px)" : "blur(12px)",
              transition: `opacity ${revealDuration}ms cubic-bezier(0.16,1,0.3,1), transform ${revealDuration}ms cubic-bezier(0.16,1,0.3,1), filter ${revealDuration}ms cubic-bezier(0.16,1,0.3,1)`,
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
                background: "rgba(255,255,255,0.45)",
                borderRadius: "2px",
                padding: "4px 8px",
                width: "fit-content",
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
              {renderScopedHeadline(typed)}
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

            {/* ── Service explorer ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.25rem",
                background: "rgba(255,255,255,0.45)",
                borderRadius: "2px",
                padding: "4px 8px",
                width: "fit-content",
              }}
            >
              What we build
            </p>

            <ServicesExplorer />

            <AnimatedDivider />

            {/* ── Engagement model ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "2rem",
                background: "rgba(255,255,255,0.45)",
                borderRadius: "2px",
                padding: "4px 8px",
                width: "fit-content",
              }}
            >
              Built on four principles
            </p>

            <PrincipleCards principles={PRINCIPLES} />

            <AnimatedDivider />

            {/* ── Pricing note ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
                background: "rgba(255,255,255,0.45)",
                borderRadius: "2px",
                padding: "4px 8px",
                width: "fit-content",
              }}
            >
              Pricing
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
              rates because no two problems are identical – and{" "}
              <span style={{ color: "rgba(255,255,255,0.92)", fontWeight: 500 }}>
                a number without context is just a guess
              </span>
              . After an initial diagnosis call, you get a clear, fixed quote.
              No ranges, no retainer traps, no surprises.
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
                Grid Your Vision <ArrowRight size={14} strokeWidth={2.2} />
              </a>
            </div>
          </div>

        </section>
      </main>
    </TapeCtx.Provider>
  );
}