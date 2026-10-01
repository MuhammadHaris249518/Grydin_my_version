import type { Metadata } from "next";
import { SITE } from "@/app/globalscope/site-config";

export const SITE_URL = "https://grydin.co";

const OFFICE_ADDRESS_LINE = SITE.office.lines.join(", ");

function organizationPostalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: SITE.office.streetAddress,
    addressLocality: SITE.office.locality,
    postalCode: SITE.office.postalCode,
    addressCountry: SITE.office.country,
  };
}

const OG_IMAGE = {
  url: "/brand/og-image.png",
  width: 1200,
  height: 630,
  alt: "GrydIn - AI automation and custom software company",
};

/** Browser tab favicon only — transparent black mark (Logo - black.png). */
export const SITE_FAVICON = "/brand/logo-black.png";

/** Google Search result site icon only — white square (logo-white-bg.png). */
export const GOOGLE_SITE_ICON = "/brand/logo-white-bg.png";

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
      "End-to-end workflow mapping and automation across tools using Make.com, n8n, or custom code - without migration or disruption.",
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
      "LLM and AI model integration into existing products, pipelines, and decision systems - scoped to your data and business logic.",
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
      "Bespoke web and mobile software built around how your business actually works - dashboards, internal tools, and scalable backends.",
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
      "Production-ready product builds - React, Node.js, Flutter, APIs, cloud deployment, CI/CD, and post-launch support.",
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

export function buildMetadata({
  documentTitle,
  socialTitle,
  description,
  path,
  keywords,
  ogImage,
}: {
  documentTitle: string;
  socialTitle: string;
  description: string;
  path: string;
  keywords: string[];
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  const ogImages = ogImage
    ? [
        {
          url: ogImage.startsWith("http") ? ogImage : ogImage,
          width: 1200,
          height: 630,
          alt: socialTitle,
        },
      ]
    : [OG_IMAGE];

  const twitterImages = ogImage ? [ogImage] : [OG_IMAGE.url];

  return {
    title: { absolute: documentTitle },
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
      title: socialTitle,
      description,
      url,
      images: ogImages,
    },
    twitter: {
      ...baseTwitter,
      title: socialTitle,
      description,
      images: twitterImages,
    },
  };
}

export const homeMetadata = buildMetadata({
  documentTitle: "GrydIn",
  socialTitle: "GrydIn | AI Automation, Workflow Automation & Custom Software",
  description:
    "GrydIn is an AI automation and custom software company with an office at The Box Software Technology Park, F-11 Markaz, Islamabad. We eliminate invisible manual work with AI agents, workflow automation, AI integration, system integration, and full-stack development. Diagnosis first. Fixed scope. First deployment in under two weeks.",
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
  documentTitle: "GrydIn - Services",
  socialTitle: "AI Automation Services - Agents, Workflows, Integration & Software",
  description:
    "Explore GrydIn's six core services: custom AI agents, workflow automation (Make.com & n8n), AI integration, custom software, system integration, and full-stack development. Fixed-scope projects with clear deliverables - scoped after diagnosis, deployed fast.",
  path: "/services",
  keywords: [
    ...GLOBAL_KEYWORDS,
    ...SERVICE_SEO.flatMap((service) => [...service.keywords]),
  ],
});

export const projectsMetadata = buildMetadata({
  documentTitle: "GrydIn - Projects & Products",
  socialTitle: "Our Work & Concept Products | GrydIn",
  description:
    "Explore GrydIn's client case studies and concept products. Real automation, AI agents, and custom software delivered with fixed scopes and measurable outcomes.",
  path: "/projects",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "GrydIn projects",
    "client case studies",
    "AI case studies",
    "automation portfolio",
    "GridPilot",
    "FlowMap",
    "DocuGrid",
    "SyncBridge",
  ],
});

export const solutionsMetadata = buildMetadata({
  documentTitle: "GrydIn - Industry Solutions",
  socialTitle: "Tailored AI & Automation Solutions by Industry | GrydIn",
  description:
    "Explore GrydIn's industry-specific automation and software solutions for legal, real estate, retail, healthcare, energy, and logistics businesses worldwide.",
  path: "/solutions",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "industry automation",
    "legal AI automation",
    "real estate workflow automation",
    "ecommerce automation",
    "healthcare software",
  ],
});

export const blogMetadata = buildMetadata({
  documentTitle: "GrydIn - Insights & Newsroom",
  socialTitle: "Insights, News & Announcements | GrydIn Newsroom",
  description:
    "Read the latest engineering insights, product news, and company announcements from GrydIn. Practical perspectives on AI agents, workflows, and modern systems.",
  path: "/blog",
  keywords: [
    ...GLOBAL_KEYWORDS,
    "AI automation blog",
    "workflow automation insights",
    "GrydIn newsroom",
    "AI engineering articles",
    "software technology updates",
  ],
});

