"use client";
import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Menu, X, ArrowRight, Zap, Brain, Plug, Repeat, Layers, Code,
  ShieldCheck, Gauge, Share2, FileText, MonitorSmartphone, Database,
  Cloud, BrainCircuit, ScanText, SlidersHorizontal, Link2, RefreshCw, Braces, Target, AlertTriangle, Crosshair, Workflow, Puzzle, Rocket,
} from "lucide-react";
import { useTypewriter } from "./globalscope/typewriter";
import DotGrid from "./globalscope/DotGrid";
import Navbar from "./globalscope/Navbar";
import { FooterTape } from "./globalscope/FooterTape";

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
    tagline: "UNDERSTAND BEFORE BUILDING.",
    desc: "We map your workflow end to end – every gap, bottleneck, and invisible process costing you time. Nothing gets built until we understand exactly what's broken.",
    points: [
      { icon: <Target size={18} strokeWidth={1.6} />, title: "Process Discovery", desc: "We uncover how work really flows." },
      { icon: <AlertTriangle size={18} strokeWidth={1.6} />, title: "Gap & Bottleneck Analysis", desc: "We find what's slowing you down." },
      { icon: <Crosshair size={18} strokeWidth={1.6} />, title: "Data & System Audit", desc: "We examine systems, data and integrations in depth." },
    ],
  },
  {
    step: "02",
    title: "Design",
    tagline: "ARCHITECT WITH INTENT.",
    desc: "We scope only what moves the needle. No bloated proposals, no unnecessary complexity. You see the exact plan before a single line of code is written.",
    points: [
      { icon: <Target size={18} strokeWidth={1.6} />, title: "Solution Architecture", desc: "We craft scalable, future-proof architectures tailored to your goals." },
      { icon: <Workflow size={18} strokeWidth={1.6} />, title: "Workflow Blueprint", desc: "Every step, condition, and integration mapped with precision." },
      { icon: <Puzzle size={18} strokeWidth={1.6} />, title: "Seamless Integrations", desc: "APIs, data, and tools connected into one unified ecosystem." },
      { icon: <ShieldCheck size={18} strokeWidth={1.6} />, title: "Built for Reliability", desc: "Security, performance, and observability designed in from the start." },
    ],
  },
  {
    step: "03",
    title: "Deploy",
    tagline: "AUTOMATE. INTEGRATE. DELIVER.",
    desc: "We ship fast, integrate quietly, and hand off documentation your team can actually use. The system runs in the background. You barely notice – except in the results.",
    points: [
      { icon: <Rocket size={18} strokeWidth={1.6} />, title: "Seamless Deployment", desc: "Automated delivery with zero disruption and minimal downtime." },
      { icon: <Link2 size={18} strokeWidth={1.6} />, title: "Deep Integrations", desc: "Connect with the tools you use daily. Everything works, together." },
      { icon: <FileText size={18} strokeWidth={1.6} />, title: "Full Documentation", desc: "Clear guides and references so your team stays confident and independent." },
    ],
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
  {
    art: "/hi1.png", artMobile: "/him1.png",
    service: "AI Agents",
    color: "#22d3ee",
    titleWhite: "AI ",
    titleColor: "Agents",
    tagline: "Workflows that run themselves.",
    subheading: "Intelligent agents that plan, decide, and execute across your tools – autonomously.",
    points: [
      { icon: <Brain size={18} strokeWidth={1.6} />, title: "Autonomous Execution", desc: "Handles multi-step tasks and makes decisions in real time." },
      { icon: <Plug size={18} strokeWidth={1.6} />, title: "Seamless Integration", desc: "Connects with your apps, APIs and data – effortlessly." },
      { icon: <ShieldCheck size={18} strokeWidth={1.6} />, title: "Reliable & Transparent", desc: "Built-in monitoring, logs and smart fallbacks." },
    ],
  },
  {
    art: "/hi2.png", artMobile: "/him2.png",
    service: "Workflow Automation",
    color: "#f59e0b",
    titleWhite: "Workflow ",
    titleColor: "Automation",
    tagline: "We connect the dots across your tools",
    subheading: "and eliminate the manual in between.",
    points: [
      { icon: <Gauge size={18} strokeWidth={1.6} />, title: "Smarter Workflows", desc: "We find the gaps and build automations that just work." },
      { icon: <Share2 size={18} strokeWidth={1.6} />, title: "Seamless Orchestration", desc: "Automate across apps and teams without changing your stack." },
      { icon: <FileText size={18} strokeWidth={1.6} />, title: "Built to Last", desc: "Clear docs and simple handoffs your team can rely on." },
    ],
  },
  {
    art: "/hi3.png", artMobile: "/him3.png",
    service: "Full-Stack Development",
    color: "#3b82f6",
    titleWhite: "Full-Stack ",
    titleColor: "Development",
    tagline: "From idea to live product.",
    subheading: "Built clean. Built to scale.",
    points: [
      { icon: <MonitorSmartphone size={18} strokeWidth={1.6} />, title: "Complete Web & Mobile", desc: "Responsive web apps and cross-platform mobile experiences." },
      { icon: <Code size={18} strokeWidth={1.6} />, title: "APIs & Integrations", desc: "Robust APIs and third-party integrations that power your product." },
      { icon: <Database size={18} strokeWidth={1.6} />, title: "Scalable Architecture", desc: "Clean code, efficient databases, and services built to handle growth." },
    ],
  },
  {
    art: "/hi4.png", artMobile: "/him4.png",
    service: "Custom Software",
    color: "#3b82f6",
    titleWhite: "Custom ",
    titleColor: "Software",
    tagline: "Purpose-built systems designed",
    subheading: "for the way you operate.",
    points: [
      { icon: <Code size={18} strokeWidth={1.6} />, title: "Built Around You", desc: "Solutions tailored to your processes and goals." },
      { icon: <Layers size={18} strokeWidth={1.6} />, title: "End-to-End Development", desc: "From backend to frontend – we build it all." },
      { icon: <Cloud size={18} strokeWidth={1.6} />, title: "Powerful & Scalable", desc: "Clean code, solid architecture, ready to grow with you." },
    ],
  },
  {
    art: "/hi5.png", artMobile: "/him5.png",
    service: "AI Integration",
    color: "#10b981",
    titleWhite: "AI ",
    titleColor: "Integration",
    tagline: "Smarter workflows.",
    subheading: "Powered by intelligence.",
    points: [
      { icon: <BrainCircuit size={18} strokeWidth={1.6} />, title: "Intelligent Automation", desc: "Embed AI into your tools and automate complex workflows." },
      { icon: <ScanText size={18} strokeWidth={1.6} />, title: "Document Processing", desc: "Extract, understand, and organize documents at scale." },
      { icon: <SlidersHorizontal size={18} strokeWidth={1.6} />, title: "Custom Models", desc: "Fine-tuned models and prompts built around your data." },
    ],
  },
  {
    art: "/hi6.png", artMobile: "/him6.png",
    service: "System Integration",
    color: "#f43f5e",
    titleWhite: "System ",
    titleColor: "Integration",
    tagline: "One connected stack.",
    subheading: "Zero manual handoffs.",
    points: [
      { icon: <Link2 size={18} strokeWidth={1.6} />, title: "Connect Everything", desc: "APIs and platforms working together as one." },
      { icon: <RefreshCw size={18} strokeWidth={1.6} />, title: "Real-Time Sync", desc: "Data flows across your tools instantly and accurately." },
      { icon: <Braces size={18} strokeWidth={1.6} />, title: "Built for Any System", desc: "Connect modern apps or legacy systems – without replacing them." },
    ],
  },
];

