const TECH_ITEMS = [
  { name: "Next.js 15", category: "Full-Stack" },
  { name: "React 19", category: "Frontend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Python", category: "AI / Core" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "LangChain", category: "AI Framework" },
  { name: "LangGraph", category: "Agent Orchestration" },
  { name: "n8n & Make", category: "Workflow Automation" },
  { name: "Docker", category: "Containers" },
  { name: "Kubernetes", category: "Orchestration" },
  { name: "TypeScript", category: "Language" },
  { name: "AWS", category: "Cloud" },
  { name: "Redis", category: "Caching / Queue" },
];

export function HomeStack() {
  return (
    <section className="relative overflow-hidden bg-slate-50/70 py-16 sm:py-24 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 mb-10 text-center">
        <div className="inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
          <span className="w-4 h-0.5 bg-teal-600" />
          ENGINEERED ON MODERN FOUNDATIONS
          <span className="w-4 h-0.5 bg-teal-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Battle-tested technologies <span className="text-teal-600">powering our architectures</span>
        </h2>
      </div>

      {/* Marquee Track */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 py-2 hover:[animation-play-state:paused]">
          {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="bg-white border border-slate-200/80 shadow-xs flex items-center gap-3 rounded-2xl px-5 py-3 hover:border-teal-500/50 hover:shadow-md transition-all"
            >
              <span className="font-bold text-slate-900 text-sm sm:text-base">
                {item.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                {item.category}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
