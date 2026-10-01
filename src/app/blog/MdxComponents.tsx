import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Lightbulb, AlertTriangle } from "lucide-react";

export interface CalloutProps {
  type?: "info" | "tip" | "warning";
  children: ReactNode;
}

export function Callout({ type = "info", children }: CalloutProps) {
  const configs = {
    info: {
      bg: "bg-teal-light/50 border-teal/30 text-slate-800",
      icon: <Info className="w-5 h-5 text-teal shrink-0 mt-0.5" />,
      title: "Note",
    },
    tip: {
      bg: "bg-emerald-50/80 border-emerald-300 text-slate-800",
      icon: <Lightbulb className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      title: "Best Practice",
    },
    warning: {
      bg: "bg-amber-50/80 border-amber-300 text-slate-800",
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      title: "Warning",
    },
  };

  const c = configs[type] || configs.info;

  return (
    <div className={`my-6 rounded-xl border p-4 sm:p-5 flex items-start gap-3.5 ${c.bg}`}>
      {c.icon}
      <div className="text-sm leading-relaxed prose-p:my-1">{children}</div>
    </div>
  );
}

export interface StatProps {
  value: string;
  label: string;
}

export function Stat({ value, label }: StatProps) {
  return (
    <div className="my-8 rounded-xl border border-surface-line bg-surface-soft p-6 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center sm:items-baseline gap-4 sm:gap-6 not-prose">
      <div className="text-4xl sm:text-5xl font-black text-teal tracking-tight shrink-0">
        {value}
      </div>
      <div className="text-sm sm:text-base font-medium text-ink-muted leading-snug">
        {label}
      </div>
    </div>
  );
}

export const mdxComponents = {
  Callout,
  Stat,
  h2: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      id={id}
      className="group flex items-center gap-2 text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-10 mb-4 scroll-mt-24"
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Link to ${typeof children === "string" ? children : "section"}`}
          className="opacity-0 group-hover:opacity-100 text-teal text-lg font-normal transition-opacity"
        >
          #
        </a>
      )}
    </h2>
  ),
  h3: ({ id, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      id={id}
      className="group flex items-center gap-2 text-xl sm:text-2xl font-bold text-ink tracking-tight mt-8 mb-3 scroll-mt-24"
      {...props}
    >
      <span>{children}</span>
      {id && (
        <a
          href={`#${id}`}
          aria-label={`Link to ${typeof children === "string" ? children : "section"}`}
          className="opacity-0 group-hover:opacity-100 text-teal text-base font-normal transition-opacity"
        >
          #
        </a>
      )}
    </h3>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal hover:text-teal-dark font-semibold underline underline-offset-4 decoration-teal/40 hover:decoration-teal transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href || "#"}
        className="text-teal hover:text-teal-dark font-semibold underline underline-offset-4 decoration-teal/40 hover:decoration-teal transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-teal pl-4 sm:pl-6 my-6 italic text-slate-700 font-normal"
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-surface-line">
      <table className="min-w-full divide-y divide-surface-line text-left text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
};
