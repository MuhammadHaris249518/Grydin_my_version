import React, { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "teal"
  | "navy"
  | "surface"
  | "live"
  | "beta"
  | "coming-soon";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: "sm" | "md";
  className?: string;
  icon?: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-surface-soft text-ink-muted border border-surface-line",
  teal: "bg-teal-light text-teal-dark font-semibold border border-accent/20",
  navy: "bg-surface text-ink font-medium",
  surface: "bg-white text-ink-muted border border-surface-line shadow-xs",
  live: "bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold",
  beta: "bg-amber-50 text-amber-800 border border-amber-200 font-semibold",
  "coming-soon": "bg-slate-100 text-slate-700 border border-slate-200 font-medium",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  // If variant isn't explicitly set to status, check if children matches common statuses
  let activeVariant = variant;
  if (variant === "default" && typeof children === "string") {
    const lower = children.toLowerCase();
    if (lower === "live") activeVariant = "live";
    else if (lower === "beta") activeVariant = "beta";
    else if (lower === "coming soon" || lower === "coming-soon") activeVariant = "coming-soon";
  }

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2.5 py-0.5 rounded-full"
      : "text-xs sm:text-sm px-3 py-1 rounded-full";

  return (
    <span
      className={`inline-flex items-center gap-1.5 tracking-wide leading-none ${sizeClasses} ${variantStyles[activeVariant]} ${className}`}
    >
      {activeVariant === "live" && (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      )}
      {activeVariant === "beta" && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
      )}
      {activeVariant === "coming-soon" && (
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      )}
      {icon}
      <span>{children}</span>
    </span>
  );
}
