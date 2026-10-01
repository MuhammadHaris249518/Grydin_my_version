import { MapPin, Navigation, Clock, Phone, Mail, ExternalLink, Shield, Wifi, MessageCircle } from "lucide-react";
import { Section } from "../ui/Section";
import { Button } from "../ui/Button";
import { SITE } from "../site-config";

export function HomeMapSection() {
  return (
    <Section
      id="location"
      tone="white"
      eyebrow="Physical Presence & Engineering Hub"
      title="Visit Our Islamabad Engineering Office"
      intro="Headquartered at The Box Software Technology Park in F-11 Markaz, Islamabad. We coordinate global async software engineering, client briefings, and in-person architecture workshops."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column: Office Details & Actions (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-surface-soft p-8 sm:p-9 rounded-2xl border border-surface-line">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Active Engineering Hub
              </span>
            </div>

            <h3 className="text-2xl font-bold text-ink mb-2">
              The Box Software Technology Park
            </h3>
            <p className="text-sm text-ink-muted mb-6 leading-relaxed">
              F-11 Markaz, Islamabad — GrydIn headquarters for high-reliability systems development and client strategy.
            </p>

            <div className="space-y-4 mb-8">
              {/* Address */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                    Office Address
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    {SITE.office.mapsInfoAddress}
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                    Office & Visiting Hours
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    Monday – Friday: 9:00 AM – 6:00 PM PKT
                  </p>
                  <p className="text-xs text-ink-muted">
                    Global async cloud engineering: 24/7
                  </p>
                </div>
              </div>

              {/* Direct Contacts */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal/10 text-teal flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">
                    Direct Contact
                  </p>
                  <p className="text-sm font-semibold text-ink">
                    <a href={`tel:${SITE.phoneTel}`} className="hover:text-teal transition-colors">
                      {SITE.phoneDisplay}
                    </a>
                  </p>
                  <p className="text-xs text-ink-muted">
                    <a href={`mailto:${SITE.email}`} className="hover:text-teal transition-colors">
                      {SITE.email}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Facility Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-surface-line mb-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white text-slate-700 px-3 py-1.5 rounded-md border border-surface-line shadow-xs">
                <Shield className="w-3.5 h-3.5 text-teal" /> NDA Protected Facility
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-white text-slate-700 px-3 py-1.5 rounded-md border border-surface-line shadow-xs">
                <Wifi className="w-3.5 h-3.5 text-teal" /> Redundant Fiber
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={SITE.office.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0d8b99] hover:bg-[#0b7884] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-md shadow-md transition-all text-center"
            >
              <Navigation className="w-4 h-4" />
              Get Directions
            </a>

            <a
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white hover:bg-slate-50 text-ink text-xs sm:text-sm font-bold uppercase tracking-wider border border-surface-line rounded-md transition-all text-center"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Right Column: Google Maps Interactive Embed (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="relative w-full h-full min-h-[400px] sm:min-h-[460px] rounded-2xl border border-surface-line overflow-hidden shadow-lg bg-surface-soft">
            {/* Top Map Header Badge */}
            <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-lg border border-surface-line shadow-md flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal" />
              <div>
                <p className="text-xs font-bold text-ink leading-tight">GrydIn Location</p>
                <p className="text-[10px] text-slate-500 leading-tight">F-11 Markaz, Islamabad</p>
              </div>
            </div>

            {/* Bottom Direct Link Badge */}
            <div className="absolute bottom-4 right-4 z-10">
              <a
                href={SITE.office.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/95 hover:bg-white text-ink px-3 py-1.5 rounded-md border border-surface-line shadow-md hover:text-teal transition-colors backdrop-blur-md"
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
              style={{ border: 0, minHeight: "420px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GrydIn Office Location - The Box Software Technology Park, F-11 Markaz Islamabad"
              className="w-full h-full min-h-[420px] rounded-2xl"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
