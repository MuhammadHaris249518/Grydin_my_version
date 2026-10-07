"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  Brain,
  Layers,
  Plug,
  Cloud,
  Database,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ArrowDown,
  Cpu,
  Workflow,
  Bot,
  Code2,
  Target,
  TrendingUp,
  Activity,
  ChevronRight,
  Server,
  Lock,
  GitBranch,
  Building2,
  Truck,
  HeartPulse,
  Home,
  ShoppingBag,
  Clock,
  Check,
  Compass,
  FileCode2,
  HelpCircle,
  Box,
  Search,
  User,
  Wrench,
  Eye,
  Sprout,
  Cog,
  LucideIcon,
} from "lucide-react";
import { RobotStage } from "@/components/3d/RobotStage";
import { HeroBackdrop } from "@/components/ui/HeroBackdrop";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";
import { GlassCard } from "@/components/ui/GlassCard";

// ── Types ────────────────────────────────────────────────────────────────────
type ServiceCategory =
  | "all"
  | "ai"
  | "software"
  | "cloud"
  | "integration"
  | "data";

interface ServiceItem {
  id: string;
  category: ServiceCategory;
  badge: string;
  icon: LucideIcon;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
  metric?: string;
  metricLabel?: string;
}

interface IndustrySolution {
  title: string;
  icon: LucideIcon;
  subtitle: string;
  useCases: string[];
  impactStat: string;
}

