import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  accent,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  const parts = accent && title.includes(accent) ? title.split(accent) : null;
  return (
    <header className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-teal-glow",
            align === "center" && "justify-center"
          )}
        >
          <span className="h-px w-8 bg-teal-glow/60" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[3.25rem]">
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
      {intro && <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">{intro}</p>}
    </header>
  );
}
