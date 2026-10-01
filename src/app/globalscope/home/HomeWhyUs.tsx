import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Clock, Users, Cpu, FileCheck } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";

const METRICS = [
  {
    value: "20+",
    label: "Global Clients",
    detail: "US, UK, Australia, Middle East & Pakistan",
    icon: Users,
  },
  {
    value: "45+",
    label: "Production Systems",
    detail: "Live automations, AI agents & bespoke platforms",
    icon: Cpu,
  },
  {
    value: "< 14 Days",
    label: "First Deployment",
    detail: "Rapid turnaround from diagnosis to live release",
    icon: Clock,
  },
  {
    value: "100%",
    label: "Fixed-Scope Pricing",
    detail: "Capped budgets with zero retainer traps",
    icon: FileCheck,
  },
];

const PILLARS = [
  {
    title: "Forensic Diagnosis First",
    desc: "We shadow real workflows and map every tool gap and data bottleneck before writing any code. You see the exact scope before we begin.",
  },
  {
    title: "Zero Stack Disruption",
    desc: "We connect seamlessly with your existing platforms, CRMs, and databases. No forced migrations, no team retraining, no downtime.",
  },
  {
    title: "Production-Grade Independence",
    desc: "Every system ships with complete architecture diagrams, automated runbooks, and synthetic tests so your team retains total ownership.",
  },
];

export function HomeWhyUs() {
  return (
    <Section
      id="why-us"
      tone="soft"
      eyebrow="Why Choose GrydIn"
      title="Engineered for Certainty, Built for Speed"
      intro="We replace open-ended consulting retainers with forensic diagnosis, guaranteed delivery timelines, and fixed scopes. No vendor lock-in, no vague billable hours."
    >
      {/* 4 Performance Metric Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
        {METRICS.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.label}
              className="bg-white rounded-xl p-6 sm:p-7 border border-surface-line shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-black text-navy tracking-tight">
                  {metric.value}
                </span>
                <div className="w-10 h-10 rounded-lg bg-teal/10 text-teal flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-base font-bold text-ink mb-1">{metric.label}</p>
              <p className="text-xs text-ink-muted leading-relaxed">{metric.detail}</p>
            </div>
          );
        })}
      </div>

      {/* 3 Core Value Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {PILLARS.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="bg-white rounded-xl p-6 sm:p-8 border border-surface-line flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-ink">{pillar.title}</h3>
              </div>
              <p className="text-sm text-ink-muted leading-relaxed">
                {pillar.desc}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-surface-line/60 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-teal" />
              <span>GrydIn Standard Guarantee</span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Banner with prominent "Check Our Work" button linking to /projects */}
      <div className="bg-navy rounded-2xl p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal/15 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-xl text-center lg:text-left relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-2">
            Proven Track Record
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
            See the systems we have deployed for our clients.
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Review detailed case studies across logistics, legaltech, energy, and e-commerce with real architectural metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 shrink-0">
          <Button
            href="/projects"
            variant="primary"
            size="lg"
            iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
          >
            Check Our Work
          </Button>

          <Button
            href="/solutions"
            variant="outline-light"
            size="lg"
          >
            Explore Solutions
          </Button>
        </div>
      </div>
    </Section>
  );
}