// ── Service Data ─────────────────────────────────────────────────────────────
const CORE_SERVICES: ServiceItem[] = [
  {
    id: "ai-agents",
    category: "ai",
    badge: "Autonomous Systems",
    icon: Zap,
    title: "AI Agents & Autonomous Workflows",
    tagline: "Goal-driven multi-agent ecosystems that reason, decide, and execute",
    description:
      "We design and deploy custom autonomous AI agents that handle multi-step operational tasks across your toolchain without human bottleneck. Built with deterministic guardrails, structured memory, and enterprise auditability.",
    deliverables: [
      "Custom multi-agent orchestration (LangChain, LangGraph, CrewAI)",
      "Autonomous tool-calling pipelines with deterministic validation",
      "Dynamic document extraction, verification, and automated triage",
      "Human-in-the-loop escalation switches and full audit logging",
    ],
    techStack: ["Python", "FastAPI", "OpenAI / Claude 3.5", "LangGraph", "LlamaIndex", "Qdrant"],
    idealFor:
      "Enterprise teams drowning in repetitive approval loops, multi-tool triage, or high-volume operational workflows.",
    metric: "Sub-second",
    metricLabel: "Autonomous decision cycle execution",
  },
  {
    id: "custom-software",
    category: "software",
    badge: "Core Engineering",
    icon: Layers,
    title: "Enterprise Custom Software Engineering",
    tagline: "Mission-critical platforms built around your exact business logic",
    description:
      "Tailor-made web, mobile, and backend architectures designed to solve business bottlenecks that generic SaaS products cannot address. We engineer clean, modular systems ready for millions of transactions.",
    deliverables: [
      "Microservices and event-driven backend engineering",
      "High-throughput REST, gRPC, and GraphQL API architectures",
      "Executive command centers, admin dashboards, and custom portals",
      "Scalable multi-tenant SaaS infrastructure with strict isolation",
    ],
    techStack: ["Next.js", "TypeScript", "Node.js", "Go", "PostgreSQL", "Tailwind CSS"],
    idealFor:
      "Organizations that have outgrown off-the-shelf software and require bespoke architecture engineered for proprietary workflows.",
    metric: "Audit-Ready",
    metricLabel: "Enterprise isolation & compliance SLA",
  },
  {
    id: "cloud-devops",
    category: "cloud",
    badge: "Cloud & DevSecOps",
    icon: Cloud,
    title: "Cloud Infrastructure & Platform Engineering",
    tagline: "Elastic, zero-downtime infrastructure with automated CI/CD velocity",
    description:
      "Modernize legacy hosting into resilient, automated cloud infrastructure across AWS, Azure, and Google Cloud. Built with infrastructure-as-code, automated scaling, and proactive security monitoring.",
    deliverables: [
      "Multi-cloud migration and serverless application refactoring",
      "Container orchestration using Docker, Kubernetes, and ECS",
      "Automated CI/CD deployment pipelines with zero-downtime canary rollouts",
      "Continuous DevSecOps, compliance audit hardening, and distributed tracing",
    ],
    techStack: ["AWS", "Google Cloud", "Kubernetes", "Docker", "Terraform", "GitHub Actions"],
    idealFor:
      "Companies experiencing scalability bottlenecks, high infrastructure costs, or slow manual release cycles.",
    metric: "Continuous",
    metricLabel: "Automated zero-downtime releases",
  },
  {
    id: "system-integration",
    category: "integration",
    badge: "System Sync",
    icon: Plug,
    title: "System Integration & Middleware Architecture",
    tagline: "Connecting disconnected legacy databases and modern API stacks",
    description:
      "Unify disparate enterprise software into one cohesive real-time data engine. We engineer high-speed bidirectional connectors between ERPs, CRMs, legacy SQL stores, and cloud APIs with guaranteed zero data loss.",
    deliverables: [
      "Enterprise ERP/CRM integrations (Salesforce, SAP, Microsoft Dynamics, HubSpot)",
      "High-speed event queues, webhook gateways, and real-time syncing",
      "Zero-downtime database replication and legacy system modernization",
      "Comprehensive API documentation and developer sandbox environments",
    ],
    techStack: ["Apache Kafka", "RabbitMQ", "Redis", "GraphQL", "Apache Airflow", "REST"],
    idealFor:
      "Teams managing duplicate data entry, manual CSV exports, or siloed communications across disconnected software.",
    metric: "Zero-Loss",
    metricLabel: "Guaranteed transactional integrity",
  },
  {
    id: "data-analytics",
    category: "data",
    badge: "Data Intelligence",
    icon: Database,
    title: "Data Engineering & Real-Time Intelligence",
    tagline: "Turning high-volume raw event streams into actionable executive insight",
    description:
      "Architect robust data pipelines, modern analytical lakehouses, and real-time executive dashboards. Eliminate blind spots and empower leadership with automated, verifiable metrics.",
    deliverables: [
      "Real-time streaming and high-volume batch ETL/ELT data pipelines",
      "Modern data lakehouse architecture and semantic data modeling",
      "Executive KPI dashboards with sub-second drill-down reporting",
      "Predictive machine learning models for forecasting and anomaly detection",
    ],
    techStack: ["Python", "Snowflake", "ClickHouse", "dbt", "Apache Spark", "Apache Airflow"],
    idealFor:
      "Leadership demanding single-source-of-truth operational metrics without waiting days for manual spreadsheets.",
    metric: "Real-Time",
    metricLabel: "Single-source operational intelligence",
  },
  {
    id: "ai-integration",
    category: "ai",
    badge: "Intelligent Extraction",
    icon: Brain,
    title: "Document AI & Vision Extraction Engines",
    tagline: "Converting unstructured invoices, contracts, and receipts into verified data",
    description:
      "Deploy custom computer vision and large language models straight into your document processing pipeline. Extract complex tables, handwritten notes, and legal clauses with deterministic verification.",
    deliverables: [
      "Custom OCR and multimodal vision pipelines for multi-page complex forms",
      "Automated cross-check validation against internal ERP records",
      "Semantic search RAG knowledge engines over proprietary documentation",
      "Automated fraud flagging, signature verification, and compliance checks",
    ],
    techStack: ["Vision LLMs", "OpenCV", "Tesseract", "Vector Databases", "Python", "FastAPI"],
    idealFor:
      "Logistics, financial, real estate, and healthcare companies handling thousands of weekly documents manually.",
    metric: "Verified",
    metricLabel: "Deterministic human-in-the-loop accuracy",
  },
];

