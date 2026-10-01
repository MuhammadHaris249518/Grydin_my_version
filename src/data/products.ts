/**
 * PRODUCTS DATA SOURCE
 * 
 * Note: These 4 products are concept / proprietary products incubated by GrydIn.
 * In UI, they render as normal enterprise products with status badges (Beta, Live, Coming soon).
 */

export interface ProductFeature {
  title: string;
  text: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  description: string;
  status: "Live" | "Beta" | "Coming soon";
  category: "AI" | "Automation" | "Integration" | "Analytics";
  icon: string; // lucide icon name
  features: ProductFeature[]; // 4-6
  useCases: string[];
  stack: string[];
  pricing?: string;
  mock: true;
}

export const PRODUCTS: Product[] = [
  {
    slug: "gridpilot",
    name: "GridPilot",
    tagline: "Autonomous AI agent orchestration console",
    summary: "Coordinate, observe, and inspect multi-agent business automations across tools with deterministic guardrails.",
    description: "GridPilot is an enterprise agent orchestration layer designed for organizations running autonomous workflows. It provides real-time state visualization, human-in-the-loop approvals, deterministic fallback rules, and complete audit logging across LLM calls.",
    status: "Beta",
    category: "AI",
    icon: "Bot",
    features: [
      {
        title: "Multi-Agent State Graph",
        text: "Visualize agent execution paths, step dependencies, and parallel task handoffs in real time.",
      },
      {
        title: "Human-in-the-Loop Gateways",
        text: "Pause execution for sensitive financial or customer-facing operations until an authorized human approves.",
      },
      {
        title: "Deterministic Guardrails",
        text: "Enforce strict schema validation and token budget limits to eliminate runaway prompt chains.",
      },
      {
        title: "Complete Execution Replay",
        text: "Step backwards through previous tool invocations and LLM prompts for effortless debugging and auditing.",
      },
      {
        title: "Zero-Latency Webhook Triggers",
        text: "Invoke agents directly from Slack, CRM events, database triggers, or external webhooks.",
      },
    ],
    useCases: [
      "Customer support tier-1 triage and autonomous resolution",
      "Financial invoice auditing and anomaly escalation",
      "Cross-platform lead qualification and scheduling",
      "Automated vendor compliance review",
    ],
    stack: ["TypeScript", "Next.js", "FastAPI", "PostgreSQL", "LangChain", "Tailwind CSS"],
    pricing: "Custom quote based on agent volume",
    mock: true,
  },
  {
    slug: "flowmap",
    name: "FlowMap",
    tagline: "Workflow diagnosis & process-mapping tool",
    summary: "Surface invisible friction points, estimate manual labor waste, and generate automation blueprint blueprints.",
    description: "FlowMap turns opaque operational procedures into structured, actionable automation blueprints. By mapping inputs, handoffs, and tool dependencies, FlowMap measures wasted employee hours and outlines exact automation milestones before writing code.",
    status: "Live",
    category: "Automation",
    icon: "Workflow",
    features: [
      {
        title: "Friction & Bottleneck Detection",
        text: "Identify redundant copy-paste steps, delayed email handoffs, and single-person approval bottlenecks.",
      },
      {
        title: "ROI & Time-Savings Calculator",
        text: "Quantify the exact dollar and hour impact of automating repetitive operational tasks.",
      },
      {
        title: "Interactive Systems Architecture",
        text: "Live diagramming tools built specifically for tracking data flows across fragmented SaaS stacks.",
      },
      {
        title: "Automated Blueprint Export",
        text: "Generate turnkey technical specifications and Make/n8n pipeline templates with one click.",
      },
    ],
    useCases: [
      "Pre-implementation technical discovery for enterprise clients",
      "Internal operations audits and tooling consolidation",
      "Executive reporting on operational efficiency and automation ROI",
    ],
    stack: ["React", "ReactFlow", "Node.js", "Prisma", "Tailwind CSS"],
    pricing: "Available as part of GrydIn workflow diagnosis",
    mock: true,
  },
  {
    slug: "docugrid",
    name: "DocuGrid",
    tagline: "AI document extraction & structured classification",
    summary: "Ingest unstructured PDFs, scanned invoices, and contracts into normalized JSON ready for databases and ERPs.",
    description: "DocuGrid eliminates manual data entry by extracting structured fields, tables, and line items from complex PDFs and documents. Built with OCR, vision models, and confidence scoring, it integrates directly into accounting and legal platforms.",
    status: "Beta",
    category: "AI",
    icon: "FileText",
    features: [
      {
        title: "High-Accuracy Table Extraction",
        text: "Accurately parse complex multi-page tables, nested line items, and varied receipt formats.",
      },
      {
        title: "Field-Level Confidence Scores",
        text: "Flag ambiguous entries for instant human review while letting high-confidence data flow straight to ERP.",
      },
      {
        title: "Schema Matching Engine",
        text: "Map extracted fields directly to your custom PostgreSQL, Salesforce, or QuickBooks schemas.",
      },
      {
        title: "Enterprise Data Privacy",
        text: "Zero-retention model architecture ensures sensitive corporate records are never used for model training.",
      },
    ],
    useCases: [
      "Accounts payable invoice processing and 3-way matching",
      "Legal contract term extraction and clause comparison",
      "Logistics bill of lading and customs clearance automation",
    ],
    stack: ["Python", "FastAPI", "OpenAI Vision", "PaddleOCR", "Next.js"],
    pricing: "Tiered by document volume or custom enterprise licensing",
    mock: true,
  },
  {
    slug: "syncbridge",
    name: "SyncBridge",
    tagline: "Integration hub with webhooks & real-time sync",
    summary: "Bridge disconnected SaaS tools and legacy backends with guaranteed delivery, replay queues, and schema transformation.",
    description: "SyncBridge is an event router and real-time synchronization bridge. It sits between disparate SaaS systems and internal databases, providing dead-letter queues, rate limiting, and bi-directional transformations so sync errors never corrupt production records.",
    status: "Coming soon",
    category: "Integration",
    icon: "Layers",
    features: [
      {
        title: "Bi-Directional State Sync",
        text: "Keep customer and transaction records synchronized across CRM, ERP, and payment portals in sub-second latency.",
      },
      {
        title: "Automatic Dead-Letter Replay",
        text: "Never drop an event when downstream third-party APIs experience downtime or rate limiting.",
      },
      {
        title: "No-Code Data Transformers",
        text: "Clean, normalize, and reshape webhook payloads on the fly before forwarding to destination databases.",
      },
      {
        title: "End-to-End Cryptographic Audit Log",
        text: "Verify every payload delivery with signed cryptographic delivery receipts and payload hashes.",
      },
    ],
    useCases: [
      "Stripe to legacy ERP ledger synchronization",
      "Multi-channel inventory mirroring across retail stores",
      "HubSpot CRM to internal user database sync",
    ],
    stack: ["Rust", "Redis", "TypeScript", "Docker", "PostgreSQL"],
    pricing: "Coming soon — request early access",
    mock: true,
  },
];

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
