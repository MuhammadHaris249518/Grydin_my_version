/**
 * PROJECTS DATA SOURCE
 * 
 * NOTE TO OWNER:
 * The initial 9 entries below are seeded from client collaboration logos in `public/collabs/`.
 * Because exact production deliverables and quantitative metrics are private client data,
 * plausible generic copy has been aligned with GrydIn's 6 core services and every entry
 * is marked `verified: false` with qualitative metrics until real case study figures are provided.
 * 
 * TODO(owner): Verify client descriptions, solutions, and replace qualitative results with confirmed metrics.
 */

export interface ProjectResult {
  metric: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  year: number;
  summary: string; // <= 160 chars (card + meta description)
  challenge: string;
  solution: string;
  results: ProjectResult[]; // 2-4
  services: string[]; // slugs from SERVICE_SEO in lib/seo.ts
  stack: string[];
  logo?: string; // e.g. "/collabs/1-kimball-law.webp"
  featured?: boolean;
  verified: boolean; // false = placeholder copy, owner must confirm
  liveUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "kimball-law-intake-automation",
    title: "Client Intake & Case File Automation",
    client: "Kimball Law",
    industry: "Legal & Professional Services",
    year: 2024,
    summary: "Automated case intake pipelines and secure client document processing to reduce administrative delay.",
    challenge: "Manual client onboarding and repetitive document collation caused intake delays and attorney administrative overhead.",
    solution: "Engineered an automated intake pipeline with AI-assisted document classification and CRM synchronization.",
    results: [
      { metric: "Less manual work", label: "Reduced intake administrative overhead" },
      { metric: "Same-day response", label: "Accelerated initial case triage" },
      { metric: "Error-free indexing", label: "Consistent document categorization" },
    ],
    services: ["ai-agents", "workflow-automation", "system-integration"],
    stack: ["TypeScript", "n8n", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
    logo: "/collabs/1-kimball-law.webp",
    featured: true,
    verified: false, // TODO(owner): verify
  },
  {
    slug: "gps-renting-property-sync",
    title: "Property Management & Lease Data Sync",
    client: "GPS Renting",
    industry: "Real Estate & Rentals",
    year: 2024,
    summary: "Real-time tenant request dispatching and multi-portal listing synchronization for property managers.",
    challenge: "Maintenance inquiries and tenancy records were fragmented across communication channels and listing platforms.",
    solution: "Constructed an automated dispatcher connecting tenant portals with vendor management and internal accounting tools.",
    results: [
      { metric: "Unified inbox", label: "Centralized maintenance requests" },
      { metric: "Real-time sync", label: "Instant multi-channel listing updates" },
      { metric: "Faster dispatch", label: "Automated contractor assignment" },
    ],
    services: ["workflow-automation", "system-integration", "custom-software"],
    stack: ["Node.js", "Make.com", "REST APIs", "React", "Cloudflare Workers"],
    logo: "/collabs/2-gps-renting.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "solas-scotland-ai-pipeline",
    title: "Enterprise AI Knowledge Pipeline",
    client: "Solas Scotland AI",
    industry: "Technology & AI",
    year: 2024,
    summary: "Custom Retrieval-Augmented Generation (RAG) platform delivering fast retrieval across specialized enterprise repositories.",
    challenge: "Large volumes of technical documentation were difficult to search reliably without hallucinations.",
    solution: "Designed and deployed a structured embedding pipeline and conversational agent tuned to specific domain terminology.",
    results: [
      { metric: "Accurate citations", label: "Grounded responses with source linking" },
      { metric: "Sub-second search", label: "Fast vector retrieval over large corpus" },
      { metric: "Automated re-indexing", label: "Continuous sync with upstream documentation" },
    ],
    services: ["ai-agents", "ai-integration", "full-stack-development"],
    stack: ["Python", "FastAPI", "Next.js", "Pinecone", "LangChain"],
    logo: "/collabs/3-solas-scotland-ai.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "chaos-design-asset-engine",
    title: "Dynamic Asset Orchestration Engine",
    client: "Chaos",
    industry: "Creative & Media",
    year: 2023,
    summary: "Automated media processing and distribution workflows for high-volume creative assets.",
    challenge: "Creative asset handoffs between design teams and publishing endpoints required substantial manual export and conversion.",
    solution: "Built a background processing system that automatically optimizes, resizes, and tags creative deliverables upon upload.",
    results: [
      { metric: "Automated renders", label: "Multi-format asset generation on upload" },
      { metric: "Zero friction", label: "Direct sync to cloud storage and CDN" },
      { metric: "Metadata tagging", label: "AI-assisted descriptive tagging for search" },
    ],
    services: ["custom-software", "system-integration"],
    stack: ["Go", "AWS Lambda", "S3", "Docker", "FFmpeg"],
    logo: "/collabs/4-chaos.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "petcon-australia-inventory-flow",
    title: "B2B Order & Inventory Synchronization",
    client: "Petcon Australia",
    industry: "Retail & E-commerce",
    year: 2024,
    summary: "Omnichannel inventory balance automation and ERP integration for veterinary and pet supply distribution.",
    challenge: "Discrepancies between warehouse stock levels and e-commerce availability created stockouts and backorder overhead.",
    solution: "Deployed a low-latency sync engine between warehouse management systems and B2B ordering portals.",
    results: [
      { metric: "Stock visibility", label: "Unified inventory across channels" },
      { metric: "Automated reorders", label: "Smart threshold alerts for purchasing" },
      { metric: "Reliable fulfillment", label: "Fewer backorders and manual adjustments" },
    ],
    services: ["system-integration", "workflow-automation"],
    stack: ["TypeScript", "Shopify API", "Webhooks", "PostgreSQL", "Node.js"],
    logo: "/collabs/5-petcon-australia.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "sevenleaps-fintech-portal",
    title: "Secure Client Analytics & Compliance Portal",
    client: "Sevenleaps",
    industry: "Financial Technology",
    year: 2023,
    summary: "Bespoke analytics dashboard with automated compliance reporting and real-time transaction feeds.",
    challenge: "Financial metrics required manual compilation into weekly compliance and performance digests for stakeholders.",
    solution: "Created an interactive dashboard with scheduled automated report generation and role-based access control.",
    results: [
      { metric: "Automated digests", label: "Weekly compliance summaries generated automatically" },
      { metric: "Real-time metrics", label: "Live performance telemetry dashboard" },
      { metric: "Strict compliance", label: "Audit-ready transaction logging" },
    ],
    services: ["custom-software", "full-stack-development"],
    stack: ["React", "Next.js", "Node.js", "Prisma", "Tailwind CSS"],
    logo: "/collabs/6-sevenleaps.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "shape-shifters-member-system",
    title: "Member Engagement & Class Scheduling Platform",
    client: "Shape Shifters Fitness",
    industry: "Healthcare & Wellness",
    year: 2024,
    summary: "Mobile-friendly member scheduling, recurring subscription billing, and automated SMS reminder flows.",
    challenge: "High rate of booking drop-offs and administrative burdens handling membership renewals manually.",
    solution: "Built an intuitive booking engine with automated reminder webhooks and payment retry workflows.",
    results: [
      { metric: "Fewer no-shows", label: "Timely automated SMS reminders" },
      { metric: "Frictionless booking", label: "Self-service class reservations" },
      { metric: "Automated renewal", label: "Zero-touch subscription management" },
    ],
    services: ["full-stack-development", "workflow-automation"],
    stack: ["React", "Stripe API", "Twilio", "Supabase", "Tailwind CSS"],
    logo: "/collabs/7-shape-shifters-fitness.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "mazrex-ecommerce-automation",
    title: "Multi-Store Order Orchestration Engine",
    client: "Mazrex Store",
    industry: "Retail & E-commerce",
    year: 2024,
    summary: "Consolidated fulfillment routing and automated customer notifications across multiple online storefronts.",
    challenge: "Operating multiple storefronts meant manual order copying and duplicate tracking entry across carrier portals.",
    solution: "Implemented an event-driven automation framework that consolidates incoming orders and notifies couriers in real time.",
    results: [
      { metric: "Zero copy-paste", label: "Automated order routing to fulfillment" },
      { metric: "Instant tracking", label: "Real-time shipping notifications to buyers" },
      { metric: "Unified dashboard", label: "Single view for order status across brands" },
    ],
    services: ["workflow-automation", "system-integration", "ai-integration"],
    stack: ["n8n", "Shopify GraphQL", "Shipping APIs", "Redis", "TypeScript"],
    logo: "/collabs/8-mazrex-store.webp",
    verified: false, // TODO(owner): verify
  },
  {
    slug: "top-energy-telemetry-monitoring",
    title: "Industrial Telemetry & Grid Alert System",
    client: "Top Energy",
    industry: "Energy & Utilities",
    year: 2023,
    summary: "High-reliability monitoring dashboard surfacing anomaly alerts and equipment telemetry data.",
    challenge: "Field sensor alarms were scattered across legacy hardware monitors, making urgent fault detection slow.",
    solution: "Engineered a centralized telemetry collector and real-time incident notification alert system.",
    results: [
      { metric: "Rapid detection", label: "Instant alert routing to on-call engineers" },
      { metric: "Telemetry unified", label: "Consolidated views from legacy sensors" },
      { metric: "Reduced downtime", label: "Proactive notifications before system outages" },
    ],
    services: ["custom-software", "system-integration"],
    stack: ["Python", "MQTT", "TimescaleDB", "Next.js", "Docker"],
    logo: "/collabs/9-top-energy.webp",
    verified: false, // TODO(owner): verify
  },
];

// Log build-time warning for unverified client case studies
if (typeof window === "undefined") {
  const unverified = PROJECTS.filter((p) => !p.verified).map((p) => p.slug);
  if (unverified.length > 0) {
    console.warn(
      `[GrydIn Build Warning] ${unverified.length} projects are unverified placeholders awaiting owner confirmation:`,
      unverified.join(", ")
    );
  }
}

export function getAllProjects(): Project[] {
  return PROJECTS;
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return PROJECTS.find((p) => p.featured) || PROJECTS[0];
}

export function getProjectsByIndustry(industry: string): Project[] {
  if (industry === "All") return PROJECTS;
  return PROJECTS.filter((p) => p.industry.toLowerCase() === industry.toLowerCase());
}
