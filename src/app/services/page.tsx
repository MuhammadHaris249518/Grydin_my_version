"use client";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { ArrowRight, Zap, Brain, Repeat, Layers, Plug, Code } from "lucide-react";
import { useTypewriter } from "../globalscope/typewriter";
import { X } from "lucide-react";
import DotGrid from "./../globalscope/DotGrid";
import Navbar from "./../globalscope/Navbar";
import { FooterTape } from "../globalscope/FooterTape";

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

function buildTracePath(W: number, H: number, progress: number) {
  if (!W || !H) return "";
  const perimeter = 2 * (W + H);
  const dist = progress * perimeter;
  const topRight = W / 2;
  const branch = (d: number, dir: "right" | "left") => {
    const sign = dir === "right" ? 1 : -1;
    let path = `M ${W / 2} 0`;
    if (d <= topRight) {
      path += ` L ${W / 2 + sign * d} 0`;
    } else if (d <= topRight + H) {
      const s2 = d - topRight;
      path += ` L ${dir === "right" ? W : 0} 0 L ${dir === "right" ? W : 0} ${s2}`;
    } else if (d <= topRight + H + W) {
      const s3 = d - topRight - H;
      path += ` L ${dir === "right" ? W : 0} 0 L ${dir === "right" ? W : 0} ${H} L ${dir === "right" ? W - s3 : s3} ${H}`;
    } else {
      const s4 = d - topRight - H - W;
      path += ` L ${dir === "right" ? W : 0} 0 L ${dir === "right" ? W : 0} ${H} L ${dir === "right" ? 0 : W} ${H} L ${dir === "right" ? 0 : W} ${H - s4}`;
    }
    return path;
  };
  const half = dist / 2;
  return `${branch(half, "right")} ${branch(half, "left")}`;
}
function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H_MAX, Math.max(TAPE_H_MIN, vw));
}

const TapeCtx = createContext({ tapeH: TAPE_H_MAX, arcR: TAPE_H_MAX / 2 });
const useTape = () => useContext(TapeCtx);

const DARK_BG = "linear-gradient(to bottom, #4D4D4D 0%, #000000 76.92%, #000000 100%) top / 100% 130vh no-repeat, repeating-linear-gradient(to bottom, #000000 0vh, #3A3A3A 100vh, #3A3A3A 130vh, #000000 230vh) 0 130vh / 100% 230vh repeat-y";
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


const PRINCIPLES = [
  {
    num: "01",
    label: "Diagnosis first.",
    body: "Every engagement starts with mapping your workflow. We don't write a single line until we understand exactly what's broken and why.",
    art: "/pr1.png",
    artMobile: "/pr1.png",
    color: "#22d3ee",
  },
  {
    num: "02",
    label: "Fixed scope.",
    body: "We agree on what gets built before anything starts. No scope creep, no surprise invoices, no moving goalposts.",
    art: "/pr2.png",
    artMobile: "/pr2.png",
    color: "#f59e0b",
  },
  {
    num: "03",
    label: "Fast to first deploy.",
    body: "Most projects ship a working first deployment within two weeks. We move fast without cutting corners.",
    art: "/pr3.png",
    artMobile: "/pr3.png",
    color: "#10b981",
  },
  {
    num: "04",
    label: "Post-launch accountability.",
    body: "We don't disappear after handoff. Documentation is always included. Follow-on support is always available.",
    art: "/pr4.png",
    artMobile: "/pr4.png",
    color: "#3b82f6",
  },
];

