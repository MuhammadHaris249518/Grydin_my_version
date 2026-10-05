"use client";

import React from "react";

// Tech stack items matching exact image specifications with balanced, professional sizing
const TECH_STACK_ITEMS = [
  {
    name: "Next.js",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#000000" />
        <path d="M102 108L47 38H36V90H45V51.5L95.5 112C97.8 110.8 100 109.5 102 108Z" fill="white" />
        <rect x="82" y="38" width="9" height="52" fill="white" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg className="w-full h-full" viewBox="8 8 112 112" fill="none">
        <path
          d="M63.5 12C36.5 12 38.1 23.7 38.1 23.7L38.2 35.8H64V39.5H27.5C10.7 39.5 12 55 12 55S10.6 74 27.5 74H36.7V62.2C36.7 49.2 48.1 50 48.1 50H73.6S84.5 50.1 84.5 39.3V29C84.5 18.2 73.6 23.2 73.6 23.2L63.5 12ZM49.5 19.6A3.8 3.8 0 1 1 49.5 27.2A3.8 3.8 0 0 1 49.5 19.6Z"
          fill="#3776AB"
        />
        <path
          d="M64.5 116C91.5 116 89.9 104.3 89.9 104.3L89.8 92.2H64V88.5H100.5C117.3 88.5 116 73 116 73S117.4 54 100.5 54H91.3V65.8C91.3 78.8 79.9 78 79.9 78H54.4S43.5 77.9 43.5 88.7V99C43.5 109.8 54.4 104.8 54.4 104.8L64.5 116ZM78.5 108.4A3.8 3.8 0 1 1 78.5 100.8A3.8 3.8 0 0 1 78.5 108.4Z"
          fill="#FFD43B"
        />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    icon: (
      <svg className="w-full h-full" viewBox="8 8 112 112" fill="none">
        <path
          d="M64 12C35.3 12 12 35.3 12 64C12 92.7 35.3 116 64 116C92.7 116 116 92.7 116 64C116 35.3 92.7 12 64 12Z"
          fill="#336791"
        />
        <path
          d="M74.8 45.4C71.3 43.1 66.8 42.4 62.7 43.5C57.6 44.9 53.6 49 52.3 54.1C51.5 57.3 51.9 60.7 53.5 63.6C50.2 65.5 47.9 69 47.5 72.8C47 77.4 49.6 81.7 53.8 83.6C58.1 85.5 63.1 84.6 66.5 81.4C69.9 84.6 74.9 85.5 79.2 83.6C83.4 81.7 86 77.4 85.5 72.8C85.1 69 82.8 65.5 79.5 63.6C81.1 60.7 81.5 57.3 80.7 54.1C79.4 49 75.4 44.9 70.3 43.5"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "MongoDB",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <path
          d="M64 10C59 28 32 48 32 76C32 98 48 114 64 122C80 114 96 98 96 76C96 48 69 28 64 10Z"
          fill="#13AA52"
        />
        <path
          d="M64 12C63 29 46 48 46 76C46 95 58 108 64 118C70 108 82 95 82 76C82 48 65 29 64 12Z"
          fill="#119246"
        />
        <path d="M64 12V118" stroke="#3FA037" strokeWidth="3" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#1C3C3C" />
        <path
          d="M42 42C42 34.268 48.268 28 56 28H72C79.732 28 86 34.268 86 42V50H74V42C74 40.8954 73.1046 40 72 40H56C54.8954 40 54 40.8954 54 42V86C54 87.1046 54.8954 88 56 88H72C73.1046 88 74 87.1046 74 86V78H86V86C86 93.732 79.732 100 72 100H56C48.268 100 42 93.732 42 86V42Z"
          fill="#2DD4BF"
        />
        <circle cx="86" cy="64" r="14" fill="#38BDF8" />
      </svg>
    ),
  },
  {
    name: "LangGraph",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#042F2C" />
        <circle cx="44" cy="48" r="11" fill="#2DD4BF" />
        <circle cx="84" cy="48" r="11" fill="#38BDF8" />
        <circle cx="64" cy="84" r="11" fill="#F43F5E" />
        <line x1="44" y1="48" x2="84" y2="48" stroke="#2DD4BF" strokeWidth="5" />
        <line x1="44" y1="48" x2="64" y2="84" stroke="#2DD4BF" strokeWidth="5" />
        <line x1="84" y1="48" x2="64" y2="84" stroke="#38BDF8" strokeWidth="5" />
      </svg>
    ),
  },
  {
    name: "n8n",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#FF6D5A" />
        <circle cx="40" cy="64" r="14" fill="white" />
        <circle cx="88" cy="44" r="14" fill="white" />
        <circle cx="88" cy="84" r="14" fill="white" />
        <path d="M40 64C64 64 64 44 88 44" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M40 64C64 64 64 84 88 84" stroke="white" strokeWidth="8" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "Make",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#6D00F6" />
        <path d="M34 42L64 25L94 42V86L64 103L34 86V42Z" fill="white" />
        <path d="M64 25V103" stroke="#6D00F6" strokeWidth="6" />
        <path d="M34 42L94 86" stroke="#6D00F6" strokeWidth="6" />
        <path d="M94 42L34 86" stroke="#6D00F6" strokeWidth="6" />
      </svg>
    ),
  },
  {
    name: "Docker",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#2496ED" />
        <rect x="42" y="52" width="12" height="12" rx="2" fill="white" />
        <rect x="58" y="52" width="12" height="12" rx="2" fill="white" />
        <rect x="74" y="52" width="12" height="12" rx="2" fill="white" />
        <rect x="58" y="36" width="12" height="12" rx="2" fill="white" />
        <rect x="74" y="36" width="12" height="12" rx="2" fill="white" />
        <rect x="74" y="20" width="12" height="12" rx="2" fill="white" />
        <path d="M20 74C25 74 35 68 45 74C55 80 65 74 75 74C85 74 95 80 105 74C108 88 95 100 70 100C40 100 22 86 20 74Z" fill="white" />
      </svg>
    ),
  },
  {
    name: "Kubernetes",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#326CE5" />
        <polygon points="64,28 95,46 95,82 64,100 33,82 33,46" fill="none" stroke="white" strokeWidth="7" />
        <circle cx="64" cy="64" r="13" fill="white" />
        <line x1="64" y1="28" x2="64" y2="52" stroke="white" strokeWidth="7" />
        <line x1="64" y1="100" x2="64" y2="76" stroke="white" strokeWidth="7" />
        <line x1="95" y1="46" x2="74" y2="58" stroke="white" strokeWidth="7" />
        <line x1="33" y1="82" x2="54" y2="70" stroke="white" strokeWidth="7" />
        <line x1="33" y1="46" x2="54" y2="58" stroke="white" strokeWidth="7" />
        <line x1="95" y1="82" x2="74" y2="70" stroke="white" strokeWidth="7" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#3178C6" />
        <path d="M42 46H74M58 46V96" stroke="white" strokeWidth="12" strokeLinecap="round" />
        <path d="M78 86C82 92 90 96 98 92C104 88 104 78 96 74C88 70 82 68 82 60C82 52 90 48 98 52C102 54 106 58 106 58" stroke="white" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#232F3E" />
        <text x="64" y="60" textAnchor="middle" fill="white" fontSize="40" fontWeight="800" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="-1">aws</text>
        <path d="M34 78C48 90 80 90 94 78" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M92 73L100 79L91 85" fill="#FF9900" />
      </svg>
    ),
  },
  {
    name: "Redis",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#DC382D" />
        <ellipse cx="64" cy="38" rx="36" ry="16" fill="white" />
        <path d="M28 38V88C28 96 44 104 64 104C84 104 100 96 100 88V38" stroke="white" strokeWidth="8" fill="none" />
        <path d="M28 63C28 71 44 79 64 79C84 79 100 71 100 63" stroke="white" strokeWidth="8" fill="none" />
      </svg>
    ),
  },
];

