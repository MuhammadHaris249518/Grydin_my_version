import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProcessTimeline, type TimelineStep } from "@/components/motion/ProcessTimeline";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { Button } from "../ui/Button";

const PROCESS_STEPS: TimelineStep[] = [
  {
    step: "01",
    phase: "Diagnose",
    tagline: "UNDERSTAND BEFORE BUILDING",
    desc: "We map your workflow end-to-end — every manual gap, bottleneck, and hidden handoff costing your team time. Nothing gets built until we verify what is broken.",
    points: [
      {
        title: "Process Discovery",
        desc: "Shadowing how work really moves across your team and systems.",
      },
      {
        title: "Gap & Bottleneck Audit",
        desc: "Isolating latency, manual copy-pasting, and recurring failure points.",
      },
      {
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
        title: "Modular Architecture",
        desc: "Clean, maintainable structures engineered for scale and fast iteration.",
      },
      {
        title: "Workflow Blueprint",
        desc: "Every trigger, event payload, branch condition, and fallback mapped.",
      },
      {
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
        title: "Seamless Production Release",
        desc: "Zero-downtime deployment verified with synthetic edge-case tests.",
      },
      {
        title: "Deep Tool Synchronization",
        desc: "Your daily CRM, databases, and communication channels connected.",
      },
      {
        title: "Full Documentation & Runbooks",
        desc: "Exhaustive handover guides so your internal engineers stay independent.",
      },
    ],
  },
];

export function HomeProcess() {
  return (
    <section id="process" className="relative bg-navy-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Methodology"
          title="How we ship in under two weeks"
          accent="under two weeks"
          intro="A battle-tested framework engineered to deliver production-grade software and automations without endless scoping meetings or bloated budgets."
        />
        <div className="relative mt-16">
          <ModelSlot label="process-3d" className="absolute inset-x-0 -top-10 h-56 opacity-70 pointer-events-none" />
          <ProcessTimeline steps={PROCESS_STEPS} />
        </div>
        <div className="mt-16 text-center">
          <Button href="/contact" variant="primary" size="md">
            Schedule a process diagnosis
          </Button>
        </div>
      </div>
    </section>
  );
}
