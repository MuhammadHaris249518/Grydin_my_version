"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { useCanRender3D, useVisible } from "./hooks";

const GlbViewer = dynamic(() => import("./GlbViewer"), { ssr: false });

function SlotPlaceholder({ label }: { label: string }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-teal-500/10 via-surface-soft to-teal-500/5 rounded-xl border border-teal-500/20"
      aria-label={label}
    />
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
