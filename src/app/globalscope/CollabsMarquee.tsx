"use client";

// Symmetric minimal white edge — cardinal directions only (no diagonal angle)
const WHITE_EDGE_FILTER = [
  "brightness(1.05)",
  "drop-shadow(0.3px 0 0 #fff)",
  "drop-shadow(-0.3px 0 0 #fff)",
  "drop-shadow(0 0.3px 0 #fff)",
  "drop-shadow(0 -0.3px 0 #fff)",
].join(" ");

const COLLAB_LOGOS = [
  { src: "/collabs/1-kimball-law.webp", alt: "Kimball Law", height: 32 },
  { src: "/collabs/2-gps-renting.webp", alt: "GPS Renting", height: 34 },
  { src: "/collabs/3-solas-scotland-ai.webp", alt: "Solas Scotland AI", height: 36, whiteEdge: true },
  { src: "/collabs/4-chaos.webp", alt: "Chaos", height: 40 },
  { src: "/collabs/5-petcon-australia.webp", alt: "Petcon Australia", height: 40 },
  { src: "/collabs/6-sevenleaps.webp", alt: "Sevenleaps", height: 36 },
  { src: "/collabs/7-shape-shifters-fitness.webp", alt: "Shape Shifters Fitness", height: 36 },
  { src: "/collabs/8-mazrex-store.webp", alt: "Mazrex Store", height: 40 },
  { src: "/collabs/9-top-energy.webp", alt: "Top Energy", height: 36, whiteEdge: true },
] as const;

const LogoRow = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "clamp(3rem, 5.5vw, 5rem)",
      flexShrink: 0,
      paddingRight: "clamp(3rem, 5.5vw, 5rem)",
    }}
  >
    {COLLAB_LOGOS.map((logo) => (
      <div
        key={`${ariaHidden ? "dup-" : ""}${logo.src}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: `${logo.height}px`,
          flexShrink: 0,
        }}
      >
        <img
          src={logo.src}
          alt={ariaHidden ? "" : logo.alt}
          draggable={false}
          style={{
            height: "100%",
            width: "auto",
            maxWidth: "clamp(85px, 13vw, 160px)",
            objectFit: "contain",
            opacity: 0.88,
            filter: "whiteEdge" in logo && logo.whiteEdge ? WHITE_EDGE_FILTER : "brightness(1.05)",
            userSelect: "none",
          }}
        />
      </div>
    ))}
  </div>
);

export const CollabsMarquee = ({ background = "#020b18" }: { background?: string }) => (
  <section
    aria-label="Partner logos"
    className="shrink-0 w-full select-none"
    style={{
      background,
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      paddingTop: "clamp(1.2rem, 2.2vh, 1.7rem)",
      paddingBottom: "clamp(1.3rem, 2.4vh, 1.85rem)",
      overflow: "hidden",
    }}
  >
    <p
      style={{
        textAlign: "center",
        fontSize: "clamp(0.7rem, 0.95vw, 0.82rem)",
        fontWeight: 700,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.88)",
        marginBottom: "clamp(0.8rem, 1.5vh, 1.1rem)",
        padding: "0 1.5rem",
      }}
    >
      Powering growth for global innovators
    </p>

    <div
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "collabsMarquee 45s linear infinite",
        }}
      >
        <LogoRow />
        <LogoRow ariaHidden />
      </div>
    </div>

    <style jsx global>{`
      @keyframes collabsMarquee {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(-50%);
        }
      }
    `}</style>
  </section>
);
