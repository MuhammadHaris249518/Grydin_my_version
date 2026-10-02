import { ArrowRight, ShieldCheck, Zap, Lock, Award } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "../ui/Button";

const PILLARS = [
  {
    step: "01",
    icon: ShieldCheck,
    title: "Forensic Diagnosis First",
    desc: "We shadow real workflows and map every tool gap and data bottleneck before writing any code. You see the exact scope and architectural plan before we begin.",
    tag: "Audit Driven",
  },
  {
    step: "02",
    icon: Zap,
    title: "Zero Stack Disruption",
    desc: "We connect seamlessly with your existing platforms, CRMs, and databases. No forced migrations, no team retraining, and zero operational downtime.",
    tag: "Native Connectors",
  },
  {
    step: "03",
    icon: Lock,
    title: "Production Independence",
    desc: "Every system ships with complete architecture diagrams, automated runbooks, and synthetic tests so your team retains 100% operational ownership.",
    tag: "Full Ownership",
  },
];

export function HomeWhyUs() {
  return (
    <section id="why-us" className="relative w-full bg-white py-20 md:py-28 border-b border-slate-200/80">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            WHY CHOOSE GRYDIN
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Engineered for <span className="text-teal-600">certainty, built for speed</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            We replace open-ended consulting retainers with forensic diagnosis, guaranteed delivery timelines, and fixed scopes. No vendor lock-in, no vague billable hours.
          </p>
        </div>

        {/* Unified 4-Stat Band */}
        <Reveal delay={0.1}>
          <div className="mt-8 grid grid-cols-2 gap-y-8 gap-x-6 border-y border-slate-200/80 py-10 lg:grid-cols-4 lg:divide-x lg:divide-slate-200/80">
            <div className="px-4 text-left">
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                <CountUp to={20} suffix="+" />
              </p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Global clients</p>
              <p className="mt-1 text-xs text-slate-500">US, UK, Australia, Middle East & Pakistan</p>
            </div>

            <div className="px-4 text-left">
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">
                <CountUp to={45} suffix="+" />
              </p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Production systems</p>
              <p className="mt-1 text-xs text-slate-500">Live automations, AI agents & platforms</p>
            </div>

            <div className="px-4 text-left">
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">&lt; 14 Days</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">First deployment</p>
              <p className="mt-1 text-xs text-slate-500">Rapid turnaround from diagnosis to live release</p>
            </div>

            <div className="px-4 text-left">
              <p className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono">100%</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Fixed-scope pricing</p>
              <p className="mt-1 text-xs text-slate-500">Capped budgets with zero retainer traps</p>
            </div>
          </div>
        </Reveal>

        {/* 3 Pillars Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.1}>
                <div className="group h-full bg-slate-50/70 border border-slate-200/80 shadow-sm rounded-3xl p-7 hover:bg-white hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 font-bold">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Action Banner */}
        <Reveal delay={0.2}>
          <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-800 shadow-2xl">
            <div className="max-w-xl text-center lg:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 block">
                PROVEN TRACK RECORD
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                See the systems we have deployed for our clients.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Review detailed case studies across logistics, legaltech, energy, and e-commerce with real architectural metrics.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <Button href="/projects" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
                SEE OUR WORK
              </Button>
              <Button href="/solutions" variant="outline-dark" size="lg">
                EXPLORE SOLUTIONS
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