const PRINCIPLE_DURATION = 6000;
const PRINCIPLE_HOLD_THRESHOLD = 400;
const PrincipleArt = ({
  item, isMobile, held, getSrc, onPointerDown, onPointerUp, onPointerLeave,
}: {
  item: (typeof PRINCIPLES)[number];
  isMobile: boolean;
  held: boolean;
  getSrc: () => string;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [traceProgress, setTraceProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!boxRef.current) return;
    const el = boxRef.current;
    const ro = new ResizeObserver(() => setDims({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setTraceProgress(0);
    const DURATION = 1300;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setTraceProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [item.num]);

  const clipBottom = Math.max(0, (1 - traceProgress) * 100);
  //const numeralSharp = traceProgress > 0.7;

  return (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      style={{ position: "relative", width: "100%", cursor: "pointer", userSelect: "none", touchAction: "manipulation" }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1.5,
          pointerEvents: "none",
          clipPath: `inset(${100 - clipBottom}% 0 0 0)`,
        }}
      >
        <span
          style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            fontWeight: 800,
            color: item.color,
            lineHeight: 1,
            textShadow: `0 0 24px ${item.color}99, 0 0 48px ${item.color}55`,
          }}
        >
          {item.num}
        </span>
      </div>

      {dims.w > 0 && !isMobile && (
        <svg
          shapeRendering="crispEdges"
          style={{ position: "absolute", top: 0, left: 0, width: `${dims.w}px`, height: `${dims.h}px`, pointerEvents: "none", overflow: "visible", zIndex: 2 }}
        >
          <path d={buildTracePath(dims.w, dims.h, traceProgress)} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}

      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: isMobile ? "5 / 5" : "16 / 16",
          overflow: "hidden",
          borderRadius: isMobile ? 0 : "3px",
          border: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.5)",
          zIndex: 1,
        }}
      >
        <img
          src={getSrc()}
          alt={item.label}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain",
            clipPath: `inset(0 0 ${clipBottom}% 0)`,
            filter: held ? "brightness(1.05)" : "brightness(1)",
            transition: "filter 0.3s ease",
          }}
        />
        {traceProgress < 1 && (
          <div style={{
            position: "absolute", left: 0, right: 0, top: `${traceProgress * 100}%`, height: "2px",
            background: `${item.color}dd`,
            boxShadow: `0 0 12px 2px ${item.color}b3, 0 0 30px 6px ${item.color}40`,
            pointerEvents: "none",
          }} />
        )}
      </div>
    </div>
  );
};

const PrincipleTextBlock = ({ current }: { current: (typeof PRINCIPLES)[number] }) => (
  <div key={current.num} style={{ display: "flex", flexDirection: "column", gap: "0.8rem", animation: "principleTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: current.color, textTransform: "uppercase" }}>
      Principle {current.num}
    </span>
    <h3 style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
      {current.label}
    </h3>
    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, textAlign: "justify" }}>
      {current.body}
    </p>
    <style jsx>{`@keyframes principleTextIn { from { opacity:0; transform:translateY(8px);} to { opacity:1; transform:translateY(0);} }`}</style>
  </div>
);

const PrincipleProgressDots = ({
  index, progress, held, onDotClick,
}: {
  index: number;
  progress: number;
  held: boolean;
  onDotClick: (i: number) => void;
}) => (
  <div style={{ display: "flex", gap: "5px", width: "100%" }}>
    {PRINCIPLES.map((_, i) => (
      <div key={i} onClick={(e) => { e.stopPropagation(); onDotClick(i); }}
        style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.15)", overflow: "hidden", cursor: "pointer" }}>
        <div style={{
          height: "100%",
          width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
          background: held && i === index ? "#fff" : "rgba(255,255,255,0.75)",
        }} />
      </div>
    ))}
  </div>
);

