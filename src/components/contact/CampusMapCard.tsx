"use client";

import { ExternalLink, Map, MapPin } from "lucide-react";
import { SITE } from "@/app/globalscope/site-config";

export function CampusMapCard() {
  return (
    <div className="w-full">
      {/* ── Main Map Card Container ── */}
      <div className="relative w-full bg-white rounded-2xl border border-[#d3e9f2] shadow-[0_12px_36px_rgba(13,139,153,0.08)] p-2 transition-all hover:shadow-[0_20px_50px_rgba(13,139,153,0.12)] hover:border-teal-300/80">
        {/* Header Bar */}
        <div className="absolute left-5 top-5 z-10 flex items-center justify-between gap-4 rounded-lg border border-white/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#EAF8F6] border border-[#BCE8E3]/80 flex items-center justify-center text-[#0D8B99]">
              <Map className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0D8B99]" />
            </div>
            <h3 className="font-bold text-[#0a233b] text-[10px] sm:text-xs tracking-tight">
              The Box Software Technology Park
            </h3>
          </div>

        </div>

        {/* Map Display Container */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/90 bg-[#F4F9F9] shadow-inner min-h-[220px] sm:min-h-[280px]">
          <div className="relative w-full h-[220px] sm:h-[280px]">
            <iframe
              title="GrydIn Islamabad Campus Map"
              src={SITE.office.mapsEmbedSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
            <a
              href={SITE.office.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-full px-3 py-1 text-[11px] font-bold text-slate-700 hover:text-[#0D8B99] shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <MapPin className="w-3 h-3 text-[#0D8B99]" />
              <span>Directions</span>
              <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Subtle Footer Tagline matching reference screenshot ── */}
      <div className="flex items-center justify-end gap-2.5 mt-5 pr-2 select-none">
        <div className="w-8 h-[1px] bg-gradient-to-r from-transparent via-teal-300 to-teal-400" />
        <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
        <span className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide">
          Ideas <span className="px-3 text-teal-500">→</span> Strategy <span className="px-3 text-teal-500">→</span> Product
        </span>
      </div>
    </div>
  );
}
