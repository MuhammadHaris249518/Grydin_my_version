"use client";

import { useEffect, useRef, useState } from "react";
import { BRAND_ACCENT, brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";

export type Principle = {
  num: string;
  label: string;
  body: string;
};

const AUTO_ADVANCE_MS = 7000;

export const PrincipleCards = ({ principles }: { principles: Principle[] }) => {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / AUTO_ADVANCE_MS, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setProgress(0);
        setActive((i) => (i + 1) % principles.length);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, principles.length]);

  const select = (i: number) => {
    cancelAnimationFrame(rafRef.current);
    setProgress(0);
    setActive(i);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div className="principle-picker-grid">
        {principles.map((p, i) => {
          const isActive = i === active;
          return (
            <button
              key={p.num}
              type="button"
              onClick={() => select(i)}
              className="principle-picker-btn"
              style={{
                cursor: "pointer",
                borderRadius: "6px",
                border: isActive
                  ? `1px solid ${brandAccentHexAlpha(0.55)}`
                  : "1px solid rgba(255,255,255,0.08)",
                background: isActive
                  ? `linear-gradient(135deg, ${brandAccentAlpha(0.14)} 0%, rgba(255,255,255,0.03) 100%)`
                  : "rgba(255,255,255,0.02)",
                boxShadow: isActive ? `0 0 24px ${brandAccentAlpha(0.12)}` : "none",
                transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s, transform 0.25s",
                transform: isActive ? "translateY(-2px)" : "none",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "0.2rem",
                  lineHeight: 1.1,
                }}
              >
                <span
                  style={{
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: isActive ? BRAND_ACCENT : "rgba(255,255,255,0.32)",
                  }}
                >
                  Principle
                </span>
                <span
                  style={{
                    fontSize: "clamp(1.25rem, 2.5vw, 1.55rem)",
                    fontWeight: 800,
                    color: isActive ? BRAND_ACCENT : "rgba(255,255,255,0.38)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {p.num}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={principles[active].num}
        style={{
          padding: "clamp(1.25rem, 3vw, 1.75rem)",
          borderRadius: "8px",
          border: `1px solid ${brandAccentHexAlpha(0.35)}`,
          background: "rgba(0,0,0,0.35)",
          animation: "principleDetailIn 0.45s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <h3
          style={{
            margin: "0 0 0.85rem",
            fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {principles[active].label}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: "0.92rem",
            lineHeight: 1.85,
            color: "rgba(255,255,255,0.52)",
            maxWidth: "52rem",
          }}
        >
          {principles[active].body}
        </p>
      </div>

      <div style={{ display: "flex", gap: "5px" }}>
        {principles.map((_, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "2px",
              borderRadius: "1px",
              background: "rgba(255,255,255,0.12)",
              overflow: "hidden",
              cursor: "pointer",
            }}
            onClick={() => select(i)}
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

      <style jsx>{`
        .principle-picker-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
        }
        .principle-picker-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          min-height: 4rem;
          background: none;
          text-align: center;
        }
        @media (min-width: 769px) {
          .principle-picker-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          .principle-picker-btn {
            min-height: 4.5rem;
          }
        }
        @keyframes principleDetailIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
