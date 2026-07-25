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
import { FooterTape } from "../globalscope/FooterTape";
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



const useIslamabadClock = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () => {
      const formatted = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Karachi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(new Date());
      setTime(formatted);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);
  return time;
};

const AvailabilityBadge = () => (
  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
    <span style={{ position: "relative", display: "flex", width: "10px", height: "10px" }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%", background: "#10b981",
        animation: "pingPulse 1.8s cubic-bezier(0,0,0.2,1) infinite",
      }} />
      <span style={{ position: "relative", width: "10px", height: "10px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 6px rgba(16,185,129,0.7)" }} />
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

const RevealIcon = ({ children, delay }: { children: React.ReactNode; delay: number }) => {
  const [traced, setTraced] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setTraced(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const circumference = 2 * Math.PI * 11;

  return (
    <span style={{ position: "relative", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <svg width="26" height="26" viewBox="0 0 26 26" style={{ position: "absolute", inset: 0 }}>
        <circle
          cx="13" cy="13" r="11" fill="none" stroke="#10b981" strokeWidth="1"
          strokeLinecap="round" transform="rotate(-90 13 13)"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - (traced ? 1 : 0))}
          style={{ transition: "stroke-dashoffset 0.7s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span style={{
        color: "#10b981",//"rgba(255,255,255,0.45)",
        opacity: traced ? 1 : 0,
        transform: traced ? "scale(1)" : "scale(0.5)",
        transition: "opacity 0.4s ease 0.5s, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.5s",
      }}>
        {children}
      </span>
    </span>
  );
};

export default function Contact() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tapeH, setTapeH] = useState(TAPE_H_MAX);
  const [copied, setCopied] = useState(false);
  const islamabadTime = useIslamabadClock();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
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
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(28px)",
                filter: mounted ? "blur(0px)" : "blur(12px)",
                transition: "opacity 1.3s cubic-bezier(0.16,1,0.3,1), transform 1.3s cubic-bezier(0.16,1,0.3,1), filter 1.3s cubic-bezier(0.16,1,0.3,1)",
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
                Describe what's slowing your business down. No pitch, no sales
                deck – just an honest, scoped response within one business day.
              </p>

              <AvailabilityBadge />

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
                ].map((item, i) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <RevealIcon delay={600 + i * 150}>
                      {item.icon}
                    </RevealIcon>
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
                      {item.label === "Based in" ? (
                        <>
                          Islamabad, Pakistan – <span style={{ color: "#10b981" }}>{islamabadTime}</span> local – working globally
                        </>
                      ) : (
                        item.value
                      )}
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
            </div>
          </div>

          <FooterTape />
        </section>
        <WhatsAppButton />
      </main>
    </TapeCtx.Provider>
  );
}
