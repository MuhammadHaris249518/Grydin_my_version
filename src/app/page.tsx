"use client";
import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowRight, Zap, Brain, Plug, Repeat, Layers, Code } from "lucide-react";
import { useTypewriter } from "./globalscope/typewriter";
import DotGrid from "./globalscope/DotGrid";
import Navbar from "./globalscope/Navbar";

const SERVICES = [
  {
    color: "#22d3ee",
    icon: <Zap size={28} strokeWidth={1.4} />,
    title: "AI Agents",
    desc: "Autonomous agents that think, decide, and act – handling complex tasks end-to-end without human intervention.",
  },
  {
    color: "#f59e0b",
    icon: <Repeat size={28} strokeWidth={1.4} />,
    title: "Workflow Automation",
    desc: "We map the gaps between your tools, teams, and decisions – then automate them. No migration. No disruption.",
  },
  {
    color: "#10b981",
    icon: <Brain size={28} strokeWidth={1.4} />,
    title: "AI Integration",
    desc: "From document processing to decision engines – fine-tuned models deployed directly into your existing business logic.",
  },
  {
    color: "#3b82f6",
    icon: <Layers size={28} strokeWidth={1.4} />,
    title: "Custom Software",
    desc: "Built around how your business actually works. No templates, no off-the-shelf fixes – just the right system for your exact problem.",
  },
  {
    color: "#f43f5e",
    icon: <Plug size={28} strokeWidth={1.4} />,
    title: "System Integration",
    desc: "Connect your entire stack – APIs, platforms, databases – into one coherent, automated operation.",
  },
  {
    color: "#a855f7",
    icon: <Code size={28} strokeWidth={1.4} />,
    title: "Full-Stack Development",
    desc: "End-to-end product builds – backend, frontend, and everything in between. Lean, scalable, and production-ready.",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Diagnose",
    desc: "We map your workflow end to end – every gap, bottleneck, and invisible process costing you time. Nothing gets built until we understand exactly what's broken.",
  },
  {
    step: "02",
    title: "Design",
    desc: "We scope only what moves the needle. No bloated proposals, no unnecessary complexity. You see the exact plan before a single line of code is written.",
  },
  {
    step: "03",
    title: "Deploy",
    desc: "We ship fast, integrate quietly, and hand off documentation your team can actually use. The system runs in the background. You barely notice – except in the results.",
  },
];

const WHY_GRYDIN = [
  { stat: "< 2 weeks", label: "Average first deployment" },
  { stat: "Zero fluff", label: "Scoped to what matters" },
  { stat: "Async-first", label: "No time-zone friction" },
  { stat: "Outcome-based", label: "We succeed when you do" },
];

const TAPE_H = 52;
const ARC_R = TAPE_H / 2;
const TAPE_H_MIN = 24;
const VW_COEFF = 2;
const TAPE_H_SLOW_MAX = 72;
const TAPE_H_SLOW_MIN = 58;
const VW_COEFF_SLOW = 6;

function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H, Math.max(TAPE_H_MIN, vw));
}

function computeTapeHSlow(width: number) {
  const vw = (VW_COEFF_SLOW / 100) * width;
  return Math.min(TAPE_H_SLOW_MAX, Math.max(TAPE_H_SLOW_MIN, vw));
}
const TapeCtx = createContext({ tapeH: TAPE_H, arcR: ARC_R, tapeHSlow: TAPE_H, arcRSlow: ARC_R / 2 });
const useTape = () => useContext(TapeCtx);
const DARK_BG = "linear-gradient(to bottom, #4D4D4D 0%, #000000 76.92%, #000000 100%) top / 100% 130vh no-repeat, repeating-linear-gradient(to bottom, #000000 0vh, #3A3A3A 100vh, #3A3A3A 130vh, #000000 230vh) 0 130vh / 100% 230vh repeat-y";

// ── SVG Tape components ───────────────────────────────────────────────────────
const VB_W = 1000;

// TopTape: true transparent quarter-circle cutouts at bottom-left and bottom-right.
const TopTape = () => {
  const { tapeH, arcR } = useTape();
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", height: `${tapeH}px`, flexShrink: 0, pointerEvents: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VB_W} ${tapeH}`} preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}>
        <path d={`M 0 0 L ${VB_W} 0 L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 0 ${VB_W - arcR} ${tapeH} L ${arcR} ${tapeH} A ${arcR} ${arcR} 0 0 0 0 ${arcR} Z`} fill="white" />
      </svg>
    </div>
  );
};

