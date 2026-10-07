"use client";

import React, { useState } from "react";
import Image from "next/image";
import { SITE } from "@/app/globalscope/site-config";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Youtube,
  ShieldCheck,
  Send,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import { ContactRobotAssistant } from "@/components/contact/ContactRobotAssistant";
import { HeadquartersCard } from "@/components/contact/HeadquartersCard";
import { CampusMapCard } from "@/components/contact/CampusMapCard";

// X (formerly Twitter) Icon SVG
function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SERVICES_LIST = [
  "Autonomous AI Agents",
  "Workflow Automation & n8n",
  "Custom Enterprise Software",
  "System & API Integration",
  "Cloud & DevOps Modernization",
  "Full Architecture Diagnosis",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          company: formData.company,
          inquiryType: "New Project / Business Inquiry",
          hearAbout: "Other",
          subject: `Project Inquiry: ${formData.service || "General Inquiry"}`,
          message: `[Service: ${formData.service || "Not Specified"}]\n\n${formData.message}`,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(
          data.error || "Unable to send message right now. Please try again or email hello@grydin.co."
        );
      }
    } catch {
      setErrorMessage("Network error. Please try again or reach out to hello@grydin.co.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-68px)] bg-gradient-to-b from-white via-[#f1fbfa]/60 to-white text-slate-900 overflow-hidden pt-3 sm:pt-4 md:pt-5 pb-12 sm:pb-16">
      {/* ── Futuristic ambient lighting in background ── */}
      <div className="pointer-events-none absolute top-0 right-0 w-[640px] h-[640px] bg-gradient-to-bl from-teal-200/25 via-cyan-100/15 to-transparent rounded-full blur-3xl -z-10" />
      <div className="pointer-events-none absolute top-[40%] left-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-cyan-200/20 via-teal-100/10 to-transparent rounded-full blur-3xl -z-10" />

      {/* ── Decorative dot matrix pattern ── */}
      <div className="pointer-events-none absolute left-6 top-32 w-48 h-48 opacity-25 -z-10 hidden md:block">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="contactDotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#0D8B99" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#contactDotPattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* UPPER SECTION: Left side Text/Info & Right side Quality Form + 3D Robot   */}
        {/* ========================================================================= */}
        <section className="mb-8 sm:mb-10 lg:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-7 lg:gap-8">
            {/* ── LEFT COLUMN: Heading, 3 Info Cards, Follow Us, Stats Bar ── */}
            <div className="w-full lg:col-span-5 flex flex-col justify-between pt-1">
              <div>
                {/* Eyebrow badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[11px] font-bold tracking-wider uppercase shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                    LET&apos;S BUILD TOGETHER
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="mb-4 text-[clamp(2rem,9vw,2.5rem)] font-extrabold leading-[1] tracking-[-0.045em] text-[#0a233b] sm:text-5xl lg:text-[56px]">
                  Have a project in mind? <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#12bfc0] to-[#008d91]">
                    Let&apos;s talk.
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-[14px] text-slate-600 leading-relaxed max-w-lg mb-5 font-normal">
                  We&apos;re here to help. Whether you want to discuss a new project, explore our solutions, or have technical inquiries — reach out and we&apos;ll get back to you within 24 hours.
                </p>

                {/* 3 Quick Contact Info Cards */}
                <div className="-mx-4 mb-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 sm:pb-0">
                  {/* EMAIL */}
                  <div className="w-[76vw] max-w-[250px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_4px_16px_rgba(13,139,153,0.04)] transition-all hover:border-teal-300 hover:shadow-md sm:w-auto sm:max-w-none sm:p-4 sm:shrink group">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2 border border-teal-100/80 group-hover:scale-105 transition-transform">
                      <Mail className="w-4 h-4 text-[#0D8B99]" />
                    </div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      EMAIL
                    </p>
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-xs sm:text-[12.5px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors block truncate mt-0.5"
                      title={SITE.email}
                    >
                      {SITE.email}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                      Reply within 24h
                    </p>
                  </div>

                  {/* PHONE */}
                  <div className="w-[76vw] max-w-[250px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_4px_16px_rgba(13,139,153,0.04)] transition-all hover:border-teal-300 hover:shadow-md sm:w-auto sm:max-w-none sm:p-4 sm:shrink group">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2 border border-teal-100/80 group-hover:scale-105 transition-transform">
                      <Phone className="w-4 h-4 text-[#0D8B99]" />
                    </div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      PHONE
                    </p>
                    <a
                      href={`tel:${SITE.phoneTel}`}
                      className="text-xs sm:text-[12.5px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors block truncate mt-0.5"
                    >
                      {SITE.phoneDisplay}
                    </a>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                      Mon – Fri <br />
                      9:00 AM – 6:00 PKT
                    </p>
                  </div>

                  {/* OFFICE */}
                  <div className="w-[76vw] max-w-[250px] shrink-0 snap-start rounded-2xl border border-slate-200/90 bg-white p-3.5 shadow-[0_4px_16px_rgba(13,139,153,0.04)] transition-all hover:border-teal-300 hover:shadow-md sm:w-auto sm:max-w-none sm:p-4 sm:shrink group">
                    <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2 border border-teal-100/80 group-hover:scale-105 transition-transform">
                      <MapPin className="w-4 h-4 text-[#0D8B99]" />
                    </div>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      OFFICE
                    </p>
                    <p className="text-xs sm:text-[12.5px] font-bold text-slate-900 mt-0.5 leading-snug">
                      The Box Tech Park
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                      F-11 Markaz, PK
                    </p>
                  </div>
                </div>

                {/* Follow Us Row */}
                <div className="hidden">
                  <span className="text-xs font-bold text-slate-800">Follow Us</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.linkedin.com/company/grydin/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0D8B99] hover:border-[#0D8B99] flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://x.com/grydin_tech"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0D8B99] hover:border-[#0D8B99] flex items-center justify-center transition-colors"
                      aria-label="X (Twitter)"
                    >
                      <XIcon className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://github.com/grydin-technologies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0D8B99] hover:border-[#0D8B99] flex items-center justify-center transition-colors"
                      aria-label="GitHub"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                    <a
                      href="https://youtube.com/@grydin"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-7 h-7 rounded-lg border border-slate-200 text-slate-600 hover:text-[#0D8B99] hover:border-[#0D8B99] flex items-center justify-center transition-colors"
                      aria-label="YouTube"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Dark Stats Banner at bottom - sleek rounded pill */}
              <div className="relative rounded-2xl bg-gradient-to-r from-[#031b2a] via-[#052c3a] to-[#031b2a] border border-teal-500/25 px-4 py-3 shadow-xl shadow-teal-950/15 overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  {/* Left: 3D Holographic Cube + Tagline */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
                      <div className="absolute inset-0 bg-[#00C2CB]/25 rounded-full blur-sm" />
                      <Image
                        src="/images/contact/stats-cube-3d.png"
                        alt="GrydIn 3D Cube"
                        fill
                        sizes="36px"
                        className="object-contain relative z-10"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-white text-[11px] sm:text-xs leading-tight">
                        Trusted by startups &amp; businesses
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 leading-tight mt-0.5">
                        From early-stage ideas to scalable products, we&apos;ve helped teams worldwide build.
                      </p>
                    </div>
                  </div>

                  {/* Right: Metrics */}
                  <div className="flex items-center gap-3 sm:gap-4 shrink-0 border-l border-white/20 pl-3">
                    <div className="text-center">
                      <p className="font-extrabold text-white text-xs sm:text-sm leading-none">
                        10+
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">
                        Projects
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="font-extrabold text-white text-xs sm:text-sm leading-none">
                        8+
                      </p>
                      <p className="text-[8px] sm:text-[9px] text-slate-400 uppercase tracking-wider mt-0.5">
                        Happy Clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: High-Quality Vector Form + Integrated 3D Robot Stage ── */}
            <div className="w-full lg:col-span-7 relative">
              <div className="relative z-10 w-full bg-white/80 backdrop-blur-xl rounded-3xl sm:rounded-[28px] border border-[#b8e3e9] shadow-[0_20px_60px_-15px_rgba(13,139,153,0.14)] p-5 sm:p-6 md:p-7 transition-all hover:shadow-[0_24px_70px_-15px_rgba(13,139,153,0.18)]">
                {/* Form or success state */}
                {submitted ? (
                  <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-8 sm:p-12 text-center shadow-xs">
                    <div className="w-14 h-14 rounded-full bg-teal-100 text-[#0D8B99] flex items-center justify-center mx-auto mb-4 border border-teal-200 shadow-sm animate-bounce">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Message Sent!</h3>
                    <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
                      Thank you for reaching out. Our engineering team will review your project requirements and respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: "", email: "", company: "", service: "", message: "" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0D8B99] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#097b87] transition-all cursor-pointer shadow-md hover:shadow-lg"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-3 items-center">
                    {/* Left side inside card: Clean, Razor-Sharp Vector Form Fields */}
                    <div className="xl:col-span-7">
                      {/* Eyebrow badge */}
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                          <MessageSquare className="w-3 h-3 text-[#0D8B99]" />
                          SEND US A MESSAGE
                        </span>
                      </div>

                      {/* Form Title & Subtitle */}
                      <h2 className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight leading-snug">
                        Tell us about your project
                      </h2>
                      <p className="text-xs sm:text-[13px] text-slate-500 mt-1 mb-5 leading-relaxed font-normal">
                        Share your requirements, timeline or any questions. We&apos;ll get back to you within 24 hours.
                      </p>

                      {errorMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Full Name & Email Address */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                              Full Name <span className="text-[#0D8B99]">*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Your name"
                              className="w-full h-11 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl px-3.5 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all shadow-xs"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                              Email Address <span className="text-[#0D8B99]">*</span>
                            </label>
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              placeholder="you@company.com"
                              className="w-full h-11 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl px-3.5 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all shadow-xs"
                            />
                          </div>
                        </div>

                        {/* Company / Organization */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="Your company name"
                            className="w-full h-11 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl px-3.5 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all shadow-xs"
                          />
                        </div>

                        {/* How can we help you? */}
                        <div>
                          <label
                            htmlFor="service-select"
                            className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1"
                          >
                            How can we help you? <span className="text-[#0D8B99]">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="service-select"
                              required
                              value={formData.service}
                              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                              className="w-full h-11 appearance-none bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl px-3.5 pr-8 text-xs sm:text-[13px] text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all cursor-pointer font-normal shadow-xs"
                            >
                              <option value="" disabled className="text-slate-400">
                                Select a service
                              </option>
                              {SERVICES_LIST.map((srv) => (
                                <option key={srv} value={srv} className="text-slate-900">
                                  {srv}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        {/* Project Details */}
                        <div>
                          <label className="block text-[11px] sm:text-xs font-semibold text-slate-700 mb-1">
                            Project Details <span className="text-[#0D8B99]">*</span>
                          </label>
                          <div className="relative">
                            <textarea
                              required
                              rows={3}
                              maxLength={1000}
                              value={formData.message}
                              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                              placeholder="Tell us about your project, goals, and any specific requirements..."
                              className="w-full bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200/90 rounded-xl p-3.5 pb-6 text-xs sm:text-[13px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all leading-relaxed resize-none shadow-xs"
                            />
                            <span className="absolute right-3 bottom-2 font-mono text-[10px] text-slate-400 select-none">
                              {formData.message.length}/1000
                            </span>
                          </div>
                        </div>

                        {/* Footer Row inside form */}
                        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                          <div className="flex items-center gap-2 max-w-[220px]">
                            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                            <div className="text-[10px] sm:text-[11px] text-slate-500 leading-tight">
                              <span className="font-semibold text-slate-700 block">
                                Your information is safe.
                              </span>
                              We respect your privacy completely.
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0D8B99] hover:from-[#00a2c3] hover:to-[#097b87] text-white text-xs sm:text-[13px] font-bold uppercase tracking-wider shadow-md shadow-teal-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer shrink-0"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{loading ? "Sending..." : "Send Message"}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* Right side inside card: Interactive 3D Robot Assistant with Real Movement */}
                    <div className="xl:col-span-5 w-full flex items-center justify-center">
                      <ContactRobotAssistant />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* LOWER SECTION: Address & Map (Matching user reference layout exactly)     */}
        {/* ========================================================================= */}
        <section className="relative z-10 mx-auto max-w-[1360px]">
          {/* Section Heading Badge & Title */}
          <div className="text-left mb-3 sm:mb-4 max-w-[560px]">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              PHYSICAL HEADQUARTERS &amp; CAMPUS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0a233b] tracking-tight">
              Our Base of Operations
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mt-1 leading-relaxed">
              Visit our engineering campus in Islamabad or reach out directly for synchronous briefings.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr] items-center gap-5 lg:gap-6">
            <HeadquartersCard />
            <CampusMapCard />
          </div>
          <div className="-mx-2 mt-4 flex snap-x snap-mandatory items-center gap-4 overflow-x-auto px-2 pb-2 text-[10px] font-medium text-slate-600 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:text-[11px]">
            <span className="inline-flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e0f8f6] text-teal-700"><MessageSquare className="h-4 w-4" /></span>Reliable Communication</span>
            <span className="inline-flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e0f8f6] text-teal-700"><ShieldCheck className="h-4 w-4" /></span>Professional Support</span>
            <span className="inline-flex items-center gap-2"><span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e0f8f6] text-teal-700"><CheckCircle2 className="h-4 w-4" /></span>On-Time Delivery</span>
          </div>
        </section>
      </div>
    </main>
  );
}
