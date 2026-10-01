"use client";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useTypewriter } from "../globalscope/typewriter";
import { ContactForm } from "../globalscope/ContactForm";
import { ContactReachSection } from "../globalscope/ContactReachSection";
import DotGrid from "../globalscope/DotGrid";
import { AccentWord } from "../globalscope/AccentWord";
import { BRAND_ACCENT, brandAccentAlpha } from "@/lib/brand";
import { DARK_PAGE_BG } from "@/lib/theme";
// ── Tape sizing (identical to about page) ────────────────────────────────────
const TAPE_H_MAX = 72;
const TAPE_H_MIN = 58;
const VW_COEFF = 6;

function computeTapeH(width: number) {
  const vw = (VW_COEFF / 100) * width;
  return Math.min(TAPE_H_MAX, Math.max(TAPE_H_MIN, vw));
}



const TapeCtx = createContext({ tapeH: TAPE_H_MAX, arcR: TAPE_H_MAX / 2 });
const useTape = () => useContext(TapeCtx);

const VB_W = 1000;
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
          background: "rgba(255,255,255,0.28)",
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

const AvailabilityBadge = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%", background: BRAND_ACCENT,
        animation: "pingPulse 1.8s cubic-bezier(0,0,0.2,1) infinite",
      }} />
      <span style={{ position: "relative", width: "10px", height: "10px", borderRadius: "50%", background: BRAND_ACCENT, boxShadow: `0 0 6px ${brandAccentAlpha(0.7)}` }} />
    </span>
    <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.02em" }}>
      Currently accepting new projects
    </span>
    <style jsx>{`
      @keyframes pingPulse {
        0% { transform: scale(1); opacity: 0.75; }
        75%, 100% { transform: scale(3.2); opacity: 0; }
      }
    `}</style>
  </div>
);

export default function Contact() {
  const [tapeH, setTapeH] = useState(TAPE_H_MAX);
  const REVEAL_DURATION = 1300; // ms — must match the transition duration below

  const [mounted, setMounted] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [revealDuration, setRevealDuration] = useState(REVEAL_DURATION);

  const seenRef = useRef<boolean | null>(null);

  useEffect(() => {
    const key = "grydin-revealed-contact";

    // resolve "already seen" exactly once per true mount — StrictMode's
    // double-invoke reuses this cached value instead of re-reading storage
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

  const { displayed: typed, ref: typeRef } = useTypewriter(startTyping ? "See a gap" : "");
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
        <section
          style={{
            background: DARK_PAGE_BG,
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            }}
        >

          <div style={{ flex: 1, padding: "clamp(1.5rem, 4vw, 3rem) 0 clamp(3rem, 6vw, 5rem)" }}>
            <div
              style={{
                maxWidth: "920px",
                margin: "0 auto",
                padding: "0 clamp(1rem, 4vw, 2rem)",
                width: "100%",
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
                  marginBottom: "1.4rem",
                  textAlign: "justify",
                }}
              >
                Describe what&apos;s slowing your business down. No pitch, no sales
                deck – just an <AccentWord>honest</AccentWord>, scoped response within one business day.
              </p>
{/* 
              <AvailabilityBadge /> */}

              <AnimatedDivider />

              <ContactForm />

              <ContactReachSection />
            </div>
          </div>

        </section>
      </main>
    </TapeCtx.Provider>
  );
}
