import Image from "next/image";
import { Clock, MapPin, ArrowRight } from "lucide-react";
import { SITE } from "@/app/globalscope/site-config";

export function HeadquartersCard() {
  return (
    <article className="grid h-full grid-cols-1 sm:grid-cols-[minmax(150px,0.72fr)_1.28fr] gap-4 rounded-2xl border border-[#d3e9f2] bg-white/90 p-3 shadow-[0_8px_28px_rgba(13,139,153,0.07)]">
      <div className="relative min-h-[180px] overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-[#e5f6fa] via-white to-[#c7f2ed] sm:min-h-[210px]">
        <Image
          src="/assets/images/contact/headquarters-building-3d.png"
          alt="The Box Software Technology Park campus"
          fill
          sizes="(max-width: 640px) 100vw, 220px"
          className="object-contain p-2"
        />
        <span className="absolute left-3 top-3 rounded-full border border-teal-100 bg-white/90 px-3 py-1 text-[9px] font-bold tracking-[0.12em] text-teal-700 shadow-sm">
          ISLAMABAD CAMPUS
        </span>
      </div>

      <div className="flex min-w-0 flex-col justify-center py-1 sm:pr-2">
        <div className="mb-2 flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#078a88]" />
          <div>
            <h3 className="text-sm font-bold leading-tight text-[#0a233b] sm:text-[15px]">The Box Software Technology Park</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-500">F-11 Markaz, Islamabad — a modern workspace for innovation and collaboration.</p>
          </div>
        </div>

        <div className="ml-6 space-y-1.5 text-[11px] text-slate-600">
          <a href={`tel:${SITE.phoneTel}`} className="flex items-center gap-2 hover:text-teal-700"><span className="font-semibold text-teal-700">☎</span>{SITE.phoneDisplay}</a>
          <p className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-teal-700" />Mon – Fri, 9:00 AM – 6:00 PM (PKT)</p>
          <p className="flex items-start gap-2 leading-relaxed"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-700" />Office # 26, 3rd Floor, The Box Software Technology Park, F-11 Markaz, Islamabad</p>
        </div>

        <a href={SITE.office.mapsUrl} target="_blank" rel="noopener noreferrer" className="ml-6 mt-2.5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-600 px-4 py-2 text-[10px] font-bold text-teal-800 transition-colors hover:bg-teal-50">
          Open in Google Maps <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
