import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink, Shield, Wifi, MessageCircle, Building } from "lucide-react";
import { Button } from "../ui/Button";
import { SITE } from "../site-config";

export function HomeMapSection() {
  return (
    <section id="location" className="relative w-full py-20 md:py-28 bg-[#f4f7fa] border-b border-surface-line overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d8b99] text-white text-xs font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Building className="w-3.5 h-3.5" />
            <span>Physical Presence & Engineering Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink mb-4 leading-tight">
            Visit Our Islamabad Engineering Office
          </h2>

          <p className="text-base sm:text-lg text-ink-muted leading-relaxed">
            Headquartered at The Box Software Technology Park in F-11 Markaz, Islamabad. We coordinate global async software engineering, client briefings, and in-person architecture workshops.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Theme-Colored (#0d8b99 Teal) Office Command Card (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-gradient-to-br from-[#0e95a4] via-[#0d8b99] to-[#09707c] p-8 sm:p-9 rounded-2xl border border-white/20 shadow-2xl text-white relative overflow-hidden">
            {/* Ambient corner light */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-white/20 px-3 py-1 rounded-md border border-white/30">
                  Active Engineering Hub
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                The Box Software Technology Park
              </h3>
              <p className="text-sm text-white/90 mb-6 leading-relaxed font-normal">
                F-11 Markaz, Islamabad — GrydIn headquarters for high-reliability systems development and client strategy.
              </p>

              <div className="space-y-4 mb-8">
                {/* Address */}
                <div className="flex items-start gap-3 bg-white/15 border border-white/20 rounded-xl p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/30">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                      Office Address
                    </p>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {SITE.office.mapsInfoAddress}
                    </p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3 bg-white/15 border border-white/20 rounded-xl p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/30">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                      Office & Visiting Hours
                    </p>
                    <p className="text-sm font-semibold text-white">
                      Monday – Friday: 9:00 AM – 6:00 PM PKT
                    </p>
                    <p className="text-xs text-white/85 mt-0.5">
                      Global async cloud engineering: 24/7
                    </p>
                  </div>
                </div>

                {/* Direct Contacts */}
                <div className="flex items-start gap-3 bg-white/15 border border-white/20 rounded-xl p-3.5">
                  <div className="w-9 h-9 rounded-lg bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 border border-white/30">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                      Direct Contact
                    </p>
                    <p className="text-sm font-semibold text-white">
                      <a href={`tel:${SITE.phoneTel}`} className="hover:underline transition-all">
                        {SITE.phoneDisplay}
                      </a>
                    </p>
                    <p className="text-xs text-white/85">
                      <a href={`mailto:${SITE.email}`} className="hover:underline transition-all">
                        {SITE.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility Badges in glassmorphism */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/20 mb-8">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/25 backdrop-blur-sm">
                  <Shield className="w-3.5 h-3.5" /> NDA Protected Facility
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/25 backdrop-blur-sm">
                  <Wifi className="w-3.5 h-3.5" /> Redundant Fiber
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={SITE.office.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-100 text-[#0d8b99] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all text-center"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>

              <a
                href={SITE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/30 rounded-xl transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Embed (7 cols) */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="relative w-full h-full min-h-[420px] sm:min-h-[480px] rounded-2xl border-2 border-[#0d8b99]/30 overflow-hidden shadow-2xl bg-[#04172e]">
              {/* Top Map Header Badge */}
              <div className="absolute top-4 left-4 z-10 bg-[#04172e]/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15 shadow-xl flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#0d8b99]" />
                <div>
                  <p className="text-xs font-bold text-white leading-tight">GrydIn HQ Location</p>
                  <p className="text-[10px] text-slate-300 leading-tight">F-11 Markaz, Islamabad</p>
                </div>
              </div>

              {/* Bottom Direct Link Badge */}
              <div className="absolute bottom-4 right-4 z-10">
                <a
                  href={SITE.office.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#04172e]/90 hover:bg-[#04172e] text-white px-3.5 py-2 rounded-xl border border-white/15 shadow-xl hover:text-[#0d8b99] transition-colors backdrop-blur-md"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Google Map iframe embed */}
              <iframe
                src={SITE.office.mapsEmbedSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "440px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="GrydIn Office Location - The Box Software Technology Park, F-11 Markaz Islamabad"
                className="w-full h-full min-h-[440px] rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
