import type { Metadata } from "next";
import { SITE } from "@/app/globalscope/site-config";

export const SITE_URL = "https://grydin.co";

const OG_IMAGE = {
  url: "/brand/og-image.png",
  width: 1200,
  height: 630,
  alt: "GrydIn — AI automation and custom software company",
};

export const SERVICE_SEO = [
  {
    name: "AI Agents",
    slug: "ai-agents",
    summary:
      "Autonomous AI agents that plan, decide, and execute multi-step business workflows without constant human intervention.",
    keywords: [
      "custom AI agents",
      "AI agent development services",
      "autonomous AI agents for business",
      "multi-step AI agents",
      "AI agents for workflow automation",
      "intelligent automation agents",
      "business AI agents",
      "agentic AI development",
    ],
  },
  {
    name: "Workflow Automation",
    slug: "workflow-automation",
    summary:
      "End-to-end workflow mapping and automation across tools using Make.com, n8n, or custom code — without migration or disruption.",
    keywords: [
      "workflow automation services",
      "business process automation",
      "n8n automation services",
      "Make.com automation agency",
      "cross-platform workflow automation",
      "process automation consulting",
      "business workflow automation company",
      "no-code automation services",
    ],
  },
  {
    name: "AI Integration",
    slug: "ai-integration",
    summary:
      "LLM and AI model integration into existing products, pipelines, and decision systems — scoped to your data and business logic.",
    keywords: [
      "AI integration services",
      "LLM integration for business",
      "enterprise AI integration",
      "document processing AI",
      "AI decision engine development",
      "GPT Claude integration business",
      "custom prompt engineering services",
      "AI-powered document classification",
    ],
  },
  {
    name: "Custom Software",
    slug: "custom-software",
    summary:
      "Bespoke web and mobile software built around how your business actually works — dashboards, internal tools, and scalable backends.",
    keywords: [
      "custom software development company",
      "bespoke software development",
      "custom web application development",
      "internal tools development",
      "business software development",
      "custom SaaS development",
      "tailored software solutions",
    ],
  },
  {
    name: "System Integration",
    slug: "system-integration",
    summary:
      "API design, legacy connections, and real-time data sync that wires disconnected platforms into one coherent automated operation.",
    keywords: [
      "system integration services",
      "API integration services",
      "legacy system integration",
      "third-party integration services",
      "real-time data sync automation",
      "CRM ERP integration",
      "webhook infrastructure development",
      "event-driven architecture integration",
    ],
  },
  {
    name: "Full-Stack Development",
    slug: "full-stack-development",
    summary:
      "Production-ready product builds — React, Node.js, Flutter, APIs, cloud deployment, CI/CD, and post-launch support.",
    keywords: [
      "full-stack development services",
      "React Node.js development company",
      "Flutter app development services",
      "SaaS development company",
      "REST GraphQL API development",
      "cloud deployment CI/CD services",
      "startup MVP development",
    ],
  },
] as const;

export const GLOBAL_KEYWORDS = [
  "AI automation company",
  "AI automation agency",
  "business AI automation",
  "software automation company",
  "workflow automation services",
  "custom AI agents",
  "AI integration services",
  "custom software development",
  "system integration services",
  "full-stack development services",
  "process automation consulting",
  "eliminate manual work",
  "business process automation",
  "AI automation Pakistan",
  "software development Islamabad",
  "remote automation company",
  "fixed scope software projects",
  "fast deployment automation",
];

const baseOpenGraph = {
  siteName: SITE.name,
  locale: "en_US",
  type: "website" as const,
  images: [OG_IMAGE],
};

const baseTwitter = {
  card: "summary_large_image" as const,
  images: [OG_IMAGE.url],
};

function buildMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...baseTwitter,
      title,
      description,
    },
  };
}

export const homeMetadata = buildMetadata({
  title: "GrydIn | AI Automation, Workflow Automation & Custom Software",
  description:
    "GrydIn is an AI automation and custom software company based in Islamabad, Pakistan — working globally. We eliminate invisible manual work with AI agents, workflow automation, AI integration, system integration, and full-stack development. Diagnosis first. Fixed scope. First deployment in under two weeks.",
  path: "/",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "we grid what your business overlooks",
    "visibility problem automation",
    "async-first automation agency",
    "outcome-based automation",
  ],
});

export const servicesMetadata = buildMetadata({
  title: "AI Automation Services — Agents, Workflows, Integration & Software",
  description:
    "Explore GrydIn's six core services: custom AI agents, workflow automation (Make.com & n8n), AI integration, custom software, system integration, and full-stack development. Fixed-scope projects with clear deliverables — scoped after diagnosis, deployed fast.",
  path: "/services",
  keywords: [
    ...GLOBAL_KEYWORDS,
    ...SERVICE_SEO.flatMap((service) => [...service.keywords]),
  ],
});