// ── Industry Solutions ────────────────────────────────────────────────────────
const INDUSTRY_SOLUTIONS: IndustrySolution[] = [
  {
    title: "FinTech & Financial Services",
    icon: Building2,
    subtitle: "Automated underwriting, fraud detection, and transactional reconciliation",
    useCases: [
      "Automated loan & credit underwriting decision engines",
      "Real-time fraud anomaly detection and transaction monitoring",
      "End-of-day bank ledger & payment gateway reconciliation",
      "Regulatory KYC & AML verification pipelines",
    ],
    impactStat: "Accelerated underwriting turnaround",
  },
  {
    title: "Supply Chain & Logistics",
    icon: Truck,
    subtitle: "Real-time fleet telemetry, automated dispatch, and customs extraction",
    useCases: [
      "Real-time GPS vehicle tracking and dynamic route optimization",
      "Automated Bill of Lading (BOL) & customs document extraction",
      "Multi-carrier inventory synchronization across regional warehouses",
      "Automated exception alerts and carrier performance scoring",
    ],
    impactStat: "Rapid shipping documentation clearance",
  },
  {
    title: "Real Estate & PropTech",
    icon: Home,
    subtitle: "Tenant lifecycle automation, leasing workflows, and maintenance triage",
    useCases: [
      "Automated tenant applicant screening and financial verification",
      "Lease agreement generation, electronic signing, and ERP sync",
      "AI-driven maintenance dispatch and vendor work-order routing",
      "Real-time portfolio occupancy and yield performance dashboards",
    ],
    impactStat: "Streamlined portfolio operations per operator",
  },
  {
    title: "E-Commerce & Omnichannel Retail",
    icon: ShoppingBag,
    subtitle: "Unified inventory sync, predictive replenishment, and automated support",
    useCases: [
      "Omnichannel stock synchronization across Shopify, Amazon, and ERP",
      "Predictive inventory reorder triggers based on velocity models",
      "Autonomous returns & refund dispute processing agents",
      "Personalized dynamic product recommendation engines",
    ],
    impactStat: "Zero overselling incidents across all channels",
  },
  {
    title: "Healthcare & Life Sciences",
    icon: HeartPulse,
    subtitle: "HIPAA-aligned data pipelines, intake automation, and clinical sync",
    useCases: [
      "Automated patient intake, insurance verification, and triage",
      "EHR/EMR integration with strict access control and auditing",
      "Lab sample workflow tracking and automated report dissemination",
      "AI clinical summarization tools for healthcare practitioners",
    ],
    impactStat: "Significant reduction in administrative paperwork",
  },
];

// ── 5-Stage Engineering Lifecycle ─────────────────────────────────────────────
interface LifecycleStage {
  step: string;
  name: string;
  description: string;
  actionTag: string;
  icon: LucideIcon;
  colorScheme: {
    iconBg: string;
    iconText: string;
    iconBorder: string;
    tagBg: string;
    tagText: string;
    tagHoverBg: string;
  };
}

const ENGINEERING_LIFECYCLE: LifecycleStage[] = [
  {
    step: "01",
    name: "Understand",
    description: "We analyze your needs, users and goals.",
    actionTag: "Discovery & Analysis",
    icon: Search,
    colorScheme: {
      iconBg: "bg-sky-50",
      iconText: "text-sky-600",
      iconBorder: "border-sky-100",
      tagBg: "bg-[#EAF5FE]",
      tagText: "text-[#0284C7]",
      tagHoverBg: "hover:bg-[#D9EDFE]",
    },
  },
  {
    step: "02",
    name: "Design",
    description: "We plan the right architecture and tech for your project.",
    actionTag: "System Design",
    icon: Layers,
    colorScheme: {
      iconBg: "bg-purple-50",
      iconText: "text-purple-600",
      iconBorder: "border-purple-100",
      tagBg: "bg-[#F4EFFE]",
      tagText: "text-[#8B5CF6]",
      tagHoverBg: "hover:bg-[#EADBFE]",
    },
  },
  {
    step: "03",
    name: "Build",
    description: "We develop with clean, scalable and efficient code.",
    actionTag: "Development",
    icon: Code2,
    colorScheme: {
      iconBg: "bg-emerald-50",
      iconText: "text-emerald-600",
      iconBorder: "border-emerald-100",
      tagBg: "bg-[#E8FAF4]",
      tagText: "text-[#0D9488]",
      tagHoverBg: "hover:bg-[#D1F5E9]",
    },
  },
  {
    step: "04",
    name: "Test",
    description: "We ensure quality, performance and security.",
    actionTag: "QA & Optimization",
    icon: ShieldCheck,
    colorScheme: {
      iconBg: "bg-amber-50",
      iconText: "text-amber-600",
      iconBorder: "border-amber-100",
      tagBg: "bg-[#FEF7EC]",
      tagText: "text-[#D97706]",
      tagHoverBg: "hover:bg-[#FEEBC8]",
    },
  },
  {
    step: "05",
    name: "Deploy",
    description: "We launch, monitor and support your product.",
    actionTag: "Live & Support",
    icon: Cloud,
    colorScheme: {
      iconBg: "bg-indigo-50",
      iconText: "text-indigo-600",
      iconBorder: "border-indigo-100",
      tagBg: "bg-[#EEF2FF]",
      tagText: "text-[#4F46E5]",
      tagHoverBg: "hover:bg-[#E0E7FF]",
    },
  },
];


