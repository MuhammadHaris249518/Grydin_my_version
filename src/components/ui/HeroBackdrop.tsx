"use client";

import dynamic from "next/dynamic";
import { useCanRender3D, useVisible } from "@/components/3d/hooks";

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), { ssr: false });

export function HeroBackdrop({ network = true }: { network?: boolean }) {
  const can3D = useCanRender3D();
  const { ref, visible } = useVisible<HTMLDivElement>("0px");
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy to-navy-950" />
      <div className="absolute inset-0 bg-circuit opacity-60" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_75%_40%,rgba(13,139,153,.28),transparent_70%)]" />
      {network && can3D && (
        <div className="absolute inset-y-0 right-0 w-3/5">
          <NetworkScene active={visible} />
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
    </div>
  );
}
