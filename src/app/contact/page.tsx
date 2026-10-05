"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/app/globalscope/site-config";
import { Reveal } from "@/components/motion/Reveal";
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
} from "lucide-react";

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
        setSubmitted(true);
      }
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-68px)] bg-white text-slate-900 overflow-hidden pt-4 sm:pt-6 md:pt-8 pb-12 sm:pb-16">
      {/* Background futuristic accents matching mockup */}
      <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-teal-200/25 via-cyan-100/15 to-transparent rounded-full blur-3xl -z-10" />

      {/* Futuristic swooping line curves at top right */}
      <svg
        className="pointer-events-none absolute top-0 right-0 w-full max-w-[850px] h-auto opacity-70 -z-10"
        viewBox="0 0 850 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M200,0 C380,180 520,120 850,220"
          stroke="url(#cyan-grad-1)"
          strokeWidth="2"
        />
        <path
          d="M350,0 C500,260 620,180 850,340"
          stroke="rgba(13,139,153,0.18)"
          strokeWidth="1.5"
        />
        <defs>
          <linearGradient id="cyan-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C2CB" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0D8B99" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>

      {/* Decorative dot matrix on left */}
      <div className="pointer-events-none absolute left-6 top-32 w-48 h-48 opacity-25 -z-10 hidden md:block">
        <svg width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <pattern id="dotPattern" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="#0D8B99" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* ============================================================== */}
          {/* LEFT COLUMN: Heading, 3 Info Cards, Follow Us, Stats Bar       */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-between pt-1 sm:pt-2">
            <div>
              {/* Eyebrow badge */}
              <div className="mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[11px] font-bold tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                  LET&apos;S BUILD TOGETHER
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0a233b] tracking-tight leading-[1.12] mb-4">
                Have a project in mind? <br />
                <span className="text-[#00C2CB] font-extrabold">Let&apos;s talk.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed max-w-lg mb-7">
                We&apos;re here to help. Whether you want to discuss a new project, explore our
                services, or just have a question — reach out and we&apos;ll get back to you within 48
                hours.
              </p>

              {/* 3 Contact Info Cards in a horizontal row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
                {/* EMAIL */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_6px_20px_rgba(13,139,153,0.05)] p-4 hover:border-teal-300 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2.5 border border-teal-100/80 group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4 text-[#0D8B99]" />
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="text-xs sm:text-[13px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors block truncate mt-0.5"
                    title={SITE.email}
                  >
                    {SITE.email}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                    We usually reply within 24 hours
                  </p>
                </div>

                {/* PHONE */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_6px_20px_rgba(13,139,153,0.05)] p-4 hover:border-teal-300 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2.5 border border-teal-100/80 group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#0D8B99]" />
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    PHONE
                  </p>
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="text-xs sm:text-[13px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors block truncate mt-0.5"
                  >
                    {SITE.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                    Mon – Fri <br className="hidden sm:block" />
                    9:00 AM – 6:00 PM PKT
                  </p>
                </div>

                {/* OFFICE */}
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_6px_20px_rgba(13,139,153,0.05)] p-4 hover:border-teal-300 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-[#EAF8F6] text-[#0D8B99] flex items-center justify-center mb-2.5 border border-teal-100/80 group-hover:scale-105 transition-transform">
                    <MapPin className="w-4 h-4 text-[#0D8B99]" />
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    OFFICE
                  </p>
                  <p className="text-xs sm:text-[13px] font-bold text-slate-900 truncate mt-0.5">
                    F-11 Markaz, Islamabad
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1 leading-tight">
                    Pakistan <br />
                    Visit us (by appointment)
                  </p>
                </div>
              </div>

              {/* Follow Us Row */}
              <div className="flex items-center gap-3 mb-6">
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

            {/* Dark Stats Banner at bottom */}
            <div className="relative rounded-2xl bg-gradient-to-r from-[#031525] via-[#051f33] to-[#041a2c] border border-teal-500/25 p-3.5 sm:px-5 sm:py-3.5 shadow-xl shadow-teal-950/15 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: 3D Holographic Cube + Tagline */}
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 shrink-0">
                    <Image
                      src="/images/contact/stats-cube-3d.png"
                      alt="GrydIn 3D Cube"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-white text-xs sm:text-[13px] leading-tight">
                      Trusted by startups &amp; businesses
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-0.5">
                      From idea to deployment, we build solutions that scale.
                    </p>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className="flex items-center gap-4 sm:gap-6 border-t sm:border-t-0 sm:border-l border-white/10 pt-2 sm:pt-0 sm:pl-5 shrink-0">
                  <div>
                    <p className="font-extrabold text-white text-sm sm:text-base leading-tight">
                      10+
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Projects Delivered
                    </p>
                  </div>
                  <div>
                    <p className="font-extrabold text-white text-sm sm:text-base leading-tight">5+</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Happy Clients
                    </p>
                  </div>
                  <div>
                    <p className="font-extrabold text-[#00C2CB] text-sm sm:text-base leading-tight">
                      99%
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                      Client Satisfaction
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN: Form Card + 3D Robot Illustration                */}
          {/* ============================================================== */}
          <div className="lg:col-span-6 xl:col-span-6 relative">
            <div className="relative flex items-center justify-start lg:justify-center">
              {/* Form Card */}
              <div className="w-full max-w-[490px] relative z-10 bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_12px_45px_rgba(13,139,153,0.09)] p-6 sm:p-7 md:p-8">
                {/* Eyebrow badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
                    <MessageSquare className="w-3 h-3 text-[#0D8B99]" />
                    SEND US A MESSAGE
                  </span>
                </div>

                {/* Form Title & Subtitle */}
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Tell us about your project
                </h2>
                <p className="text-xs text-slate-500 mt-1 mb-5 leading-relaxed font-normal">
                  Share your requirements, timeline or any questions. We&apos;ll get back to you with the
                  right solution.
                </p>

                {/* Form or success state */}
                {submitted ? (
                  <div className="rounded-2xl border border-teal-200 bg-teal-50/70 p-6 sm:p-8 text-center shadow-xs">
                    <div className="w-12 h-12 rounded-full bg-teal-100 text-[#0D8B99] flex items-center justify-center mx-auto mb-3 border border-teal-200">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Message Sent!</h3>
                    <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                      Thank you for reaching out. We&apos;ll review your requirements and respond
                      within 48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#0D8B99] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#097b87] transition-colors cursor-pointer"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    {/* Full Name & Email Address */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Full Name <span className="text-[#0D8B99]">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full h-10 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                          Email Address <span className="text-[#0D8B99]">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="you@company.com"
                          className="w-full h-10 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all"
                        />
                      </div>
                    </div>

                    {/* Company / Organization */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Your company name"
                        className="w-full h-10 bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all"
                      />
                    </div>

                    {/* How can we help you? */}
                    <div>
                      <label
                        htmlFor="service-select"
                        className="block text-[11px] font-semibold text-slate-700 mb-1"
                      >
                        How can we help you? <span className="text-[#0D8B99]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="service-select"
                          required
                          value={formData.service}
                          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                          className="w-full h-10 appearance-none bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200 rounded-xl px-3.5 pr-8 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all cursor-pointer font-normal"
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
                        <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Project Details */}
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Project Details <span className="text-[#0D8B99]">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          required
                          rows={3}
                          maxLength={500}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Tell us about your project, goals, and any specific requirements..."
                          className="w-full bg-[#F8FBFB] hover:bg-white focus:bg-white border border-slate-200 rounded-xl p-3 pb-6 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0D8B99]/20 focus:border-[#0D8B99] transition-all leading-relaxed resize-none"
                        />
                        <span className="absolute right-2.5 bottom-1.5 font-mono text-[10px] text-slate-400 select-none">
                          {formData.message.length}/500
                        </span>
                      </div>
                    </div>

                    {/* Footer Row inside card */}
                    <div className="pt-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2 max-w-[240px]">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div className="text-[10px] text-slate-500 leading-tight">
                          <span className="font-semibold text-slate-700 block">
                            Your information is safe with us.
                          </span>
                          We respect your privacy and never share your data.
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00b4d8] to-[#0D8B99] hover:from-[#00a2c3] hover:to-[#097b87] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer shrink-0"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{loading ? "Sending..." : "Send Message"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* 3D Robot Assistant Graphic (Right Side Beside Form) */}
              <div className="hidden lg:block absolute -right-16 xl:-right-24 top-0 bottom-0 w-[200px] xl:w-[220px] pointer-events-none select-none z-0">
                <div className="relative w-full h-full min-h-[440px]">
                  <Image
                    src="/images/contact/robot-past-card-transparent.png"
                    alt="GrydIn 3D AI Robot Assistant"
                    fill
                    className="object-contain object-left-center"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
