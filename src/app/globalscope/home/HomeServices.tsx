import Link from "next/link";
import { ArrowRight, Zap, Repeat, Brain, Layers, Plug, Code, type LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { Button } from "../ui/Button";
import { cn } from "@/lib/cn";

type Tile = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  tags: string[];
  href: string;
  slot?: string;
};

const TILES: Tile[] = [
  { id: "agents", icon: Zap, title: "AI Agents", short: "Autonomous agents that plan, decide and act across your tools, end to end.", tags: ["Autonomous workflows", "Tool-calling APIs", "Multi-model orchestration"], href: "/services#ai-agents", slot: "agents-workflow" },
  { id: "workflow", icon: Repeat, title: "Workflow Automation", short: "Manual handoffs replaced by resilient event pipelines.", tags: ["Make & n8n", "Event streams", "Auto-healing"], href: "/services#system-integration", slot: "workflow-pipeline" },
  { id: "ai-integration", icon: Brain, title: "AI Integration", short: "Fine-tuned models, RAG and document extraction inside your stack.", tags: ["Document OCR & RAG", "Vector search", "LLM fine-tuning"], href: "/services#ai-integration", slot: "rag-vector" },
  { id: "software", icon: Layers, title: "Custom Software", short: "Purpose-built systems around the way your company works.", tags: ["Internal portals", "Custom ERP / CRM"], href: "/services#custom-software" },
  { id: "systems", icon: Plug, title: "System Integration", short: "Fragmented tools and legacy databases synced in real time.", tags: ["REST & GraphQL", "Bi-directional sync"], href: "/services#system-integration" },
  { id: "fullstack", icon: Code, title: "Full-Stack Development", short: "Modern React and Next.js frontends on resilient backends.", tags: ["Next.js & React 19", "Microservices"], href: "/services#custom-software" },
];

function TileCard({ t, featured }: { t: Tile; featured: boolean }) {
  const Icon = t.icon;
  return (
    <Link
      href={t.href}
      className="glass group relative flex h-full flex-col rounded-2xl p-7 transition-[box-shadow,border-color] duration-300 hover:border-teal-glow/50 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-glow"
    >
      {t.slot && <ModelSlot label={t.slot} className="mb-6 min-h-[11rem] flex-1" />}
      <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-teal/20 text-teal-glow">
        <Icon className="h-5 w-5" />
      </span>
      <h3 className={cn("font-semibold text-white", featured ? "text-2xl" : "text-xl")}>{t.title}</h3>
      <p className="mt-2 text-base leading-relaxed text-slate-300">{t.short}</p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {t.tags.map((tag) => (
          <li key={tag} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-slate-300">
            {tag}
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-glow">
        Explore capability <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export function HomeServices() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy py-24 md:py-32">
      <div aria-hidden className="absolute inset-0 bg-circuit opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Core capabilities"
          title="Six ways we eliminate operational friction"
          accent="eliminate"
          intro="We build intelligent, high-reliability systems tailored to your specific bottlenecks, with no bloat and no disruption."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-12">
          {TILES.map((t, i) => (
            <Reveal
              key={t.id}
              delay={i * 0.06}
              className={cn(
                "h-full",
                t.id === "agents" && "lg:col-span-6 lg:row-span-2",
                (t.id === "workflow" || t.id === "ai-integration") && "lg:col-span-6",
                !t.slot && "lg:col-span-4"
              )}
            >
              <TileCard t={t} featured={!!t.slot} />
            </Reveal>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
          <Button href="/services" variant="primary" size="lg" iconRight={<ArrowRight className="ml-1 h-4 w-4" />}>
            Explore all engineering services
          </Button>
          <Button href="/solutions" variant="outline-light" size="lg">
            See industry-specific solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
