"use client";

import React from "react";
import Image from "next/image";
import { MapPin, Clock, Mail, Phone, ArrowRight } from "lucide-react";
import { SITE } from "@/app/globalscope/site-config";

// WhatsApp official brand icon SVG
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2C6.516 2 2.032 6.484 2.032 12c0 1.942.557 3.754 1.523 5.289L2 22l4.862-1.507A9.92 9.92 0 0 0 12.03 22c5.516 0 10-4.484 10-10 0-5.516-4.484-10-10-10zm0 18.272a8.23 8.23 0 0 1-4.225-1.157l-.303-.18-2.885.894.908-2.812-.198-.314A8.232 8.232 0 0 1 3.76 12c0-4.56 3.71-8.272 8.271-8.272 4.561 0 8.272 3.711 8.272 8.272 0 4.56-3.711 8.272-8.272 8.272zm4.538-6.19c-.248-.124-1.468-.724-1.696-.807-.227-.083-.393-.124-.559.124-.165.248-.641.807-.786.973-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.38-1.72-.145-.248-.016-.382.108-.505.112-.112.248-.29.373-.435.124-.145.165-.248.248-.414.083-.165.041-.31-.021-.435-.062-.124-.559-1.347-.766-1.844-.201-.485-.407-.419-.559-.427l-.476-.008c-.165 0-.435.062-.663.31-.227.248-.869.849-.869 2.07 0 1.221.89 2.4 1.014 2.566.124.165 1.752 2.675 4.244 3.751.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.478-.071 1.468-.6 1.676-1.179.207-.579.207-1.076.145-1.179-.062-.103-.228-.165-.476-.29z" />
    </svg>
  );
}

export function HeadquartersCard() {
  return (
    <div className="relative w-full bg-white rounded-3xl sm:rounded-[32px] border border-slate-200/90 shadow-[0_16px_50px_rgba(13,139,153,0.06)] p-6 sm:p-8 md:p-9 transition-all hover:shadow-[0_20px_60px_rgba(13,139,153,0.09)] hover:border-teal-300/80">
      {/* ── Top Header Row with Active Badge & 3D Building ── */}
      <div className="flex items-start justify-between gap-4 mb-3">
        {/* Active badge */}
        <div>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F6] border border-[#BCE8E3] text-[#0D8B99] font-mono text-[10px] sm:text-[11px] font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-sm shadow-emerald-400" />
            ACTIVE ENGINEERING HEADQUARTERS
          </span>
        </div>

        {/* 3D Isometric Building Render Asset */}
        <div className="relative w-24 sm:w-28 md:w-32 h-14 sm:h-16 md:h-18 shrink-0 hover:scale-105 transition-transform duration-300">
          <Image
            src="/images/contact/headquarters-building-3d.png"
            alt="The Box Software Technology Park - GrydIn Headquarters"
            fill
            sizes="128px"
            className="object-contain object-right drop-shadow-md select-none pointer-events-none"
            priority
          />
        </div>
      </div>

      {/* ── Title & Subtitle ── */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0a233b] tracking-tight leading-snug">
          The Box Software Technology Park
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-1.5 max-w-2xl font-normal">
          F-11 Markaz, Islamabad — GrydIn facility for high-reliability systems development and async operations.
        </p>
      </div>

      {/* ── 4 Detail Rows with Rounded Teal Icon Circles ── */}
      <div className="space-y-4 mb-7">
        {/* 1. ADDRESS */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EAF8F6] border border-[#BCE8E3]/80 text-[#0D8B99] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dcf4f2] transition-all">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99]" />
          </div>
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700/80">
              ADDRESS
            </p>
            <p className="text-xs sm:text-[13.5px] font-semibold text-slate-800 leading-relaxed mt-0.5">
              Office # 26, 3rd Floor, The Box Software Technology Park, F-11 Markaz, Islamabad, 44000, Pakistan
            </p>
          </div>
        </div>

        {/* 2. HOURS */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EAF8F6] border border-[#BCE8E3]/80 text-[#0D8B99] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dcf4f2] transition-all">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99]" />
          </div>
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700/80">
              HOURS
            </p>
            <p className="text-xs sm:text-[13.5px] font-semibold text-slate-800 mt-0.5 leading-snug">
              Mon – Fri: 9:00 AM – 6:00 PM PKT
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Global cloud systems: 24/7 telemetry
            </p>
          </div>
        </div>

        {/* 3. DIRECT INQUIRIES */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EAF8F6] border border-[#BCE8E3]/80 text-[#0D8B99] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dcf4f2] transition-all">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99]" />
          </div>
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700/80">
              DIRECT INQUIRIES
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-xs sm:text-[13.5px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors mt-0.5 inline-block"
            >
              {SITE.email}
            </a>
          </div>
        </div>

        {/* 4. DIRECT PHONE */}
        <div className="flex items-start gap-3.5 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#EAF8F6] border border-[#BCE8E3]/80 text-[#0D8B99] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#dcf4f2] transition-all">
            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99]" />
          </div>
          <div>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-teal-700/80">
              DIRECT PHONE
            </p>
            <a
              href={`tel:${SITE.phoneTel}`}
              className="text-xs sm:text-[13.5px] font-bold text-slate-900 hover:text-[#0D8B99] transition-colors mt-0.5 inline-block"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* ── WhatsApp CTA Pill Button ── */}
      <a
        href={SITE.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-full bg-gradient-to-r from-emerald-50/90 via-[#eef9f8] to-[#e6f7f6] border border-teal-200/90 hover:border-teal-400 text-teal-800 hover:text-teal-950 font-bold text-xs sm:text-[13px] tracking-wide uppercase flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all group cursor-pointer"
      >
        <WhatsAppIcon className="w-4 h-4 text-emerald-600 transition-transform group-hover:scale-110" />
        <span>CHAT DIRECTLY ON WHATSAPP</span>
        <ArrowRight className="w-4 h-4 text-teal-700 transition-transform group-hover:translate-x-1" />
      </a>
    </div>
  );
}
