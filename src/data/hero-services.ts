import { Zap, Shield, Cpu, Cloud, Lock, TrendingUp, type LucideIcon } from "lucide-react";

export interface HeroService {
  id: string;
  title: string;
  blurb: string;
  icon: LucideIcon;
  side: "left" | "right";
  pos: { x: number; y: number }; // card top-left, % of the stage
  look: { x: number; y: number }; // where the robot looks, -1..1
}

export const CARD_W = 27; // % of stage width
export const CARD_H = 22; // % of stage height

export const HERO_SERVICES: HeroService[] = [
  {
    id: "ai-agents",
    title: "Autonomous Agents",
    blurb: "Build AI agents that plan, execute and act across your business workflows.",
    icon: Zap,
    side: "left",
    pos: { x: 2, y: 10 },
    look: { x: -0.9, y: 0.55 },
  },
  {
    id: "ai-rag",
    title: "AI/ML, RAG & Vector DB",
    blurb: "Intelligent search, data retrieval and context-aware AI systems.",
    icon: Shield,
    side: "left",
    pos: { x: 2, y: 38 },
    look: { x: -1, y: 0.05 },
  },
  {
    id: "custom-integrations",
    title: "Custom Integrations",
    blurb: "Connect your tools, data and APIs for seamless operations.",
    icon: Cpu,
    side: "left",
    pos: { x: 2, y: 66 },
    look: { x: -0.9, y: -0.5 },
  },
  {
    id: "enterprise-platforms",
    title: "Enterprise Platforms",
    blurb: "Scalable, secure and future-ready cloud solutions for your business.",
    icon: Cloud,
    side: "right",
    pos: { x: 71, y: 10 },
    look: { x: 0.9, y: 0.55 },
  },
  {
    id: "secure-infrastructure",
    title: "Secure Infrastructure",
    blurb: "Built with best practices in security, monitoring and reliability.",
    icon: Lock,
    side: "right",
    pos: { x: 71, y: 38 },
    look: { x: 1, y: 0.05 },
  },
  {
    id: "fullstack-dev",
    title: "Full-Stack Development",
    blurb: "Modern web, mobile and backend systems tailored to your needs.",
    icon: TrendingUp,
    side: "right",
    pos: { x: 71, y: 66 },
    look: { x: 0.9, y: -0.5 },
  },
];