export const aboutMetadata = buildMetadata({
  documentTitle: "GrydIn - About",
  socialTitle: "About GrydIn - AI Automation Company in Islamabad",
  description:
    "GrydIn surfaces the invisible work slowing teams down - manual handoffs, copy-paste, and gaps between tools - then eliminates it without disruption. Learn our beliefs, origin story, and how we diagnose before we build.",
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
  documentTitle: "GrydIn - Contact",
  socialTitle: "Contact GrydIn - Start Your Automation or Software Project",
  description:
    "Tell GrydIn what's slowing your business down. No pitch deck - an honest, scoped response within one business day. Email hello@grydin.co, WhatsApp +92 329 6637320, or use our contact form.",
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
  authors: [{ name: SITE.legalName, url: SITE_URL }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: "technology",
  icons: {
    icon: [{ url: SITE_FAVICON, sizes: "48x48", type: "image/png" }],
    other: [
      {
        rel: "icon",
        url: GOOGLE_SITE_ICON,
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
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
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${GOOGLE_SITE_ICON}`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/brand/og-image.png`,
    description:
      "Software and AI automation company. GrydIn eliminates invisible manual work with AI agents, workflow automation, AI integration, custom software, system integration, and full-stack development.",
    email: SITE.email,
    telephone: SITE.phoneTel,
    address: organizationPostalAddress(),
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
    address: organizationPostalAddress(),
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
      "Every project is scoped before it is priced. After an initial diagnosis call, clients receive a clear fixed quote - no ranges, no retainer traps, and no surprise invoices.",
  },
] as const;

export const contactFaq = [
  {
    question: "How do I start a project with GrydIn?",
    answer:
      "Use the contact form at grydin.co/contact, email hello@grydin.co, or message on WhatsApp. Describe what's slowing your business down - you'll receive an honest, scoped response within one business day.",
  },
  {
    question: "What should I include in my first message to GrydIn?",
    answer:
      "Share the workflow or problem slowing your team - manual handoffs, tool gaps, repetitive reporting, approval bottlenecks, or a product you need built. No pitch deck required.",
  },
  {
    question: "What is GrydIn's response time?",
    answer:
      `GrydIn responds within one business day. Office: ${OFFICE_ADDRESS_LINE}.`,
  },
] as const;

export function jsonLdScript(data: unknown) {
  return JSON.stringify(data);
}

export function breadcrumbJsonLd(items: Array<{ name: string; url?: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: {
        "@type": string;
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.url) {
        entry.item = item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`;
      }
      return entry;
    }),
  };
}

export function collectionPageJsonLd({
  path,
  name,
  description,
  items,
}: {
  path: string;
  name: string;
  description: string;
  items?: Array<{ name: string; url: string; description?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}${path}#collection`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    ...(items && items.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((it, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: it.name,
              url: it.url.startsWith("http") ? it.url : `${SITE_URL}${it.url}`,
              ...(it.description ? { description: it.description } : {}),
            })),
          },
        }
      : {}),
  };
}

export function blogPostingJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  category?: string;
  cover?: string;
  keywords?: string[];
  tags?: string[];
}) {
  const isNews = post.category === "news";
  const url = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.cover
    ? post.cover.startsWith("http")
      ? post.cover
      : `${SITE_URL}${post.cover}`
    : `${SITE_URL}/brand/og-image.png`;

  return {
    "@context": "https://schema.org",
    "@type": isNews ? "NewsArticle" : "BlogPosting",
    "@id": `${url}#article`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    keywords: post.keywords?.join(", ") || post.tags?.join(", ") || "",
    inLanguage: "en",
  };
}

export function softwareApplicationJsonLd(product: {
  name: string;
  summary: string;
  slug: string;
  category?: string;
  status?: string;
}) {
  const url = `${SITE_URL}/products/${product.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${url}#software`,
    name: product.name,
    headline: product.summary,
    description: product.summary,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };
}

export function projectJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  client?: string;
  year?: number;
}) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    name: project.title,
    headline: project.summary,
    description: project.summary,
    url,
    creator: {
      "@id": `${SITE_URL}/#organization`,
    },
    ...(project.client ? { provider: { "@type": "Organization", name: project.client } } : {}),
    ...(project.year ? { dateCreated: `${project.year}` } : {}),
  };
}

export function solutionJsonLd(solution: {
  name: string;
  headline?: string;
  summary: string;
  slug: string;
}) {
  const url = `${SITE_URL}/solutions/${solution.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#solution`,
    name: solution.name,
    description: solution.summary,
    url,
    serviceType: "Industry Automation Solution",
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: "Worldwide",
  };
}

