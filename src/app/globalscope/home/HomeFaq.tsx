import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
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
    <section id="faq" className="relative bg-navy-950 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-4xl px-6 sm:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything you need to know about our engineering model"
          accent="engineering model"
          align="center"
          intro="Clear answers regarding our turnaround times, architectural handovers, pricing guarantees, and integration capabilities."
        />

        <div className="mt-14 space-y-4">
          {FAQS.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <details className="glass group rounded-2xl p-6 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-white focus:outline-none">
                  <span>{faq.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/5 text-teal-glow transition-transform duration-300 group-open:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-white/10 text-base leading-relaxed text-slate-300">
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
