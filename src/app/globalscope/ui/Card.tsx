import Link from "next/link";
import React, { ReactNode } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  highlightOnHover?: boolean;
  accentTop?: boolean;
}

export function Card({
  children,
  className = "",
  href,
  external,
  highlightOnHover = true,
  accentTop = true,
}: CardProps) {
  const baseClasses = `group relative bg-white rounded-xl border border-surface-line overflow-hidden transition-all duration-300 ${
    highlightOnHover ? "hover:shadow-xl hover:-translate-y-1 hover:border-slate-300" : ""
  } ${className}`.trim();

  const accentBar = accentTop ? (
    <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-teal transition-colors duration-300 pointer-events-none z-10" />
  ) : null;

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`block ${baseClasses}`}
        >
          {accentBar}
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`block ${baseClasses}`}>
        {accentBar}
        {children}
      </Link>
    );
  }

  return (
    <div className={baseClasses}>
      {accentBar}
      {children}
    </div>
  );
}