const BottomTape = () => {
  const { tapeH, arcR } = useTape();
  return (
    <div aria-hidden="true" style={{ position: "relative", width: "100%", height: `${tapeH}px`, flexShrink: 0, pointerEvents: "none" }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VB_W} ${tapeH}`} preserveAspectRatio="none"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}>
        <path d={`M 0 ${tapeH} L ${VB_W} ${tapeH} L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 1 ${VB_W - arcR} 0 L ${arcR} 0 A ${arcR} ${arcR} 0 0 1 0 ${arcR} Z`} fill="white" />
      </svg>
    </div>
  );
};

const FooterTape = () => {
  const { tapeHSlow: tapeH, arcRSlow: arcR } = useTape();
  return (
    <div style={{ position: "relative", width: "100%", height: `${tapeH}px`, flexShrink: 0 }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${VB_W} ${tapeH}`} preserveAspectRatio="none"
        aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}>
        <path d={`M 0 ${tapeH} L ${VB_W} ${tapeH} L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 1 ${VB_W - arcR} 0 L ${arcR} 0 A ${arcR} ${arcR} 0 0 1 0 ${arcR} Z`} fill="white" />
      </svg>
      <div style={{ position: "absolute", bottom: 13, left: `${arcR * 1.25}px`, right: `${arcR * 1.25}px`, height: `${arcR}px`, display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 1 }}>
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="GrydIn" width={11} height={11} style={{ objectFit: "contain" }} />
          <span style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)", color: "rgba(0,0,0,.6)", letterSpacing: "0.05em" }}>GrydIn © {new Date().getFullYear()}</span>
        </div>
        <span style={{ fontSize: "clamp(0.6rem, 1vw, 0.75rem)", color: "rgba(0,0,0,.6)", letterSpacing: "0.06em" }}>Built for the gaps in your business.</span>
      </div>
    </div>
  );
};

// ── Dark section wrapper ──────────────────────────────────────────────────────
const DarkSection = ({
  children,
  id,
  className = "",
  autoHeight = false,
  minHeight = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  autoHeight?: boolean;
  minHeight?: boolean;
}) => (
  <section
    id={id}
    className={`relative w-full ${className}`}
    style={{
      height: autoHeight ? "auto" : minHeight ? "auto" : "100vh",
      minHeight: minHeight ? "100vh" : undefined,
      background: DARK_BG,
      overflow: "hidden",
    }}
  >
    {children}
  </section>
);


// ── Hero Image Slider ─────────────────────────────────────────────────────────
// ── mobile detection hook ─────────────────────────────────────────────
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

const HERO_IMAGES = [
  { src: "/hero-1.png", srcMobile: "/hero-1-mobile.png", service: "AI Agents" },
  { src: "/hero-2.png", srcMobile: "/hero-2-mobile.png", service: "Workflow Automation" },
  { src: "/hero-3.png", srcMobile: "/hero-3-mobile.png", service: "Full-Stack Development" },
  { src: "/hero-4.png", srcMobile: "/hero-4-mobile.png", service: "Custom Software" },
  { src: "/hero-5.png", srcMobile: "/hero-5-mobile.png", service: "AI Integration" },
  { src: "/hero-6.png", srcMobile: "/hero-6-mobile.png", service: "System Integration" },
];

const SLIDE_DURATION = 3400;
const HOLD_THRESHOLD = 400; // ms — below this = tap, above = hold

