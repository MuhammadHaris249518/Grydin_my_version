/**
 * INDUSTRY SOLUTIONS DATA SOURCE
 * 
 * Solutions represent GrydIn's domain-specific offerings tailored by industry,
 * organizing AI agents, workflow automations, and custom software systems around
 * real business operational contexts.
 */

export interface SolutionStep {
  title: string;
  text: string;
}

export interface Solution {
  slug: string;
  name: string;
  icon: string; // Lucide icon name
  headline: string;
  summary: string;
  challenges: string[]; // 3-4 pain points
  approach: SolutionStep[]; // 3 steps (Diagnose -> Design -> Deploy)
  services: string[]; // service slugs from SERVICE_SEO
  projects?: string[]; // project slugs from PROJECTS
  outcomes: string[];
}

export const SOLUTIONS: Solution[] = [
  {
    slug: "legal-professional-services",
    name: "Legal & Professional Services",
    icon: "FileText",
    headline: "Automated case intake, contract intelligence & billing sync",
    summary: "Eliminate administrative overhead, accelerate initial matter triage, and ensure secure, compliant document workflows for law practices and consultancies.",
    challenges: [
      "Manual intake questionnaires and document collation delaying attorney matter review",
      "Unstructured PDF contracts and briefs requiring tedious line-item review and classification",
      "Time-tracking and billing reconciliation discrepancies between practice software and accounting tools",
      "Slow response times to new client inquiries resulting in lost prospective engagements",
    ],
    approach: [
      {
        title: "Diagnose Intake Flows",
        text: "We map client onboarding handoffs, administrative data entry steps, and billing synchronization gaps.",
      },
      {
        title: "Design Compliant Agents",
        text: "We engineer secure document extraction pipelines and case management integrations with strict confidentiality guardrails.",
      },
      {
        title: "Deploy Shadow Pipeline",
        text: "We run alongside existing staff to ensure 100% accuracy before full production handoff in two weeks.",
      },
    ],
    services: ["ai-agents", "workflow-automation", "system-integration"],
    projects: ["kimball-law-intake-automation"],
    outcomes: [
      "Zero manual data re-entry from online intake forms into practice management software",
      "Sub-second semantic search across active case repositories and past precedents",
      "Automated engagement letter dispatch and instant retainer payment notifications",
      "Consistent document indexing with zero attorney administrative burden",
    ],
  },
  {
    slug: "real-estate-rentals",
    name: "Real Estate & Rentals",
    icon: "Building2",
    headline: "Multi-channel listing sync, tenant dispatching & lease operations",
    summary: "Connect maintenance requests, tenant communications, and listing portals into an automated operational engine for property managers.",
    challenges: [
      "Tenant maintenance requests scattered across SMS, email, voice messages, and resident portals",
      "Manual updating of rental vacancy listings across multiple listing sites causing double-inquiries",
      "Contractor quote collation and invoice matching consuming hours of property manager time",
      "Late rent follow-ups and lease renewal reminders handled with manual spreadsheets",
    ],
    approach: [
      {
        title: "Audit Dispatch Workflows",
        text: "We analyze where tenant tickets stall between initial complaint and contractor work order dispatch.",
      },
      {
        title: "Connect Real Estate APIs",
        text: "We bridge property management software with multi-portal syndication endpoints, Twilio SMS, and Stripe.",
      },
      {
        title: "Deploy Automated Triage",
        text: "We roll out AI-assisted urgency classification and automated vendor dispatching in under 14 days.",
      },
    ],
    services: ["workflow-automation", "system-integration", "custom-software"],
    projects: ["gps-renting-property-sync"],
    outcomes: [
      "Automated maintenance contractor assignment based on trade, trade availability, and urgency",
      "Real-time vacancy synchronization across all advertising portals simultaneously",
      "Instant automated tenant SMS status confirmations and repair completion verification",
      "Automated lease expiration notifications and renewal proposal generation",
    ],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    icon: "ShoppingBag",
    headline: "Omnichannel inventory balance, fulfillment routing & supplier sync",
    summary: "Prevent stockouts, synchronize multi-store catalogs, and automate vendor reorders with high-reliability real-time data pipelines.",
    challenges: [
      "Inventory discrepancies between warehouse ERPs and online storefronts causing costly stockouts",
      "Manual order copying and tracking number entry across international 3PL carrier portals",
      "Delayed vendor restock alerts causing high-demand SKUs to remain unavailable for days",
      "Fragmented returns handling requiring manual customer service lookups across payment and inventory tools",
    ],
    approach: [
      {
        title: "Trace Order Lifecycles",
        text: "We trace every handoff an order takes from checkout confirmation to shipping manifest generation.",
      },
      {
        title: "Architect Event-Driven Sync",
        text: "We build reliable webhook routers with dead-letter queues so third-party downtime never drops orders.",
      },
      {
        title: "Deploy Multi-Store Connector",
        text: "We deploy unified inventory sync across Shopify, WooCommerce, ERPs, and fulfillment centers.",
      },
    ],
    services: ["system-integration", "workflow-automation", "ai-integration"],
    projects: ["petcon-australia-inventory-flow", "mazrex-ecommerce-automation"],
    outcomes: [
      "Sub-minute inventory synchronization across all digital sales channels and physical locations",
      "Zero manual data re-entry into courier, fulfillment, and freight carrier dashboards",
      "Automated purchase orders triggered immediately when stock levels dip below calculated thresholds",
      "Unified customer order lookups and automated shipment exception alerts",
    ],
  },
  {
    slug: "healthcare-wellness",
    name: "Healthcare & Wellness",
    icon: "HeartPulse",
    headline: "Member scheduling, recurring billing & patient communication automation",
    summary: "Eliminate appointment no-shows, streamline membership subscription lifecycles, and secure patient intake workflows.",
    challenges: [
      "High rate of appointment cancellations and no-shows leaving specialist calendars underutilized",
      "Administrative burden of following up on expired credit cards and failed monthly subscription billings",
      "Disjointed paper intake forms requiring manual transcription into scheduling and clinical databases",
      "Patient triage inquiries overloading administrative reception staff during peak clinic hours",
    ],
    approach: [
      {
        title: "Diagnose Scheduling Leaks",
        text: "We identify where prospective patients and members drop off during reservation and onboarding flows.",
      },
      {
        title: "Build Privacy-Minded Pipelines",
        text: "We design secure communication bridges and calendar synchronization adhering to strict data confidentiality.",
      },
      {
        title: "Deploy Engagement Engine",
        text: "We deliver self-service booking, automated SMS reminders, and automated payment recovery sequences.",
      },
    ],
    services: ["full-stack-development", "workflow-automation", "custom-software"],
    projects: ["shape-shifters-member-system"],
    outcomes: [
      "Drastic reduction in appointment no-shows through timely automated multi-channel reminder flows",
      "Frictionless self-service booking and instant membership subscription renewals",
      "Automated dunning and payment retry logic recovering recurring revenue without awkward phone calls",
      "Digital intake questionnaires that populate directly into core operational records",
    ],
  },
  {
    slug: "energy-utilities",
    name: "Energy & Utilities",
    icon: "Zap",
    headline: "Industrial telemetry ingestion, asset monitoring & predictive alerts",
    summary: "Consolidate field sensor telemetry, modernize legacy hardware alarms, and route incident notifications to engineering teams instantly.",
    challenges: [
      "Operational field telemetry trapped in legacy on-premise hardware monitors and disconnected SCADA logs",
      "Delayed anomaly detection resulting in preventable equipment wear, outages, and emergency repair costs",
      "Manual compilation of environmental, regulatory, and uptime reports across distributed facilities",
      "Lack of real-time mobile visibility for on-call field technicians and maintenance crews",
    ],
    approach: [
      {
        title: "Audit Telemetry Protocols",
        text: "We map industrial sensor protocols (MQTT, Modbus) and legacy databases into unified event streams.",
      },
      {
        title: "Build Incident Dispatch Engine",
        text: "We construct real-time threshold detection and automatic incident routing for engineering on-call teams.",
      },
      {
        title: "Deploy Operations Dashboard",
        text: "We deliver high-availability web consoles and automated reporting pipelines in under fourteen days.",
      },
    ],
    services: ["custom-software", "system-integration", "full-stack-development"],
    projects: ["top-energy-telemetry-monitoring"],
    outcomes: [
      "Real-time sensor anomaly detection routing alert notifications to engineers within seconds",
      "Consolidated modern cloud dashboard surfacing telemetry from legacy distributed grid equipment",
      "Automated compliance and environmental report generation eliminating weeks of manual data gathering",
      "Proactive equipment threshold warnings preventing costly unplanned power interruptions",
    ],
  },
  {
    slug: "logistics-operations",
    name: "Logistics & Operations",
    icon: "Truck",
    headline: "Freight document extraction, carrier tracking & dispatch coordination",
    summary: "Automate bill-of-lading parsing, eliminate carrier communication bottlenecks, and achieve end-to-end load visibility.",
    challenges: [
      "Hundreds of unstructured PDF bills of lading, rate confirmations, and customs forms processed by hand daily",
      "Repetitive carrier check-calls and location chasing requiring continuous manual telephone and email work",
      "Rate confirmation discrepancies and delayed accessorial charges creating invoice reconciliation disputes",
      "Siloed communication between warehouse loading docks, dispatchers, and external freight carriers",
    ],
    approach: [
      {
        title: "Diagnose Document Bottlenecks",
        text: "We audit carrier onboarding, bill-of-lading processing, and exception handling paths.",
      },
      {
        title: "Deploy Vision Extraction Models",
        text: "We engineer automated OCR and LLM schema matching for freight bills, PODs, and manifests.",
      },
      {
        title: "Integrate TMS & Telematics",
        text: "We connect transport management systems with GPS telematics and automated client notification triggers.",
      },
    ],
    services: ["ai-agents", "ai-integration", "system-integration"],
    projects: ["mazrex-ecommerce-automation", "chaos-design-asset-engine"],
    outcomes: [
      "Instant document field extraction from carrier PDFs into transport management systems without manual entry",
      "Automated milestone delivery alerts sent to shippers and receivers without human dispatcher intervention",
      "Continuous rate confirmation verification preventing carrier billing disputes before payment execution",
      "Substantial reduction in administrative overhead per delivered freight shipment",
    ],
  },
];

export function getAllSolutions(): Solution[] {
  return SOLUTIONS;
}

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}
