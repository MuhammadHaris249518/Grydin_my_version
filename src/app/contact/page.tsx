"use client";

import React, { useState } from "react";
import { PageHero } from "@/app/globalscope/ui/PageHero";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/app/globalscope/ui/Button";
import { SITE } from "@/app/globalscope/site-config";
import { Reveal } from "@/components/motion/Reveal";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Map,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const INQUIRY_TYPES = [
  "Autonomous AI Agents",
  "Workflow Automation & n8n",
  "Custom Enterprise Software",
  "System & API Integration",
  "Cloud & DevOps Modernization",
  "Full Architecture Diagnosis",
];

export default function ContactPage() {
  const [showMap, setShowMap] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    inquiryType: INQUIRY_TYPES[0],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Fallback optimistic success for static export
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-navy text-white">
      {/* 1. PageHero */}
      <PageHero
        eyebrow="Initiate Engagement"
        title="Schedule a fixed-scope technical diagnosis"
        subtitle="Talk directly with a Lead Architect, not a sales representative. We diagnose your workflows and provide a fixed-scope specification within 48 hours."
        breadcrumbs={breadcrumbs}
      />

      {/* 2. Main Split Layout */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Form in a Glass Card (7 cols) */}
            <div className="lg:col-span-7">
              <Reveal>
                <GlassCard className="p-8 sm:p-10 border border-white/15">
                  <div className="flex items-center gap-2 mb-6">
                    <span className="font-mono text-xs uppercase text-teal-glow bg-teal/20 px-3 py-1 rounded-md border border-teal-glow/30">
                      Confidential Diagnosis
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight mb-2">
                    Describe your operational bottleneck
                  </h2>
                  <p className="text-sm text-slate-300 mb-8 leading-relaxed">
                    Tell us what is slowing down your team. We will analyze technical feasibility and map the right architecture.
                  </p>

                  {submitted ? (
                    <div className="rounded-xl border border-teal-glow/40 bg-teal/10 p-8 text-center">
                      <div className="w-12 h-12 rounded-full bg-teal/20 text-teal-glow flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Diagnosis Request Received
                      </h3>
                      <p className="text-sm text-slate-300 max-w-md mx-auto mb-6">
                        A Lead Architect will review your stack requirements and reach out within one business day with next steps.
                      </p>
                      <Button
                        type="button"
                        variant="outline-light"
                        size="sm"
                        onClick={() => setSubmitted(false)}
                      >
                        Submit another inquiry
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Alex Smith"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-glow transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                            Work Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-glow transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Acme Corp"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-glow transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                            Primary Engagement Area
                          </label>
                          <select
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                            className="w-full bg-navy-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-glow transition-colors"
                          >
                            {INQUIRY_TYPES.map((type) => (
                              <option key={type} value={type} className="bg-navy-800 text-white">
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-mono text-xs uppercase tracking-wider text-slate-300 mb-2">
                          Project Scope &amp; Current Bottlenecks *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Briefly describe the tools you use, the manual handoffs involved, and your target completion timeline..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-teal-glow transition-colors leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={loading}
                          iconRight={<ArrowRight className="w-4 h-4 ml-1" />}
                        >
                          {loading ? "Transmitting..." : "Book a free process diagnosis"}
                        </Button>

                        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-teal-glow" />
                          <span>NDA Protected · Under 48h SLA</span>
                        </div>
                      </div>
                    </form>
                  )}
                </GlassCard>
              </Reveal>
            </div>

            {/* Right Column: Contact Details + Click-to-Load Map (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              {/* Office Details Card */}
              <Reveal delay={0.1}>
                <GlassCard className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-xs uppercase text-teal-glow">
                      Active Engineering Headquarters
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">
                    The Box Software Technology Park
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    F-11 Markaz, Islamabad — GrydIn facility for high-reliability systems development and async operations.
                  </p>

                  <div className="space-y-4 border-t border-white/10 pt-6 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-xs uppercase text-slate-400">Address</p>
                        <p className="text-white text-sm mt-0.5">{SITE.office.mapsInfoAddress}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-xs uppercase text-slate-400">Hours</p>
                        <p className="text-white text-sm mt-0.5">Mon – Fri: 9:00 AM – 6:00 PM PKT</p>
                        <p className="text-xs text-slate-400 mt-0.5">Global cloud systems: 24/7 telemetry</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-xs uppercase text-slate-400">Direct Inquiries</p>
                        <a href={`mailto:${SITE.email}`} className="text-teal-glow hover:underline text-sm mt-0.5 block">
                          {SITE.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
                      <div>
                        <p className="font-mono text-xs uppercase text-slate-400">Direct Phone</p>
                        <a href={`tel:${SITE.phoneTel}`} className="text-teal-glow hover:underline text-sm mt-0.5 block">
                          {SITE.phoneDisplay}
                        </a>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>

              {/* Click-to-Load Interactive Map */}
              <Reveal delay={0.15}>
                <GlassCard className="p-6 overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Map className="w-4 h-4 text-teal-glow" />
                      <span className="font-mono text-xs uppercase tracking-wider text-white">
                        Islamabad Campus Map
                      </span>
                    </div>
                    {showMap && (
                      <a
                        href={SITE.office.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-teal-glow hover:underline flex items-center gap-1"
                      >
                        Open in Google Maps <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                  <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-white/10 bg-navy-950 flex items-center justify-center">
                    {showMap ? (
                      <iframe
                        src={SITE.office.mapsEmbedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="GrydIn Islamabad Office Location"
                        className="w-full h-full"
                      />
                    ) : (
                      <div className="p-6 text-center bg-circuit bg-cover">
                        <MapPin className="w-8 h-8 text-teal-glow mx-auto mb-3 animate-bounce" />
                        <p className="text-sm font-semibold text-white mb-1">
                          The Box Software Technology Park
                        </p>
                        <p className="text-xs text-slate-400 mb-4 max-w-xs mx-auto">
                          F-11 Markaz, Islamabad, Pakistan
                        </p>
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => setShowMap(true)}
                          iconRight={<Map className="w-3.5 h-3.5 ml-1" />}
                        >
                          Show interactive map
                        </Button>
                      </div>
                    )}
                  </div>
                </GlassCard>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
