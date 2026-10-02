"use client";

import Link from "next/link";
import { ArrowRight, Zap, Repeat, Brain, Layers, Plug, Code2, CheckCircle2, Sparkles, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "../ui/Button";
import { cn } from "@/lib/cn";

type Tile = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  tags: string[];
  href: string;
  badge?: string;
  visual?: React.ReactNode;
};

const TILES: Tile[] = [
  {
    id: "agents",
    icon: Zap,
    title: "AI Agents & Autonomous Workflows",
    short: "Goal-driven agents that reason, plan, and execute multi-step operations across your toolchain without manual friction.",
    tags: ["Autonomous workflows", "Tool-calling APIs", "Multi-model orchestration"],
    href: "/services#ai-agents",
    badge: "AUTONOMOUS ENGINE",
    visual: (
      <div className="w-full bg-slate-900 rounded-2xl p-5 mb-6 text-white border border-slate-800 shadow-inner overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-wider">Multi-Agent Orchestrator</span>
          </div>
          <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">STATUS: ACTIVE</span>
        </div>
        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex items-center justify-between p-2 rounded bg-slate-800/80 border border-slate-700/60">
            <span className="text-slate-300">1. Trigger: Customer Ticket</span>
            <span className="text-emerald-400 font-bold">✓ Parsed</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-teal-950/60 border border-teal-500/40">
            <span className="text-teal-300">2. Agent Action: ERP Lookup & Verification</span>
            <span className="text-teal-400 font-bold animate-pulse">Processing...</span>
          </div>
          <div className="flex items-center justify-between p-2 rounded bg-slate-800/50 text-slate-400">
            <span>3. Output: Auto-resolution & CRM Log</span>
            <span className="text-slate-500">Queued</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "workflow",
    icon: Repeat,
    title: "Workflow Automation & Pipelines",
    short: "Manual handoffs replaced by zero-downtime, self-healing event pipelines.",
    tags: ["Make & n8n", "Event streams", "Auto-healing queues"],
    href: "/services#system-integration",
    badge: "EVENT STREAM PIPELINE",
    visual: (
      <div className="w-full bg-gradient-to-r from-slate-900 to-navy-950 rounded-2xl p-5 mb-6 text-white border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-teal-400 font-bold uppercase tracking-wider">Pipeline Throughput</span>
          <span className="font-mono text-xs text-emerald-400 font-bold">99.99% Uptime</span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs mt-3">
          <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
            <span className="block text-slate-400 text-[10px] uppercase">Webhook</span>
            <span className="text-white font-bold text-sm">&lt; 10ms</span>
          </div>
          <div className="p-2.5 bg-teal-950/80 rounded-xl border border-teal-500/40">
            <span className="block text-teal-300 text-[10px] uppercase">Transform</span>
            <span className="text-teal-300 font-bold text-sm">Validated</span>
          </div>
          <div className="p-2.5 bg-slate-800/90 rounded-xl border border-slate-700">
            <span className="block text-slate-400 text-[10px] uppercase">Sync</span>
            <span className="text-emerald-400 font-bold text-sm">Zero Loss</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ai-integration",
    icon: Brain,
    title: "AI Integration & RAG Engines",
    short: "Fine-tuned models, RAG vector search, and document extraction inside your stack.",
    tags: ["Document OCR & RAG", "Vector search", "LLM fine-tuning"],
    href: "/services#ai-integration",
    badge: "RAG & VECTOR ENGINE",
    visual: (
      <div className="w-full bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-5 mb-6 text-white border border-slate-800 shadow-inner">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-xs text-indigo-400 font-bold uppercase tracking-wider">Vector Search Index</span>
          <span className="font-mono text-xs text-indigo-300 bg-indigo-900/60 px-2 py-0.5 rounded">Qdrant / LlamaIndex</span>
        </div>
        <div className="flex items-center gap-3 p-2.5 bg-indigo-950/60 rounded-xl border border-indigo-500/40 font-mono text-xs">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold">RAG</div>
          <div className="min-w-0 flex-1">
            <span className="block text-white font-semibold truncate">Semantic Retrieval over Docs</span>
            <span className="block text-indigo-300 text-[10px]">Deterministic Context Window</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "software",
    icon: Layers,
    title: "Custom Software Engineering",
    short: "Purpose-built enterprise platforms engineered around your proprietary workflows.",
    tags: ["Internal portals", "Custom ERP / CRM", "PostgreSQL"],
    href: "/services#custom-software",
  },
  {
    id: "systems",
    icon: Plug,
    title: "System Integration & Middleware",
    short: "Fragmented tools and legacy databases synced in real time with guaranteed transactional integrity.",
    tags: ["REST & GraphQL", "Bi-directional sync", "Apache Kafka"],
    href: "/services#system-integration",
  },
  {
    id: "fullstack",
    icon: Code2,
    title: "Full-Stack Development",
    short: "Modern React and Next.js 15 frontends paired with resilient, scalable microservices.",
    tags: ["Next.js 15 & React 19", "TypeScript", "Cloud Native"],
    href: "/services#custom-software",
  },
];

function TileCard({ t, featured }: { t: Tile; featured: boolean }) {
  const Icon = t.icon;
  return (
    <Link
      href={t.href}
      className={cn(
        "group relative flex h-full flex-col rounded-3xl p-6 sm:p-7 transition-all duration-300 bg-white border border-slate-200/80 shadow-md hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500",
        featured && "bg-gradient-to-b from-white to-slate-50/80"
      )}
    >
      {t.visual}

      <div className="flex items-center justify-between mb-4">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </span>
        {t.badge && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
            {t.badge}
          </span>
        )}
      </div>

      <h3 className={cn("font-bold text-slate-900 group-hover:text-teal-600 transition-colors", featured ? "text-xl sm:text-2xl" : "text-lg sm:text-xl")}>
        {t.title}
      </h3>

      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
        {t.short}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5 mb-6">
        {t.tags.map((tag) => (
          <li key={tag} className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[11px] font-medium text-slate-600">
            {tag}
          </li>
        ))}
      </ul>

      <span className="mt-auto pt-4 border-t border-slate-100 inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-600 group-hover:translate-x-1 transition-transform">
        Explore capability <ArrowRight className="h-4 w-4" />
      </span>
    </Link>
  );
}

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-slate-50/60 py-20 md:py-28 border-y border-slate-200/80">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            CORE CAPABILITIES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Six ways we <span className="text-teal-600">eliminate operational friction</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We build intelligent, high-reliability systems tailored to your specific bottlenecks, with no bloat and no disruption.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {TILES.map((t, i) => (
            <Reveal
              key={t.id}
              delay={i * 0.06}
              className={cn(
                "h-full",
                t.id === "agents" && "lg:col-span-6 lg:row-span-2",
                (t.id === "workflow" || t.id === "ai-integration") && "lg:col-span-6",
                !t.visual && "lg:col-span-4"
              )}
            >
              <TileCard t={t} featured={!!t.visual} />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Button href="/services" variant="primary" size="lg" iconRight={<ArrowRight className="ml-1 h-4 w-4" />}>
            EXPLORE ALL ENGINEERING SERVICES
          </Button>
          <Button href="/solutions" variant="outline-dark" size="lg">
            SEE INDUSTRY-SPECIFIC SOLUTIONS
          </Button>
        </div>
      </div>
    </section>
  );
}
