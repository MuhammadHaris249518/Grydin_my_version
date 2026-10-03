"use client";

import React from "react";

// Tech stack items matching exact image specifications
const TECH_STACK_ITEMS = [
  {
    name: "Next.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#000000" />
        <path d="M102 108L47 38H36V90H45V51.5L95.5 112C97.8 110.8 100 109.5 102 108Z" fill="white" />
        <rect x="82" y="38" width="9" height="52" fill="white" />
      </svg>
    ),
  },
  {
    name: "Python",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <path
          d="M64 14C60 32 43 50 43 74C43 94 57 110 64 118C71 110 85 94 85 74C85 50 68 32 64 14Z"
          fill="#13AA52"
        />
        <path d="M64 14V118" stroke="#47A248" strokeWidth="4" />
      </svg>
    ),
  },
  {
    name: "LangChain",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#042F2C" />
        <circle cx="44" cy="48" r="10" fill="#2DD4BF" />
        <circle cx="84" cy="48" r="10" fill="#38BDF8" />
        <circle cx="64" cy="84" r="10" fill="#F43F5E" />
        <line x1="44" y1="48" x2="84" y2="48" stroke="#2DD4BF" strokeWidth="4" />
        <line x1="44" y1="48" x2="64" y2="84" stroke="#2DD4BF" strokeWidth="4" />
        <line x1="84" y1="48" x2="64" y2="84" stroke="#38BDF8" strokeWidth="4" />
      </svg>
    ),
  },
  {
    name: "n8n",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
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
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="60" fill="#326CE5" />
        <polygon points="64,28 95,46 95,82 64,100 33,82 33,46" fill="none" stroke="white" strokeWidth="6" />
        <circle cx="64" cy="64" r="12" fill="white" />
        <line x1="64" y1="28" x2="64" y2="52" stroke="white" strokeWidth="6" />
        <line x1="64" y1="100" x2="64" y2="76" stroke="white" strokeWidth="6" />
        <line x1="95" y1="46" x2="74" y2="58" stroke="white" strokeWidth="6" />
        <line x1="33" y1="82" x2="54" y2="70" stroke="white" strokeWidth="6" />
        <line x1="33" y1="46" x2="54" y2="58" stroke="white" strokeWidth="6" />
        <line x1="95" y1="82" x2="74" y2="70" stroke="white" strokeWidth="6" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#3178C6" />
        <path d="M42 46H74M58 46V96" stroke="white" strokeWidth="12" strokeLinecap="round" />
        <path d="M78 86C82 92 90 96 98 92C104 88 104 78 96 74C88 70 82 68 82 60C82 52 90 48 98 52C102 54 106 58 106 58" stroke="white" strokeWidth="12" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    name: "AWS",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#232F3E" />
        <path d="M34 76C48 88 80 88 94 76C96 74 98 77 96 79C90 88 72 96 56 96C40 96 26 88 32 78C32 77 33 76 34 76Z" fill="#FF9900" />
        <path d="M92 72L102 78L90 84L92 72Z" fill="#FF9900" />
        <text x="64" y="58" textAnchor="middle" fill="white" fontSize="32" fontWeight="bold" fontFamily="sans-serif">aws</text>
      </svg>
    ),
  },
  {
    name: "Redis",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="28" fill="#DC382D" />
        <ellipse cx="64" cy="40" rx="36" ry="16" fill="white" />
        <path d="M28 40V88C28 96 44 104 64 104C84 104 100 96 100 88V40" stroke="white" strokeWidth="8" fill="none" />
        <path d="M28 64C28 72 44 80 64 80C84 80 100 72 100 64" stroke="white" strokeWidth="8" fill="none" />
      </svg>
    ),
  },
];

export function HomeStack() {
  return (
    <section className="relative overflow-hidden bg-[#EFF8F7] py-12 sm:py-16 border-b border-teal-100/70">
      {/* Background Dot Accents */}
      <div className="absolute top-4 right-8 opacity-20 pointer-events-none">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 text-center">
        {/* Eyebrow Header */}
        <div className="inline-flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest text-teal-700 mb-3">
          <span className="text-teal-500">──→</span>
          OUR TECHNOLOGY STACK
          <span className="text-teal-500">←──</span>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-8">
          Battle-tested technologies{" "}
          <span className="text-teal-600">powering our architectures</span>
        </h2>

        {/* Horizontal Technology Pills Row */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-6xl mx-auto">
          {TECH_STACK_ITEMS.map((tech) => (
            <div
              key={tech.name}
              className="bg-white/90 backdrop-blur-sm border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-400/80 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2.5 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <div className="shrink-0 flex items-center justify-center">
                {tech.icon}
              </div>
              <span className="font-semibold text-slate-800 text-xs sm:text-sm tracking-tight">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
