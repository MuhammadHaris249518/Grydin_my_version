import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getProductBySlug,
  PRODUCTS,
} from "@/data/products";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Button } from "@/app/globalscope/ui/Button";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  buildMetadata,
  softwareApplicationJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  Cpu,
  Sparkles,
  Check,
  Activity,
  Layers,
  Terminal,
} from "lucide-react";
import { ModelSlot } from "@/components/3d/ModelSlot";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/motion/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | GrydIn",
    };
  }

  return buildMetadata({
    documentTitle: `${product.name} - ${product.tagline} | GrydIn`,
    socialTitle: `${product.name} | ${product.tagline} | GrydIn`,
    description: product.summary,
    path: `/products/${product.slug}`,
    keywords: [
      product.name,
      product.category,
      ...product.stack,
      "AI tooling",
      "workflow automation tool",
      "GrydIn product",
    ],
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Projects & Products", href: "/projects#our-products" },
    { label: product.name },
  ];

  const jsonLdData = [
    softwareApplicationJsonLd(product),
    breadcrumbJsonLd([
      { name: "Home", url: "/" },
      { name: "Products", url: "/projects#our-products" },
      { name: product.name, url: `/products/${product.slug}` },
    ]),
  ];

  return (
    <div className="min-h-screen bg-navy text-white">
      <JsonLd data={jsonLdData} />

      {/* PageHero with 3D product-demo slot */}
      <PageHero
        eyebrow={`${product.category} Platform`}
        title={product.name}
        subtitle={product.tagline}
        breadcrumbs={breadcrumbs}
        slot={<ModelSlot label="product-demo" className="aspect-[4/3] w-full border border-white/10" />}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Book a free process diagnosis
            </Button>
            <Badge
              variant={
                product.status === "Live"
                  ? "live"
                  : product.status === "Beta"
                  ? "beta"
                  : "coming-soon"
              }
              size="md"
            >
              Status: {product.status}
            </Badge>
          </div>
        }
      />

      {/* Overview & Perspective Mockup Section */}
      <section className="relative bg-navy py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <SectionHeader
                eyebrow="Overview"
                title="Built for high-reliability systems and enterprise workflows"
                accent="high-reliability"
              />
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
                {product.description}
              </p>
              <div className="glass p-5 rounded-xl flex items-center gap-4">
                <span className="font-mono text-xs uppercase tracking-wider text-teal-glow">
                  Pricing model
                </span>
                <span className="text-base text-white font-medium">
                  {product.pricing || "Custom quote based on workload"}
                </span>
              </div>
            </div>

            {/* Perspective Mockup */}
            <div className="lg:col-span-5">
              <div
                className="glass rounded-2xl p-6 border border-white/15 shadow-2xl transition-transform duration-500 hover:rotate-0"
                style={{ transform: "perspective(1200px) rotateY(-8deg)" }}
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                    <span className="h-3 w-3 rounded-full bg-green-400/80" />
                  </div>
                  <span className="font-mono text-xs text-teal-glow">{product.name} OS v2.4</span>
                </div>
                <div className="space-y-3 font-mono text-xs text-slate-300">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-teal-glow" /> System Status</span>
                    <span className="text-teal-glow">{product.status}</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Terminal className="h-4 w-4 text-teal-glow" /> Architecture</span>
                    <span className="text-teal-glow">Cloud Native</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Layers className="h-4 w-4 text-teal-glow" /> Integration Model</span>
                    <span className="text-teal-glow">API & Webhooks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative bg-navy-950 py-20 md:py-28 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <SectionHeader
            eyebrow="Capabilities"
            title="Core engineering features"
            accent="engineering features"
            intro={`Detailed capability breakdown of ${product.name}'s architectural foundations.`}
            className="mb-14"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.features.map((feat, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <GlassCard className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-sm font-bold text-teal-glow">
                      0{idx + 1}
                    </span>
                    <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {feat.text}
                    </p>
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases & Stack */}
      <section className="relative bg-navy py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Use Cases */}
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-teal-glow" />
                <span>Target Use Cases</span>
              </h3>
              <div className="space-y-4">
                {product.useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-3 text-base text-slate-200">
                    <Check className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Tech Stack */}
            <GlassCard className="p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2.5">
                  <Cpu className="w-5 h-5 text-teal-glow" />
                  <span>Underlying Technologies</span>
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {product.stack.map((item) => (
                    <span key={item} className="glass px-3 py-1 text-xs font-mono text-slate-300 rounded-md">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button href="/contact" variant="primary" size="md">
                  Book a free process diagnosis
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* Other Products */}
      {otherProducts.length > 0 && (
        <section className="relative bg-navy-950 py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
            <SectionHeader
              eyebrow="Proprietary Tools"
              title="Explore more software from GrydIn"
              accent="Explore more software"
              className="mb-12"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProducts.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="group block">
                  <GlassCard className="p-7 h-full flex flex-col justify-between transition-[box-shadow,border-color] duration-300 group-hover:border-teal-glow/50 group-hover:shadow-glow">
                    <div>
                      <span className="font-mono text-xs uppercase text-teal-glow">{p.category}</span>
                      <h4 className="mt-2 text-xl font-semibold text-white group-hover:text-teal-glow transition-colors">{p.name}</h4>
                      <p className="mt-2 text-xs text-slate-300 line-clamp-2">{p.summary}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-teal-glow font-semibold">
                      <span>Explore tool</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={`Ready to deploy ${product.name}?`}
        subtitle="Book a sandbox walkthrough with our engineering team."
      />
    </div>
  );
}
