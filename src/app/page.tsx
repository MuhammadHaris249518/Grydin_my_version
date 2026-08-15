"use client";
import { createContext, useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu, X, ArrowRight, Zap, Brain, Plug, Repeat, Layers, Code,
  ShieldCheck, Gauge, Share2, FileText, MonitorSmartphone, Database,
  Cloud, BrainCircuit, ScanText, SlidersHorizontal, Link2, RefreshCw, Braces, Target, AlertTriangle, Crosshair, Workflow, Puzzle, Rocket,
} from "lucide-react";
import { useTypewriter } from "./globalscope/typewriter";
import DotGrid from "./globalscope/DotGrid";
import Navbar, { NAVBAR_TOP_OFFSET } from "./globalscope/Navbar";
import { CollabsMarquee } from "./globalscope/CollabsMarquee";
import { AccentWord } from "./globalscope/AccentWord";
import { BRAND_ACCENT, brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";
import { DARK_PAGE_BG, DARK_SECTION_BG, LIGHT_PAGE_BG } from "@/lib/theme";

const SERVICES = [
  {
    icon: <Zap size={28} strokeWidth={1.4} />,
    title: "AI Agents",
    desc: "Autonomous agents that think, decide, and act – handling complex tasks end-to-end without human intervention.",
  },
  {
    icon: <Repeat size={28} strokeWidth={1.4} />,
    title: "Workflow Automation",
    desc: "We map the gaps between your tools, teams, and decisions – then automate them. No migration. No disruption.",
  },
  {
    icon: <Brain size={28} strokeWidth={1.4} />,
    title: "AI Integration",
    desc: "From document processing to decision engines – fine-tuned models deployed directly into your existing business logic.",
  },
  {
    icon: <Layers size={28} strokeWidth={1.4} />,
    title: "Custom Software",
    desc: "Built around how your business actually works. No templates, no off-the-shelf fixes – just the right system for your exact problem.",
  },
  {
    icon: <Plug size={28} strokeWidth={1.4} />,
    title: "System Integration",
    desc: "Connect your entire stack – APIs, platforms, databases – into one coherent, automated operation.",
  },
  {
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
    desc: "We map your workflow end to end – every gap, bottleneck, and hidden process costing you time. Nothing gets built until we know what's broken.",
    points: [
      { icon: <Target size={18} strokeWidth={1.6} />, title: "Process Discovery", desc: "We uncover how work really flows across your team." },
      { icon: <AlertTriangle size={18} strokeWidth={1.6} />, title: "Gap & Bottleneck Analysis", desc: "We find what's slowing you down — and why." },
      { icon: <Crosshair size={18} strokeWidth={1.6} />, title: "Data & System Audit", desc: "We audit systems, data, and integrations in depth." },
    ],
  },
  {
    step: "02",
    title: "Design",
    tagline: "ARCHITECT WITH INTENT.",
    desc: "We scope only what moves the needle. No bloat, no unnecessary complexity. You see the exact plan before anything is built.",
    points: [
      { icon: <Target size={18} strokeWidth={1.6} />, title: "Solution Architecture", desc: "Scalable architecture tailored to your goals." },
      { icon: <Workflow size={18} strokeWidth={1.6} />, title: "Workflow Blueprint", desc: "Every step, condition, and integration mapped." },
      {
        icon: <ShieldCheck size={18} strokeWidth={1.6} />,
        title: "Integrations & Reliability",
        desc: "Tools unified in one secure, observable ecosystem.",
      },
    ],
  },
  {
    step: "03",
    title: "Deploy",
    tagline: "AUTOMATE. INTEGRATE. DELIVER.",
    desc: "We ship fast, integrate quietly, and hand off docs your team can actually use. The system runs quietly – you notice it in the results.",
    points: [
      { icon: <Rocket size={18} strokeWidth={1.6} />, title: "Seamless Deployment", desc: "Automated delivery with zero disruption or downtime." },
      { icon: <Link2 size={18} strokeWidth={1.6} />, title: "Deep Integrations", desc: "Your daily tools connected — all working together." },
      { icon: <FileText size={18} strokeWidth={1.6} />, title: "Full Documentation", desc: "Clear guides so your team stays independent." },
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

// ── Dark section wrapper ──────────────────────────────────────────────────────
const DarkSection = ({
  children,
  id,
  className = "",
  autoHeight = false,
  minHeight = false,
  fitViewport = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  autoHeight?: boolean;
  minHeight?: boolean;
  fitViewport?: boolean;
}) => (
  <section
    id={id}
    className={`relative w-full ${className}`}
    style={{
      height: fitViewport ? "100dvh" : autoHeight ? "auto" : minHeight ? "auto" : "100vh",
      minHeight: fitViewport ? undefined : minHeight ? "100vh" : undefined,
      maxHeight: fitViewport ? "100dvh" : undefined,
      background: DARK_SECTION_BG,
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
    art: "/images/hero/slide-01-desktop.png", artMobile: "/images/hero/slide-01-mobile.png",
    service: "AI Agents",
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
    art: "/images/hero/slide-02-desktop.png", artMobile: "/images/hero/slide-02-mobile.png",
    service: "Workflow Automation",
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
    art: "/images/hero/slide-03-desktop.png", artMobile: "/images/hero/slide-03-mobile.png",
    service: "Full-Stack Development",
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
    art: "/images/hero/slide-04-desktop.png", artMobile: "/images/hero/slide-04-mobile.png",
    service: "Custom Software",
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
    art: "/images/hero/slide-05-desktop.png", artMobile: "/images/hero/slide-05-mobile.png",
    service: "AI Integration",
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
    art: "/images/hero/slide-06-desktop.png", artMobile: "/images/hero/slide-06-mobile.png",
    service: "System Integration",
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
          background: "rgba(255,255,255,0.05)", border: `1px solid ${brandAccentHexAlpha(0.33)}`,
          color: BRAND_ACCENT, display: "flex", alignItems: "center", justifyContent: "center",
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
                <span style={{ color: BRAND_ACCENT }}>{current.titleColor}</span>
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

  // ── MOBILE: content first, image at the end ──
  return (
    <div ref={containerRef} className="w-full flex flex-col items-center" style={{ marginTop: "clamp(2rem, 6vh, 4rem)", gap: "1.2rem" }}>
      <div key={`head-${index}`} style={{ width: "100%", textAlign: "center", padding: "0 0.25rem", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <h3 style={{ fontSize: "clamp(1.4rem, 6vw, 1.8rem)", fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }}>
          <span style={{ color: "#fff" }}>{current.titleWhite}</span>
          <span style={{ color: BRAND_ACCENT }}>{current.titleColor}</span>
        </h3>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", marginTop: "0.4rem", marginBottom: 0 }}>{current.tagline}</p>
      </div>

      <div key={`body-${index}`} style={{ width: "100%", padding: "0 0.25rem", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", textAlign: "center", marginBottom: "1.2rem" }}>{current.subheading}</p>
        <PointsList current={current} />
      </div>

      <div style={{ width: "100%" }}>
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

      <div style={{ width: "100%" }}>
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

const ScrollCue = ({ visible, cueRef }: { visible: boolean; cueRef: React.RefObject<HTMLDivElement | null> }) => (
  <div
    ref={cueRef}
    style={{
      position: "absolute",
      bottom: "65px",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "6px",
      opacity: visible ? 1 : 0,
      transition: "opacity 1s ease 0.3s",
    }}
  >
    <span style={{
      fontSize: "0.62rem",
      fontWeight: 700,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "rgba(255,255,255,0.35)",
    }}>
      Scroll
    </span>
    <div style={{ position: "relative", width: "14px", height: "22px" }}>
      <svg width="14" height="22" viewBox="0 0 14 22" style={{ position: "absolute", inset: 0 }}>
        <rect x="1" y="1" width="12" height="20" rx="6" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
      </svg>
      <span style={{
        position: "absolute",
        left: "50%",
        top: "5px",
        width: "3px",
        height: "5px",
        borderRadius: "2px",
        background: "rgba(255,255,255,0.7)",
        transform: "translateX(-50%)",
        animation: "scrollCueDrop 1.8s ease-in-out infinite",
      }} />
    </div>
    <style jsx>{`
      @keyframes scrollCueDrop {
        0% { opacity: 0; transform: translate(-50%, 0px); }
        30% { opacity: 1; }
        80% { opacity: 0; transform: translate(-50%, 9px); }
        100% { opacity: 0; transform: translate(-50%, 9px); }
      }
    `}</style>
  </div>
);

// ── Hero Section ──────────────────────────────────────────────────────────────

const HeroSection = () => {
  const pathname = usePathname();
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = useState(0);
  const isMobile = useIsMobile();
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const [showCue, setShowCue] = useState(false);

  const BOTTOM_GAP = 65;   // must match ScrollCue's own `bottom` value
  const SAFE_BUFFER = 40;  // real clearance required between button and cue

  useEffect(() => {
    const measure = () => {
      if (!ctaRef.current) return;
      const btnRect = ctaRef.current.getBoundingClientRect();
      const cueHeight = cueRef.current?.offsetHeight ?? 50;
      const viewportH = window.innerHeight;

      const cueTop = viewportH - BOTTOM_GAP - cueHeight;
      setShowCue(cueTop > btnRect.bottom + SAFE_BUFFER);
    };
    measure();
    const t = setTimeout(measure, 50);
    window.addEventListener("resize", measure, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);
  const REVEAL_DURATION = 650;
  const TYPE_START = 380;

  const [revealed, setRevealed] = useState(false);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    setRevealed(false);
    setStartTyping(false);
    const t1 = requestAnimationFrame(() => setRevealed(true));
    const t2 = setTimeout(() => setStartTyping(true), TYPE_START);
    return () => { cancelAnimationFrame(t1); clearTimeout(t2); };
  }, [pathname]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.playbackRate = 0.4;
    const play = () => { v.play().catch(() => { }); };
    if (v.readyState >= 2) play();
    else v.addEventListener("loadeddata", play, { once: true });
    const handler = () => {
      if (v.duration && v.currentTime > v.duration - 0.15) v.currentTime = 0;
    };
    v.addEventListener("timeupdate", handler);
    return () => v.removeEventListener("timeupdate", handler);
  }, [pathname]);
  useEffect(() => {
    if (!contentRef.current) return;
    const ro = new ResizeObserver(() => {
      setContentH(contentRef.current?.offsetHeight ?? 0);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, []);

  const { displayed: typed, ref: typeRef } = useTypewriter(startTyping ? "Grid the unseen" : "");
  return (
    <DarkSection id="hero" className="flex flex-col" fitViewport>
      <div style={{ height: `${NAVBAR_TOP_OFFSET}px`, flexShrink: 0 }} />
      <DotGrid contentBottom={contentH / 1.04} animate={false} />

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 42%, rgba(137,145,64,0.07) 0%, transparent 62%), radial-gradient(ellipse 90% 60% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)",
          opacity: revealed ? 1 : 0,
          transition: `opacity ${REVEAL_DURATION}ms ease`,
        }}
      />

      <video
        key={pathname}
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          pointerEvents: "none",
          transform: "scaleY(-1)",
          opacity: revealed ? 0.38 : 0,
          transition: `opacity ${REVEAL_DURATION}ms ease`,
        }}
      >
        <source src="/videos/landing-bg-video.webm" type="video/webm" />
        <source src="/videos/landing-bg-video.mp4" type="video/mp4" />
      </video>

      {/* Text content – padded, centred */}
      <div
        className={`flex flex-col text-center items-center ${isMobile ? "hero-content-mobile justify-start px-3" : "justify-center px-6"}`}
        ref={contentRef}
        style={{
          flex: 1,
          minHeight: 0,
          position: "relative",
          zIndex: 1,
          paddingTop: isMobile ? "clamp(1rem, 8dvh, 3rem)" : undefined,
          paddingBottom: isMobile ? "2rem" : undefined,
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(18px)",
          filter: revealed ? "blur(0px)" : "blur(10px)",
          transition: `opacity ${REVEAL_DURATION}ms cubic-bezier(0.16,1,0.3,1), transform ${REVEAL_DURATION}ms cubic-bezier(0.16,1,0.3,1), filter ${REVEAL_DURATION}ms cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        <p
          className={`mb-4 tracking-widest uppercase text-xs font-medium ${isMobile ? "hero-eyebrow-mobile" : ""}`}
          style={{
            color: "#000000",
            fontWeight: 700,
            letterSpacing: "0.22em",
            background: "rgba(255,255,255,0.45)",
            borderRadius: "2px",
            padding: "4px 8px",
          }}
        >
          {isMobile ? (
            <>
              WE GRID WHAT YOUR
              <br />
              BUSINESS OVERLOOKS
            </>
          ) : (
            "We grid what your business overlooks"
          )}
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
            textAlign: isMobile ? "center" : "justify",
          }}
        >
          Businesses don&apos;t have an execution problem. They have a{" "}
          <AccentWord>visibility</AccentWord> problem. Work piles up in the gaps
          between tools, teams, and decisions – repetitive, complex, and invisible.
          GrydIn maps those gaps and automates them.
        </p>

        <a
          ref={ctaRef}
          href="/contact"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "11px 26px",
            background: "white",
            color: "#000000",
            fontWeight: 600,
            fontSize: "0.85rem",
            borderRadius: "2px",
            letterSpacing: "0.04em",
            textDecoration: "none",
            width: "fit-content",
            transition: "gap 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s",
            boxShadow: "0 0 0 0 transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.gap = "12px";
            e.currentTarget.style.background = "#111111";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.boxShadow = `0 0 24px ${brandAccentAlpha(0.25)}`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.gap = "8px";
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#000000";
            e.currentTarget.style.boxShadow = "0 0 0 0 transparent";
          }}
        >
          Grid Your Vision <ArrowRight size={14} strokeWidth={2.2} />
        </a>
      </div>
      {isMobile && showCue && <ScrollCue visible={revealed} cueRef={cueRef} />}
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

  return (
    <DarkSection id="services" className="flex flex-col" minHeight>
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
          className="font-bold section-heading-nowrap"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "clamp(1rem, 4vh, 4rem)",
          }}
        >
          Six ways we grid the unseen.
        </h2>
        <HeroImageSlider />
      </div>
    </DarkSection>
  );
};
const STEP_IMAGES = [
  { art: "/images/steps/diagnose-desktop.png", artMobile: "/images/steps/diagnose-mobile.png", alt: "Diagnose art" },
  { art: "/images/steps/design-desktop.png", artMobile: "/images/steps/design-mobile.png", alt: "Design art" },
  { art: "/images/steps/deploy-desktop.png", artMobile: "/images/steps/deploy-mobile.png", alt: "Deploy art" },
];
const STEP_SLIDE_DURATION = 8500;
const STEP_HOLD_THRESHOLD = 400;

const StepArtImage = ({
  src,
  alt,
  aspect,
  held,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  src: string;
  alt: string;
  aspect: string;
  held: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}) => (
  <div
    onPointerDown={onPointerDown}
    onPointerUp={onPointerUp}
    onPointerLeave={onPointerLeave}
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
    <img
      key={src}
      src={src}
      alt={alt}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "contain",
        animation: "heroFadeIn 1.1s cubic-bezier(0.4,0,0.2,1) forwards",
        filter: held ? "brightness(1.05)" : "none",
        transition: "filter 0.3s ease",
      }}
    />
    {held && (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          border: "2px solid rgba(255,255,255,0.55)",
        }}
      />
    )}
    <style jsx>{`
      @keyframes heroFadeIn {
        from { opacity: 0; transform: scale(1.04); }
        to { opacity: 1; transform: scale(1); }
      }
    `}</style>
  </div>
);

const StepSlide = ({
  item,
  image,
  mobileAspect,
  isMobile,
  held,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: {
  item: (typeof HOW_IT_WORKS)[number];
  image: string;
  mobileAspect: string;
  isMobile: boolean;
  held: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
}) => {
  const PointsList = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {item.points.map((pt, i) => (
        <div key={pt.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none", paddingTop: i > 0 ? "1rem" : 0 }}>
          <div style={{
            flexShrink: 0, width: "32px", height: "32px", borderRadius: "6px",
            background: "rgba(255,255,255,0.05)", border: `1px solid ${brandAccentAlpha(0.35)}`,
            color: brandAccentAlpha(0.9), display: "flex", alignItems: "center", justifyContent: "center",
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
        <div key={item.step} style={{ display: "flex", flexDirection: "column", gap: "1.2rem", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
          <div>
            <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
              STEP {item.step}
            </span>
            <h3 style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)", color: "#ffffff", fontWeight: 700, letterSpacing: "-0.02em", margin: "0.3rem 0" }}>
              {item.title}
            </h3>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.15em", color: brandAccentAlpha(0.85), textTransform: "uppercase", margin: 0 }}>
              {item.tagline}
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginTop: "1rem" }}>
              {item.desc}
            </p>
          </div>
          <PointsList />
        </div>
        <StepArtImage
          src={image}
          alt={item.title}
          aspect="16 / 13"
          held={held}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        />
      </div>
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.1rem", width: "100%", minWidth: 0 }}>
      <div key={`head-${item.step}`} style={{ width: "100%", textAlign: "center", padding: "0 0.25rem", animation: "heroTextIn 0.6s cubic-bezier(0.4,0,0.2,1)" }}>
        <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
          STEP {item.step}
        </span>
        <h3 style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: 600, letterSpacing: "-0.01em", margin: "0.3rem 0" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", color: brandAccentAlpha(0.85), textTransform: "uppercase", margin: 0 }}>
          {item.tagline}
        </p>
      </div>

      <div className="step-mobile-body" style={{ width: "100%", padding: "0 0.25rem" }}>
        <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, textAlign: "center", marginBottom: "1.2rem" }}>
          {item.desc}
        </p>
        <PointsList />
      </div>

      <div style={{ width: "100%" }}>
        <StepArtImage
          src={image}
          alt={item.title}
          aspect={mobileAspect}
          held={held}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
        />
      </div>
      <style jsx>{`
        @keyframes heroTextIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

// ── carousel orchestrator ───────────────────────────────────────────────────
const StepCarousel = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);
  const [hasEnteredView, setHasEnteredView] = useState(false);

  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || hasEnteredView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasEnteredView]);

  const goTo = (next: number) => {
    setIndex(next);
    setHeld(false);
    pausedElapsedRef.current = 0;
  };

  const advance = () => goTo((index + 1) % HOW_IT_WORKS.length);

  useEffect(() => {
    if (held || !hasEnteredView) return;
    startRef.current = performance.now() - pausedElapsedRef.current;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / STEP_SLIDE_DURATION, 1);
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

  const handlePointerDown = () => {
    isPointerDownRef.current = true;
    holdTimerRef.current = setTimeout(() => {
      if (!isPointerDownRef.current) return;
      cancelAnimationFrame(rafRef.current);
      pausedElapsedRef.current = performance.now() - startRef.current;
      setHeld(true);
    }, STEP_HOLD_THRESHOLD);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
    if (!held) {
      cancelAnimationFrame(rafRef.current);
      advance();
    }
  };

  const handlePointerLeave = () => {
    isPointerDownRef.current = false;
    if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
  };

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
        width: "100%",
        maxWidth: isMobile ? "100%" : "1500px",
        overflow: "hidden",
      }}>
        <div
          style={{
            display: "flex",
            width: `${HOW_IT_WORKS.length * 100}%`,
            transform: `translateX(-${(index * 100) / HOW_IT_WORKS.length}%)`,
            transition: "transform 700ms cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} style={{ flex: `0 0 ${100 / HOW_IT_WORKS.length}%` }}>
              <StepSlide
                item={item}
                image={isMobile ? STEP_IMAGES[i].artMobile : STEP_IMAGES[i].art}
                mobileAspect="16 / 16"
                isMobile={isMobile}
                held={held && i === index}
                onPointerDown={handlePointerDown}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerLeave}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: isMobile ? "100%" : "min(90vw, 1500px)" }}>
        <div style={{ display: "flex", gap: "5px", width: "100%" }}>
          {HOW_IT_WORKS.map((_, i) => (
            <div
              key={i}
              onClick={() => { cancelAnimationFrame(rafRef.current); pausedElapsedRef.current = 0; goTo(i); }}
              style={{ flex: 1, height: "2px", borderRadius: "1px", background: "rgba(255,255,255,0.15)", overflow: "hidden", cursor: "pointer" }}
            >
              <div style={{
                height: "100%",
                width: i < index ? "100%" : i === index ? `${progress * 100}%` : "0%",
                background: held && i === index ? "#fff" : "rgba(255,255,255,0.75)",
              }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── section wrapper ─────────────────────────────────────────────────────────
const HowItWorksSection = () => {
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

  return (
    <DarkSection id="how-it-works" className="flex flex-col" minHeight>
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
          className="font-bold section-heading-nowrap"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#ffffff",
            letterSpacing: "-0.025em",
            marginBottom: "clamp(1rem, 4vh, 4rem)",
          }}
        >
          Three steps to the unseen.
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

  return (
    <DarkSection id="why-gridin" className="flex flex-col" minHeight>
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

function buildTracePath(W: number, H: number, progress: number) {
  if (!W || !H) return "";
  const perimeter = 2 * (W + H);
  const dist = progress * perimeter;
  const topRight = W / 2;
  const branch = (d: number, dir: "right" | "left") => {
    const sign = dir === "right" ? 1 : -1;
    let path = `M ${W / 2} 0`;
    if (d <= topRight) path += ` L ${W / 2 + sign * d} 0`;
    else if (d <= topRight + H) {
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
  return `${branch(dist / 2, "right")} ${branch(dist / 2, "left")}`;
}

const IMPACT_CASES = [
  {
    tag: "LOGISTICS",
    stat: "+47%",
    label: "Faster Dispatch Turnaround",
    client: "Meridian Freight Co.",
    desc: "Deployed an AI agent to triage incoming freight requests and auto-assign drivers, cutting manual dispatch review to minutes.",
    barPct: 47,
  },
  {
    tag: "FINTECH",
    stat: "-58%",
    label: "Drop in Manual Reconciliation Hours",
    client: "Ledgerly Financial",
    desc: "Automated cross-ledger transaction matching, removing the weekly reconciliation backlog their finance team used to run by hand.",
    barPct: 58,
  },
  {
    tag: "HOSPITALITY",
    stat: "+31%",
    label: "Increase in Booking Completion",
    client: "Aurelia Stays",
    desc: "Connected their booking engine, PMS, and channel manager into one system, replacing manual re-entry across three platforms with a single source of truth.",
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
  const hasAnimatedRef = useRef(false);
  const [traceProgress, setTraceProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const ro = new ResizeObserver(() => {
      setDims({ w: Math.round(el.clientWidth), h: Math.round(el.clientHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!cardRef.current || hasAnimatedRef.current) return;
    const el = cardRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        setActive(true);
        observer.disconnect();
      },
      isMobile ? { threshold: 0.35 } : { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (!active) return;
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
            color: BRAND_ACCENT,
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
              background: BRAND_ACCENT,
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
      <DotGrid contentBottom={contentH / 1.02} animate={false} />
      <div
        ref={contentRef}
        className="max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col justify-center flex-1"
        style={{ position: "relative", zIndex: 1, paddingTop: "clamp(3rem, 7.5vh, 6rem)", paddingBottom: "clamp(3rem, 7.5vh, 6rem)" }}
      >
        <p className="mb-3 uppercase tracking-widest text-xs" style={{ color: "#000000", fontWeight: 700, letterSpacing: "0.2em", background: "rgba(255,255,255,0.45)", borderRadius: "2px", padding: "4px 8px", width: "fit-content" }}>
          Proven
        </p>
        <h2 className="font-bold section-heading-nowrap" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: "#ffffff", letterSpacing: "-0.025em", marginBottom: "0.6rem" }}>
          Numbers behind the noise.
        </h2>
        <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", marginBottom: "clamp(1.5rem, 4vh, 3rem)", maxWidth: "34rem" }}>
        <AccentWord>Outcomes</AccentWord> we can point to, drawn from recent case studies.
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
      <DotGrid contentBottom={contentH / 1.12} animate={false} />
      <div
        className="flex-1 max-w-5xl mx-auto w-full px-6 md:px-12 flex flex-col md:flex-row gap-16 justify-center md:justify-between items-center"
        ref={contentRef}
        style={{
          paddingTop: "clamp(2.5rem, 6vh, 5rem)",
          paddingBottom: "clamp(2.5rem, 6vh, 5rem)",
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
            See a <AccentWord>gap</AccentWord> worth closing?
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

    </DarkSection>
  )
};

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
      <main style={{ background: LIGHT_PAGE_BG, overflowX: "hidden" }}>
        <Navbar />
        <div style={{ background: DARK_PAGE_BG }}>
          <HeroSection />
          <CollabsMarquee />
          <ServicesSection />
          <HowItWorksSection />
          <ImpactSection />
          <ContactSection />
        </div>
      </main>
    </TapeCtx.Provider>
  );
}