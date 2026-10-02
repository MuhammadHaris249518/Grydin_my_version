import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
  /** Use true when the section background is dark (ink/navy). Defaults to light mode. */
  dark?: boolean;
  className?: string;
}) {
  const parts = accent && title.includes(accent) ? title.split(accent) : null;
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em]",
            dark ? "text-teal-glow" : "text-accent",
            align === "center" && "justify-center"
          )}
        >
          <span className={cn("h-px w-8", dark ? "bg-teal-glow/60" : "bg-accent/60")} />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl lg:text-[3.25rem]",
          dark ? "text-white" : "text-ink"
        )}
      >
        {parts ? (
          <>
            {parts[0]}
            <span className="text-gradient">{accent}</span>
            {parts.slice(1).join(accent)}
          </>
        ) : (
          title
        )}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-ink-muted"
          )}
        >
          {intro}
        </p>
      )}
    </header>
  );
}
