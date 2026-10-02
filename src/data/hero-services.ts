import { Zap, Brain, Layers, Plug, Cloud, Database, type LucideIcon } from "lucide-react";

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
  { id: "ai-agents", title: "AI Agents", blurb: "Autonomous agents that plan, decide and act across your tools.", icon: Zap, side: "left", pos: { x: 2, y: 10 }, look: { x: -0.9, y: 0.55 } },
  { id: "ai-integration", title: "AI Integration", blurb: "Models, RAG and document intelligence inside your stack.", icon: Brain, side: "left", pos: { x: 2, y: 38 }, look: { x: -1, y: 0.05 } },
  { id: "system-integration", title: "System Integration", blurb: "Your tools, databases and APIs working as one system.", icon: Plug, side: "left", pos: { x: 2, y: 66 }, look: { x: -0.9, y: -0.5 } },
  { id: "custom-software", title: "Custom Software", blurb: "Purpose-built platforms designed around how you work.", icon: Layers, side: "right", pos: { x: 71, y: 10 }, look: { x: 0.9, y: 0.55 } },
  { id: "cloud-devops", title: "Cloud & DevOps", blurb: "Secure, automated infrastructure that scales.", icon: Cloud, side: "right", pos: { x: 71, y: 38 }, look: { x: 1, y: 0.05 } },
  { id: "data-analytics", title: "Data & Analytics", blurb: "Real-time pipelines and dashboards you can trust.", icon: Database, side: "right", pos: { x: 71, y: 66 }, look: { x: 0.9, y: -0.5 } },
];
