"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useTypewriter } from "../globalscope/typewriter";
import { Menu, X } from "lucide-react";

// ── Tape sizing (same system as landing page) ─────────────────────────────────
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

const BottomTape = ({ withFooter = false }: { withFooter?: boolean }) => {
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
      {withFooter && (
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
      )}
    </div>
  );
};

// ── Divider ───────────────────────────────────────────────────────────────────

const useDividerAnimation = () => {
  const [phase, setPhase] = useState<"waiting" | "tracing" | "holding" | "done">("waiting");
  const [traceProgress, setTraceProgress] = useState(0);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number>(0);
  const glowRafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const TRACE_DURATION = 3500;
    const HOLD_DURATION  = 5000;
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
    <div style={{ width: "100%", margin: "3rem 0", position: "relative", height: "5px", display: "flex", alignItems: "center" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)",
        height: "1px",
        background: phase === "done" || phase === "waiting" ? "rgba(255,255,255,0.08)" : "transparent",
      }} />
      {(phase === "tracing" || phase === "holding") && visible && (
        <div style={{ position: "absolute", left: 0, right: 0, top: "50%", transform: "translateY(-50%)" }}>
          <div style={{
            position: "absolute", left: `${(1 - traceProgress) * 50}%`, right: `${(1 - traceProgress) * 50}%`,
            top: "-2px", height: "1px",
            background: `rgba(255,255,255,${glowOpacity * 0.3})`,
          }} />
          <div style={{
            position: "absolute", left: `${(1 - traceProgress) * 50}%`, right: `${(1 - traceProgress) * 50}%`,
            top: 0, height: "1px",
            background: `rgba(255,255,255,${0.3 + glowOpacity * 0.7})`,
            boxShadow: `0 0 ${4 + glowOpacity * 6}px rgba(255,255,255,${glowOpacity * 0.6})`,
          }} />
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
// ── Belief data ───────────────────────────────────────────────────────────────
const BELIEFS = [
  {
    title: "Automation should be invisible.",
    body: "Good automation doesn't announce itself. It runs in the background, removes the friction, and lets your team focus on work that actually needs them.",
  },
  {
    title: "Fit before feature.",
    body: "A system built precisely around your process is worth more than a platform with a hundred options you'll never use.",
  },
  {
    title: "Humans aren't the bottleneck.",
    body: "Manual work is. We target the handoffs, the copy-paste, the waiting – not the people doing them.",
  },
  {
    title: "Scope tight. Ship fast. Stay accountable.",
    body: "We agree on exactly what gets built, deploy it quickly, and stay on after launch. No projects handed off and forgotten.",
  },
];

// ── Boundary tracer SVG ───────────────────────────────────────────────────────
const BoundaryTracer = ({ progress, width, height, glowOpacity }: { progress: number; width: number; height: number; glowOpacity: number }) => {
  if (!width || !height) return null;
  const PAD = 0;
  const W = width;
  const H = height;
  const half = W / 2;
  const perimeter = 2 * (W + H);
  const total = progress * perimeter;
  const half_dist = total / 2;

  // right branch: center-top → right → bottom-right → bottom-center
  const buildBranch = (dist: number, dir: "right" | "left") => {
    const pts: [number, number][] = [[half, PAD]];
    if (dir === "right") {
      const s1 = Math.min(dist, half);
      pts.push([half + s1, PAD]);
      if (dist > half) {
        const s2 = Math.min(dist - half, H);
        pts.push([W, PAD + s2]);
        if (dist > half + H) {
          const s3 = Math.min(dist - half - H, half);
          pts.push([W - s3, H]);
        }
      }
    } else {
      const s1 = Math.min(dist, half);
      pts.push([half - s1, PAD]);
      if (dist > half) {
        const s2 = Math.min(dist - half, H);
        pts.push([0, PAD + s2]);
        if (dist > half + H) {
          const s3 = Math.min(dist - half - H, half);
          pts.push([s3, H]);
        }
      }
    }
    return pts.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  };

  const rightPath = buildBranch(half_dist, "right");
  const leftPath  = buildBranch(half_dist, "left");

  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 10, overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
  d={rightPath}
  fill="none"
  stroke={`rgba(255,255,255,${0.25 + glowOpacity * 0.75})`}
  strokeWidth="1"
  filter={glowOpacity > 0 ? `drop-shadow(0 0 ${glowOpacity * 3}px rgba(255,255,255,${glowOpacity * 0.9}))` : undefined}
  strokeLinecap="round"
  strokeLinejoin="round"
/>
<path
  d={leftPath}
  fill="none"
  stroke={`rgba(255,255,255,${0.25 + glowOpacity * 0.75})`}
  strokeWidth="1"
  filter={glowOpacity > 0 ? `drop-shadow(0 0 ${glowOpacity * 3}px rgba(255,255,255,${glowOpacity * 0.9}))` : undefined}
  strokeLinecap="round"
  strokeLinejoin="round"
/>
    </svg>
  );
};

// ── Single flip card ──────────────────────────────────────────────────────────
const BeliefCard = ({
  item,
  isActive,
  onClick,
  onTraceDone,
  resetKey,
}: {
  item: typeof BELIEFS[0];
  isActive: boolean;
  onClick: () => void;
  onTraceDone: () => void;
  resetKey: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const TRACE_DURATION = 5500;
const [glowOpacity, setGlowOpacity] = useState(0);
const glowRafRef = useRef<number>(0);
const glowStartRef = useRef<number>(0);

  // measure card
  useEffect(() => {
    if (!cardRef.current) return;
    const ro = new ResizeObserver(() => {
      if (cardRef.current) {
        setDims({ w: cardRef.current.offsetWidth, h: cardRef.current.offsetHeight });
      }
    });
    ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  // trace animation – restarts on resetKey change when active
  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    if (!isActive) { cancelAnimationFrame(glowRafRef.current);
setGlowOpacity(0);
glowStartRef.current = 0;setProgress(0); return; }
    setProgress(0);
    startRef.current = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - startRef.current) / TRACE_DURATION, 1);
      setProgress(p);
      // pulse glow during tracing
      const GLOW_PERIOD = 2000;
      if (!glowStartRef.current) glowStartRef.current = now;
      const t = ((now - glowStartRef.current) % GLOW_PERIOD) / GLOW_PERIOD;
      const glow = t < 0.5 ? t * 2 : (1 - t) * 2;
      setGlowOpacity(glow);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        onTraceDone();
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
  cancelAnimationFrame(rafRef.current);
  cancelAnimationFrame(glowRafRef.current);
  setGlowOpacity(0);
  glowStartRef.current = 0;
};
  }, [isActive, resetKey]);

  const flipped = !isActive;

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        perspective: "800px",
        cursor: "pointer",
        minHeight: "120px",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "120px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* FRONT */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            padding: "1rem 1.2rem 9rem 1.2rem",
            boxSizing: "border-box",
          }}
        >
          {isActive && dims.w > 0 && (
            <BoundaryTracer
              progress={progress}
              width={dims.w}
              height={dims.h}
              glowOpacity={glowOpacity}
            />
          )}
          <h3
            style={{
              fontSize: "0.92rem",
              color: "#ffffff",
              fontWeight: 600,
              marginBottom: "0.5rem",
              letterSpacing: "-0.01em",
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontSize: "0.84rem",
              color: "rgba(255,255,255,0.42)",
              lineHeight: 1.75,
              margin: 0,
              textAlign: "justify",
            }}
          >
            {item.body}
          </p>
        </div>

        {/* BACK – grey border only */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxSizing: "border-box",
            minHeight: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.88rem",
              fontWeight: 600,
              color: "rgba(255,255,255,0.12)",
              letterSpacing: "-0.01em",
              paddingLeft: "1.2rem",
              paddingRight: "1.2rem",
              textAlign: "center",
            }}
          >
            {item.title}
          </span>
        </div>
      </div>
    </div>
  );
};

