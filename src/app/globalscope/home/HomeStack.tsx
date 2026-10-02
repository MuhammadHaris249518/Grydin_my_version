import { SectionHeader } from "@/components/ui/SectionHeader";

const TECH_ITEMS = [
  { name: "Next.js", category: "Full-Stack" },
  { name: "React 19", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Python", category: "AI / Core" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "LangChain", category: "AI Framework" },
  { name: "LangGraph", category: "Agent Orchestration" },
  { name: "n8n", category: "Workflow Automation" },
  { name: "Docker", category: "Containers" },
  { name: "Kubernetes", category: "Orchestration" },
  { name: "TypeScript", category: "Language" },
  { name: "AWS", category: "Cloud" },
  { name: "Redis", category: "Caching / Queue" },
];

export function HomeStack() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 md:py-28 border-y border-white/10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 mb-12">
        <SectionHeader
          eyebrow="Engineered On Modern Foundations"
          title="Battle-tested technologies powering our architectures"
          accent="Battle-tested"
          align="center"
        />
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-6 py-2 hover:[animation-play-state:paused]">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="glass flex items-center gap-3 rounded-xl px-6 py-3.5 transition-colors hover:border-teal-glow/50"
            >
              <span className="font-semibold text-white text-base">
                {item.name}
              </span>
              <span className="h-1 w-1 rounded-full bg-teal-glow/60" />
              <span className="font-mono text-xs uppercase tracking-wider text-slate-400">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