const SLIDE_DURATION = 8500;
const HOLD_THRESHOLD = 400; // ms — below this = tap, above = hold

const ArtImage = ({
  aspect, index, prevIndex, isMobile, held, current, getArtSrc,
  handlePointerDown, handlePointerUp, handlePointerLeaveRef,
}: {
  aspect: string;
  index: number;
  prevIndex: number | null;
  isMobile: boolean;
  held: boolean;
  current: (typeof HERO_IMAGES)[number];
  getArtSrc: (i: number) => string;
  handlePointerDown: () => void;
  handlePointerUp: () => void;
  handlePointerLeaveRef: () => void;
}) => (
  <div
    onPointerDown={handlePointerDown}
    onPointerUp={handlePointerUp}
    onPointerLeave={handlePointerLeaveRef}
    style={{
      position: "relative",
      width: "100%",
      aspectRatio: aspect,
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
      <img key={`out-${prevIndex}-${isMobile}`} src={getArtSrc(prevIndex)} alt=""
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain",
          animation: "heroFadeOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
        }} />
    )}
    <img key={`in-${index}-${isMobile}`} src={getArtSrc(index)} alt={current.service}
      style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain",
        transform: "scale(1)", // ← adjust zoom amount here
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
);

const ProgressBar = ({
  index, progress, held, onDotClick,
}: {
  index: number;
  progress: number;
  held: boolean;
  onDotClick: (i: number) => void;
}) => (
  <div style={{ display: "flex", gap: "5px", width: "100%" }}>
    {HERO_IMAGES.map((_, i) => (
      <div
        key={i}
        onClick={(e) => { e.stopPropagation(); onDotClick(i); }}
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
);

const PointsList = ({ current }: { current: (typeof HERO_IMAGES)[number] }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
    {current.points.map((pt, i) => (
      <div key={pt.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingTop: i > 0 ? "1.1rem" : 0 }}>
        <div style={{
          flexShrink: 0, width: "34px", height: "34px", borderRadius: "6px",
          background: "rgba(255,255,255,0.05)", border: `1px solid ${current.color}55`,
          color: current.color, display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {pt.icon}
        </div>
        <div>
          <h4 style={{ fontSize: "0.92rem", fontWeight: 600, color: "#fff", margin: 0, marginBottom: "2px" }}>{pt.title}</h4>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{pt.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const HeroImageSlider = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectCacheRef = useRef<Record<string, string>>({});
  const [mobileAspect, setMobileAspect] = useState<string>("3 / 4");
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasEnteredView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  useEffect(() => {
    if (!isMobile) return;
    const src = HERO_IMAGES[index].artMobile;
    const cached = aspectCacheRef.current[src];
    if (cached) {
      setMobileAspect(cached);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
      aspectCacheRef.current[src] = ratio;
      setMobileAspect(ratio);
    };
    img.src = src;
  }, [index, isMobile]);

  const goTo = (next: number) => {
    setPrevIndex(index);
    setIndex(next);
    setHeld(false);
  };

  const advance = () => goTo((index + 1) % HERO_IMAGES.length);

  useEffect(() => {
    if (held || !hasEnteredView) return;
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
  }, [index, held, hasEnteredView]);

  useEffect(() => { pausedElapsedRef.current = 0; }, [index]);

  useEffect(() => {
    if (prevIndex === null) return;
    const t = setTimeout(() => setPrevIndex(null), 900);
    return () => clearTimeout(t);
  }, [prevIndex]);

  const handlePointerDown = () => {
    isPointerDownRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) return;
      cancelAnimationFrame(rafRef.current);
      pausedElapsedRef.current = performance.now() - startRef.current;
      setHeld(true);
    }, HOLD_THRESHOLD);
  };
  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };
  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (!held) {
      advance();
    }
  };

  useEffect(() => {
    if (!held) return;
    const resume = () => setHeld(false);
    document.addEventListener("pointerdown", resume, { once: true });
    return () => document.removeEventListener("pointerdown", resume);
  }, [held]);

  const getArtSrc = (i: number) => (isMobile ? HERO_IMAGES[i].artMobile : HERO_IMAGES[i].art);
  const current = HERO_IMAGES[index];

  // ── DESKTOP: split layout, left = text, right = art ──
  if (!isMobile) {
    return (
      <div ref={containerRef} className="w-full" style={{ marginTop: "clamp(2rem, 6vh, 4rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center" }}>
          {/* Left: text content, swaps with index */}
          <div key={index} style={{ display: "flex", flexDirection: "column", gap: "1.4rem", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
            <div>
              <h3 style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
                <span style={{ color: "#fff" }}>{current.titleWhite}</span>
                <span style={{ color: current.color }}>{current.titleColor}</span>
              </h3>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", marginTop: "0.5rem" }}>{current.tagline}</p>
              <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.55)", margin: 0 }}>{current.subheading}</p>
            </div>
            <PointsList current={current} />
          </div>

          {/* Right: art image */}
          <ArtImage
            aspect="16 / 13"
            index={index}
            prevIndex={prevIndex}
            isMobile={isMobile}
            held={held}
            current={current}
            getArtSrc={getArtSrc}
            handlePointerDown={handlePointerDown}
            handlePointerUp={handlePointerUp}
            handlePointerLeaveRef={handlePointerLeave}
          />
        </div>

        <div style={{ marginTop: "1.2rem" }}>
          <ProgressBar
            index={index}
            progress={progress}
            held={held}
            onDotClick={(i) => { cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }}
          />
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", marginTop: "10px", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "6px" }}>
            {current.service}
            {held && <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>· paused</span>}
          </p>
        </div>

        <style jsx>{`
          @keyframes heroTextIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </div>
    );
  }

  // ── MOBILE: stacked layout — heading/tagline → art → subheading/points → progress ──
  return (
    <div ref={containerRef} className="w-full flex flex-col items-center" style={{ marginTop: "clamp(2rem, 6vh, 4rem)", gap: "1.2rem" }}>
      <div key={`head-${index}`} style={{ width: "100%", textAlign: "center", padding: "0 5vw", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <h3 style={{ fontSize: "clamp(1.4rem, 6vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
          <span style={{ color: "#fff" }}>{current.titleWhite}</span>
          <span style={{ color: current.color }}>{current.titleColor}</span>
        </h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: "0.4rem", marginBottom: 0 }}>{current.tagline}</p>
      </div>

      <div style={{ width: "calc(100% + 3rem)", margin: "0 -1.5rem" }}>
        <ArtImage
          aspect={mobileAspect}
          index={index}
          prevIndex={prevIndex}
          isMobile={isMobile}
          held={held}
          current={current}
          getArtSrc={getArtSrc}
          handlePointerDown={handlePointerDown}
          handlePointerUp={handlePointerUp}
          handlePointerLeaveRef={handlePointerLeave}
        />
      </div>

      <div key={`body-${index}`} style={{ width: "100%", padding: "0 5vw", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: "1.2rem" }}>{current.subheading}</p>
        <PointsList current={current} />
      </div>

      <div style={{ width: "90vw", maxWidth: "1400px" }}>
        <ProgressBar
          index={index}
          progress={progress}
          held={held}
          onDotClick={(i) => { cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }}
        />
      </div>

      <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center", gap: "6px", padding: "0 5vw" }}>
        {current.service}
        {held && <span style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em" }}>· paused</span>}
      </p>

      <style jsx>{`
        @keyframes heroTextIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
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

  const { displayed: typed, ref: typeRef } = useTypewriter("Grid the unseen");
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
            {/* <span style={{ color: "rgba(222, 2, 2, 0.45)" }}> */}
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
    </DarkSection>
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
        <HeroImageSlider />
      </div>
    </DarkSection>
  );
};
const STEP_IMAGES = [
  { art: "/sdg.png", artMobile: "/sdgm.png", alt: "Diagnose art" },
  { art: "/sds.png", artMobile: "/sdsm.png", alt: "Design art" },
  { art: "/sdp.png", artMobile: "/sdpm.png", alt: "Deploy art" },
];
const SLIDE_TRANSITION = 700;   // ms — carousel push transition
const TRACE_DURATION = 1500;  // ms — border draw + scanline reveal
const HOLD_DURATION = 7000;  // ms — fully revealed, static

// ── shared border-trace path builder (lifted from TracedBox) ──────────────
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

// ── one step's box: border trace + scanline image reveal ──────────────────
const StepSlide = ({
  item,
  image,
  mobileAspect,
  isActive,
  phase,
  progress,
  isMobile,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  item: (typeof HOW_IT_WORKS)[number];
  image: string;
  mobileAspect: string;
  isActive: boolean;
  phase: "trace" | "hold";
  progress: number;
  isMobile: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!boxRef.current) return;
    const el = boxRef.current;
    const ro = new ResizeObserver(() => {
      setDims({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const holding = isActive && phase === "hold";
  const tracing = isActive && phase === "trace";
  const revealed = !isActive || phase === "hold";
  const clipBottom = tracing ? Math.max(0, (1 - progress) * 100) : 0;
  const borderProgress = tracing ? progress : isActive ? 1 : 0;

  // ── Art box: border trace + scanline reveal — UNCHANGED animation, just renamed usage ──
  const ArtBox = ({ aspect }: { aspect: string }) => (
    <div
      ref={boxRef}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      style={{
        position: "relative",
        width: "100%",
        cursor: "pointer",
        userSelect: "none",
        touchAction: "manipulation",
        padding: isMobile ? 0 : "14px",
      }}
    >
      {dims.w > 0 && (
        <svg
          shapeRendering="crispEdges"
          style={{ position: "absolute", top: 0, left: 0, width: `${dims.w}px`, height: `${dims.h}px`, pointerEvents: "none", overflow: "visible" }}
        >
          <path
            d={buildTracePath(dims.w, dims.h, borderProgress)}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {holding && (
            <path
              d={buildTracePath(dims.w, dims.h, borderProgress)}
              fill="none"
              stroke="rgba(255,255,255,1)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                filter:
                  "drop-shadow(0 0 4px rgba(255,255,255,0.95)) drop-shadow(0 0 14px rgba(255,255,255,0.6)) drop-shadow(0 0 28px rgba(255,255,255,0.35))",
                animation: "traceGlowPulse 2s ease-in-out infinite",
              }}
            />
          )}
        </svg>
      )}
      <style jsx>{`
        @keyframes traceGlowPulse {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspect,
          overflow: "hidden",
          borderRadius: "3px",
          border: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(0,0,0,0.5)",
        }}
      >
        <img
          src={image}
          alt={item.title}
          style={{
            transform: "scale(1)", // ← adjust zoom amount here
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "contain",
            clipPath: `inset(0 0 ${clipBottom}% 0)`,
            filter: revealed ? "brightness(1)" : "brightness(0.55)",
            transition: "filter 0.3s ease-out",
          }}
        />
        {tracing && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${progress * 100}%`,
              height: "2px",
              background: "rgba(34,211,238,0.9)",
              boxShadow: "0 0 12px 2px rgba(34,211,238,0.7), 0 0 30px 6px rgba(34,211,238,0.25)",
              pointerEvents: "none",
            }}
          />
        )}
      </div>
    </div>
  );

  const PointsList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {item.points.map((pt, i) => (
        <div key={pt.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingTop: i > 0 ? "1rem" : 0 }}>
          <div style={{
            flexShrink: 0, width: "32px", height: "32px", borderRadius: "6px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(34,211,238,0.35)",
            color: "rgba(34,211,238,0.9)", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {pt.icon}
          </div>
          <div>
            <h4 style={{ fontSize: "0.9rem", fontWeight: 600, color: "#fff", margin: 0, marginBottom: "2px" }}>{pt.title}</h4>
            <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, margin: 0 }}>{pt.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // ── DESKTOP: left text / right art ──
  if (!isMobile) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "4fr 8fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center", padding: "0 14px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              STEP {item.step}
            </span>
            <h3 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em", margin: "0.3rem 0" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", color: "rgba(34,211,238,0.85)", textTransform: "uppercase", margin: 0 }}>
              {item.tagline}
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginTop: "1rem" }}>
              {item.desc}
            </p>
          </div>
          <PointsList />
        </div>
        <ArtBox aspect="16 / 13" />
      </div>
    );
  }
  // ── MOBILE: heading/tagline → art → desc/points, stacked ──
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem" }}>
      <div style={{ width: "100%", textAlign: "center", padding: "0 5vw" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          STEP {item.step}
        </span>
        <h3 style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: 600, letterSpacing: "-0.01em", margin: "0.3rem 0" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(34,211,238,0.85)", textTransform: "uppercase", margin: 0 }}>
          {item.tagline}
        </p>
      </div>

      <div style={{ width: "100%" }}>
        <ArtBox aspect={mobileAspect} />
      </div>

      <div style={{ width: "100%", padding: "0 5vw" }}>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, textAlign: "center", marginBottom: "1.2rem" }}>
          {item.desc}
        </p>
        <PointsList />
      </div>
    </div>
  );
};

// ── carousel orchestrator ───────────────────────────────────────────────────
const StepCarousel = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"trace" | "hold">("trace");
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);

  const phaseDuration = phase === "trace" ? TRACE_DURATION : HOLD_DURATION;
  // ── shared aspect-ratio cache for all step images ──
  const aspectCacheRef = useRef<Record<string, string>>({});
  const [aspects, setAspects] = useState<Record<string, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const advanceStep = () => {
    setTransitioning(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % HOW_IT_WORKS.length);
      setPhase("trace");
      setProgress(0);
      pausedElapsedRef.current = 0;
      setHeld(false);
      setTransitioning(false);
    }, SLIDE_TRANSITION);
  };

  useEffect(() => {
    if (held || transitioning || !inView) {
      if (!held && !transitioning && !inView && startRef.current) {
        pausedElapsedRef.current = performance.now() - startRef.current;
      }
      return;
    }
    startRef.current = performance.now() - pausedElapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / phaseDuration, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        pausedElapsedRef.current = 0;
        if (phase === "trace") setPhase("hold");
        else advanceStep();
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, held, transitioning, index, inView]);

  const handlePointerDown = () => {
    if (transitioning) return;
    isPointerDownRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) return;
      cancelAnimationFrame(rafRef.current);
      pausedElapsedRef.current = performance.now() - startRef.current;
      setHeld(true);
    }, HOLD_THRESHOLD);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (!held && !transitioning) {
      cancelAnimationFrame(rafRef.current);
      advanceStep();
    }
  };

  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

  // any tap anywhere resumes a held step
  useEffect(() => {
    if (!held) return;
    const resume = () => setHeld(false);
    document.addEventListener("pointerdown", resume, { once: true });
    return () => document.removeEventListener("pointerdown", resume);
  }, [held]);

  return (
    <div ref={containerRef} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.2rem" }}>
      <div style={{
        position: "relative",
        width: isMobile ? "calc(100% + 3rem)" : "90vw",
        maxWidth: isMobile ? "none" : "1500px",
        overflow: "hidden",
      }}>
        <div
          style={{
            display: "flex",
            width: `${HOW_IT_WORKS.length * 100}%`,
            transform: `translateX(-${(index * 100) / HOW_IT_WORKS.length}%)`,
            transition: `transform ${SLIDE_TRANSITION}ms cubic-bezier(0.4,0,0.2,1)`,
          }}
        >
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} style={{ flex: `0 0 ${100 / HOW_IT_WORKS.length}%` }}>
              <StepSlide
                item={item}
                image={isMobile ? STEP_IMAGES[i].artMobile : STEP_IMAGES[i].art}
                mobileAspect={isMobile ? "16 / 16" : "16 / 13"}
                isActive={i === index}
                phase={phase}
                progress={i === index ? progress : 0}
                isMobile={isMobile}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", gap: "6px" }}>
        {HOW_IT_WORKS.map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? "20px" : "6px",
              height: "3px",
              borderRadius: "1px",
              background: i === index ? "#fff" : "rgba(255,255,255,0.25)",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
};

