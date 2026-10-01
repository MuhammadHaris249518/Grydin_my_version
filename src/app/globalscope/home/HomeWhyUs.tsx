import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap, Clock, Users, Cpu, FileCheck, Award } from "lucide-react";
import { Button } from "../ui/Button";

const METRICS = [
  {
    value: "20+",
    label: "Global Clients",
    detail: "US, UK, Australia, Middle East & Pakistan",
    icon: Users,
    glow: "from-teal/30 to-transparent",
  },
  {
    value: "45+",
    label: "Production Systems",
    detail: "Live automations, AI agents & bespoke platforms",
    icon: Cpu,
    glow: "from-sky-500/30 to-transparent",
  },
  {
    value: "< 14 Days",
    label: "First Deployment",
    detail: "Rapid turnaround from diagnosis to live release",
    icon: Clock,
    glow: "from-emerald-500/30 to-transparent",
  },
  {
    value: "100%",
    label: "Fixed-Scope Pricing",
    detail: "Capped budgets with zero retainer traps",
    icon: FileCheck,
    glow: "from-blue-500/30 to-transparent",
  },
];

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
    <section id="why-us" className="relative w-full py-20 md:py-28 bg-white border-b border-surface-line overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-teal/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy text-teal text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm border border-navy-700">
            <Award className="w-3.5 h-3.5" />
            <span>Why Choose GrydIn</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4 leading-tight">
            Engineered for Certainty, Built for Speed
          </h2>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            We replace open-ended consulting retainers with forensic diagnosis, guaranteed delivery timelines, and fixed scopes. No vendor lock-in, no vague billable hours.
          </p>
        </div>

        {/* 4 Theme-Colored Performance Metric Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="group relative bg-gradient-to-br from-[#061f3d] via-[#04172e] to-[#020e1d] rounded-2xl p-7 border border-white/10 hover:border-teal/60 transition-all duration-300 hover:shadow-xl hover:shadow-teal/15 hover:-translate-y-1 overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle corner light */}
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-br ${metric.glow} rounded-full blur-xl group-hover:scale-125 transition-transform duration-500 pointer-events-none`}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-teal transition-colors">
                      {metric.value}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 text-teal flex items-center justify-center group-hover:bg-teal group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <p className="text-base font-bold text-white mb-1.5">{metric.label}</p>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">{metric.detail}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-teal">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Production Metric</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3 Theme-Colored Architecture Pillar Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="group relative bg-gradient-to-br from-[#061f3d] via-[#04172e] to-[#020e1d] rounded-2xl p-7 sm:p-8 border border-white/10 hover:border-teal/60 transition-all duration-300 hover:shadow-xl hover:shadow-teal/15 flex flex-col justify-between overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-teal text-white flex items-center justify-center font-black text-sm shadow-md shadow-teal/30">
                    {pillar.step}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-teal" />
                <span>GrydIn Standard Guarantee</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner with prominent "Check Our Work" button linking to /projects */}
        <div className="bg-gradient-to-r from-[#031326] via-[#04172e] to-[#08284d] rounded-2xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl border border-white/15">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl text-center lg:text-left relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal mb-3">
              Proven Track Record
            </p>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-3 leading-snug">
              See the systems we have deployed for our clients.
            </h3>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
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
      </div>
    </section>
  );
}