// ── BeliefCards orchestrator ──────────────────────────────────────────────────
const BeliefCards = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);

  const handleTraceDone = () => {
    setActiveIndex(i => (i + 1) % BELIEFS.length);
    setResetKey(k => k + 1);
  };

  const handleClick = (index: number) => {
    if (index === activeIndex) {
      // reset trace on active card
      setResetKey(k => k + 1);
    } else {
      // jump to clicked card
      setActiveIndex(index);
      setResetKey(k => k + 1);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
      {BELIEFS.map((item, i) => (
        <BeliefCard
          key={item.title}
          item={item}
          isActive={activeIndex === i}
          onClick={() => handleClick(i)}
          onTraceDone={handleTraceDone}
          resetKey={activeIndex === i ? resetKey : 0}
        />
      ))}
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

// ── About Page ────────────────────────────────────────────────────────────────
export default function About() {
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
const { displayed: typed, ref: typeRef } = useTypewriter("We build the layer between");
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
        {/* ── Single dark section – full page content ── */}
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
              Who we are.
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
              <span
                style={{
                  display: "block",
                  minHeight: "1.1em",
                  position: "relative",
                }}
              >
                {typed}
                <span
                  style={{
                    position: "absolute",
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
                your people and the repetition.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "560px",
                marginBottom: 0,
                textAlign: "justify",
              }}
            >
              GrydIn is a software and AI automation studio based in Pakistan,
              building for businesses globally. We surface the invisible work
              slowing your team down – then eliminate it. No disruption to what
              already works. No bloat. Just precise systems running quietly in
              the background.
            </p>

            <AnimatedDivider />

            {/* ── What we believe ── */}
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
              The unseen rules.
            </p>

            <BeliefCards />

            <AnimatedDivider />

            {/* ── Why we built this ── */}
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 800,
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: "1.2rem",
              }}
            >
              Origin.
            </p>

            <p
              style={{
                fontSize: "clamp(0.9rem, 1.6vw, 1rem)",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.85,
                maxWidth: "600px",
                margin: 0,
                textAlign: "justify",
              }}
            >
              We kept seeing the same problem across businesses we worked with –
              teams spending real hours on work that wasn't theirs to do. Moving
              data between systems. Chasing approvals. Running the same report
              on a loop. Not because they lacked capability. Because no one had
              ever wired the tools together properly.
              <br />
              <br />
              GrydIn exists to fix that. Precisely, without the overhaul.
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
                See a gap in your business?
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
                Tell us what's slowing you down. No pitch, no sales deck – just
                an honest response within one business day.
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
          </div>

          <BottomTape withFooter />
        </section>
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}