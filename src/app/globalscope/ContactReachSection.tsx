"use client";

import { SITE } from "./site-config";
import { brandAccentAlpha, brandAccentHexAlpha } from "@/lib/brand";

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.42)",
  marginBottom: "0.75rem",
};

export const ContactReachSection = () => {
  const { office } = SITE;

  return (
    <section
      aria-labelledby="contact-locate-heading"
      style={{
        marginTop: "clamp(2.75rem, 6vw, 4rem)",
        paddingTop: "clamp(2rem, 4vw, 2.75rem)",
        borderTop: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <p id="contact-locate-heading" style={{ ...labelStyle, marginBottom: "1rem" }}>
        Locate us
      </p>
      <div
        className="contact-map-frame"
        style={{
          border: `1px solid ${brandAccentHexAlpha(0.22)}`,
          background: `linear-gradient(145deg, ${brandAccentAlpha(0.06)} 0%, rgba(0,0,0,0.35) 100%)`,
          boxShadow: `0 24px 48px rgba(0,0,0,0.35)`,
        }}
      >
        <iframe
          title="GrydIn office location on Google Maps"
          src={office.mapsEmbedSrc}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <style jsx global>{`
        .contact-map-frame {
          width: 100%;
          max-width: min(900px, 100%);
          margin: 0 auto;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          aspect-ratio: 2 / 1;
          min-height: max(220px, min(270px, 46vw));
          max-height: 320px;
        }
        .contact-map-frame iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>
    </section>
  );
};
