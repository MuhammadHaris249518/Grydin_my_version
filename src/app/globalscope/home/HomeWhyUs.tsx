import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "../ui/Button";

const PILLARS = [
  {
    step: "01",
    title: "Forensic Diagnosis First",
    desc: "We shadow real workflows and map every tool gap and data bottleneck before writing any code. You see the exact scope and architectural plan before we begin.",
    tag: "Audit Driven",
  },
  {
    step: "02",
    title: "Zero Stack Disruption",
    desc: "We connect seamlessly with your existing platforms, CRMs, and databases. No forced migrations, no team retraining, and zero operational downtime.",
    tag: "Native Connectors",
  },
  {
    step: "03",
    title: "Production Independence",
    desc: "Every system ships with complete architecture diagrams, automated runbooks, and synthetic tests so your team retains 100% operational ownership.",
    tag: "Full Documentation",
  },
];

export function HomeWhyUs() {
  return (
    <section id="why-us" className="relative w-full bg-navy py-24 md:py-32">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Why Choose GrydIn"
          title="Engineered for certainty, built for speed"
          accent="certainty"
          intro="We replace open-ended consulting retainers with forensic diagnosis, guaranteed delivery timelines, and fixed scopes. No vendor lock-in, no vague billable hours."
        />

        {/* Unified 4-Stat Band */}
        <Reveal delay={0.1}>
          <div className="mt-14 grid grid-cols-2 gap-y-10 border-y border-white/10 py-10 lg:grid-cols-4 lg:divide-x lg:divide-white/10">
            <div className="px-6 text-center lg:text-left">
              <p className="text-4xl sm:text-5xl font-semibold text-white">
                <CountUp to={20} suffix="+" />
              </p>
              <p className="mt-2 text-sm font-semibold text-teal-glow">Global clients</p>
              <p className="mt-1 text-sm text-slate-400">US, UK, Australia, Middle East & Pakistan</p>
            </div>

            <div className="px-6 text-center lg:text-left">
              <p className="text-4xl sm:text-5xl font-semibold text-white">
                <CountUp to={45} suffix="+" />
              </p>
              <p className="mt-2 text-sm font-semibold text-teal-glow">Production systems</p>
              <p className="mt-1 text-sm text-slate-400">Live automations, AI agents & bespoke platforms</p>
            </div>

            <div className="px-6 text-center lg:text-left">
              <p className="text-4xl sm:text-5xl font-semibold text-white">&lt; 14 Days</p>
              <p className="mt-2 text-sm font-semibold text-teal-glow">First deployment</p>
              <p className="mt-1 text-sm text-slate-400">Rapid turnaround from diagnosis to live release</p>
            </div>

            <div className="px-6 text-center lg:text-left">
              <p className="text-4xl sm:text-5xl font-semibold text-white">100%</p>
              <p className="mt-2 text-sm font-semibold text-teal-glow">Fixed-scope pricing</p>
              <p className="mt-1 text-sm text-slate-400">Capped budgets with zero retainer traps</p>
            </div>
          </div>
        </Reveal>

        {/* 3 Pillars as plain columns (no card boxes) */}
        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.1}>
              <div className="flex flex-col">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-teal-glow">{pillar.step}</span>
                  <span className="h-px w-6 bg-teal-glow/40" />
                  <span className="font-mono text-xs uppercase tracking-widest text-teal-glow/80">{pillar.tag}</span>
                </div>
                <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-slate-300">{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Action Banner */}
        <Reveal delay={0.2}>
          <div className="glass mt-16 rounded-2xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="max-w-xl text-center lg:text-left relative z-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-teal-glow mb-2">
                Proven Track Record
              </p>
              <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
                See the systems we have deployed for our clients.
              </h3>
              <p className="text-base text-slate-300 leading-relaxed">
                Review detailed case studies across logistics, legaltech, energy, and e-commerce with real architectural metrics.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 shrink-0">
              <Button href="/projects" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
                See our work
              </Button>
              <Button href="/solutions" variant="outline-light" size="lg">
                Explore Solutions
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
