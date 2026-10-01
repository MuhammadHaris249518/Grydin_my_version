import Link from "next/link";
import { ArrowRight, Target, AlertTriangle, Crosshair, Workflow, ShieldCheck, Rocket, Link2, FileText, CheckCircle2 } from "lucide-react";
import { Section } from "../ui/Section";
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
    <Section
      id="methodology"
      tone="white"
      eyebrow="Methodology"
      title="How We Ship in Under Two Weeks"
      intro="A battle-tested framework engineered to deliver production-grade software and automations without endless scoping meetings or bloated budgets."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
        {PROCESS_STEPS.map((step, idx) => (
          <div
            key={step.step}
            className="bg-white rounded-2xl border border-surface-line p-8 flex flex-col justify-between hover:shadow-lg hover:border-slate-300 transition-all duration-300 relative group"
          >
            {/* Step badge */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl sm:text-4xl font-black text-slate-200 group-hover:text-teal transition-colors">
                  {step.step}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-teal bg-teal/10 px-3 py-1 rounded-full">
                  {step.phase}
                </span>
              </div>

              <h3 className="text-xl font-bold text-ink mb-1">{step.phase}</h3>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
                {step.tagline}
              </p>

              <p className="text-sm text-ink-muted leading-relaxed mb-6">
                {step.desc}
              </p>

              {/* Sub-points */}
              <div className="space-y-4 pt-4 border-t border-surface-line/60">
                {step.points.map((pt) => {
                  const Icon = pt.icon;
                  return (
                    <div key={pt.title} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-md bg-surface-soft text-teal flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-ink">{pt.title}</h4>
                        <p className="text-xs text-ink-muted leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-surface-line/60 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>Phase {idx + 1} of 3</span>
              <CheckCircle2 className="w-4 h-4 text-teal" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm text-ink-muted mb-4">
          Want to see how this framework applies to your specific stack?
        </p>
        <Button href="/contact" variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4 ml-1" />}>
          Schedule a Process Diagnosis
        </Button>
      </div>
    </Section>
  );
}
