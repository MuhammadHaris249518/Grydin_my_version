import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function GlassCard({
  className,
  children,
  dark = false,
}: {
  className?: string;
  children: ReactNode;
  /** Set true to use the dark glassmorphism style (for navy sections / hero areas) */
  dark?: boolean;
}) {
  return (
    <div className={cn(dark ? "glass-dark" : "glass", "rounded-2xl", className)}>
      {children}
    </div>
  );
}
