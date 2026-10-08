"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Pause, Play } from "lucide-react";
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
    <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      {services.map((s) => {
        const sx = s.side === "left" ? s.pos.x + CARD_W : s.pos.x;
        const sy = s.pos.y + CARD_H / 2;
        const ex = s.side === "left" ? 41 : 59;
        const ey = 50 + (sy - 50) * 0.25;
        const mx = (sx + ex) / 2;
        const on = activeId === s.id;
        return (
          <g key={s.id}>
            <path
              d={`M${sx} ${sy} C ${mx} ${sy}, ${mx} ${ey}, ${ex} ${ey}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={on ? 2 : 1.2}
              strokeDasharray={on ? "4 4" : "3 3"}
              vectorEffect="non-scaling-stroke"
              className={cn("transition-all duration-300", on ? "text-teal-500 animate-dash" : "text-teal-400/40")}
            />
            <circle cx={sx} cy={sy} r="1.5" className={cn("fill-teal-500", on && "animate-pulse")} vectorEffect="non-scaling-stroke" />
            <circle cx={ex} cy={ey} r="1.5" className={cn("fill-teal-500", on && "animate-pulse")} vectorEffect="non-scaling-stroke" />
          </g>
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
    "group flex h-full w-full items-start gap-3.5 rounded-2xl p-4 sm:p-5 text-left transition-all duration-300 bg-white border border-slate-200/80 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
    active && "!border-teal-500 bg-teal-50/30 shadow-lg shadow-teal-500/10 ring-2 ring-teal-500/20"
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
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{s.title}</span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-600 font-normal">{s.blurb}</span>
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

function MobileServiceCard({
  s,
  index,
  duplicate = false,
  onSelect,
}: {
  s: HeroService;
  index: number;
  duplicate?: boolean;
  onSelect?: (id: string) => void;
}) {
  const Icon = s.icon;
  const content = (
    <>
      <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-teal-100 bg-gradient-to-br from-white to-teal-50 text-teal-700 shadow-sm transition-all duration-300 group-hover:-rotate-3 group-hover:border-teal-200 group-hover:bg-teal-50">
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="min-w-0 flex-1 pt-0.5">
        <span className="mb-1.5 block font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-teal-700">
          Capability {String(index + 1).padStart(2, "0")}
        </span>
        <span className="block text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-teal-800">
          {s.title}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-slate-600">
          {s.blurb}
        </span>
      </span>
      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-teal-600/70 transition-transform duration-300 group-hover:translate-x-1" />
    </>
  );
  const className = "group relative flex min-h-[138px] w-[84vw] max-w-[360px] shrink-0 items-start gap-3.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-4 text-left shadow-[0_12px_32px_-24px_rgba(15,23,42,0.32)] transition-all duration-300 hover:border-teal-200 hover:shadow-[0_18px_36px_-22px_rgba(13,139,153,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500";

  return (
    <div className="relative shrink-0" aria-hidden={duplicate || undefined}>
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-teal-300/80 to-transparent" aria-hidden="true" />
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(s.id)}
          className={className}
          tabIndex={duplicate ? -1 : undefined}
        >
          {content}
        </button>
      ) : (
        <Link
          href={`/services#${s.id}`}
          className={className}
          tabIndex={duplicate ? -1 : undefined}
        >
          {content}
        </Link>
      )}
    </div>
  );
}

export function RobotStage({ services = HERO_SERVICES, onSelect }: Props) {
  const stageRef = useRef<HTMLDivElement>(null);
  const lookRef = useRef<Look>({ x: 0, y: 0 });
  const focusRef = useRef<string | null>(null);
  const lastMove = useRef(performance.now());
  const lastPointer = useRef<Look | null>(null);
  const cycle = useRef(0);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [autoId, setAutoId] = useState<string | null>(null);
  const [mobileCarouselPaused, setMobileCarouselPaused] = useState(false);
  const can3D = useCanRender3D();
  const { ref: visRef, visible } = useVisible<HTMLDivElement>("0px");
  const activeId = focusId ?? autoId;

  const focus = (id: string | null) => {
    focusRef.current = id;
    setFocusId(id);
    setAutoId(null);
    if (id) {
      const s = services.find((x) => x.id === id);
      lookRef.current = s ? s.look : { x: 0, y: 0 };
    } else {
      lookRef.current = lastPointer.current ?? { x: 0, y: 0 };
    }
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      lastMove.current = performance.now();
      setAutoId(null);
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const look = {
        x: clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)),
        y: clamp(-(e.clientY - (r.top + r.height * 0.45)) / (r.height / 2)),
      };
      lastPointer.current = look;
      if (!focusRef.current) {
        lookRef.current = look;
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

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
      {can3D ? (
        /* Desktop 3D stage */
        <div ref={stageRef} className="relative mx-auto aspect-[16/9] w-full max-w-[1280px]" role="group" aria-label="Our capabilities">
          <Connectors services={services} activeId={activeId} />
          <div data-model-slot="hero-robot" aria-hidden className="absolute left-1/2 top-[14%] h-[74%] w-[36%] -translate-x-1/2">
            <RobotCanvas lookRef={lookRef} focused={!!activeId} active={visible} modelUrl={MODEL_URL || undefined} headNode={HEAD_NODE || undefined} />
          </div>
          {services.map((s, i) => (
            <StageCard key={s.id} s={s} index={i} active={activeId === s.id} onFocus={focus} onSelect={onSelect} />
          ))}
        </div>
      ) : (
        /* Below 1024px or with reduced motion: static robot + normal card grid */
        <div className="mx-auto max-w-5xl">
          <RobotFallback className="max-w-[240px]" />
          <div className="mt-7 sm:hidden">
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="h-1 w-5 rounded-full bg-teal-400" />
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
                  Our capabilities
                </p>
              </div>
              <button
                type="button"
                onClick={() => setMobileCarouselPaused((paused) => !paused)}
                aria-label={mobileCarouselPaused ? "Resume capability carousel" : "Pause capability carousel"}
                aria-pressed={mobileCarouselPaused}
                className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-teal-200 bg-white px-3 text-[10px] font-semibold text-teal-800 shadow-sm transition-colors hover:border-teal-300 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {mobileCarouselPaused ? <Play className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
                {mobileCarouselPaused ? "Play" : "Pause"}
              </button>
            </div>
            <div
              className="robot-service-carousel overflow-hidden"
              role="region"
              aria-roledescription="carousel"
              aria-label="GrydIn capabilities"
              tabIndex={0}
            >
              <div
                className="robot-service-carousel-track flex w-max"
                data-paused={mobileCarouselPaused}
              >
                {[false, true].map((duplicate) => (
                  <div
                    key={duplicate ? "duplicate" : "original"}
                    className="robot-service-carousel-group flex shrink-0 gap-3 pr-3"
                    aria-hidden={duplicate || undefined}
                  >
                    {services.map((s, index) => (
                      <MobileServiceCard
                        key={s.id}
                        s={s}
                        index={index}
                        duplicate={duplicate}
                        onSelect={onSelect}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-2.5 px-1 text-[10px] font-medium text-slate-500">
              Six ways we help your business move forward
            </p>
          </div>

          <div className="mt-8 hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-100">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-slate-900">{s.title}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-600">{s.blurb}</span>
                  </span>
                </>
              );
              return onSelect ? (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => onSelect(s.id)}
                  className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 flex items-start gap-3 rounded-2xl p-4 text-left transition-all hover:border-teal-500/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {content}
                </button>
              ) : (
                <Link
                  key={s.id}
                  href={`/services#${s.id}`}
                  className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 flex items-start gap-3 rounded-2xl p-4 text-left transition-all hover:border-teal-500/50 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
