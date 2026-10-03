import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { Clock, Plug, BarChart3, AlertTriangle } from "lucide-react";

const PROBLEMS = [
  {
    num: "01",
    icon: Clock,
    title: "Manual Handoffs & Approvals",
    desc: "Critical workflows stall across inbox threads and chat pings while employees manually copy-paste data between tools.",
    tag: "High Time Friction",
  },
  {
    num: "02",
    icon: Plug,
    title: "Disconnected Tool Silos",
    desc: "Your CRM, ERP, and databases operate as isolated silos, requiring continuous manual reconciliations and duplicate data entry.",
    tag: "Data Inconsistency",
  },
  {
    num: "03",
    icon: BarChart3,
    title: "Delayed Executive Insights",
    desc: "Leadership waits days or weeks for manual spreadsheet compilation instead of acting on continuous, real-time verified intelligence.",
    tag: "Decision Blind Spots",
  },
];

export function HomeProblem() {
  return (
    <section className="relative bg-slate-50/60 py-20 md:py-28 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            OPERATIONAL BOTTLENECKS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Where operations quietly <span className="text-teal-600">leak time and margin</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Most organizations do not have an execution problem. They have an infrastructure problem where valuable engineering and operations hours vanish into repetitive friction.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {PROBLEMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <Reveal key={p.num} delay={i * 0.1}>
                <div className="group h-full bg-white border border-slate-200/80 shadow-md rounded-3xl p-7 hover:shadow-xl hover:border-teal-500/50 hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center justify-center text-teal-600 font-bold">
                        <Icon className="h-7 w-7 text-teal-600" strokeWidth={2.2} />
                      </div>
                      <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">
                        {p.num}
                      </span>
                    </div>

                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-teal-800 bg-[#E5F7F4] border border-teal-200/90 px-2.5 py-1 rounded-md mb-3">
                      {p.tag}
                    </span>

                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                      {p.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
