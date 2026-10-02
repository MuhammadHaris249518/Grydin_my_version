"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
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
  Cpu,
  Workflow,
  TrendingUp,
  Terminal,
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
const ENGINEERING_LIFECYCLE = [
  {
    step: "01",
    phase: "Diagnose & Audit",
    timeframe: "Days 1 – 3",
    title: "Understand Before Building",
    description:
      "We map your end-to-end workflow, uncover hidden operational bottlenecks, inspect existing API architecture, and identify the highest ROI leverage points.",
    deliverable: "Architecture Audit & Bottleneck Blueprint",
  },
  {
    step: "02",
    phase: "Architect & Scope",
    timeframe: "Days 4 – 6",
    title: "Fixed-Scope Solution Blueprint",
    description:
      "We design the complete system specification, data schemas, security boundaries, and API contracts. We guarantee exact pricing and deliverables before building.",
    deliverable: "Fixed-Scope Specification & Milestone Contract",
  },
  {
    step: "03",
    phase: "Agile Engineering",
    timeframe: "Week 2",
    title: "Test-Driven Production Build",
    description:
      "Modular, test-driven engineering with bi-weekly milestone demonstrations. Zero black boxes: you have continuous visibility into code progress and test coverage.",
    deliverable: "Functional Production Build in Staging Environment",
  },
  {
    step: "04",
    phase: "Quiet Deployment",
    timeframe: "Under 2 Weeks",
    title: "Zero-Disruption Integration",
    description:
      "We deploy directly into your ecosystem with zero downtime. Automated failover, live telemetry, and canary releases ensure completely seamless adoption.",
    deliverable: "Live Production Release with Active Telemetry",
  },
  {
    step: "05",
    phase: "Handover & Scale",
    timeframe: "Post-Launch",
    title: "Autonomous Team Enablement",
    description:
      "We supply clean documentation, automated maintenance guides, and comprehensive staff enablement so your team remains entirely independent and empowered.",
    deliverable: "Full Documentation Suite & Dedicated SLA Support",
  },
];