// ── section wrapper ─────────────────────────────────────────────────────────
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

        <StepCarousel />
      </div>
    </DarkSection>
  );
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


//measurable impact section


const IMPACT_CASES = [
  {
    tag: "LOGISTICS",
    stat: "+47%",
    label: "Faster Dispatch Turnaround",
    client: "Meridian Freight Co.",
    desc: "Deployed an AI agent to triage incoming freight requests and auto-assign drivers, cutting manual dispatch review to minutes.",
    color: "#22d3ee",
    barPct: 47,
  },
  {
    tag: "FINTECH",
    stat: "-58%",
    label: "Drop in Manual Reconciliation Hours",
    client: "Ledgerly Financial",
    desc: "Automated cross-ledger transaction matching, removing the weekly reconciliation backlog their finance team used to run by hand.",
    color: "#f59e0b",
    barPct: 58,
  },
  {
    tag: "HOSPITALITY",
    stat: "+31%",
    label: "Increase in Booking Completion",
    client: "Aurelia Stays",
    desc: "Connected their booking engine, PMS, and channel manager into one system, replacing manual re-entry across three platforms with a single source of truth.",
    color: "#10b981",
    barPct: 31,
  },
];

// ── Odometer digit (rolls 0→9 strip into place, compositor-friendly transform only) ──
const OdometerDigit = ({ digit, active, delay }: { digit: string; active: boolean; delay: number }) => {
  if (!/[0-9]/.test(digit)) {
    return (
      <span
        style={{
          display: "inline-block",
          height: "1em",
          lineHeight: 1,
          verticalAlign: "bottom",
          opacity: active ? 1 : 0,
          transition: `opacity 0.3s ease ${delay}ms`,
        }}
      >
        {digit}
      </span>
    );
  }
  const target = parseInt(digit, 10);
  return (
    <span style={{ display: "inline-block", height: "1em", lineHeight: 1, overflow: "hidden", verticalAlign: "bottom" }}>
      <span
        style={{
          display: "block",
          transform: active ? `translateY(-${target}em)` : "translateY(0em)",
          transition: `transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        }}
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span key={n} style={{ display: "block", lineHeight: 1, height: "1em" }}>{n}</span>
        ))}
      </span>
    </span>
  );
};

// ── One impact card: border trace-in + odometer stat + fill bar ──
const ImpactCard = ({ item, index }: { item: (typeof IMPACT_CASES)[number]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();   // ← add this
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const ro = new ResizeObserver((entries) => {
      //const r = entries[0].contentRect;
      setDims({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;

    const enterObserver = new IntersectionObserver(
      ([entry]) => {
        if (isMobile) {
          if (entry.intersectionRatio >= 0.7) setActive(true);
        } else {
          if (entry.isIntersecting) setActive(true);
        }
      },
      isMobile
        ? { threshold: [0, 0.7, 1] }
        : { threshold: 0, rootMargin: "-50% 0px -50% 0px" }
    );

    const exitObserver = new IntersectionObserver(
      ([entry]) => {
        if (isMobile) {
          if (entry.intersectionRatio < 0.15) setActive(false);
        } else {
          if (!entry.isIntersecting) setActive(false);
        }
      },
      isMobile
        ? { threshold: [0, 0.15, 1] }
        : { threshold: 0, rootMargin: "-35% 0px -35% 0px" }
    );

    enterObserver.observe(el);
    exitObserver.observe(el);
    return () => {
      enterObserver.disconnect();
      exitObserver.disconnect();
    };
  }, [isMobile]);

  useEffect(() => {
    if (!active) {
      setTraceProgress(0); // reset so re-entry always redraws from 0, not from wherever it left off
      return;
    }
    const DURATION = 900;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      setTraceProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  const chars = item.stat.split("");

  return (
    <div
      ref={cardRef}
      className="flex flex-col gap-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "clamp(1.6rem, 3vw, 2.2rem)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "6px",
        background: "rgba(255,255,255,0.015)",
        opacity: active ? 1 : 0,
        transform: active ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "6px",
          pointerEvents: "none",
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.14), rgba(255,255,255,0.03) 55%, transparent 75%)",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          zIndex: 0,
        }}
      />
      {dims.w > 0 && (
        <svg
          shapeRendering="crispEdges"
          style={{ position: "absolute", top: 0, left: 0, width: `${dims.w}px`, height: `${dims.h}px`, pointerEvents: "none", overflow: "visible", zIndex: 2 }}
        >
          <path d={buildTracePath(dims.w, dims.h, 1)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <path
            d={buildTracePath(dims.w, dims.h, traceProgress)}
            fill="none"
            stroke="rgba(255,255,255,0.9)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.55))", // constant string — no per-frame filter rebuild
              opacity: traceProgress > 0 && traceProgress < 1 ? 1 : 0,
              transition: "opacity 0.4s ease 0.4s",
            }}
          />
        </svg>
      )}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
        <span
          className="uppercase tracking-widest text-xs"
          style={{
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.18em",
            background: "rgba(255,255,255,0.45)",
            borderRadius: "2px",
            padding: "4px 8px",
            width: "fit-content",
          }}
        >
          {item.tag}
        </span>

        <div
          className="font-bold"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
            color: item.color,
            letterSpacing: "-0.03em",
            fontVariantNumeric: "tabular-nums",
            lineHeight: 1,          // ← add this
            display: "flex",
          }}
        >
          {chars.map((c, i) => (
            <OdometerDigit key={i} digit={c} active={active} delay={i * 70} />
          ))}
        </div>

        <p className="font-semibold" style={{ fontSize: "0.95rem", color: "#ffffff" }}>{item.label}</p>

        <div style={{ width: "100%", height: "2px", background: "rgba(255,255,255,0.1)", borderRadius: "1px", overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              width: active ? `${item.barPct}%` : "0%",
              background: item.color,
              transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${300 + index * 120}ms`,
            }}
          />
        </div>

        <div style={{ marginTop: "0.4rem" }}>
          <h4 className="font-semibold" style={{ fontSize: "1rem", color: "#ffffff", marginBottom: "0.4rem" }}>{item.client}</h4>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{item.desc}</p>
        </div>
      </div>
    </div>
  );
};