export const aboutMetadata = buildMetadata({
  title: "About GrydIn — AI Automation Company in Islamabad, Working Globally",
  description:
    "GrydIn surfaces the invisible work slowing teams down — manual handoffs, copy-paste, and gaps between tools — then eliminates it without disruption. Learn our beliefs, origin story, and how we diagnose before we build.",
  path: "/about",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "about GrydIn",
    "AI automation company Pakistan",
    "automation should be invisible",
    "diagnosis before build",
    "fixed scope fixed quote automation",
  ],
});

export const contactMetadata = buildMetadata({
  title: "Contact GrydIn — Start Your Automation or Software Project",
  description:
    "Tell GrydIn what's slowing your business down. No pitch deck — an honest, scoped response within one business day. Email hello@grydin.co, WhatsApp +92 329 6637320, or use our contact form.",
  path: "/contact",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "contact AI automation agency",
    "hire workflow automation company",
    "automation project quote",
    "software development inquiry",
    "GrydIn contact",
  ],
});

export const rootMetadata: Metadata = {
  ...homeMetadata,
  metadataBase: new URL(SITE_URL),
  title: {
    default: "GrydIn | AI Automation, Workflow Automation & Custom Software",
    template: "%s | GrydIn",
  },
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
};

function serviceOfferCatalog() {
  return SERVICE_SEO.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.summary,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      serviceType: service.name,
    },
  }));
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE.legalName,
    alternateName: SITE.name,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.png`,
    image: `${SITE_URL}/brand/og-image.png`,
    description:
      "Software and AI automation company based in Islamabad, Pakistan. GrydIn eliminates invisible manual work with AI agents, workflow automation, AI integration, custom software, system integration, and full-stack development.",
    email: SITE.email,
    telephone: SITE.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: "PK",
    },
    areaServed: "Worldwide",
    knowsAbout: SERVICE_SEO.map((service) => service.name),
    sameAs: [SITE.linkedin],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GrydIn Services",
      itemListElement: serviceOfferCatalog(),
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE.name,
    url: SITE_URL,
    description: homeMetadata.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function professionalServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professional-service`,
    name: SITE.name,
    url: SITE_URL,
    image: `${SITE_URL}/brand/og-image.png`,
    description: homeMetadata.description,
    priceRange: "$$",
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressCountry: "PK",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GrydIn Automation & Software Services",
      itemListElement: serviceOfferCatalog(),
    },
  };
}

export function webPageJsonLd({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}#webpage`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function servicesPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "GrydIn Services",
    description: servicesMetadata.description,
    itemListElement: SERVICE_SEO.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.summary,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: "Worldwide",
        serviceType: service.name,
      },
    })),
  };
}

export function faqJsonLd(
  items: Array<{ question: string; answer: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const servicesFaq = [
  {
    question: "What services does GrydIn offer?",
    answer:
      "GrydIn offers six core services: AI Agents, Workflow Automation, AI Integration, Custom Software, System Integration, and Full-Stack Development. Every project starts with a workflow diagnosis before anything is built.",
  },
  {
    question: "How long does a typical GrydIn project take to deploy?",
    answer:
      "Most GrydIn projects ship a working first deployment within two weeks of kickoff. Timelines depend on scope, but engagements are fixed-scope and quoted clearly after an initial diagnosis call.",
  },
  {
    question: "Does GrydIn work with Make.com and n8n?",
    answer:
      "Yes. GrydIn builds workflow automation using Make.com, n8n, or custom code depending on what fits your stack, security requirements, and long-term maintainability.",
  },
  {
    question: "Does GrydIn work with businesses outside Pakistan?",
    answer:
      "Yes. GrydIn is based in Islamabad, Pakistan and works with businesses globally. Engagements are async-first with no time-zone friction.",
  },
  {
    question: "How does GrydIn pricing work?",
    answer:
      "Every project is scoped before it is priced. After an initial diagnosis call, clients receive a clear fixed quote — no ranges, no retainer traps, and no surprise invoices.",
  },
] as const;

export const contactFaq = [
  {
    question: "How do I start a project with GrydIn?",
    answer:
      "Use the contact form at grydin.co/contact, email hello@grydin.co, or message on WhatsApp. Describe what's slowing your business down — you'll receive an honest, scoped response within one business day.",
  },
  {
    question: "What should I include in my first message to GrydIn?",
    answer:
      "Share the workflow or problem slowing your team — manual handoffs, tool gaps, repetitive reporting, approval bottlenecks, or a product you need built. No pitch deck required.",
  },
  {
    question: "What is GrydIn's response time?",
    answer:
      "GrydIn responds within one business day. Based in Islamabad, Pakistan — working globally.",
  },
] as const;

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}