const TechPill = ({ tech }: { tech: (typeof TECH_STACK_ITEMS)[number] }) => (
  <div className="bg-white/95 backdrop-blur-sm border border-slate-200/90 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-lg hover:border-teal-400/90 rounded-full pl-3 pr-5 py-2 sm:pl-3.5 sm:pr-6 sm:py-2.5 flex items-center gap-3 sm:gap-3.5 transition-all duration-200 transform hover:-translate-y-0.5 cursor-default shrink-0 group">
    <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
      {tech.icon}
    </div>
    <span className="font-semibold text-slate-800 text-[14px] sm:text-[15.5px] tracking-tight whitespace-nowrap leading-none">
      {tech.name}
    </span>
  </div>
);

const TechSequence = ({ ariaHidden = false }: { ariaHidden?: boolean }) => (
  <div
    aria-hidden={ariaHidden}
    className="flex items-center gap-4 sm:gap-6 shrink-0 pr-4 sm:pr-6 select-none"
  >
    {TECH_STACK_ITEMS.map((tech, idx) => (
      <TechPill key={`${ariaHidden ? "dup-" : ""}${tech.name}-${idx}`} tech={tech} />
    ))}
  </div>
);

export function HomeStack() {
  return (
    <section className="relative overflow-hidden bg-[#EFF8F7] pt-14 pb-12 sm:pt-16 sm:pb-14 border-b border-teal-100/70 select-none">
      {/* Background Dot Accents */}
      <div className="absolute top-4 right-8 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-8 opacity-20 pointer-events-none hidden sm:block">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 text-center mb-12 sm:mb-16">
        {/* Eyebrow Header */}
        <div className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">
          <span className="text-teal-500 font-mono tracking-normal">├──→</span>
          OUR TECHNOLOGY STACK
          <span className="text-teal-500 font-mono tracking-normal">←──</span>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          Battle-tested technologies{" "}
          <span className="text-teal-600">powering our architectures</span>
        </h2>
      </div>

      {/* ── Continuous Horizontal Technology Marquee Strip ── */}
      <div className="relative w-full overflow-hidden tech-marquee-wrapper py-2.5">
        {/* Left & Right Soft Edge Gradient Fades */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 md:w-36 bg-gradient-to-r from-[#EFF8F7] via-[#EFF8F7]/80 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 md:w-36 bg-gradient-to-l from-[#EFF8F7] via-[#EFF8F7]/80 to-transparent pointer-events-none z-10" />

        {/* Marquee Track with Double Duplication for Infinite Seamless Loop */}
        <div
          className="tech-marquee-track flex w-max"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
          }}
        >
          {/* First Half */}
          <div className="flex items-center">
            <TechSequence />
            <TechSequence ariaHidden />
          </div>

          {/* Second Half (Exact Mirror for Seamless Infinite Loop) */}
          <div className="flex items-center" aria-hidden="true">
            <TechSequence ariaHidden />
            <TechSequence ariaHidden />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .tech-marquee-track {
          display: flex;
          width: max-content;
          animation: techMarqueeScroll 44s linear infinite;
          will-change: transform;
        }

        .tech-marquee-wrapper:hover .tech-marquee-track {
          animation-play-state: paused;
        }

        @keyframes techMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .tech-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
