"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Map, ArrowRight, ExternalLink, X, MapPin } from "lucide-react";
import { SITE } from "@/app/globalscope/site-config";

export function CampusMapCard() {
  const [showLiveMap, setShowLiveMap] = useState(false);

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

          <a
            href={SITE.office.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden"
          >
            <span>View full map</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0D8B99] transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Map Display Container */}
        <div className="relative w-full rounded-xl overflow-hidden border border-slate-200/90 bg-[#F4F9F9] shadow-inner min-h-[220px] sm:min-h-[280px]">
          {showLiveMap ? (
            /* Live Interactive Google Map Embed */
            <div className="relative w-full h-[220px] sm:h-[280px]">
              <iframe
                title="GrydIn Islamabad Campus Live Map"
                src={SITE.office.mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              {/* Close Button to return to stylized view */}
              <button
                type="button"
                onClick={() => setShowLiveMap(false)}
                className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-700 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer hover:bg-slate-50 transition-all z-20"
              >
                <X className="w-3.5 h-3.5 text-slate-500" />
                <span>Close Interactive</span>
              </button>
            </div>
          ) : (
            /* Stylized Map Preview Graphic matching reference mockup exactly */
            <div className="relative w-full h-[220px] sm:h-[280px]">
              <Image
                src="/images/contact/islamabad-campus-map.png"
                alt="Islamabad Campus Map - The Box Software Technology Park"
                fill
                sizes="(max-width: 768px) 100vw, 760px"
                className="object-cover object-center"
                priority
              />

              {/* Interactive Overlay Button matching reference screenshot */}
              <div className="absolute inset-0 flex items-end justify-center pb-5 sm:pb-7 pointer-events-none">
                <button
                  type="button"
                  onClick={() => setShowLiveMap(true)}
                  className="pointer-events-auto inline-flex items-center gap-2.5 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#009ca6] via-[#0D8B99] to-[#00b4d8] hover:from-[#008992] hover:to-[#009fb8] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-lg shadow-teal-900/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <Map className="w-4 h-4 text-white/90" />
                  <span>SHOW INTERACTIVE MAP</span>
                  <ArrowRight className="w-4 h-4 text-white/90 transition-transform group-hover:translate-x-1" />
                </button>
              </div>

              {/* Direct Directions quick-link badge on bottom-left */}
              <a
                href={SITE.office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm border border-slate-200/90 rounded-full px-3 py-1 text-[11px] font-bold text-slate-700 hover:text-[#0D8B99] shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <MapPin className="w-3 h-3 text-[#0D8B99]" />
                <span>Directions</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-400" />
              </a>
            </div>
          )}
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