// ── Section wrapper — same pattern as ServicesSection / HowItWorksSection ──
const ImpactSection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => setContentH(contentRef.current?.offsetHeight ?? 0));
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  return (
    <DarkSection id="measurable-impact" className="flex flex-col" minHeight>
      <TopTape />
      <DotGrid contentBottom={contentH / 1.02} animate={false} />
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1"
        style={{ position: "relative", zIndex: 1, paddingTop: "clamp(3rem, 7.5vh, 6rem)", paddingBottom: "clamp(3rem, 7.5vh, 6rem)" }}
      >
        <p className="mb-3 uppercase tracking-widest text-xs" style={{ color: "#000000", fontWeight: 700, letterSpacing: "0.2em", background: "rgba(255,255,255,0.45)", borderRadius: "2px", padding: "4px 8px", width: "fit-content" }}>
          Proven
        </p>
        <h2 className="font-bold" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em", marginBottom: "0.6rem" }}>
          Numbers behind the noise.
        </h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", marginBottom: "clamp(2rem, 5vh, 4rem)", maxWidth: "34rem" }}>
          Outcomes we can point to, not case studies we polish.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "clamp(1.5rem, 4vw, 2rem)" }}>
          {IMPACT_CASES.map((item, i) => (
            <ImpactCard key={item.client} item={item} index={i} />
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
        <ImpactSection />
        <ContactSection />
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}