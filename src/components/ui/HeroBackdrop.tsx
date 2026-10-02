"use client";

import dynamic from "next/dynamic";
import { useCanRender3D, useVisible } from "@/components/3d/hooks";

const NetworkScene = dynamic(() => import("@/components/3d/NetworkScene"), { ssr: false });

/**
 * HeroBackdrop — light-theme version.
 *
 * Renders a subtle pale-periwinkle gradient background with an optional
 * 3-D network mesh on the right. Pass `dark` for the navy hero sections
 * that must remain untouched (home page hero only).
 */
export function HeroBackdrop({
  network = true,
  dark = false,
}: {
  network?: boolean;
  dark?: boolean;
}) {
  const can3D = useCanRender3D();
  const { ref, visible } = useVisible<HTMLDivElement>("0px");

  if (dark) {
    // Preserved dark navy gradient for the protected home hero
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

  // Light-theme: pale periwinkle gradient
  return (
    <div ref={ref} aria-hidden className="absolute inset-0 z-0 overflow-hidden">
      {/* Pale periwinkle stage background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#eef2ff] via-white to-[#f0fdfc]" />
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(13,139,153,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* Accent radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_70%_50%,rgba(13,139,153,.08),transparent_70%)]" />
      {network && can3D && (
        <div className="absolute inset-y-0 right-0 w-3/5 opacity-40">
          <NetworkScene active={visible} />
        </div>
      )}
      {/* Bottom fade to white */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
}