// ── Tech Stack Categories ─────────────────────────────────────────────────────
const TECH_STACK_DOMAINS = [
  {
    title: "Artificial Intelligence & Models",
    skills: ["OpenAI GPT-4o", "Anthropic Claude 3.5", "DeepSeek", "LangChain", "LangGraph", "LlamaIndex", "HuggingFace", "Qdrant / Pinecone"],
  },
  {
    title: "Backend & Systems Architecture",
    skills: ["Python", "FastAPI", "Node.js", "TypeScript", "Go", "PostgreSQL", "Redis", "Apache Kafka", "RabbitMQ"],
  },
  {
    title: "Cloud Infrastructure & DevOps",
    skills: ["Amazon Web Services (AWS)", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Prometheus"],
  },
  {
    title: "Frontend & High-Performance Web",
    skills: ["Next.js (App Router)", "React 19", "TypeScript", "Tailwind CSS", "REST & GraphQL", "State Machines", "Micro-frontends"],
  },
];

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("all");
  const [activeServiceId, setActiveServiceId] = useState<string>("ai-agents");

  const handleSelect = useCallback((id: string) => {
    setSelectedCategory("all");
    setActiveServiceId(id);
    history.replaceState(null, "", `#${id}`);
    document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const apply = () => {
      const id = window.location.hash.slice(1);
      if (CORE_SERVICES.some((s) => s.id === id)) {
        setSelectedCategory("all");
        setActiveServiceId(id);
        requestAnimationFrame(() => document.getElementById("capabilities")?.scrollIntoView({ behavior: "smooth" }));
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const filteredServices =
    selectedCategory === "all"
      ? CORE_SERVICES
      : CORE_SERVICES.filter((s) => s.category === selectedCategory);

  const activeService =
    CORE_SERVICES.find((s) => s.id === activeServiceId) || CORE_SERVICES[0];

  return (
    <div className="min-h-screen bg-navy text-slate-100 selection:bg-teal selection:text-white">
      {/* ── 1. Hero Section with 3D RobotStage ── */}
      <section className="relative overflow-hidden border-b border-white/10 pb-20 pt-16 md:pb-28 md:pt-24">
        <HeroBackdrop network={false} />
        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-4xl text-center">
            {/* Breadcrumb & Eyebrow */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal/20 text-teal-glow border border-teal/40 tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-glow animate-pulse" />
                Enterprise Solutions & Capabilities
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Home <span className="mx-1 text-slate-600">/</span> Services
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.12] mb-6">
              Engineering Next-Gen <br className="hidden sm:inline" />
              <span className="text-gradient">
                AI & Enterprise Software Systems
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto mb-10">
              From autonomous multi-agent operational workflows to mission-critical cloud platforms. We eliminate manual friction with custom software built around your exact business logic — with guaranteed fixed scope and first deployment in under two weeks.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-teal hover:bg-teal-dark text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-lg shadow-teal/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Schedule Solution Diagnosis
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>

              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/20 rounded-md transition-all hover:border-white/40"
              >
                Explore Capabilities
                <ChevronRight size={16} />
              </a>
            </div>
          </div>

          <div className="mt-10 md:mt-14">
            <RobotStage onSelect={handleSelect} />
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-white/10">
            <div className="glass rounded-2xl p-5 hover:border-teal/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-glow mb-1 font-mono">
                &lt; 2 Weeks
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                First Deployment
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Rapid turnaround without cutting technical corners
              </p>
            </div>

            <div className="glass rounded-2xl p-5 hover:border-teal/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-mono">
                Audit-Ready
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Reliability SLA
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero-downtime architecture with live telemetry
              </p>
            </div>

            <div className="glass rounded-2xl p-5 hover:border-teal/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 font-mono">
                Turnkey
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Custom Integrations
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Seamless connectors across ERP, CRM, and databases
              </p>
            </div>

            <div className="glass rounded-2xl p-5 hover:border-teal/40 transition-colors">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-glow mb-1 font-mono">
                Fixed Scope
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Transparent Pricing
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Zero retainer traps, no surprise invoices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Core Capabilities Explorer ── */}
      <section id="capabilities" className="py-24 md:py-32 relative bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Heading */}
          <SectionHeader
            eyebrow="Our Core Pillars"
            title="Comprehensive Technology Capabilities"
            accent="Technology Capabilities"
            intro="We specialize in deep, end-to-end engineering across the modern technology stack. Explore our capabilities below to see how each service drives measurable operational gains."
            className="mb-12"
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-10 pb-2 border-b border-white/10">
            {[
              { id: "all", label: "All Capabilities" },
              { id: "ai", label: "AI & Autonomous Agents" },
              { id: "software", label: "Custom Software" },
              { id: "cloud", label: "Cloud & DevSecOps" },
              { id: "integration", label: "System Integration" },
              { id: "data", label: "Data Engineering" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id as ServiceCategory)}
                className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                  selectedCategory === tab.id
                    ? "bg-teal text-white shadow-md shadow-teal/30"
                    : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const IconComp = service.icon;
              return (
                <Reveal key={service.id} delay={idx * 0.05}>
                  <div
                    id={service.id}
                    className="scroll-mt-28 glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-glow group relative h-full"
                  >
                    <div>
                      {/* Top Row: Icon + Badge */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-teal/15 border border-teal/30 flex items-center justify-center text-teal-glow group-hover:scale-105 group-hover:bg-teal group-hover:text-white transition-all">
                          <IconComp size={24} strokeWidth={1.8} />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                          {service.badge}
                        </span>
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-xl font-bold text-white group-hover:text-teal-glow transition-colors mb-2">
                        {service.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mb-4 line-clamp-1 italic">
                        "{service.tagline}"
                      </p>

                      {/* Description */}
                      <p className="text-base text-slate-300 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Deliverables List */}
                      <div className="mb-6 space-y-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                          Key Deliverables:
                        </span>
                        {service.deliverables.map((item, dIdx) => (
                          <div key={dIdx} className="flex items-start gap-2.5 text-sm text-slate-300">
                            <CheckCircle2
                              size={14}
                              className="text-teal-glow shrink-0 mt-0.5"
                            />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Badges */}
                      <div className="mb-6">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                          Technologies:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Metric & CTA */}
                    <div className="pt-5 border-t border-white/10 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-lg font-extrabold text-teal-glow font-mono">
                            {service.metric}
                          </div>
                          <div className="text-xs uppercase tracking-wider text-slate-400">
                            {service.metricLabel}
                          </div>
                        </div>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-teal-glow transition-colors"
                        >
                          Scope Solution
                          <ArrowRight size={13} />
                        </Link>
                      </div>

                      <div className="text-sm text-slate-300 bg-navy-950 p-2.5 rounded-lg border border-white/5">
                        <span className="font-semibold text-white">Ideal for: </span>
                        {service.idealFor}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Industry Solutions Matrix ── */}
      <section className="py-24 md:py-32 bg-navy-950 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Domain Expertise"
            title="Tailored Industry Solutions"
            accent="Industry Solutions"
            intro="We apply our engineering capabilities directly to industry-specific regulatory, data, and operational constraints. Here is how our solutions accelerate performance across key verticals."
            className="mb-14 text-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRY_SOLUTIONS.map((industry, index) => {
              const IndIcon = industry.icon;
              return (
                <Reveal key={index} delay={index * 0.05}>
                  <div className="glass rounded-2xl p-6 sm:p-7 hover:border-teal/50 transition-all flex flex-col justify-between h-full">
                    <div>
                      <div className="w-11 h-11 rounded-lg bg-teal/20 border border-teal/30 text-teal-glow flex items-center justify-center mb-5">
                        <IndIcon size={22} strokeWidth={1.8} />
                      </div>

                      <h3 className="text-lg font-bold text-white mb-1.5">
                        {industry.title}
                      </h3>
                      <p className="text-xs text-slate-400 mb-5 font-normal">
                        {industry.subtitle}
                      </p>

                      <div className="space-y-2 mb-6">
                        {industry.useCases.map((uc, uidx) => (
                          <div key={uidx} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check size={13} className="text-teal-glow shrink-0 mt-0.5" />
                            <span>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 mt-auto flex items-center justify-between">
                      <span className="text-xs font-semibold text-teal-glow">
                        Impact: {industry.impactStat}
                      </span>
                      <Link
                        href="/contact"
                        className="text-xs font-bold text-slate-300 hover:text-white inline-flex items-center gap-1"
                      >
                        Inquire <ChevronRight size={13} />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Custom Industry Callout Card */}
            <Reveal delay={0.3}>
              <div className="bg-gradient-to-br from-navy-800 to-teal/30 border border-teal/40 rounded-2xl p-7 flex flex-col justify-between text-left h-full">
                <div>
                  <div className="w-11 h-11 rounded-lg bg-white/10 text-white flex items-center justify-center mb-5">
                    <Compass size={22} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Have a Specialized Proprietary Domain?
                  </h3>
                  <p className="text-base text-slate-200 leading-relaxed mb-6">
                    Every unique business problem has an architecture to solve it. Tell us about your operational constraints, regulatory environment, and target timelines.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full text-center py-3 bg-white text-navy hover:bg-slate-100 font-bold text-xs uppercase tracking-wider rounded-md transition-all shadow-md"
                >
                  Discuss Custom Architecture
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. The 5-Stage Engineering Lifecycle ── */}
      <section className="py-24 md:py-32 relative bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Execution Methodology"
            title="Our 5-Stage Engineering Lifecycle"
            accent="Engineering Lifecycle"
            intro="We replace endless agile meetings and speculative billing with a transparent, disciplined 5-stage deployment framework."
            className="mb-16 text-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {ENGINEERING_LIFECYCLE.map((step, index) => (
              <Reveal key={index} delay={index * 0.08}>
                <div className="glass rounded-xl p-5 flex flex-col justify-between relative group transition-all h-full">
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl font-black font-mono text-teal group-hover:text-teal-glow transition-colors">
                        {step.step}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 px-2 py-0.5 rounded text-slate-400">
                        {step.timeframe}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {step.phase}
                    </h4>
                    <p className="text-xs font-semibold text-teal-glow mb-3">
                      {step.title}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 mt-auto text-xs text-slate-300">
                    <span className="font-semibold text-slate-200 block mb-0.5">
                      Deliverable:
                    </span>
                    {step.deliverable}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Enterprise Tech Stack Grid ── */}
      <section className="py-24 bg-navy-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Technology Standards"
            title="Modern Enterprise Technology Stack"
            accent="Technology Stack"
            intro="We leverage production-grade, battle-tested modern frameworks that guarantee horizontal scalability, high developer velocity, and zero vendor lock-in."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECH_STACK_DOMAINS.map((domain, index) => (
              <Reveal key={index} delay={index * 0.06}>
                <div className="glass rounded-xl p-6 h-full">
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 pb-2 border-b border-white/10 flex items-center gap-2">
                    <Terminal size={16} className="text-teal-glow" />
                    {domain.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {domain.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-mono text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md hover:border-teal/50 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. GrydIn vs Traditional Outsourcing Comparison ── */}
      <section className="py-24 md:py-32 relative bg-navy">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="The GrydIn Difference"
            title="Why Forward-Thinking Companies Choose Us"
            accent="Choose Us"
            intro="How our diagnosis-first, fixed-scope engineering contrasts with traditional bloated IT outsourcing and rigid off-the-shelf software."
            className="mb-14"
          />

          <div className="overflow-x-auto glass rounded-2xl p-6">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">Criteria</th>
                  <th className="py-4 px-6 text-teal-glow bg-teal/15 rounded-t-lg">
                    GrydIn Technologies
                  </th>
                  <th className="py-4 px-6">Traditional IT Agencies</th>
                  <th className="py-4 px-6">Off-the-Shelf SaaS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">
                    First Production Deployment
                  </td>
                  <td className="py-4 px-6 text-teal-glow font-bold bg-teal/10">
                    &lt; 2 Weeks guaranteed
                  </td>
                  <td className="py-4 px-6 text-slate-400">3 – 6 Months</td>
                  <td className="py-4 px-6 text-slate-400">Weeks of config work</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">
                    Pricing & Scope Model
                  </td>
                  <td className="py-4 px-6 text-teal-glow font-bold bg-teal/10">
                    Guaranteed Fixed Scope
                  </td>
                  <td className="py-4 px-6 text-slate-400">Billable hours & scope creep</td>
                  <td className="py-4 px-6 text-slate-400">Per-seat recurring trap</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">
                    Codebase Ownership
                  </td>
                  <td className="py-4 px-6 text-teal-glow font-bold bg-teal/10">
                    100% Client IP Ownership
                  </td>
                  <td className="py-4 px-6 text-slate-400">Vendor dependency</td>
                  <td className="py-4 px-6 text-slate-400">Zero IP ownership</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">
                    AI Integration Depth
                  </td>
                  <td className="py-4 px-6 text-teal-glow font-bold bg-teal/10">
                    Native multi-agent systems
                  </td>
                  <td className="py-4 px-6 text-slate-400">Surface-level wrapper APIs</td>
                  <td className="py-4 px-6 text-slate-400">Generic chatbots</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-white">
                    Post-Launch Enablement
                  </td>
                  <td className="py-4 px-6 text-teal-glow font-bold bg-teal/10">
                    Complete internal docs & training
                  </td>
                  <td className="py-4 px-6 text-slate-400">Costly maintenance lock-in</td>
                  <td className="py-4 px-6 text-slate-400">Community support tickets</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 7. Transparent Engagement Models ── */}
      <section className="py-24 bg-navy-950 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <SectionHeader
            eyebrow="Flexible Collaboration"
            title="Engagement Models Designed for Certainty"
            accent="Certainty"
            intro="We align our engagement model with your technical stage and strategic goals."
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Model 1: Fixed-Scope Sprint */}
            <div className="glass rounded-2xl p-7 flex flex-col justify-between transition-all hover:border-teal/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-glow bg-teal/20 px-2.5 py-1 rounded inline-block mb-4">
                  High Certainty
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Fixed-Scope Sprint
                </h3>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Best for defined projects: building a new AI agent, developing a custom portal, or integrating core enterprise databases.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Exact deliverables agreed upon upfront",
                    "Guaranteed first deployment in <2 weeks",
                    "Fixed pricing with zero scope creep",
                    "Complete source code and documentation handover",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-teal-glow shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-center py-3 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md"
              >
                Scope a Sprint
              </Link>
            </div>

            {/* Model 2: Dedicated Engineering Pod */}
            <div className="glass border-2 border-teal rounded-2xl p-7 flex flex-col justify-between relative shadow-xl shadow-teal/15">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-glow bg-teal/20 px-2.5 py-1 rounded inline-block mb-4">
                  Autonomous Team
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Dedicated Pod
                </h3>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  A high-velocity, senior engineering team tailored to accelerate your product roadmap without management friction.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Lead Architect, Full-Stack Dev, & AI Specialist",
                    "Full integration with your Slack/GitHub/Jira",
                    "Bi-weekly sprint demos and prioritized backlogs",
                    "Seamless elastic scaling based on roadmap needs",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 size={15} className="text-teal-glow shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-center py-3 bg-white hover:bg-slate-100 text-navy text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md"
              >
                Deploy an Engineering Pod
              </Link>
            </div>

            {/* Model 3: Architecture Modernization */}
            <div className="glass rounded-2xl p-7 flex flex-col justify-between transition-all hover:border-teal/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-glow bg-teal/20 px-2.5 py-1 rounded inline-block mb-4">
                  Enterprise Advisory
                </span>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Modernization Retainer
                </h3>
                <p className="text-base text-slate-300 mb-6 leading-relaxed">
                  Continuous architecture evolution, legacy system refactoring, SLA reliability monitoring, and AI capability additions.
                </p>

                <div className="space-y-3 mb-8">
                  {[
                    "Ongoing 24/7 telemetry & SLA incident support",
                    "Quarterly architecture & security audits",
                    "Proactive performance and cost optimization",
                    "On-demand AI and feature enhancements",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-300">
                      <CheckCircle2 size={15} className="text-teal-glow shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full text-center py-3 bg-teal hover:bg-teal-dark text-white text-xs font-bold uppercase tracking-wider rounded-md transition-all shadow-md"
              >
                Inquire Retainer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Industry Solutions Strip ── */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal block mb-1">
              Sector Specialization
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
              Looking for solutions tailored to your specific industry?
            </h3>
            <p className="text-sm text-ink-muted mt-1">
              Explore specialized workflows for Legal, Real Estate, Retail, Healthcare, Energy, and Logistics.
            </p>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-navy text-white text-xs font-bold uppercase tracking-wider hover:bg-navy-800 transition-colors shrink-0"
          >
            <span>Explore Industry Solutions</span>
            <ArrowRight size={15} className="text-teal-glow" />
          </Link>
        </div>
      </section>

      {/* ── 8. Solution Scoping & Consultation CTA ── */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-navy">
        <HeroBackdrop network={false} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal/20 text-teal-glow border border-teal/40 uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Ready to Eliminate Friction?
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-6">
            Describe What&apos;s Slowing Your Business Down. <br />
            <span className="text-gradient">We&apos;ll Map It to the Right System.</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Talk directly with a Lead Architect, not a sales representative. We will diagnose your workflows, assess technical feasibility, and provide a fixed-scope architecture proposal within 48 hours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 px-8 py-4 bg-teal hover:bg-teal-dark text-white text-sm font-bold uppercase tracking-wider rounded-md shadow-xl shadow-teal/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Book a Technical Diagnosis Call
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 text-white text-sm font-bold uppercase tracking-wider border border-white/20 rounded-md transition-all hover:border-white/40"
            >
              Learn About Our Firm
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-teal-glow" />
              NDA Protected
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-teal-glow" />
              Proposal in &lt; 48 Hours
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-teal-glow" />
              Zero Retainer Lock-In
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}