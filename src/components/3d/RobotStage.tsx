"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HERO_SERVICES, CARD_W, CARD_H, type HeroService } from "@/data/hero-services";
import { cn } from "@/lib/cn";
import { useCanRender3D, useVisible } from "./hooks";
import { RobotFallback } from "./RobotFallback";
import type { Look } from "./RobotCanvas";

const RobotCanvas = dynamic(() => import("./RobotCanvas"), { ssr: false, loading: () => <RobotFallback /> });

const clamp = (n: number) => Math.max(-1, Math.min(1, n));
const MODEL_URL = process.env.NEXT_PUBLIC_ROBOT_MODEL || "";
const HEAD_NODE = process.env.NEXT_PUBLIC_ROBOT_HEAD_NODE || "";

type Props = { services?: HeroService[]; onSelect?: (id: string) => void };

function Connectors({ services, activeId }: { services: HeroService[]; activeId: string | null }) {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {services.map((s) => {
        const sx = s.side === "left" ? s.pos.x + CARD_W : s.pos.x;
        const sy = s.pos.y + CARD_H / 2;
        const ex = s.side === "left" ? 41 : 59;
        const ey = 50 + (sy - 50) * 0.25;
        const mx = (sx + ex) / 2;
        const on = activeId === s.id;
        return (
          <path
            key={s.id}
            d={`M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`}
            fill="none"
            stroke={on ? "#2dd4bf" : "rgba(45,212,191,0.25)"}
            strokeWidth={on ? 1.6 : 1}
            strokeDasharray={on ? "6 6" : "none"}
            vectorEffect="non-scaling-stroke"
            className={cn("transition-all duration-300", on && "animate-dash")}
          />
        );
      })}
    </svg>
  );
}

function StageCard({
  s,
  index,
  active,
  onFocus,
  onSelect,
}: {
  s: HeroService;
  index: number;
  active: boolean;
  onFocus: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  const Icon = s.icon;
  const cls = cn(
    "glass group flex h-full w-full animate-float items-start gap-3 rounded-2xl p-4 text-left transition-[box-shadow,border-color,background-color] duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-glow",
    active && "!border-teal-glow/70 bg-teal/10 shadow-glow"
  );
  const style = { animationDelay: `${index * 0.7}s` };
  const handlers = {
    onPointerEnter: () => onFocus(s.id),
    onPointerLeave: () => onFocus(null),
    onFocus: () => onFocus(s.id),
    onBlur: () => onFocus(null),
  };
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/20 text-teal-glow">
        <Icon className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold text-white">{s.title}</span>
        <span className="mt-1 block text-[13px] leading-snug text-slate-300">{s.blurb}</span>
        <ArrowRight className="mt-2 h-4 w-4 text-teal-glow transition-transform group-hover:translate-x-1" />
      </span>
    </>
  );
  return (
    <div className="absolute" style={{ left: `${s.pos.x}%`, top: `${s.pos.y}%`, width: `${CARD_W}%`, height: `${CARD_H}%` }}>
      {onSelect ? (
        <button type="button" onClick={() => onSelect(s.id)} className={cls} style={style} {...handlers}>
          {body}
        </button>
      ) : (
        <Link href={`/services#${s.id}`} className={cls} style={style} {...handlers}>
          {body}
        </Link>
      )}
    </div>
  );
}

export function RobotStage({ services = HERO_SERVICES, onSelect }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<Look>({ x: 0, y: 0 });
  const focusRef = useRef<string | null>(null);
  const lastMove = useRef(0);
  const cycle = useRef(0);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [autoId, setAutoId] = useState<string | null>(null);
  const can3D = useCanRender3D();
  const { ref: visRef, visible } = useVisible<HTMLDivElement>();
  const activeId = focusId ?? autoId;

  const focus = (id: string | null) => {
    focusRef.current = id;
    setFocusId(id);
    setAutoId(null);
    const s = services.find((x) => x.id === id);
    lookRef.current = s ? s.look : { x: 0, y: 0 };
  };

  // cursor tracking (ignored while a card is focused)
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      lastMove.current = performance.now();
      setAutoId(null);
      const el = stageRef.current;
      if (!el || focusRef.current) return;
      const r = el.getBoundingClientRect();
      lookRef.current = {
        x: clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)),
        y: clamp(-(e.clientY - (r.top + r.height * 0.45)) / (r.height / 2)),
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  // idle demo: cycle through services when nobody is interacting
  useEffect(() => {
    if (!can3D || !visible) return;
    const id = setInterval(() => {
      if (focusRef.current || performance.now() - lastMove.current < 5000) return;
      cycle.current = (cycle.current + 1) % services.length;
      const s = services[cycle.current];
      lookRef.current = s.look;
      setAutoId(s.id);
    }, 3200);
    return () => clearInterval(id);
  }, [can3D, visible, services]);

  return (
    <div ref={visRef}>
      {/* Desktop stage */}
      <div ref={stageRef} className="relative mx-auto hidden aspect-[16/9] w-full max-w-[1280px] lg:block" role="group" aria-label="Our capabilities">
        <Connectors services={services} activeId={activeId} />
        <div data-model-slot="hero-robot" aria-hidden className="absolute left-1/2 top-[14%] h-[74%] w-[36%] -translate-x-1/2">
          {can3D ? (
            <RobotCanvas lookRef={lookRef} focused={!!activeId} active={visible} modelUrl={MODEL_URL || undefined} headNode={HEAD_NODE || undefined} />
          ) : (
            <RobotFallback />
          )}
        </div>
        {services.map((s, i) => (
          <StageCard key={s.id} s={s} index={i} active={activeId === s.id} onFocus={focus} onSelect={onSelect} />
        ))}
      </div>

      {/* Mobile / tablet: static robot + card grid */}
      <div className="lg:hidden">
        <RobotFallback className="max-w-[240px]" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link key={s.id} href={`/services#${s.id}`} className="glass flex items-start gap-3 rounded-2xl p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal/20 text-teal-glow">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-white">{s.title}</span>
                  <span className="mt-1 block text-[13px] leading-snug text-slate-300">{s.blurb}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
