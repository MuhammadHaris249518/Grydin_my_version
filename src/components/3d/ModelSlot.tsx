"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { useCanRender3D, useVisible } from "./hooks";

const GlbViewer = dynamic(() => import("./GlbViewer"), { ssr: false });

function SlotPlaceholder({ label }: { label: string }) {
  const dev = process.env.NODE_ENV !== "production";
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        dev ? "border border-dashed border-teal-glow/50 bg-teal/5" : "bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,.12),transparent_65%)]"
      )}
    >
      {dev && <span className="font-mono text-[11px] uppercase tracking-widest text-teal-glow/80">3D slot · {label}</span>}
    </div>
  );
}

/**
 * A named space for a 3D model. Drop `public/models/<name>.glb` and pass `model`.
 * Without a model it shows a placeholder (dashed frame in dev, soft glow in production).
 */
export function ModelSlot({
  label,
  model,
  poster,
  className,
}: {
  label: string;
  model?: string;
  poster?: string;
  className?: string;
}) {
  const can3D = useCanRender3D();
  const { ref, visible } = useVisible<HTMLDivElement>();
  return (
    <div ref={ref} data-model-slot={label} className={cn("relative overflow-hidden rounded-xl", className)}>
      {model && can3D ? (
        <GlbViewer url={model} active={visible} />
      ) : poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={poster} alt="" className="h-full w-full object-contain" />
      ) : (
        <SlotPlaceholder label={label} />
      )}
    </div>
  );
}
