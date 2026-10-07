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
    <section id="why-us" className="relative w-full border-b border-slate-200/80 bg-white py-14 sm:py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="mb-8 max-w-3xl sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            WHY CHOOSE GRYDIN
          </div>
          <h2 className="mb-3 text-[clamp(1.65rem,7vw,2rem)] font-extrabold leading-tight tracking-tight text-slate-900 sm:mb-4 sm:text-4xl lg:text-5xl">
            Engineered for <span className="text-teal-600">certainty, built for speed</span>
          </h2>
          <p className="text-[13px] font-normal leading-relaxed text-slate-600 sm:text-lg">
            We replace open-ended consulting retainers with forensic diagnosis, guaranteed delivery timelines, and fixed scopes. No vendor lock-in, no vague billable hours.
          </p>
        </div>

        {/* Unified 4-Stat Band */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 border-y border-slate-200/80 py-7 sm:mt-8 sm:gap-x-6 sm:gap-y-8 sm:py-10 lg:grid-cols-4 lg:divide-x lg:divide-slate-200/80">
            <div className="min-w-0 px-1 text-left sm:px-4">
              <p className="text-3xl font-extrabold text-slate-900 font-mono sm:text-5xl">
                <CountUp to={20} suffix="+" />
              </p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Global clients</p>
              <p className="mt-1 text-xs text-slate-500">US, UK, Australia, Middle East & Pakistan</p>
            </div>

            <div className="min-w-0 px-1 text-left sm:px-4">
              <p className="text-3xl font-extrabold text-slate-900 font-mono sm:text-5xl">
                <CountUp to={45} suffix="+" />
              </p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Production systems</p>
              <p className="mt-1 text-xs text-slate-500">Live automations, AI agents & platforms</p>
            </div>

            <div className="min-w-0 px-1 text-left sm:px-4">
              <p className="text-2xl font-extrabold text-slate-900 font-mono sm:text-5xl">&lt; 14 Days</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">First deployment</p>
              <p className="mt-1 text-xs text-slate-500">Rapid turnaround from diagnosis to live release</p>
            </div>

            <div className="min-w-0 px-1 text-left sm:px-4">
              <p className="text-3xl font-extrabold text-slate-900 font-mono sm:text-5xl">100%</p>
              <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-teal-600">Fixed-scope pricing</p>
              <p className="mt-1 text-xs text-slate-500">Capped budgets with zero retainer traps</p>
            </div>
          </div>
        </Reveal>

        {/* 3 Pillars Cards */}
        <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mt-12 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <Reveal key={pillar.title} delay={i * 0.1} className="w-[84%] max-w-[350px] shrink-0 snap-start md:w-auto md:max-w-none md:shrink">
                <div className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/80 bg-slate-50/70 p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-teal-500/50 hover:bg-white hover:shadow-xl sm:p-7">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 border border-teal-100 font-bold">
                        <Icon className="h-5 w-5" strokeWidth={2} />
                      </span>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-md">
                        {pillar.tag}
                      </span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-slate-900 transition-colors group-hover:text-teal-600 sm:mb-3 sm:text-xl">
                      {pillar.title}
                    </h3>
                    <p className="text-[13px] font-normal leading-relaxed text-slate-600 sm:text-sm">
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
          <div className="mt-8 flex flex-col items-center justify-between gap-5 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-white shadow-2xl sm:mt-12 sm:gap-8 sm:p-10 lg:flex-row">
            <div className="max-w-xl text-center lg:text-left">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-teal-400 mb-2 block">
                PROVEN TRACK RECORD
              </span>
              <h3 className="mb-2 text-xl font-extrabold text-white sm:mb-3 sm:text-3xl">
                See the systems we have deployed for our clients.
              </h3>
              <p className="text-[13px] font-normal leading-relaxed text-slate-300 sm:text-sm">
                Review detailed case studies across logistics, legaltech, energy, and e-commerce with real architectural metrics.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col items-stretch justify-center gap-2 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
              <Button href="/solutions#client-projects" variant="primary" size="lg" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
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
