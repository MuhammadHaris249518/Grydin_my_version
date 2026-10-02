import Link from "next/link";
import React, { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

export type ButtonVariant = "primary" | "outline-light" | "outline-dark" | "link";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-accent hover:bg-accent-hover text-white rounded-md font-bold uppercase tracking-wider shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  "outline-light":
    "border-2 border-white text-white hover:bg-white/10 rounded-md font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
  "outline-dark":
    "border-2 border-ink text-ink hover:bg-ink/5 rounded-md font-bold uppercase tracking-wider transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2",
  link:
    "text-accent hover:text-accent-hover font-semibold inline-flex items-center gap-1.5 transition-colors p-0 focus-visible:outline-none focus-visible:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "text-xs px-3.5 py-2",
  md: "text-xs sm:text-sm px-5 py-2.5 sm:py-3",
  lg: "text-sm sm:text-base px-6 py-3.5",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  children,
  icon,
  iconRight,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const isLink = variant === "link";
  const baseClasses = `inline-flex items-center justify-center gap-2 cursor-pointer ${
    variantStyles[variant]
  } ${!isLink ? sizeStyles[size] : ""} ${
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
  } ${className}`.trim();

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {isLink && !iconRight ? <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" /> : iconRight}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}
