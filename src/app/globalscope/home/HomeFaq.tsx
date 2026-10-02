import { ChevronDown, HelpCircle } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

export const FAQS = [
  {
    q: "How does guaranteed fixed-scope pricing work?",
    a: "Before writing any code, we conduct a forensic architecture audit to map every API, data schema, and workflow boundary. We provide an exact, itemized specification and fixed-price agreement. You never pay unexpected billable hours or open-ended consulting retainers.",
  },
  {
    q: "What does the 'under two weeks' timeline cover?",
    a: "Our two-week delivery cycle covers diagnosis, architectural blueprinting, core system engineering, integration testing, and staging deployment of your primary automation pipeline or core platform MVP.",
  },
  {
    q: "Which tools, databases, and APIs do you integrate with?",
    a: "We integrate with any platform offering an API, webhook, or database connection. Common integrations include PostgreSQL, MongoDB, Redis, Salesforce, HubSpot, Stripe, Shopify, OpenAI, Anthropic Claude, custom REST/gRPC endpoints, and legacy SQL databases.",
  },
  {
    q: "Who owns the code and intellectual property once deployed?",
    a: "You own 100% of the code, schemas, and intellectual property. All repositories, Docker containers, and deployment scripts are transferred directly to your organization upon milestone completion with zero licensing lock-in.",
  },
  {
    q: "What support and maintenance do you provide after launch?",
    a: "Every project includes comprehensive documentation, architecture runbooks, and staff enablement. We provide 30 days of included post-launch warranty support, plus optional SLA-backed monitoring and continuous feature enhancement agreements.",
  },
];

export function HomeFaq() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <section id="faq" className="relative bg-white py-20 md:py-28 border-b border-slate-200/80">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 mb-3">
            <span className="w-4 h-0.5 bg-teal-600" />
            FREQUENTLY ASKED QUESTIONS
            <span className="w-4 h-0.5 bg-teal-600" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            Everything you need to know about our <span className="text-teal-600">engineering model</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Clear answers regarding our turnaround times, architectural handovers, pricing guarantees, and integration capabilities.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <details className="group rounded-2xl bg-white border border-slate-200/80 shadow-md p-6 transition-all duration-300 hover:border-teal-500/50 hover:shadow-lg [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-base sm:text-lg font-bold text-slate-900 focus:outline-none">
                  <span className="group-open:text-teal-700 transition-colors">{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 border border-teal-100 transition-transform duration-300 group-open:rotate-180 group-open:bg-teal-600 group-open:text-white">
                    <ChevronDown className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm leading-relaxed text-slate-600 font-normal">
                  {faq.a}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