const HeroImageSlider = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);

  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);

  const goTo = (next: number) => {
    setPrevIndex(index);
    setIndex(next);
    setHeld(false);
  };

  const advance = () => goTo((index + 1) % HERO_IMAGES.length);

  // main progress driver — runs whenever not held
  useEffect(() => {
    if (held) return;
    startRef.current = performance.now() - pausedElapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / SLIDE_DURATION, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        pausedElapsedRef.current = 0;
        advance();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, held]);

  // reset paused-elapsed whenever image actually changes
  useEffect(() => { pausedElapsedRef.current = 0; }, [index]);

  useEffect(() => {
    if (prevIndex === null) return;
    const t = setTimeout(() => setPrevIndex(null), 900);
    return () => clearTimeout(t);
  }, [prevIndex]);

  // ── Pointer handling: distinguishes tap vs hold, works for mouse + touch ──
  const handlePointerDown = () => {
    isPointerDownRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) return;
      // crossed threshold → this is a HOLD → pin current frame
      cancelAnimationFrame(rafRef.current);
      pausedElapsedRef.current = performance.now() - startRef.current;
      setHeld(true);
    }, HOLD_THRESHOLD);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (!held) {
      // released before threshold → it was a TAP → skip to next instantly
      advance();
    }
    // if held===true, do nothing here — global listener below handles resume
  };

  // while held, ANY click/tap anywhere resumes playback from where it paused
  useEffect(() => {
    if (!held) return;
    const resume = () => setHeld(false);
    document.addEventListener("pointerdown", resume, { once: true });
    return () => document.removeEventListener("pointerdown", resume);
  }, [held]);

  const getSrc = (i: number) => (isMobile ? HERO_IMAGES[i].srcMobile : HERO_IMAGES[i].src);

  return (
    <div className="w-full flex flex-col items-center" style={{ padding: "0 5vw", marginTop: "clamp(2rem, 6vh, 4rem)", gap: "0.9rem" }}>

      <div
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={() => { isPointerDownRef.current = false; if (holdTimerRef.current) clearTimeout(holdTimerRef.current); }}
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: "1400px",
          aspectRatio: isMobile ? "3 / 4" : "16 / 9",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.6)",
          overflow: "hidden",
          borderRadius: "4px",
          cursor: "pointer",
          userSelect: "none",
          touchAction: "manipulation",
        }}
      >
        {prevIndex !== null && (
          <img key={`out-${prevIndex}-${isMobile}`} src={getSrc(prevIndex)} alt=""
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
              animation: "heroFadeOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
            }} />
        )}
        <img key={`in-${index}-${isMobile}`} src={getSrc(index)} alt={HERO_IMAGES[index].service}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            animation: "heroFadeIn 1.1s cubic-bezier(0.4,0,0.2,1) forwards",
            filter: held ? "brightness(1.05)" : "none",
            transition: "filter 0.3s ease"
          }} />

        {held && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            border: "2px solid rgba(255,255,255,0.55)",
          }} />
        )}

        <style jsx>{`
          @keyframes heroFadeIn { from { opacity:0; transform:scale(1.04);} to { opacity:1; transform:scale(1);} }
          @keyframes heroFadeOut { from { opacity:1; transform:scale(1);} to { opacity:0; transform:scale(0.98);} }
        `}</style>
      </div>

      {/* progress bar — freezes exactly in sync with held state */}
      <div style={{ display: "flex", gap: "5px", width: "90vw", maxWidth: "1400px" }}>
        {HERO_IMAGES.map((_, i) => (
          <div
            key={i}
            onClick={(e) => { e.stopPropagation(); cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }}
            style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.15)", overflow: "hidden", cursor: "pointer" }}
          >
            <div style={{
              height: "100%",
              width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
              background: held && i === index ? "#fff" : "rgba(255,255,255,0.75)",
              boxShadow: held && i === index ? "0 0 6px rgba(255,255,255,0.8)" : "none",
            }} />
          </div>
        ))}
      </div>

      <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: "10px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "6px" }}>
        {HERO_IMAGES[index].service}
        {held && <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>· paused</span>}
      </p>
    </div>
  );
};
// ── Hero Section ──────────────────────────────────────────────────────────────

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { tapeH } = useTape();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    if (videoRef.current) videoRef.current.play().catch(() => { });
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const { displayed: typed, ref: typeRef } = useTypewriter("Grid the unseen.");
  return (
    <DarkSection id="hero" className="flex flex-col" minHeight>
      <div style={{ height: `${tapeH}px`, flexShrink: 0 }} />
      <DotGrid contentBottom={contentH / 1.04} animate={false} />
      {/* Text content – padded, centred */}
      <div
        className="flex flex-col text-center px-6 justify-center items-center"
        ref={contentRef}
        style={{
          flexShrink: 0,
          minHeight: "100dvh",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          className="mb-4 tracking-widest uppercase text-xs font-medium mt-20"
          style={{
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.22em",
            background: "rgba(255,255,255,0.45)",
            borderRadius: "2px",
            padding: "4px 8px",
          }}
        >
          Built for the gaps in your business
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
          <span style={{ color: "rgba(255,255,255,0.45)" }}>
            Keep the humans.
          </span>
        </h1>

        <p
          className="mb-7 max-w-xl leading-relaxed"
          style={{
            fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
            color: "rgba(255,255,255,0.5)",
            textAlign: "justify",
          }}
        >
          Businesses don't have an execution problem. They have a visibility
          problem. Work piles up in the gaps between tools, teams, and decisions
          – repetitive, complex, and invisible. GrydIn maps those gaps and
          automates them.
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
          Start a project <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      </div>

      {/* Video – full width, height derived from 16/9 aspect ratio */}
      {/* <div
        className="relative mt-8 w-full"
        style={{
          aspectRatio: "16/9",
          flexShrink: 0,
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.6)",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        >
          <source src="/medium.mp4" type="video/mp4" />
        </video>
      </div> */}
      <HeroImageSlider />
    </DarkSection>
  );
};

// ── Services Section ──────────────────────────────────────────────────────────
const ShineCard = ({ onDone }: { onDone: () => void }) => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const DURATION = 1200;

  useEffect(() => {
    startRef.current = performance.now();
    const animate = (now: number) => {
      const p = (now - startRef.current) / DURATION;
      if (p >= 1) { setProgress(1); onDone(); return; }
      setProgress(p);
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      zIndex: 2,
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute",
        top: "-150%",
        left: "-100%",
        width: "80%",
        height: "400%",
        background: "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.07) 50%, transparent 75%)",
        transform: `translateX(${progress * 380}%) skewX(-15deg)`,
      }} />
    </div>
  );
};

