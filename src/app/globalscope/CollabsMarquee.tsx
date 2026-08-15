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
  { src: "/collabs/1-kimball-law.webp", alt: "Kimball Law", height: 28 },
  { src: "/collabs/2-gps-renting.webp", alt: "GPS Renting", height: 32 },
  { src: "/collabs/3-solas-scotland-ai.webp", alt: "Solas Scotland AI", height: 36, whiteEdge: true },
  { src: "/collabs/4-chaos.webp", alt: "Chaos", height: 44 },
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
      gap: "clamp(3rem, 8vw, 6rem)",
      flexShrink: 0,
      paddingRight: "clamp(3rem, 8vw, 6rem)",
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
            maxWidth: "clamp(80px, 14vw, 180px)",
            objectFit: "contain",
            opacity: 0.85,
            filter: "whiteEdge" in logo && logo.whiteEdge ? WHITE_EDGE_FILTER : "brightness(1.05)",
            userSelect: "none",
          }}
        />
      </div>
    ))}
  </div>
);

export const CollabsMarquee = () => (
  <section
    aria-label="Partner logos"
    style={{
      width: "100%",
      background: "transparent",
      paddingTop: "clamp(2.5rem, 5vh, 3.5rem)",
      paddingBottom: "clamp(2.5rem, 5vh, 3.5rem)",
      overflow: "hidden",
    }}
  >
    <p
      style={{
        textAlign: "center",
        fontSize: "clamp(0.62rem, 1.2vw, 0.78rem)",
        fontWeight: 700,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "rgba(255,255,255,0.72)",
        marginBottom: "clamp(1.5rem, 3vh, 2rem)",
        padding: "0 1.5rem",
        textShadow: "0 0 24px rgba(255,255,255,0.12)",
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
          "linear-gradient(to right, transparent 0%, black 44%, black 56%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 44%, black 56%, transparent 100%)",
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
