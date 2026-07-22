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
    //desc: "We map your workflow end to end – every gap, bottleneck, and invisible process costing you time. Nothing gets built until we understand exactly what's broken.",
  },
  {
    step: "02",
    title: "Design",
    //desc: "We scope only what moves the needle. No bloated proposals, no unnecessary complexity. You see the exact plan before a single line of code is written.",
  },
  {
    step: "03",
    title: "Deploy",
    //desc: "We ship fast, integrate quietly, and hand off documentation your team can actually use. The system runs in the background. You barely notice – except in the results.",
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

const FooterTape = () => {
  const { tapeHSlow: tapeH, arcRSlow: arcR } = useTape();
  const VB_W = 1920;
  const VB_H = 140;

  return (
    <div style={{ position: "relative", width: "100%", height: `${tapeH}px`, flexShrink: 0 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        preserveAspectRatio="none"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id="footertape-left" y1="70" x2="941.3" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopOpacity="0.2" />
            <stop offset="1" />
          </linearGradient>
          <linearGradient id="footertape-right" x1="900.68" y1="70" x2="1920" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" />
            <stop offset="0.18" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#fff" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polygon points="902.67 70 939.31 70 900.68 140 0 140 0 0 941.3 0 902.67 70" fill="url(#footertape-left)" />
        <polygon points="1920 0 1920 140 900.68 140 939.31 70 902.67 70 941.3 0 1920 0" fill="url(#footertape-right)" />
      </svg>

      {/* Logo + wordmark + copyright — sits on the LEFT (black gradient), so white */}
      <div
        style={{
          position: "absolute",
          top: `${arcR * 0.55}px`,
          left: "clamp(2rem, 4.3vw, 55px)",
          height: `${arcR}px`,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          zIndex: 1,
        }}
      >
        <img
          src="/logowhite.png"
          alt="GrydIn"
          width={12}
          height={12}
          style={{ objectFit: "contain" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 123.86 30.24"
          role="img"
          aria-label="GrydIn"
          style={{ height: "12px", width: "auto", display: "block", marginTop: "1px" }}
        >
          <defs>
            <linearGradient id="footer-logo-gradient-1" x1="99.59" y1="13.45" x2="99.59" y2="13.34" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#e6e6e6" />
              <stop offset="1" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path d="M99.59,13.34a.45.45,0,0,1,0,.11s0-.08,0-.11Z" fillRule="evenodd" fill="url(#footer-logo-gradient-1)" />
          <path d="M102,5.66a.28.28,0,0,1,0,.13.28.28,0,0,0,0-.13c0-1,0-2,0-3C102,3.67,102,4.67,102,5.66Z" fillRule="evenodd" fill="#ffffff" />
          <path d="M27.78,18.82c0,.92,0,1.83,0,2.75-.19,2.31-2.55,3.16-4.58,2.92a.16.16,0,0,1-.06-.13V15.62c0-.12,0-.23,0-.35a2.17,2.17,0,0,1,0-.26.17.17,0,0,0,.16-.06,3.55,3.55,0,0,1,1.18-1.65l.08-.08c.32-.37,3.16-2.61,3.2-2.73a.15.15,0,0,1,.05.13c0,1.32,0,2.63,0,3.94V15.8c0,.54,0,1.07,0,1.6Z" fillRule="evenodd" fill="#ffffff" />
          <path d="M51.59,13.13a.41.41,0,0,0-.1.14A.33.33,0,0,1,51.59,13.13Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M27.28,0H18q-3,0-6,0C2.84.65-3.14,10.71,1.74,18.83a12.47,12.47,0,0,0,4.35,4.25,11.32,11.32,0,0,0,2.23,1,7.54,7.54,0,0,0,1.13.3c2.2.42,4.65.15,6.89.24.32,0,.43-.12.61-.34.88-1.07,1.76-2.14,2.65-3.2.07-.06.28-.29,0-.28q-3.81,0-7.62,0a9.44,9.44,0,0,1-1.91-.34,8,8,0,0,1-2.81-1.56,8.4,8.4,0,0,1-2.51-4A8.88,8.88,0,0,1,12.84,3.76H23.5A2.54,2.54,0,0,0,25.28,3c.8-.94,1.6-1.87,2.41-2.79a.11.11,0,0,0,0-.13A1.63,1.63,0,0,0,27.28,0ZM14.59.29a.11.11,0,0,1-.1-.06.08.08,0,0,1,.09,0h.3a.08.08,0,0,0-.07,0,.14.14,0,0,0,.12.06C14.82.3,14.7.29,14.59.29Zm1.56,0h0Zm.59-.12a.71.71,0,0,1-.38,0l.34,0c.15,0,.29,0,.42.06Zm8,0H22.06A.24.24,0,0,1,22.28.1h2.5C24.92.14,24.92.17,24.77.19Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M14.93.29c-.11,0-.23,0-.34,0a.11.11,0,0,1-.1-.06.08.08,0,0,1,.09,0h.3a.08.08,0,0,0-.07,0A.14.14,0,0,0,14.93.29Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M92.57,0H88.22a.22.22,0,0,0-.2.08q0,3.54,0,7.08a.62.62,0,0,1-.07.33.83.83,0,0,1-.34.07H80.78A9.5,9.5,0,0,0,76.2,8.75,7.72,7.72,0,0,0,73.09,12c-1.7,3.42-1.19,8.08,1.86,10.59a8.73,8.73,0,0,0,4.72,2c.37,0,.74.06,1.11.07h6.38a5.67,5.67,0,0,0,4.58-2,5,5,0,0,0,1-2.85q0-9.81,0-19.62A.21.21,0,0,0,92.57,0ZM84.29,21.11c-1.22,0-2.43,0-3.64,0a4.1,4.1,0,0,1-3.79-4.18c-.12-2.19.14-4.11,2.19-5.29a4.81,4.81,0,0,1,1.82-.51H88a.11.11,0,0,1,.06.11c0,1.76,0,3.52,0,5.28,0,.53,0,1.06,0,1.59a3.26,3.26,0,0,1-.58,1.49A3.89,3.89,0,0,1,84.29,21.11Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M72.87,7.73q-6.7,10-13.32,20.08a6.21,6.21,0,0,1-1.29,1.32,5.6,5.6,0,0,1-2.78,1.05c-1.1.1-2.38,0-3.5,0q-.1-.06,0-.18l.31-.44c1.45-2,2.88-3.94,4.29-5.92a1.08,1.08,0,0,0-.11-1.31c-1.14-1.71-2.26-3.42-3.38-5.13-.71-1.07-1.42-2.13-2.12-3.2L46.65,7.61a.09.09,0,0,1,.09-.05c1.61,0,3.27,0,4.88,0a13.17,13.17,0,0,1,1.56,2.1c.69,1,1.37,1.95,2,2.92q2,2.84,4,5.68a.69.69,0,0,0,1.23-.08l7.2-10.33a.57.57,0,0,1,.58-.32c1.54,0,3.08,0,4.62,0Q73,7.58,72.87,7.73Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M44.4,11c0,.19-.24.13-.36.14H40a4.81,4.81,0,0,0-.84.1,3.94,3.94,0,0,0-1.68.79l-.09.09a2.59,2.59,0,0,0-.82,1.63c0,3.54,0,7.08,0,10.63,0,.11-.06.16-.18.16H32a.2.2,0,0,1-.19-.09q0-6,0-12.08a5.78,5.78,0,0,1,.38-1.79,5.21,5.21,0,0,1,.89-1.34,5.37,5.37,0,0,1,3.75-1.65h7a1.23,1.23,0,0,1,.38,0C44.52,7.84,44.35,10.46,44.4,11Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M123.85,24.09a.5.5,0,0,1-.13.39,1,1,0,0,1-.3,0H119.6a.21.21,0,0,1-.21-.09c0-3.14,0-6.29,0-9.43v-.09a3.66,3.66,0,0,0-.75-2,3.78,3.78,0,0,0-2.26-1.45,3.18,3.18,0,0,0-.62-.07c-1.64,0-3.28,0-4.92,0a.17.17,0,0,0-.19.09q0,6.33,0,12.66a1.54,1.54,0,0,1,0,.3c-.07.13-.26.12-.39.13h-3.55a1,1,0,0,1-.38-.05.48.48,0,0,1-.11-.38q0-7.89,0-15.78a2.88,2.88,0,0,1,0-.59.12.12,0,0,1,.11,0l1.05,0c3.09,0,6.18,0,9.26,0a7.39,7.39,0,0,1,7.12,6.42,7,7,0,0,1,.08,1.12C123.83,18.18,123.83,21.13,123.85,24.09Z" fill="#ffffff" fillRule="evenodd" />
          <path d="M27.74,10.49c0,.12-2.88,2.36-3.2,2.73l-.08.08A3.55,3.55,0,0,0,23.28,15a.17.17,0,0,1-.16.06,2.83,2.83,0,0,0,0-.77,34.17,34.17,0,0,0-4.74-.11H9.87c-.09,0-.11,0-.07-.1.3-.28.59-.56.9-.83.7-.64,1.39-1.29,2.08-1.94a3.72,3.72,0,0,1,2.81-.78h2.92l8.74,0A4,4,0,0,1,27.74,10.49Z" fillRule="evenodd" fill="#ffffff" />
          <path d="M102.06,19.52V7.11c0-2.25,0-4.5,0-6.75,0-.08,0-.34-.13-.25-.46.39-.92.79-1.36,1.2l-.52.46c-.33.28-.66.56-1,.85-.84.71-1.47,1.08-1.45,2.32V19.6c0,1.59,0,3.17,0,4.75,0,.25.42.14.55.17h3.46a.79.79,0,0,0,.37-.07A39.38,39.38,0,0,0,102.06,19.52Zm-2.48-6.08v-.11h0A.41.41,0,0,0,99.58,13.44Z" fillRule="evenodd" fill="#ffffff" />
        </svg>
        <span
          style={{
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.05em",
            marginLeft: "2px",
          }}
        >
          © {new Date().getFullYear()}
        </span>
      </div>

      {/* Tagline — sits on the RIGHT (white gradient), so black, matching nav links */}
      <div
        style={{
          position: "absolute",
          top: `${arcR * 0.55}px`,
          right: "6.5vw",
          height: `${arcR}px`,
          display: "flex",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
            color: "#0a0a0a",
            fontWeight: 600,
            letterSpacing: "0.06em",
          }}
        >
          Built for the gaps in your business.
        </span>
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

const SLIDE_DURATION = 8500;
const HOLD_THRESHOLD = 400; // ms — below this = tap, above = hold

const HeroImageSlider = () => {
  const isMobile = useIsMobile();
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [held, setHeld] = useState(false);

  const aspectCacheRef = useRef<Record<string, string>>({});
  const [mobileAspect, setMobileAspect] = useState<string>("3 / 4"); // fallback while loading
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const pausedElapsedRef = useRef<number>(0);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPointerDownRef = useRef(false);

  useEffect(() => {
    if (!isMobile) return;
    const src = HERO_IMAGES[index].srcMobile;
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
          aspectRatio: isMobile ? mobileAspect : "16 / 9", // ← was hardcoded "3 / 4"
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
              position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: isMobile ? "contain" : "cover", // ← was always "cover"
              animation: "heroFadeOut 0.9s cubic-bezier(0.4,0,0.2,1) forwards"
            }} />
        )}
        <img key={`in-${index}-${isMobile}`} src={getSrc(index)} alt={HERO_IMAGES[index].service}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: isMobile ? "contain" : "cover", // ← was always "cover"
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

// const TracedBox = ({
//   children,
//   onProgress,
// }: {
//   children: React.ReactNode;
//   onProgress?: (p: number) => void;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [progress, setProgress] = useState(0);
//   const [phase, setPhase] = useState<"tracing" | "holding" | "hidden" | "waiting">("waiting");
//   const [glowOpacity, setGlowOpacity] = useState(0);
//   const glowRafRef = useRef<number>(0);
//   const glowStartRef = useRef<number>(0);
//   const rafRef = useRef<number>(0);
//   const startTimeRef = useRef<number>(0);
//   const TRACE_DURATION = 1800;
//   const HOLD = 10000;
//   const PAUSE = 3500;
//   const PAD = 16;

//   useEffect(() => {
//     let timeout: ReturnType<typeof setTimeout>;

//     const startTrace = () => {
//       setPhase("tracing");
//       setProgress(0);
//       onProgress?.(0);
//       startTimeRef.current = performance.now();
//       const animate = (now: number) => {
//         const p = Math.min((now - startTimeRef.current) / TRACE_DURATION, 1);
//         setProgress(p);
//         onProgress?.(p);              // ← mirror out
//         if (p < 1) {
//           rafRef.current = requestAnimationFrame(animate);
//         } else {
//           setPhase("holding");
//           // start glow loop
//           const GLOW_PERIOD = 2000;
//           glowStartRef.current = 0;
//           const animateGlow = (now: number) => {
//             if (!glowStartRef.current) glowStartRef.current = now;
//             const t = ((now - glowStartRef.current) % GLOW_PERIOD) / GLOW_PERIOD;
//             const opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
//             setGlowOpacity(opacity);
//             glowRafRef.current = requestAnimationFrame(animateGlow);
//           };
//           glowRafRef.current = requestAnimationFrame(animateGlow);

//           timeout = setTimeout(() => {
//             cancelAnimationFrame(glowRafRef.current);
//             setGlowOpacity(0);
//             setProgress(0);
//             onProgress?.(1);
//             setPhase("hidden");
//             timeout = setTimeout(() => {
//               setPhase("waiting");
//               timeout = setTimeout(startTrace, PAUSE);
//             }, 100);
//           }, HOLD);
//         }
//       };
//       rafRef.current = requestAnimationFrame(animate);
//     };

//     timeout = setTimeout(startTrace, 300);
//     return () => {
//       clearTimeout(timeout);
//       cancelAnimationFrame(rafRef.current);
//       cancelAnimationFrame(glowRafRef.current);
//     };
//   }, []);

//   const el = ref.current;
//   const W = el ? el.offsetWidth + PAD * 2 : 0;
//   const H = el ? el.offsetHeight + PAD * 2 : 0;
//   const perimeter = W && H ? 2 * (W + H) : 0;

//   // Perimeter segments starting from top-center going clockwise:
//   // right half of top → right side → bottom → left side → left half of top
//   const getPath = (p: number) => {
//     if (!W || !H) return "";
//     const dist = p * perimeter;
//     const topRight = W / 2;
//     const rightSide = topRight + H;
//     const bottom = rightSide + W;
//     const leftSide = bottom + H;
//     const topLeft = leftSide + W / 2;

//     // Right direction from center-top
//     let rightPath = "";
//     // Left direction from center-top (mirror)
//     let leftPath = "";

//     // Right branch: center-top → top-right → right-bottom → bottom-left → center-bottom
//     const rDist = dist / 2;
//     if (rDist <= topRight) {
//       rightPath = `M ${W / 2} 0 L ${W / 2 + rDist} 0`;
//     } else if (rDist <= topRight + H) {
//       rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${rDist - topRight}`;
//     } else if (rDist <= topRight + H + W) {
//       rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${H} L ${W - (rDist - topRight - H)} ${H}`;
//     } else {
//       const remaining = rDist - topRight - H - W;
//       rightPath = `M ${W / 2} 0 L ${W} 0 L ${W} ${H} L 0 ${H} L 0 ${H - remaining}`;
//     }

//     // Left branch: center-top → top-left → left-bottom → bottom-right → center-bottom
//     const lDist = dist / 2;
//     if (lDist <= topRight) {
//       leftPath = `M ${W / 2} 0 L ${W / 2 - lDist} 0`;
//     } else if (lDist <= topRight + H) {
//       leftPath = `M ${W / 2} 0 L 0 0 L 0 ${lDist - topRight}`;
//     } else if (lDist <= topRight + H + W) {
//       leftPath = `M ${W / 2} 0 L 0 0 L 0 ${H} L ${lDist - topRight - H} ${H}`;
//     } else {
//       const remaining = lDist - topRight - H - W;
//       leftPath = `M ${W / 2} 0 L 0 0 L 0 ${H} L ${W} ${H} L ${W} ${H - remaining}`;
//     }

//     return `${rightPath} ${leftPath}`;
//   };

//   return (
//     <div ref={ref} style={{ position: "relative", padding: `${PAD}px` }}>
//       {phase !== "hidden" && W > 0 && (
//         <svg
//           style={{
//             position: "absolute",
//             top: `-${PAD}px`, left: `-${PAD}px`,
//             width: `${W}px`, height: `${H}px`,
//             pointerEvents: "none", overflow: "visible",
//             opacity: 1,
//           }}
//         >
//           <path
//             d={getPath(progress)}
//             fill="none"
//             stroke={`rgba(255,255,255,${0.3 + glowOpacity * 0.7})`}
//             strokeWidth="1"
//             filter={glowOpacity > 0 ? `drop-shadow(0 0 ${glowOpacity * 9}px rgba(255,255,255,${glowOpacity * 0.9}))` : undefined}
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       )}
//       {children}
//     </div>
//   );
// };

const STEP_IMAGES = [
  { src: "/step-diagnose.png", srcMobile: "/step-diagnose-mobile.png", alt: "Diagnose dashboard" },
  { src: "/step-design.png", srcMobile: "/step-design-mobile.png", alt: "Design dashboard" },
  { src: "/step-deploy.png", srcMobile: "/step-deploy-mobile.png", alt: "Deploy dashboard" },
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
  mobileAspect: string;   // ← add to type
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
  // const [glowOpacity, setGlowOpacity] = useState(0);
  // const glowRafRef = useRef<number>(0);
  // const glowStartRef = useRef<number>(0);

  // useEffect(() => {
  //   if (!boxRef.current) return;
  //   const el = boxRef.current;
  //   const ro = new ResizeObserver(() => {
  //     setDims({ w: el.offsetWidth, h: el.offsetHeight });
  //   });
  //   ro.observe(el);
  //   return () => ro.disconnect();
  // }, []);
  useEffect(() => {
    if (!boxRef.current) return;
    const el = boxRef.current;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setDims({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const holding = isActive && phase === "hold";
  // useEffect(() => {
  //   const holding = isActive && phase === "hold";
  //   if (!holding) {
  //     cancelAnimationFrame(glowRafRef.current);
  //     setGlowOpacity(0);
  //     glowStartRef.current = 0;
  //     return;
  //   }
  //   const GLOW_PERIOD = 2000;
  //   const animateGlow = (now: number) => {
  //     if (!glowStartRef.current) glowStartRef.current = now;
  //     const t = ((now - glowStartRef.current) % GLOW_PERIOD) / GLOW_PERIOD;
  //     const opacity = t < 0.5 ? t * 2 : (1 - t) * 2;
  //     setGlowOpacity(opacity);
  //     glowRafRef.current = requestAnimationFrame(animateGlow);
  //   };
  //   glowRafRef.current = requestAnimationFrame(animateGlow);
  //   return () => cancelAnimationFrame(glowRafRef.current);
  // }, [isActive, phase]);

  const tracing = isActive && phase === "trace";
  const revealed = !isActive || phase === "hold";
  const clipBottom = tracing ? Math.max(0, (1 - progress) * 100) : 0;
  const borderProgress = tracing ? progress : isActive ? 1 : 0;

  return (
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
        padding: "14px",
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
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", alignItems: "center" }}>
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: isMobile ? mobileAspect : "16 / 9",
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
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: isMobile ? "contain" : "cover",
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

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            maxWidth: "640px",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)", textTransform: "uppercase" }}>
            {item.step}
          </span>
          <h3 style={{ fontSize: "1.3rem", color: "#ffffff", fontWeight: 600, letterSpacing: "-0.01em", margin: 0 }}>
            {item.title}
          </h3>
          {/* <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, margin: 0, textAlign: "center" }}>
            {item.desc}
          </p> */}
        </div>
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
  useEffect(() => {
    if (!isMobile) return;
    STEP_IMAGES.forEach(({ srcMobile }) => {
      if (aspectCacheRef.current[srcMobile]) return; // already cached
      const img = new Image();
      img.onload = () => {
        const ratio = `${img.naturalWidth} / ${img.naturalHeight}`;
        aspectCacheRef.current[srcMobile] = ratio;
        setAspects((prev) => ({ ...prev, [srcMobile]: ratio }));
      };
      img.src = srcMobile;
    });
  }, [isMobile]);
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
      <div style={{ position: "relative", width: "88vw", maxWidth: "1500px", overflow: "hidden" }}>
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
                image={isMobile ? STEP_IMAGES[i].srcMobile : STEP_IMAGES[i].src}
                mobileAspect={aspects[STEP_IMAGES[i].srcMobile] || "3 / 4"}   // ← new prop
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