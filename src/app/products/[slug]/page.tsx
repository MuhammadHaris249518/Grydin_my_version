import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllProducts,
  getProductBySlug,
  PRODUCTS,
} from "@/data/products";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { Section } from "@/app/globalscope/ui/Section";
import { Card } from "@/app/globalscope/ui/Card";
import { Badge } from "@/app/globalscope/ui/Badge";
import { Button } from "@/app/globalscope/ui/Button";
import { CoverArt } from "@/app/globalscope/ui/CoverArt";
import { CtaBand } from "@/app/globalscope/ui/CtaBand";
import { JsonLd } from "@/app/globalscope/ui/JsonLd";
import {
  buildMetadata,
  softwareApplicationJsonLd,
  breadcrumbJsonLd,
} from "@/lib/seo";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
} from "lucide-react";

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
    <div className="min-h-screen bg-white">
      <JsonLd data={jsonLdData} />

      {/* PageHero */}
      <PageHero
        eyebrow={`${product.category} Platform`}
        title={product.name}
        subtitle={product.tagline}
        breadcrumbs={breadcrumbs}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              iconRight={<ArrowRight className="w-4 h-4" />}
            >
              Request a demo
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

      {/* Overview Section */}
      <Section tone="white" eyebrow="Overview" title="Product Architecture">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" data-allow-copy>
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Built for high-reliability systems and enterprise workflows.
            </h2>
            <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
              {product.description}
            </p>
            <div className="p-4 rounded-xl bg-surface-soft border border-surface-line flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal">
                Pricing model
              </span>
              <span className="text-sm font-semibold text-ink">
                {product.pricing || "Custom quote based on workload"}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-surface-line shadow-lg">
              <CoverArt
                seed={product.slug}
                icon={product.icon}
                aspect="16/9"
                title={product.name}
                className="h-64 sm:h-80 w-full"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Features Grid */}
      <Section
        tone="soft"
        eyebrow="Capabilities"
        title="Core Engineering Features"
        intro={`Detailed feature breakdown of ${product.name}'s capabilities.`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {product.features.map((feat, idx) => (
            <Card key={idx} className="p-6 sm:p-7 bg-white">
              <div className="w-10 h-10 rounded-lg bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-ink tracking-tight mb-2">
                {feat.title}
              </h3>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {feat.text}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Use Cases & Stack */}
      <Section tone="white" eyebrow="Applications" title="Enterprise Use Cases & Stack">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Use Cases */}
          <div className="bg-surface-soft rounded-2xl p-8 border border-surface-line">
            <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal" />
              <span>Target Use Cases</span>
            </h3>
            <div className="space-y-4">
              {product.useCases.map((uc, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-ink">
                  <Check className="w-5 h-5 text-teal shrink-0 mt-0.5" />
                  <span>{uc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-surface-soft rounded-2xl p-8 border border-surface-line flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink mb-6 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-teal" />
                <span>Underlying Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {product.stack.map((item) => (
                  <Badge key={item} variant="surface" size="md">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-surface-line">
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Inquire about {product.name}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* Other Products */}
      <Section tone="soft" eyebrow="Tooling Suite" title="Other GrydIn Tools">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {otherProducts.map((p) => (
            <Card
              key={p.slug}
              href={`/products/${p.slug}`}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <CoverArt
                  seed={p.slug}
                  icon={p.icon}
                  aspect="16/9"
                  title={p.name}
                  className="rounded-lg mb-4 max-h-36"
                />
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="teal" size="sm">{p.category}</Badge>
                  <Badge variant={p.status === "Live" ? "live" : p.status === "Beta" ? "beta" : "coming-soon"} size="sm">
                    {p.status}
                  </Badge>
                </div>
                <h4 className="font-bold text-ink group-hover:text-teal transition-colors line-clamp-1 mb-1">
                  {p.name}
                </h4>
                <p className="text-xs text-ink-muted line-clamp-2 mb-4">
                  {p.summary}
                </p>
              </div>
              <div className="pt-3 border-t border-surface-line flex items-center justify-between text-xs font-bold uppercase text-teal">
                <span>View tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* CtaBand */}
      <CtaBand
        title={`Deploy ${product.name} or integrate it into your systems.`}
        subtitle="Speak directly to our engineering team in Islamabad."
        buttonText="Book a technical demo"
        buttonHref="/contact"
      />
    </div>
  );
}
