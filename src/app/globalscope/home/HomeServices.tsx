import Link from "next/link";
import { ArrowRight, Zap, Repeat, Brain, Layers, Plug, Code } from "lucide-react";
import { Section } from "../ui/Section";
import { Card } from "../ui/Card";
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
    desc: "We eliminate the manual handoffs between your platforms, teams, and data streams. Built on robust event pipelines with zero operational downtime.",
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
    <Section
      id="services"
      tone="white"
      eyebrow="Core Capabilities"
      title="Six Ways We Eliminate Operational Friction"
      intro="We build intelligent, high-reliability systems tailored to your specific bottlenecks — no bloat, no disruption."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {SERVICES_DATA.map((service) => {
          const Icon = service.icon;
          return (
            <Card
              key={service.title}
              href={service.href}
              className="p-6 sm:p-8 flex flex-col justify-between h-full"
            >
              <div>
                <div className="w-12 h-12 rounded-lg bg-teal/10 text-teal flex items-center justify-center mb-6 group-hover:bg-teal group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.8} />
                </div>

                <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-teal transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-ink-muted leading-relaxed mb-6">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium bg-surface-soft text-slate-600 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-surface-line/60 flex items-center justify-between text-sm font-semibold text-teal group-hover:translate-x-1 transition-transform">
                <span>Explore capability</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-4">
        <Button href="/services" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
          Explore All Engineering Services
        </Button>
        <Button href="/solutions" variant="outline-dark" size="lg">
          See Industry-Specific Solutions
        </Button>
      </div>
    </Section>
  );
}
