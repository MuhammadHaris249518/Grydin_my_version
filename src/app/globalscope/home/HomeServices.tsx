import Link from "next/link";
import { ArrowRight, Zap, Repeat, Brain, Layers, Plug, Code, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

const SERVICES_DATA = [
  {
    icon: Zap,
    title: "AI Agents",
    desc: "Autonomous agents that plan, decide, and act across your tools — executing complex multi-step workflows end-to-end without manual intervention.",
    tags: ["Autonomous Workflows", "Tool-Calling APIs", "Multi-Model Orchestration"],
    href: "/services",
  },
  {
    icon: Repeat,
    title: "Workflow Automation",
    desc: "We eliminate manual handoffs between your platforms, teams, and data streams. Built on robust event pipelines with zero operational downtime.",
    tags: ["Make & n8n Architecture", "Cross-Platform Sync", "Error Recovery Queues"],
    href: "/services",
  },
  {
    icon: Brain,
    title: "AI Integration",
    desc: "Embed fine-tuned models, document extraction pipelines, and automated decision engines directly into your daily operational stack and databases.",
    tags: ["Document OCR & RAG", "Vector Search", "Custom LLM Fine-Tuning"],
    href: "/services",
  },
  {
    icon: Layers,
    title: "Custom Software",
    desc: "Purpose-built systems designed around the way your company actually works. Clean architecture, robust database design, and no bloated subscriptions.",
    tags: ["Internal Portals", "Custom ERP / CRM", "Automated Billing Engines"],
    href: "/services",
  },
  {
    icon: Plug,
    title: "System Integration",
    desc: "Connect your fragmented tools, legacy databases, and cloud APIs into one synchronized, real-time data ecosystem with complete observability.",
    tags: ["REST & GraphQL Bridges", "Bi-Directional Sync", "Legacy System Connectors"],
    href: "/services",
  },
  {
    icon: Code,
    title: "Full-Stack Development",
    desc: "End-to-end product engineering from modern React & Next.js frontends to resilient backend microservices. Production-ready and built to scale.",
    tags: ["Next.js & React 19", "Microservices & Cloud", "Enterprise CI/CD"],
    href: "/services",
  },
];

export function HomeServices() {
  return (
    <section id="services" className="relative w-full py-20 md:py-28 bg-[#f4f7fa] border-b border-surface-line overflow-hidden">
      {/* Background subtle mesh glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0d8b99]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#0d8b99]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d8b99] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4 leading-tight">
            Six Ways We Eliminate Operational Friction
          </h2>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            We build intelligent, high-reliability systems tailored to your specific bottlenecks — no bloat, no disruption.
          </p>
        </div>

        {/* 6 Themed Grid Boxes with Teal Theme Color (#0d8b99) & Crisp White Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SERVICES_DATA.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group relative bg-gradient-to-br from-[#0e95a4] via-[#0d8b99] to-[#09707c] rounded-2xl p-7 sm:p-8 flex flex-col justify-between border border-white/20 hover:border-white/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#0d8b99]/30 hover:-translate-y-1.5 overflow-hidden text-white"
              >
                {/* Ambient corner light on hover */}
                <div className="absolute -top-16 -right-16 w-40 h-40 bg-white/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

                {/* Top accent highlight bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white transition-colors duration-300" />

                <div className="relative z-10">
                  {/* Glowing Icon Container */}
                  <div className="w-14 h-14 rounded-xl bg-white/20 border border-white/30 text-white flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#0d8b99] group-hover:scale-105 group-hover:shadow-lg transition-all duration-300">
                    <Icon className="w-7 h-7" strokeWidth={2} />
                  </div>

                  {/* Crisp White Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight group-hover:translate-x-0.5 transition-transform">
                    {service.title}
                  </h3>

                  {/* High-Contrast White Description */}
                  <p className="text-sm text-white/90 leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>

                  {/* Glassmorphic Tag Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold bg-white/20 text-white border border-white/25 px-3 py-1 rounded-md backdrop-blur-sm group-hover:bg-white/30 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link with White & Arrow */}
                <div className="relative z-10 pt-4 border-t border-white/20 flex items-center justify-between text-sm font-bold text-white group-hover:text-white transition-colors">
                  <span className="tracking-wide">Explore capability</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-[#0d8b99] group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="mt-14 sm:mt-18 flex flex-wrap items-center justify-center gap-4">
          <Button href="/services" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
            Explore All Engineering Services
          </Button>
          <Button href="/solutions" variant="outline-dark" size="lg">
            See Industry-Specific Solutions
          </Button>
        </div>
      </div>
    </section>
  );
}