const ServicesGrid = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const advance = (current: number) => {
    const next = current + 1;
    if (next >= SERVICES.length) {
      timeoutRef.current = setTimeout(() => setActiveIndex(0), 5000);
    } else {
      setActiveIndex(next);
    }
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3"
      style={{ gap: "clamp(1.5rem, 4vw, 2.5rem)" }}
    >
      {SERVICES.map((s, i) => (
        <div
          key={s.title}
          style={{ position: "relative", overflow: "hidden" }}
          className="flex flex-col gap-4"
        >
          {activeIndex === i && <ShineCard onDone={() => advance(i)} />}
          <div style={{ color: s.color }}>{s.icon}</div>
          <h3
            className="font-semibold"
            style={{
              fontSize: "1.05rem",
              color: "#ffffff",
              letterSpacing: "-0.01em",
            }}
          >
            {s.title}
          </h3>
          <p
            className="leading-relaxed"
            style={{
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.75,
              textAlign: "justify",
            }}
          >
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
  );
};

const ServicesSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const { tapeH } = useTape();

  return (
    <DarkSection id="services" className="flex flex-col" minHeight>
      <TopTape />
      <DotGrid contentBottom={contentH / 1.02} animate={false} />
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1"
        style={{
          position: "relative",
          zIndex: 1,
          paddingTop: "clamp(3rem, 7.5vh, 6rem)",
          paddingBottom: "clamp(3rem, 7.5vh, 6rem)",
        }}
      >
        {" "}
        <p
          className="mb-3 uppercase tracking-widest text-xs"
          style={{
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.2em",
            background: "rgba(255,255,255,0.45)",
            borderRadius: "2px",
            padding: "4px 8px",
            width: "fit-content",
          }}
        >
          Built for
        </p>
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "clamp(1rem, 4vh, 4rem)",
          }}
        >
          Six ways we eliminate the unseen.
        </h2>
        <ServicesGrid />
      </div>
    </DarkSection>
  );
};
// ── How It Works Section ──────────────────────────────────────────────────────
const TracedBox = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"tracing" | "holding" | "hidden" | "waiting">("waiting");
  const [glowOpacity, setGlowOpacity] = useState(0);
  const glowRafRef = useRef<number>(0);
  const glowStartRef = useRef<number>(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const TRACE_DURATION = 1800;
  const HOLD = 10000;
  const PAUSE = 3500;
  const PAD = 16;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const startTrace = () => {
      setPhase("tracing");
      setProgress(0);
      startTimeRef.current = performance.now();
      const animate = (now: number) => {
        const p = Math.min((now - startTimeRef.current) / TRACE_DURATION, 1);
        setProgress(p);
        if (p < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          setPhase("holding");
          // start glow loop
          const GLOW_PERIOD = 2000;
          glowStartRef.current = 0;
          const animateGlow = (now: number) => {
            if (!glowStartRef.current) glowStartRef.current = now;
            const t = ((now - glowStartRef.current) % GLOW_PERIOD) / GLOW_PERIOD;
            const opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
            setGlowOpacity(opacity);
            glowRafRef.current = requestAnimationFrame(animateGlow);
          };
          glowRafRef.current = requestAnimationFrame(animateGlow);

          timeout = setTimeout(() => {
            cancelAnimationFrame(glowRafRef.current);
            setGlowOpacity(0);
            setProgress(0);
            setPhase("hidden");
            timeout = setTimeout(() => {
              setPhase("waiting");
              timeout = setTimeout(startTrace, PAUSE);
            }, 100);
          }, HOLD);
        }
      };
      rafRef.current = requestAnimationFrame(animate);
    };

    timeout = setTimeout(startTrace, 300);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(glowRafRef.current);
    };
  }, []);

  const el = ref.current;
  const W = el ? el.offsetWidth + PAD * 2 : 0;
  const H = el ? el.offsetHeight + PAD * 2 : 0;
  const perimeter = W && H ? 2 * (W + H) : 0;

  // Perimeter segments starting from top-center going clockwise:
  // right half of top → right side → bottom → left side → left half of top
  const getPath = (p: number) => {
    if (!W || !H) return "";
    const dist = p * perimeter;
    const topRight = W / 2;
    const rightSide = topRight + H;
    const bottom = rightSide + W;
    const leftSide = bottom + H;
    const topLeft = leftSide + W / 2;

    // Right direction from center-top
    let rightPath = "";
    // Left direction from center-top (mirror)
    let leftPath = "";

    // Right branch: center-top → top-right → right-bottom → bottom-left → center-bottom
    const rDist = dist / 2;
    if (rDist <= topRight) {
      rightPath = `M ${W / 2} 0 L ${W / 2 + rDist} 0`;
    } else if (rDist <= topRight + H) {
      rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${rDist - topRight}`;
    } else if (rDist <= topRight + H + W) {
      rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${H} L ${W - (rDist - topRight - H)} ${H}`;
    } else {
      const remaining = rDist - topRight - H - W;
      rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${H} L 0 ${H} L 0 ${H - remaining}`;
    }

    // Left branch: center-top → top-left → left-bottom → bottom-right → center-bottom
    const lDist = dist / 2;
    if (lDist <= topRight) {
      leftPath = `M ${W / 2} 0 L ${W / 2 - lDist} 0`;
    } else if (lDist <= topRight + H) {
      leftPath = `M ${W / 2} 0 L 0 0 L 0 ${lDist - topRight}`;
    } else if (lDist <= topRight + H + W) {
      leftPath = `M ${W / 2} 0 L 0 0 L 0 ${H} L ${lDist - topRight - H} ${H}`;
    } else {
      const remaining = lDist - topRight - H - W;
      leftPath = `M ${W / 2} 0 L 0 0 L 0 ${H} L ${W} ${H} L ${W} ${H - remaining}`;
    }

    return `${rightPath} ${leftPath}`;
  };

  return (
    <div ref={ref} style={{ position: "relative", padding: `${PAD}px` }}>
      {phase !== "hidden" && W > 0 && (
        <svg
          style={{
            position: "absolute",
            top: `-${PAD}px`, left: `-${PAD}px`,
            width: `${W}px`, height: `${H}px`,
            pointerEvents: "none", overflow: "visible",
            opacity: 1,
          }}
        >
          <path
            d={getPath(progress)}
            fill="none"
            stroke={`rgba(255,255,255,${0.3 + glowOpacity * 0.7})`}
            strokeWidth="1"
            filter={glowOpacity > 0 ? `drop-shadow(0 0 ${glowOpacity * 9}px rgba(255,255,255,${glowOpacity * 0.9}))` : undefined}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {children}
    </div>
  );
};

const HowItWorksSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);
  const { tapeH } = useTape();

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <DarkSection id="how-it-works" className="flex flex-col" minHeight>
      <TopTape />
      <DotGrid contentBottom={contentH / 1.02} animate={false} />
      <div
        className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1"
        ref={contentRef}
        style={{
          paddingTop: "clamp(3rem, 7.5vh, 6rem)",
          paddingBottom: "clamp(3rem, 7.5vh, 6rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p
          className="mb-3 uppercase tracking-widest text-xs"
          style={{
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.2em",
            background: "rgba(255,255,255,0.45)",
            borderRadius: "2px",
            padding: "4px 8px",
            width: "fit-content",
          }}
        >
          Built on
        </p>
        <h2
          className="font-bold"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "clamp(1rem, 4vh, 4rem)",
          }}
        >
          Three steps to invisible.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {HOW_IT_WORKS.map((item) => (
            <TracedBox key={item.step}>
              <div key={item.step} className="flex flex-col gap-3">
                <span
                  className="font-bold"
                  style={{
                    fontSize: "2.8rem",
                    color: "rgba(255,255,255,0.07)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {item.step}
                </span>
                <h3
                  className="font-semibold mt-1"
                  style={{
                    fontSize: "1.05rem",
                    color: "#ffffff",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.75,
                    textAlign: "justify",
                  }}
                >
                  {item.desc}
                </p>
              </div>
            </TracedBox>
          ))}
        </div>
      </div>
    </DarkSection>
  )
};

function useCountUp(target: number, duration = 1200, triggered = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, target, duration]);
  return count;
}
// ── Why GrydIn Section ────────────────────────────────────────────────────────
const WhyGrydinSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const { tapeH } = useTape();
  return (
    <DarkSection id="why-gridin" className="flex flex-col" minHeight>
      <TopTape />
      <DotGrid contentBottom={contentH} animate={false} />
      <div ref={(el) => { (ref as React.MutableRefObject<HTMLDivElement | null>).current = el; (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = el; }} className="max-w-5xl mx-auto w-full px-6 md:px-12" style={{ position: "relative", zIndex: 1, paddingTop: "clamp(0.8rem, 3vh, 2rem)", paddingBottom: "clamp(2rem, 5vh, 4rem)" }}>
        <p className="mb-3 uppercase tracking-widest text-xs" style={{ fontWeight: 700, color: "#000000", letterSpacing: "0.2em" }}>Why us</p>
        <h2 className="font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em", marginBottom: "clamp(1rem, 4vh, 4rem)" }}>
          Built different, by design
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {WHY_GRYDIN.map((item) => (
            <div key={item.label} className="flex flex-col gap-2">
              <span className="font-bold" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: "#ffffff", letterSpacing: "-0.03em" }}>
                {triggered ? item.stat : "–"}
              </span>
              <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.04em" }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </DarkSection>
  );
};

// ── Contact / Footer Section ──────────────────────────────────────────────────
const ContactSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);
  const { tapeH } = useTape();

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);
  return (
    <DarkSection id="contact" className="flex flex-col justify-between" minHeight>
      <TopTape />
      <DotGrid contentBottom={contentH / 1.12} animate={false} />
      <div
        className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row gap-16 justify-center md:justify-between items-center"
        ref={contentRef}
        style={{
          paddingTop: "clamp(4rem, 10vh, 8rem)",
          paddingBottom: "clamp(4rem, 10vh, 8rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="flex flex-col gap-6 max-w-sm">
          <p
            className="uppercase tracking-widest text-xs"
            style={{
              color: "#000000",
              fontWeight: 700,
              letterSpacing: "0.2em",
              background: "rgba(255,255,255,0.45)",
              borderRadius: "2px",
              padding: "4px 8px",
              width: "fit-content",
            }}
          >
            Your move
          </p>
          <h2
            className="font-bold"
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
              color: "#ffffff",
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
            }}
          >
            See a gap worth closing?
          </h2>
          <p
            style={{
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              textAlign: "justify",
            }}
          >
            Describe what's slowing your business down. No pitch, no sales deck –
            just an honest, scoped response within one business day.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm w-fit transition-all duration-200 hover:gap-4"
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
            Start the diagnosis <ArrowRight size={14} strokeWidth={2.2} />
          </a>
        </div>
      </div>

      {/* Footer tape – SVG BottomTape geometry with footer text overlaid */}
      <FooterTape />
    </DarkSection>
  )
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

export default function Home() {
  const [tapeH, setTapeH] = useState(TAPE_H);
  const [tapeHSlow, setTapeHSlow] = useState(TAPE_H_SLOW_MAX);
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
    const update = () => {
      setTapeH(computeTapeH(window.innerWidth));
      setTapeHSlow(computeTapeHSlow(window.innerWidth));
    };

    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);
  const arcR = tapeH / 2;
  const arcRSlow = tapeHSlow / 2;
  return (
    <TapeCtx.Provider
      value={{ tapeH, arcR, tapeHSlow, arcRSlow: tapeHSlow / 2 }}
    >
      <main style={{ background: "white", overflowX: "hidden" }}>
        <Navbar tapeH={tapeHSlow} arcR={arcRSlow} />
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        {/* <WhyGrydinSection /> */}
        <ContactSection />
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}