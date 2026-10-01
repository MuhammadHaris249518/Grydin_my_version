import Link from "next/link";
import { ArrowRight, Target, AlertTriangle, Crosshair, Workflow, ShieldCheck, Rocket, Link2, FileText, CheckCircle2, GitPullRequest } from "lucide-react";
import { Button } from "../ui/Button";

const PROCESS_STEPS = [
  {
    step: "01",
    phase: "Diagnose",
    tagline: "UNDERSTAND BEFORE BUILDING",
    desc: "We map your workflow end-to-end — every manual gap, bottleneck, and hidden handoff costing your team time. Nothing gets built until we verify what is broken.",
    points: [
      {
        icon: Target,
        title: "Process Discovery",
        desc: "Shadowing how work really moves across your team and systems.",
      },
      {
        icon: AlertTriangle,
        title: "Gap & Bottleneck Audit",
        desc: "Isolating latency, manual copy-pasting, and recurring failure points.",
      },
      {
        icon: Crosshair,
        title: "System & API Verification",
        desc: "Verifying permissions, rate limits, schema models, and data purity.",
      },
    ],
  },
  {
    step: "02",
    phase: "Design",
    tagline: "ARCHITECT WITH INTENT",
    desc: "We scope only what moves the needle. No bloat, no needless complexity. You review and sign off on the exact architectural blueprint before code is written.",
    points: [
      {
        icon: Target,
        title: "Modular Architecture",
        desc: "Clean, maintainable structures engineered for scale and fast iteration.",
      },
      {
        icon: Workflow,
        title: "Workflow Blueprint",
        desc: "Every trigger, event payload, branch condition, and fallback mapped.",
      },
      {
        icon: ShieldCheck,
        title: "Security & Observability",
        desc: "Built-in error catching, retry queues, and unified audit logs.",
      },
    ],
  },
  {
    step: "03",
    phase: "Deploy",
    tagline: "AUTOMATE. INTEGRATE. DELIVER.",
    desc: "We ship fast, integrate quietly, and hand off documentation your team can actually understand. The system runs reliably — you notice it in the output.",
    points: [
      {
        icon: Rocket,
        title: "Seamless Production Release",
        desc: "Zero-downtime deployment verified with synthetic edge-case tests.",
      },
      {
        icon: Link2,
        title: "Deep Tool Synchronization",
        desc: "Your daily CRM, databases, and communication channels connected.",
      },
      {
        icon: FileText,
        title: "Full Documentation & Runbooks",
        desc: "Exhaustive handover guides so your internal engineers stay independent.",
      },
    ],
  },
];

export function HomeProcess() {
  return (
    <section id="methodology" className="relative w-full py-20 md:py-28 bg-[#f4f7fa] border-b border-surface-line overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d8b99] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4 leading-tight">
            How We Ship in Under Two Weeks
          </h2>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            A battle-tested framework engineered to deliver production-grade software and automations without endless scoping meetings or bloated budgets.
          </p>
        </div>

        {/* 3 Theme-Colored (#0d8b99 Teal) Process Boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="group relative bg-gradient-to-br from-[#0e95a4] via-[#0d8b99] to-[#09707c] rounded-2xl border border-white/20 hover:border-white/50 p-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-[#0d8b99]/30 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden text-white"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 group-hover:bg-white transition-colors duration-300" />

              <div>
                {/* Step header */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white/40 group-hover:text-white transition-colors">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-white bg-white/20 border border-white/30 px-3 py-1 rounded-full">
                    {step.phase}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1.5">{step.phase}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-white/80 mb-4">
                  {step.tagline}
                </p>

                <p className="text-sm text-white/90 leading-relaxed mb-6 font-normal">
                  {step.desc}
                </p>

                {/* Sub-points inside glassmorphic containers */}
                <div className="space-y-3 pt-4 border-t border-white/20">
                  {step.points.map((pt) => {
                    const Icon = pt.icon;
                    return (
                      <div
                        key={pt.title}
                        className="flex items-start gap-3 bg-white/15 border border-white/20 rounded-xl p-3 hover:bg-white/25 transition-colors"
                      >
                        <div className="w-7 h-7 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/30">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white mb-0.5">{pt.title}</h4>
                          <p className="text-xs text-white/85 leading-relaxed font-normal">
                            {pt.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-xs font-semibold text-white/90">
                <span>Phase {idx + 1} of 3</span>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Guaranteed Delivery</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm sm:text-base text-ink-muted mb-4">
            Want to see how this framework applies to your specific stack?
          </p>
          <Button href="/contact" variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
            Schedule a Process Diagnosis
          </Button>
        </div>
      </div>
    </section>
  );
}
