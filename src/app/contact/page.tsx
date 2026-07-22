"use client";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import {
  Copy,
  Mail,
  Clock,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { useTypewriter } from "../globalscope/typewriter";
import { Menu, X } from "lucide-react";
import Navbar from "../globalscope/Navbar";
import DotGrid from "../globalscope/DotGrid";

// ── Tape sizing (identical to about page) ────────────────────────────────────
const TAPE_H_MAX = 72;
const TAPE_H_MIN = 58;
const VW_COEFF = 6;

function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H_MAX, Math.max(TAPE_H_MIN, vw));
}

const NAV_LINKS = [
  { label: "HOME", href: "/" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const TapeCtx = createContext({ tapeH: TAPE_H_MAX, arcR: TAPE_H_MAX / 2 });
const useTape = () => useContext(TapeCtx);

const DARK_BG = "linear-gradient(to bottom, #4D4D4D 0%, #000000 76.92%, #000000 100%) top / 100% 130vh no-repeat, repeating-linear-gradient(to bottom, #000000 0vh, #3A3A3A 100vh, #3A3A3A 130vh, #000000 230vh) 0 130vh / 100% 230vh repeat-y";
const VB_W = 1000;

// ── Tapes (identical to about page) ──────────────────────────────────────────
export const FooterTape = () => {
  const { tapeH, arcR } = useTape();   // ← was: tapeHSlow: tapeH, arcRSlow: arcR
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

// const BottomTape = () => {
//   const { tapeH, arcR } = useTape();
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: `${tapeH}px`,
//         flexShrink: 0,
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox={`0 0 ${VB_W} ${tapeH}`}
//         preserveAspectRatio="none"
//         aria-hidden="true"
//         style={{
//           position: "absolute",
//           inset: 0,
//           width: "100%",
//           height: "100%",
//           display: "block",
//         }}
//       >
//         <path
//           d={`M 0 ${tapeH} L ${VB_W} ${tapeH} L ${VB_W} ${arcR} A ${arcR} ${arcR} 0 0 1 ${VB_W - arcR} 0 L ${arcR} 0 A ${arcR} ${arcR} 0 0 1 0 ${arcR} Z`}
//           fill="white"
//         />
//       </svg>
//       <div
//         style={{
//           position: "absolute",
//           bottom: 10,
//           left: `${arcR * 1.25}px`,
//           right: `${arcR * 1.25}px`,
//           height: `${arcR}px`,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           zIndex: 1,
//         }}
//       >
//         <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//           <img
//             src="/logo.png"
//             alt="GrydIn"
//             width={10}
//             height={10}
//             style={{ objectFit: "contain" }}
//           />
//           <span
//             style={{
//               fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
//               color: "rgba(0,0,0,.6)",
//               letterSpacing: "0.05em",
//             }}
//           >
//             GrydIn © {new Date().getFullYear()}
//           </span>
//         </div>
//         <span
//           style={{
//             fontSize: "clamp(0.6rem, 1vw, 0.75rem)",
//             color: "rgba(0,0,0,.6)",
//             letterSpacing: "0.06em",
//           }}
//         >
//           Built for the gaps in your business.
//         </span>
//       </div>
//     </div>
//   );
// };

const useDividerAnimation = () => {
  const [phase, setPhase] = useState<
    "waiting" | "tracing" | "holding" | "done"
  >("waiting");
  const [traceProgress, setTraceProgress] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [visible, setVisible] = useState(true);
  const [copied, setCopied] = useState(false);
  const rafRef = useRef<number>(0);
  const glowRafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const TRACE_DURATION = 3500;
    const HOLD_DURATION = 5000;
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
            stopGlow();
            setPhase("done");
            setTraceProgress(0);
            setVisible(false);
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
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(glowRafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { phase, traceProgress, glowOpacity, visible };
};

const AnimatedDivider = () => {
  const { phase, traceProgress, glowOpacity, visible } = useDividerAnimation();

  return (
    <div
      style={{
        width: "100%",
        margin: "3rem 0",
        position: "relative",
        height: "5px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          height: "1px",
          background:
            phase === "done" || phase === "waiting"
              ? "rgba(255,255,255,0.08)"
              : "transparent",
        }}
      />
      {(phase === "tracing" || phase === "holding") && visible && (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: `${(1 - traceProgress) * 50}%`,
              right: `${(1 - traceProgress) * 50}%`,
              top: "-2px",
              height: "1px",
              background: `rgba(255,255,255,${glowOpacity * 0.3})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${(1 - traceProgress) * 50}%`,
              right: `${(1 - traceProgress) * 50}%`,
              top: 0,
              height: "1px",
              background: `rgba(255,255,255,${0.3 + glowOpacity * 0.7})`,
              boxShadow: `0 0 ${4 + glowOpacity * 6}px rgba(255,255,255,${glowOpacity * 0.6})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${(1 - traceProgress) * 50}%`,
              right: `${(1 - traceProgress) * 50}%`,
              top: "2px",
              height: "1px",
              background: `rgba(255,255,255,${glowOpacity * 0.3})`,
            }}
          />
        </div>
      )}
    </div>
  );
};

// ── Contact Page ──────────────────────────────────────────────────────────────

const FocusInput = ({
  type,
  placeholder,
  value,
  onChange,
  rows,
}: {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rows?: number;
}) => {
  const [active, setActive] = useState(false);

  const baseStyle = {
    background: active ? "#000000" : "rgba(255,255,255,0.05)",
    border: active
      ? "1px solid rgba(255,255,255,0.8)"
      : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    padding: "0.65rem 0.85rem",
    fontSize: "0.88rem",
    color: "#ffffff",
    outline: "none",
    width: "100%",
    fontFamily: "inherit",
    transition: "background 500ms ease, border 500ms ease",
  };

  if (rows) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        rows={rows}
        onChange={onChange}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={(e) => {
          if (document.activeElement !== e.currentTarget) setActive(false);
        }}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={{ ...baseStyle, resize: "vertical" }}
      />
    );
  }

  return (
    <input
      type={type ?? "text"}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={(e) => {
        if (document.activeElement !== e.currentTarget) setActive(false);
      }}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      style={baseStyle}
    />
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

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tapeH, setTapeH] = useState(TAPE_H_MAX);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // [ Replace with real form submission logic ]
    setSubmitted(true);
  };
  const { displayed: typed, ref: typeRef } = useTypewriter("See a gap");
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
          style={{
            background: DARK_BG,
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Navbar tapeH={tapeH} arcR={arcR} />
          <div style={{ height: tapeH }} />

          <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div
              style={{
                maxWidth: "860px",
                margin: "0 auto",
                padding: "2rem",
                width: "100%",
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
                Grid it
              </p>

              <h1
                ref={typeRef}
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                  color: "#ffffff",
                  fontWeight: 700,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                  marginBottom: "1.6rem",
                  maxWidth: "620px",
                }}
              >
                <span style={{ display: "block", minHeight: "1.1em" }}>
                  {typed}
                  <span
                    style={{
                      display: "inline-block",
                      width: "2px",
                      height: "0.85em",
                      background: "rgba(255,255,255,0.7)",
                      marginLeft: "2px",
                      verticalAlign: "middle",
                      animation: "blink 1s step-end infinite",
                    }}
                  />
                </span>
                <span
                  style={{ display: "block", color: "rgba(255,255,255,0.4)" }}
                >
                  we can close?
                </span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.8,
                  maxWidth: "520px",
                  marginBottom: 0,
                  textAlign: "justify",
                }}
              >
                Describe what's slowing your business down. No pitch, no sales
                deck – just an honest, scoped response within one business day.
              </p>

              <AnimatedDivider />

              {/* ── Contact details ── */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.2rem",
                  marginBottom: 0,
                }}
              >
                {[
                  {
                    icon: <Mail size={14} strokeWidth={1.6} />,
                    label: "Email",
                    value: "hello@grydin.co",
                    action: () =>
                      window.open("mailto:hello@grydin.co", "_blank"),
                    actionIcon: <ArrowUpRight size={16} strokeWidth={1.6} />,
                  },
                  {
                    icon: <MessageCircle size={14} strokeWidth={1.6} />,
                    label: "WhatsApp",
                    value: "+92 329 6637320",
                    action: () => {
                      navigator.clipboard.writeText("+923296637320");
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    },
                    actionIcon: copied ? (
                      <Check
                        size={13}
                        strokeWidth={1.6}
                        style={{ color: "#10b981" }}
                      />
                    ) : (
                      <Copy size={13} strokeWidth={1.6} />
                    ),
                  },
                  {
                    icon: <Clock size={14} strokeWidth={1.6} />,
                    label: "Response time",
                    value: "Within one business day",
                    action: null,
                    actionIcon: null,
                  },
                  {
                    icon: <MapPin size={14} strokeWidth={1.6} />,
                    label: "Based in",
                    value: "Islamabad, Pakistan – working globally",
                    action: null,
                    actionIcon: null,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.3)" }}>
                      {item.icon}
                    </span>
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        minWidth: "120px",
                      }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.88rem",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {item.value}
                    </span>
                    {item.action && (
                      <span
                        onClick={item.action}
                        style={{
                          color: "rgba(255,255,255,0.25)",
                          cursor: "pointer",
                          lineHeight: 0,
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255,255,255,0.7)")
                        }
                        onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "rgba(255,255,255,0.25)")
                        }
                      >
                        {item.actionIcon}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* <AnimatedDivider /> */}

              {/* ── Form ── */}
              {/* {submitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                  maxWidth: "480px",
                }}
              >
                <p
                  style={{
                    fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
                    color: "#ffffff",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  Got it.
                </p>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "rgba(255,255,255,0.42)",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  We'll review what you've sent and get back to you within one
                  business day.
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.4rem",
                  maxWidth: "560px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.35)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  Describe the unseen.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Name
                    </label>
                    <FocusInput
                      type="text"
                      placeholder="[ Your name ]"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, name: e.target.value }))
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "0.72rem",
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Email
                    </label>
                    <FocusInput
                      type="email"
                      placeholder="[ your@email.com ]"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState((s) => ({ ...s, email: e.target.value }))
                      }
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    Company{" "}
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>
                      – optional
                    </span>
                  </label>
                  <FocusInput
                    type="text"
                    placeholder="[ Your company ]"
                    value={formState.company}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, company: e.target.value }))
                    }
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.4rem",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.3)",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    What are you dealing with?
                  </label>
                  <FocusInput
                    placeholder="[ Describe the workflow, the problem, or what you'd like automated ]"
                    value={formState.message}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, message: e.target.value }))
                    }
                    rows={5}
                  />
                </div>

                <button
                  onClick={handleSubmit}
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
                  Send message <ArrowRight size={14} strokeWidth={2.2} />
                </button>
              </div>
            )} */}
            </div>
          </div>

          <FooterTape />
        </section>
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}