const PrincipleSlider = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasEnteredView) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHasEnteredView(true); observer.disconnect(); } },
      { threshold: 0.6 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const goTo = (next: number) => { setIndex(next); setHeld(false); };
  const advance = () => goTo((index + 1) % PRINCIPLES.length);

  useEffect(() => {
    if (held || !hasEnteredView) return;
    startRef.current = performance.now() - pausedElapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / PRINCIPLE_DURATION, 1);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else { pausedElapsedRef.current = 0; advance(); }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, held, hasEnteredView]);

  useEffect(() => { pausedElapsedRef.current = 0; }, [index]);

  const handlePointerDown = () => {
    isPointerDownRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) return;
      cancelAnimationFrame(rafRef.current);
      pausedElapsedRef.current = performance.now() - startRef.current;
      setHeld(true);
    }, PRINCIPLE_HOLD_THRESHOLD);
  };
  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };
  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (!held) advance();
  };

  useEffect(() => {
    if (!held) return;
    const resume = () => setHeld(false);
    document.addEventListener("pointerdown", resume, { once: true });
    return () => document.removeEventListener("pointerdown", resume);
  }, [held]);

  const current = PRINCIPLES[index];
  const getSrc = () => (isMobile ? current.artMobile : current.art);

  if (!isMobile) {
    return (
      <div
        ref={containerRef}
        className="w-full"
        style={{
          opacity: hasEnteredView ? 1 : 0,
          transform: hasEnteredView ? "translateY(0)" : "translateY(24px)",
          filter: hasEnteredView ? "blur(0px)" : "blur(10px)",
          transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.2s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
          <PrincipleTextBlock current={current} />
          <PrincipleArt item={current} isMobile={isMobile} held={held} getSrc={getSrc}
            onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerLeave={handlePointerLeave} />
        </div>
        <div style={{ marginTop: "1.4rem" }}>
          <PrincipleProgressDots index={index} progress={progress} held={held}
            onDotClick={(i) => { cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }} />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full flex flex-col"
      style={{
        gap: "1.2rem",
        opacity: hasEnteredView ? 1 : 0,
        transform: hasEnteredView ? "translateY(0)" : "translateY(24px)",
        filter: hasEnteredView ? "blur(0px)" : "blur(10px)",
        transition: "opacity 1.2s cubic-bezier(0.16,1,0.3,1), transform 1.2s cubic-bezier(0.16,1,0.3,1), filter 1.2s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <PrincipleTextBlock current={current} />
      <div style={{ width: "calc(100% + 3rem)", margin: "0 -1.5rem" }}>
        <PrincipleArt item={current} isMobile={isMobile} held={held} getSrc={getSrc}
          onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerLeave={handlePointerLeave} />
      </div>
      <PrincipleProgressDots index={index} progress={progress} held={held}
        onDotClick={(i) => { cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }} />
    </div>
  );
};


const CHECK_D = "M6.5 12.5l3.5 3.5l7.5-7.5";
const CIRCLE_R = 10;

const AnimatedTick = ({ color, active }: { color: string; active: boolean }) => {
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
    const HOLD_DURATION = 5000;
    const FADE_DURATION = 400;
    const WAIT_DURATION = 3000;
    const MAX_LOOPS = 2; // settles fully-drawn on the 3rd pass

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
        } else if (loopRef.current >= MAX_LOOPS) {
          // settled — stays fully drawn, no more cycles
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

    runCircle();
    return () => {
      cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, checkLen]);

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

const ServiceBlock = ({ service, isLast }: { service: (typeof SERVICES)[number]; isLast: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const TOP_EXIT_RATIO = 0.5;    // tweak independently
    const BOTTOM_EXIT_RATIO = 0.4; // tweak independently

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        if (ratio >= 0.4) {
          setInView(true);
          return;
        }

        const rect = entry.boundingClientRect;
        const rootH = entry.rootBounds?.height ?? window.innerHeight;

        // exiting the top: element's top edge has scrolled above the viewport
        const exitingTop = rect.top < 0;
        // exiting the bottom: element's bottom edge has scrolled below the viewport
        const exitingBottom = rect.bottom > rootH;

        if (exitingTop && ratio <= TOP_EXIT_RATIO) setInView(false);
        else if (exitingBottom && ratio <= BOTTOM_EXIT_RATIO) setInView(false);
      },
      { threshold: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1] }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const REVEAL_DURATION = "1.1s";
  const REVEAL_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div ref={ref}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0) translateY(0)" : "translateX(-24px) translateY(10px)",
            filter: inView ? "blur(0px)" : "blur(6px)",
            transition: `opacity ${REVEAL_DURATION} ${REVEAL_EASE}, transform ${REVEAL_DURATION} ${REVEAL_EASE}, filter ${REVEAL_DURATION} ${REVEAL_EASE}`,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: service.color }}>
            {service.icon}
            <h2 style={{ fontSize: "1.05rem", color: "#ffffff", fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
              {service.title}
            </h2>
          </div>
          <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, margin: 0, textAlign: "justify" }}>
            {service.summary}
          </p>
          <div style={{ marginTop: "0.5rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              Suited for
            </p>
            <p style={{ fontSize: "0.84rem", color: "rgba(255,255,255,0.38)", lineHeight: 1.7, margin: 0, textAlign: "justify" }}>
              {service.suited}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.6rem",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateX(0) translateY(0)" : "translateX(24px) translateY(10px)",
            filter: inView ? "blur(0px)" : "blur(6px)",
            transition: `opacity ${REVEAL_DURATION} ${REVEAL_EASE} 150ms, transform ${REVEAL_DURATION} ${REVEAL_EASE} 150ms, filter ${REVEAL_DURATION} ${REVEAL_EASE} 150ms`,
          }}
        >
          <p style={{ fontSize: "0.72rem", fontWeight: 700, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
            What's included
          </p>
          {service.deliverables.map((d, j) => (
            <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
              <AnimatedTick color={service.color} active={inView} />
              <span style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, textAlign: "justify" }}>
                {d}
              </span>
            </div>
          ))}
        </div>
      </div>
      {!isLast && <AnimatedDivider />}
    </div>
  );
};


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
          style={{ background: DARK_BG, width: "100%" }}
        >
          <Navbar tapeH={tapeH} arcR={arcR} />
          <div style={{ height: tapeH }} />

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
                <ServiceBlock key={service.title} service={service} isLast={i === SERVICES.length - 1} />
              ))}
            </div>

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

            <PrincipleSlider />

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
                Start a conversation <ArrowRight size={14} strokeWidth={2.2} />
              </a>
            </div>
          </div>

          <FooterTape />
        </section>
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}