"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Play, Cpu, Database, Zap, RefreshCw, Terminal } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "../ui/Button";

const CHECKLIST = [
  "Sub-second event detection triggers autonomous workflows instantly across your stack.",
  "Deterministic guardrails validate structured payloads before executing downstream tool calls.",
  "Live telemetry streams execution logs and status directly into your audit command center.",
];

const ARCHITECTURE_DEMOS = [
  {
    id: "agents",
    title: "Multi-Agent Triage",
    desc: "Autonomous email parsing, document verification, and ERP record updates.",
    steps: [
      { label: "Trigger: Inbound Invoice PDF", time: "+12ms", status: "Verified" },
      { label: "Agent Vision OCR Extraction", time: "+140ms", status: "Extracted" },
      { label: "SAP / ERP Validation Check", time: "+280ms", status: "Matched" },
      { label: "Approval & CRM Status Sync", time: "+410ms", status: "Executed" },
    ],
  },
  {
    id: "rag",
    title: "Document RAG Pipeline",
    desc: "High-throughput vector search and legal clause extraction.",
    steps: [
      { label: "Query: Compliance SLA Clause 4.2", time: "+8ms", status: "Received" },
      { label: "Vector Search (Qdrant Index)", time: "+45ms", status: "Top 3 Chunks" },
      { label: "LLM Context Window Synthesis", time: "+190ms", status: "Synthesized" },
      { label: "Audit Log & Citation Guardrail", time: "+310ms", status: "Passed" },
    ],
  },
  {
    id: "sync",
    title: "Real-Time System Sync",
    desc: "Bi-directional event streaming across legacy SQL and cloud APIs.",
    steps: [
      { label: "Event: Order Placed on Shopify", time: "+5ms", status: "Captured" },
      { label: "Kafka Event Bus Dispatch", time: "+18ms", status: "Dispatched" },
      { label: "Inventory Reservation Lock", time: "+90ms", status: "Reserved" },
      { label: "Warehouse Dispatch Sync", time: "+160ms", status: "Completed" },
    ],
  },
];

export function HomeSeeItWork() {
  const [activeDemo, setActiveDemo] = useState(0);

  const demo = ARCHITECTURE_DEMOS[activeDemo];

  return (
    <section className="relative bg-white py-20 md:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
                <span className="w-4 h-0.5 bg-teal-600" />
                LIVE ARCHITECTURE
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                See autonomous systems in <span className="text-teal-600">live production</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
                Watch how GrydIn-engineered agents coordinate across databases, APIs, and interfaces without latency or human intervention.
              </p>

              <ul className="space-y-4 mb-10">
                {CHECKLIST.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 font-medium">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-200 mt-0.5">
                      <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center gap-4">
                <Button href="/services" variant="primary" size="md" iconRight={<ArrowRight className="h-4 w-4" />}>
                  EXPLORE ENGINEERING SPECS
                </Button>
                <Button href="/contact" variant="outline-dark" size="md">
                  REQUEST LIVE DEMO
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Right Live Interactive Cockpit Column (No placeholdes!) */}
          <div className="lg:col-span-7">
            <Reveal delay={0.15}>
              <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-2xl">
                {/* Top Control Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="font-mono text-xs text-slate-400 font-bold ml-2">PRODUCTION EXECUTION BUS</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-800 p-1 rounded-xl">
                    {ARCHITECTURE_DEMOS.map((d, i) => (
                      <button
                        key={d.id}
                        onClick={() => setActiveDemo(i)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                          activeDemo === i
                            ? "bg-teal-600 text-white shadow-xs"
                            : "text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {d.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subtitle / Spec */}
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="font-mono text-base font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-teal-400" />
                      {demo.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-mono">{demo.desc}</p>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-md uppercase font-bold tracking-wider animate-pulse">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* Simulated Step Execution Stream */}
                <div className="space-y-3 font-mono text-xs">
                  {demo.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:border-teal-500/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-[10px] font-bold">
                          0{sIdx + 1}
                        </span>
                        <span className="text-slate-200 font-semibold">{step.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400 text-[11px]">{step.time}</span>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/40">
                          {step.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Status Terminal Output Bar */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-teal-400" />
                    <span>Audit Trail: 100% Deterministic & Immutable</span>
                  </div>
                  <span className="text-teal-400 font-bold">LATENCY: &lt; 500MS</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