// ── 6 Interactive Services Tab Data ──────────────────────────────────────────
interface ServiceTabData {
  num: string;
  badge: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
  suitedFor: string;
  graphic: React.ReactNode;
}

const SERVICES_TAB_DATA: ServiceTabData[] = [
  {
    num: "01",
    badge: "AI AGENTS",
    title: "AI Agents",
    shortTitle: "AI Agents",
    icon: Zap,
    description:
      "Autonomous agents that think, decide, and act — handling complex, multi-step tasks end-to-end without human intervention.",
    bullets: [
      "Custom agent design scoped to your specific workflow",
      "Multi-step task execution with decision-making logic",
      "Integration with your existing tools, APIs, and data sources",
      "Monitoring, logging, and fallback handling built in",
    ],
    suitedFor:
      "Teams drowning in repetitive decision-making, approvals, or multi-tool coordination that eats hours daily.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#2DD4BF]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#0D8B99] flex items-center justify-center text-white shadow-md">
          <Bot className="w-8 h-8 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
  {
    num: "02",
    badge: "WORKFLOW AUTOMATION",
    title: "Workflow Automation & Pipelines",
    shortTitle: "Workflow Automation",
    icon: Workflow,
    description:
      "Streamline your business processes with automated workflows, event triggers, and reliable data pipelines across your enterprise software.",
    bullets: [
      "Event-driven workflow triggers and webhooks",
      "Cross-platform data synchronization (CRMs, ERPs, DBs)",
      "Error retry mechanics and automated failure alerts",
      "Zero-maintenance serverless background workers",
    ],
    suitedFor:
      "Organizations spending hundreds of operational hours manually transferring data across disconnected tools.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#38BDF8]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#0284C7] flex items-center justify-center text-white shadow-md">
          <Workflow className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
  {
    num: "03",
    badge: "AI INTEGRATION",
    title: "AI Integration & RAG Engines",
    shortTitle: "AI Integration",
    icon: Cpu,
    description:
      "Connect your enterprise data with LLMs and vector retrieval systems for accurate, grounded, context-aware intelligence.",
    bullets: [
      "Custom RAG pipelines over vector databases (Qdrant, Pinecone)",
      "Semantic search and exact citation source linking",
      "Fine-tuned LLM prompts and model orchestration",
      "Enterprise security with strict data privacy compliance",
    ],
    suitedFor:
      "Companies needing instant, reliable answers from internal technical documentation, contracts, and knowledge bases.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#C084FC]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#7E22CE] flex items-center justify-center text-white shadow-md">
          <Cpu className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
  {
    num: "04",
    badge: "CUSTOM SOFTWARE",
    title: "Custom Software Engineering",
    shortTitle: "Custom Software",
    icon: Layers,
    description:
      "Modern, scalable and maintainable web applications, APIs, and microservices engineered specifically for your proprietary workflows.",
    bullets: [
      "High-performance Next.js & React user interfaces",
      "Robust Python & Node.js backend microservices",
      "Optimized SQL/NoSQL database architecture",
      "Complete source code IP ownership & zero vendor lock-in",
    ],
    suitedFor:
      "Businesses that have outgrown rigid off-the-shelf software and require custom portals or enterprise web platforms.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#818CF8]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#4338CA] flex items-center justify-center text-white shadow-md">
          <Layers className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
  {
    num: "05",
    badge: "SYSTEM INTEGRATION",
    title: "System Integration & Middleware",
    shortTitle: "System Integration",
    icon: Plug,
    description:
      "Unify your legacy databases, third-party SaaS tools, and internal services with secure, high-throughput middleware architecture.",
    bullets: [
      "Bespoke REST & GraphQL API gateway engineering",
      "Real-time database sync and legacy platform connectors",
      "High-availability message queues (Redis & Kafka)",
      "Comprehensive API logging, security, and telemetry",
    ],
    suitedFor:
      "Enterprises managing fragmented tools and databases that require unified, real-time data sync without data loss.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#FBBF24]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#D97706] flex items-center justify-center text-white shadow-md">
          <Plug className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
  {
    num: "06",
    badge: "FULL-STACK DEVELOPMENT",
    title: "Full-Stack Development",
    shortTitle: "Full-Stack Development",
    icon: Code2,
    description:
      "From frontend UX design to cloud deployment, we build complete digital products using modern frameworks and engineering standards.",
    bullets: [
      "End-to-end full-stack product architecture and shipping",
      "Responsive, accessible UI with smooth micro-interactions",
      "CI/CD deployment pipelines and automated test coverage",
      "Post-launch telemetry, SLA support, and documentation",
    ],
    suitedFor:
      "Founders and enterprise tech leaders looking for a senior full-stack pod to ship production-ready features rapidly.",
    graphic: (
      <div className="relative w-20 h-16 sm:w-24 sm:h-20 flex items-center justify-center">
        <div className="absolute inset-0 bg-[#34D399]/20 rounded-full blur-xl" />
        <div className="relative w-14 h-14 rounded-2xl bg-[#059669] flex items-center justify-center text-white shadow-md">
          <Code2 className="w-7 h-7 text-white" strokeWidth={2} />
        </div>
      </div>
    ),
  },
];


export default function ServicesPage() {
  const [activeServiceTab, setActiveServiceTab] = useState<number>(0);

  const handleSelect = useCallback((id: string) => {
    const tabMap: Record<string, number> = {
      "ai-agents": 0,
      "workflow": 1,
      "workflow-automation": 1,
      "ai-integration": 2,
      "ai-rag": 2,
      "custom-software": 3,
      "system-integration": 4,
      "fullstack": 5,
    };
    if (id in tabMap) {
      setActiveServiceTab(tabMap[id]);
    }
    history.replaceState(null, "", `#${id}`);
    document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.slice(1);
      const tabMap: Record<string, number> = {
        "ai-agents": 0,
        "workflow": 1,
        "workflow-automation": 1,
        "ai-integration": 2,
        "ai-rag": 2,
        "custom-software": 3,
        "system-integration": 4,
        "fullstack": 5,
      };
      if (id in tabMap) {
        setActiveServiceTab(tabMap[id]);
        requestAnimationFrame(() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" }));
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  return (
    <main className="min-h-screen bg-surface text-ink selection:bg-accent selection:text-white">
      {/* ── 1. Hero Section with 3D RobotStage ── */}
      <section className="relative overflow-hidden bg-slate-50/70 border-b border-slate-200/80 pb-20 pt-12 md:pb-24 md:pt-16">
        <HeroBackdrop network={false} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200/80 tracking-wider uppercase shadow-xs">
                <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                ENTERPRISE SOLUTIONS & CAPABILITIES
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Engineering next-gen <br />
              <span className="text-teal-600">
                AI & enterprise software
              </span> <br />
              systems
            </h1>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto mb-8">
              We build autonomous AI systems, custom software and cloud platforms that automate complex business operations — helping you scale faster, work smarter and stay ahead.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg shadow-md shadow-teal-600/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                BOOK A FREE PROCESS DIAGNOSIS
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>

              <a
                href="#capabilities"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-bold uppercase tracking-wider border border-slate-300 rounded-lg shadow-xs transition-all hover:border-slate-400"
              >
                EXPLORE CAPABILITIES
                <ArrowRight size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <RobotStage onSelect={handleSelect} />
          </div>

          {/* Connected Feature Cards (4-Grid Bottom Section) */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-200/80">
            <div className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl p-6 hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
                <Clock className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                2 Weeks
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 mb-1">
                RAPID DEPLOYMENT
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Get your solution up and running in just 2 weeks.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl p-6 hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
                <ShieldCheck className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Audit-Ready
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 mb-1">
                RELIABILITY & SECURITY
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Meet industry standards with built-in compliance.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl p-6 hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
                <Box className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Turnkey
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 mb-1">
                CUSTOM INTEGRATION
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                End-to-end solutions, from design to deployment.
              </p>
            </div>

            <div className="bg-white border border-slate-200/80 shadow-md shadow-slate-200/40 rounded-2xl p-6 hover:shadow-xl hover:border-teal-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-4 border border-teal-100">
                <Target className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">
                Fixed Scope
              </div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-teal-600 mb-1">
                TRANSPARENT PRICING
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                No hidden costs. Clear timelines. Complete peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Core Capabilities / Services Explorer ── */}
      <section id="capabilities" className="py-16 sm:py-24 relative bg-slate-50/50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">
              <span className="text-teal-500 font-bold">──</span>
              WHAT WE BUILD
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
              Our <span className="text-teal-600">Services</span>
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              We build intelligent, scalable solutions that help businesses work smarter, move faster, and grow bigger.
            </p>
          </div>

          {/* 2-Column Split Interactive Component */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 6 Vertical Tabs + Redesigned GrydIn Guarantee Card (lg:col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5">
              <div className="flex flex-col gap-3">
                {SERVICES_TAB_DATA.map((srv, idx) => {
                  const IconComponent = srv.icon;
                  const isActive = activeServiceTab === idx;

                  return (
                    <button
                      key={srv.num}
                      onClick={() => setActiveServiceTab(idx)}
                      className={`w-full group text-left px-5 py-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 ${
                        isActive
                          ? "bg-[#E5F7F4] border-2 border-[#2DD4BF] shadow-sm text-slate-900"
                          : "bg-white/90 border-slate-200/90 hover:bg-slate-50 hover:border-teal-300 text-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`font-mono text-base sm:text-lg font-bold ${
                            isActive ? "text-[#0D8B99]" : "text-slate-400"
                          }`}
                        >
                          {srv.num}
                        </span>

                        <div className={`shrink-0 ${isActive ? "text-teal-600" : "text-slate-500"}`}>
                          <IconComponent className="w-5 h-5" strokeWidth={2.2} />
                        </div>

                        <span
                          className={`text-sm sm:text-base font-extrabold ${
                            isActive ? "text-slate-900" : "text-slate-700"
                          }`}
                        >
                          {srv.shortTitle}
                        </span>
                      </div>

                      <div
                        className={`transition-transform duration-200 ${
                          isActive ? "translate-x-1 text-teal-700" : "text-slate-400 group-hover:translate-x-0.5"
                        }`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Redesigned GrydIn Guarantee Card (Clean light theme, generous padding, zero blank gap) */}
              <div className="bg-white border border-teal-200/90 shadow-sm rounded-2xl p-5 sm:p-6 mt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-teal-400 hover:shadow-md">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 border border-teal-200/80 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-teal-700 mb-0.5">
                      <span>GRYDIN GUARANTEE</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-900 leading-snug">
                      Shipped in &lt; 2 Weeks • Fixed Scope
                    </p>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed mt-0.5">
                      100% Client IP ownership with zero vendor lock-in.
                    </p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0D8B99] hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Book Diagnosis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Column: Active Service Details Panel (lg:col-span-7) */}
            <div className="lg:col-span-7">
              {(() => {
                const current = SERVICES_TAB_DATA[activeServiceTab] || SERVICES_TAB_DATA[0];
                return (
                  <div className="bg-[#EBF7F5] border border-teal-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[520px]">
                    {/* Top Row: Badge & Graphic Bubble */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="inline-flex items-center gap-2 bg-white/90 border border-teal-200/90 text-teal-800 text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-lg shadow-2xs">
                        <Zap className="w-3.5 h-3.5 text-teal-600" />
                        <span>{current.badge}</span>
                      </div>

                      <div className="shrink-0 pointer-events-none transform hover:scale-105 transition-transform duration-300">
                        {current.graphic}
                      </div>
                    </div>

                    {/* Title & Description */}
                    <div className="mb-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
                        {current.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
                        {current.description}
                      </p>
                    </div>

                    {/* What's Included Box */}
                    <div className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-teal-200/80 mb-6 shadow-2xs">
                      <span className="font-extrabold text-xs uppercase tracking-wider text-teal-700 block mb-4">
                        WHAT&apos;S INCLUDED
                      </span>

                      <div className="space-y-3">
                        {current.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-700">
                            <CheckCircle2 className="w-4.5 h-4.5 text-teal-600 shrink-0" strokeWidth={2.2} />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Suited For Footer */}
                    <div className="pt-2">
                      <div className="flex items-center gap-1.5 font-extrabold text-xs uppercase tracking-wider text-teal-700 mb-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>SUITED FOR</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                        {current.suitedFor}
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>

          {/* Bottom Unique Use Case Callout Banner */}
          <div className="mt-12 bg-white border border-slate-200/80 shadow-sm rounded-2xl sm:rounded-full px-6 py-4.5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Have a unique use case?</h4>
                <p className="text-xs text-slate-500">We also build custom solutions tailored to your specific needs.</p>
              </div>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-full shadow-xs transition-all shrink-0"
            >
              Let&apos;s talk
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>



      {/* ── 4. The 5-Stage Engineering Lifecycle ── */}
      <section className="py-20 sm:py-28 relative bg-white border-b border-slate-200/80 overflow-hidden">
        {/* Subtle atmospheric ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1000px] h-[380px] bg-gradient-to-r from-blue-100/25 via-indigo-100/30 to-purple-100/25 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header Row: Title & Subtitle on Left, Pill Badge on Right */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="max-w-2xl">
              {/* Eyebrow with blue indicator bar */}
              <div className="flex items-center gap-2.5 mb-3">
                <span className="w-5 h-1 rounded-full bg-[#4F46E5] inline-block" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                  EXECUTION METHODOLOGY
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-3">
                Our 5-Stage Engineering{" "}
                <span className="text-[#4F46E5]">Lifecycle</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal max-w-xl">
                From discovery to deployment — we turn your ideas into reliable, scalable solutions through a focused 5-stage process.
              </p>
            </div>

            {/* Top Right Pill Badge */}
            <div className="shrink-0 self-start lg:self-center">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-slate-200/90 shadow-xs text-xs sm:text-[13px] font-semibold text-slate-700">
                <Zap className="w-4 h-4 text-[#4F46E5] fill-[#4F46E5]" />
                <span>Transparent</span>
                <span className="text-slate-300 text-xs">•</span>
                <span>Agile</span>
                <span className="text-slate-300 text-xs">•</span>
                <span>Results Driven</span>
              </div>
            </div>
          </div>

          {/* Connected 3D Pipeline & 5 Stage Cards */}
          <div className="w-full pt-1">
              {/* Full 3D Isometric Pipeline Strip */}
              <div className="relative mx-auto mb-6 hidden w-full max-w-6xl select-none sm:mb-8 sm:block">
                <Image
                  src="/images/lifecycle/lifecycle-pipeline.png"
                  alt="Our 5-Stage Engineering Lifecycle Pipeline"
                  width={950}
                  height={169}
                  className="w-full h-auto object-contain pointer-events-none"
                  priority
                />
              </div>

              {/* 5 Cards Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 lg:gap-5">
                {ENGINEERING_LIFECYCLE.map((stage, idx) => {
                  const Icon = stage.icon;
                  const { colorScheme } = stage;

                  return (
                    <Reveal key={stage.step} delay={idx * 0.08}>
                      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                        <div>
                          {/* Stage Icon */}
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${colorScheme.iconBg} ${colorScheme.iconText} ${colorScheme.iconBorder}`}
                          >
                            <Icon className="w-5 h-5 stroke-[2.2]" />
                          </div>

                          {/* Stage Title */}
                          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight mb-2">
                            {stage.name}
                          </h3>

                          {/* Stage Description */}
                          <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed mb-5">
                            {stage.description}
                          </p>
                        </div>

                        {/* Action Tag Pill Button */}
                        <div className="mt-auto pt-1">
                          <Link
                            href="/contact"
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${colorScheme.tagBg} ${colorScheme.tagText} ${colorScheme.tagHoverBg} transition-colors`}
                          >
                            <span className="font-bold">&gt;</span>
                            <span>{stage.actionTag}</span>
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
          </div>

          {/* Bottom Banner: Ready to Build? */}
          <Reveal delay={0.35}>
            <div className="mt-12 sm:mt-16 bg-[#F8FAFD] sm:bg-gradient-to-r sm:from-[#F8FAFD] sm:via-white sm:to-[#F8F9FE] border border-slate-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center shrink-0 border border-indigo-100/70 shadow-2xs">
                  <Sparkles className="w-5 h-5 text-[#4F46E5]" />
                </div>
                <div>
                  <span className="block text-[11px] font-bold uppercase tracking-widest text-[#4F46E5] mb-1">
                    READY TO BUILD?
                  </span>
                  <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Let&apos;s turn your idea into a working product.
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Share your goals and we&apos;ll guide you through the next step.
                  </p>
                </div>
              </div>

              <Link
                href="/services#capabilities"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#0F172A] hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all shrink-0"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Related Industry Solutions Strip ── */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent block mb-1">
              Sector Specialization
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-ink tracking-tight">
              Looking for solutions tailored to your specific industry?
            </h3>
            <p className="text-sm text-ink-muted mt-1">
              Explore specialized workflows for Legal, Real Estate, Retail, Healthcare, Energy, and Logistics.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors shrink-0"
          >
            <span>Explore Industry Solutions</span>
            <ArrowRight size={15} className="text-teal-glow" />
          </Link>
        </div>
      </section>

      {/* ── 8. Solution Scoping & Consultation CTA (Ready to Eliminate Friction) ── */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/40 to-white border-t border-slate-200/80">
        {/* Ambient teal glow behind the diagram */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[500px] bg-gradient-to-br from-teal-100/35 via-cyan-50/25 to-transparent blur-3xl rounded-full pointer-events-none -z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Main 2-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16 sm:mb-20">
            {/* Left Column: Heading, Subtitle & CTAs */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-[#0D8B99] border border-teal-200/80 mb-6 shadow-2xs self-start">
                <Sparkles className="w-3.5 h-3.5 text-[#0D8B99]" />
                <span>READY TO ELIMINATE FRICTION?</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-[1.14] mb-4">
                Describe what&apos;s slowing <br />
                your business down. <br />
                <span className="text-[#0D8B99]">We&apos;ll map it to the right system.</span>
              </h2>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl mb-8">
                Talk directly with a Lead Architect, not a sales representative. We will diagnose your workflows, assess technical feasibility, and provide a fixed-scope architecture proposal within 48 hours.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#0D8B99] hover:bg-[#0B7884] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-teal-700/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 shrink-0"
                >
                  <span>BOOK A FREE PROCESS DIAGNOSIS</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0D8B99] hover:text-[#0B7884] underline-offset-4 hover:underline transition-colors shrink-0"
                >
                  <span>Learn about our firm</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Interactive System Convergence Architecture */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
              <div className="grid w-full grid-cols-1 gap-4">
                  {/* Left Column: 4 Inputs Stack (People, Processes, Data, Tools) */}
                  <div>
                    <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Inputs</p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                      <User className="w-4 h-4 text-[#0D8B99] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">People</span>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                      <Cog className="w-4 h-4 text-[#0D8B99] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Processes</span>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                      <Database className="w-4 h-4 text-[#0D8B99] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Data</span>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center gap-3 transition-transform hover:-translate-y-0.5">
                      <Wrench className="w-4 h-4 text-[#0D8B99] shrink-0" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Tools</span>
                    </div>
                    </div>
                  </div>

                  <ArrowDown className="mx-auto h-4 w-4 text-[#0D8B99]" aria-hidden="true" />

                  {/* Center Card: Your System with Orbit Rings */}
                  <div className="relative flex items-center justify-center py-2">
                    {/* Orbit Ring Background */}
                    <div className="absolute -inset-7 sm:-inset-9 border border-dashed border-teal-300/60 rounded-full pointer-events-none" />
                    <div className="absolute -inset-12 sm:-inset-16 border border-teal-200/30 rounded-full pointer-events-none" />

                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-[#E8F8F5] border-2 border-[#2DD4BF] shadow-md shadow-teal-500/10 flex flex-col items-center justify-center gap-2.5 transition-transform hover:scale-105 duration-300">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#0D8B99] shadow-2xs flex items-center justify-center border border-teal-200/60">
                        <Layers className="w-5 h-5 text-[#0D8B99]" strokeWidth={2.2} />
                      </div>
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                        Your System
                      </span>
                    </div>
                  </div>

                  <ArrowDown className="mx-auto h-4 w-4 text-[#0D8B99]" aria-hidden="true" />

                  {/* Right Column: 4 Outputs Stack with Checkmarks */}
                  <div>
                    <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Outcomes</p>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <Zap className="w-4 h-4 text-[#0D8B99] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Higher Efficiency</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <Eye className="w-4 h-4 text-[#0D8B99] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Better Visibility</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="w-4 h-4 text-[#0D8B99] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Scales with You</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>

                    <div className="w-full min-w-0 bg-white border border-slate-200/90 shadow-sm rounded-2xl p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-transform hover:-translate-y-0.5">
                      <div className="flex items-center gap-2.5">
                        <Sprout className="w-4 h-4 text-[#0D8B99] shrink-0" />
                        <span className="text-xs sm:text-sm font-bold text-slate-800">Long-Term Growth</span>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>

          {/* Bottom Strip: 3 Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10 sm:pt-12 border-t border-slate-200/80">
            {/* Badge 1: NDA Protected */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">NDA Protected</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
                  Your data and ideas stay confidential.
                </p>
              </div>
            </div>

            {/* Badge 2: Proposal in < 48 Hours */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">Proposal in &lt; 48 Hours</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
                  Get a clear plan, fast.
                </p>
              </div>
            </div>

            {/* Badge 3: Zero Retainer Lock-In */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D8B99] border border-teal-200/80 flex items-center justify-center shrink-0 shadow-2xs">
                <Lock className="w-5 h-5" strokeWidth={2.2} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900 leading-snug">Zero Retainer Lock-In</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-normal leading-relaxed">
                  No upfront fees. No long-term contracts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}