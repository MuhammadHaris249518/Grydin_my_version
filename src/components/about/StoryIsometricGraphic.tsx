"use client";

import React from "react";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export function StoryIsometricGraphic() {
  return (
    <div className="relative w-full max-w-[340px] sm:max-w-[380px] h-[280px] sm:h-[310px] flex items-center justify-center select-none pointer-events-none mx-auto">
      {/* ── Soft Ambient Radial Cyan Bloom Behind Graphic ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] bg-gradient-to-tr from-cyan-300/35 via-teal-200/25 to-transparent rounded-full blur-3xl -z-10" />
      </div>

      {/* ── Main Isometric SVG Stage ── */}
      <svg
        className="w-full h-full overflow-visible"
        viewBox="0 0 380 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Cyan Glow Gradients */}
          <linearGradient id="topTileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" />
            <stop offset="45%" stopColor="#00c2cb" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="glassLayer1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#e0f7fa" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#b2ebf2" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="glassLayer2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#bae6fd" stopOpacity="0.45" />
          </linearGradient>

          <linearGradient id="basePlateGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0f7fa" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#80deea" stopOpacity="0.25" />
          </linearGradient>

          <linearGradient id="cubeGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f5d4" />
            <stop offset="100%" stopColor="#00c2cb" />
          </linearGradient>

          <linearGradient id="cubeGradBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          {/* Shadows */}
          <filter id="tileShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="12" stdDeviation="14" floodColor="#00c2cb" floodOpacity="0.35" />
          </filter>

          <filter id="layerShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#0d8b99" floodOpacity="0.16" />
          </filter>
        </defs>

        {/* ── Background Subtle Orbit Ring ── */}
        <ellipse
          cx="190"
          cy="185"
          rx="140"
          ry="65"
          stroke="#00c2cb"
          strokeOpacity="0.2"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />

        {/* ── Base Pedestal / Lower Glass Platform ── */}
        <g filter="url(#layerShadow)">
          {/* Base Lower Plate Edge/Thickness */}
          <path
            d="M 100 230 L 190 272 L 280 230 L 280 238 L 190 280 L 100 238 Z"
            fill="#a5e8e4"
            fillOpacity="0.7"
          />
          {/* Base Lower Plate Top Surface */}
          <path
            d="M 190 190 L 280 230 L 190 272 L 100 230 Z"
            fill="url(#basePlateGrad)"
            stroke="#b2ebf2"
            strokeWidth="1.2"
          />
        </g>

        {/* ── Middle Tier Glass Data Layer with Chart Columns ── */}
        <g filter="url(#layerShadow)">
          {/* Middle Plate Edge */}
          <path
            d="M 115 192 L 190 228 L 265 192 L 265 200 L 190 236 L 115 200 Z"
            fill="#80deea"
            fillOpacity="0.65"
          />
          {/* Middle Plate Top */}
          <path
            d="M 190 156 L 265 192 L 190 228 L 115 192 Z"
            fill="url(#glassLayer1)"
            stroke="#80deea"
            strokeWidth="1.2"
          />

          {/* Wireframe Data Rows on Middle Plate */}
          <line x1="140" y1="195" x2="165" y2="183" stroke="#00c2cb" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />
          <line x1="145" y1="202" x2="175" y2="188" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
          <line x1="150" y1="209" x2="170" y2="199" stroke="#00c2cb" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7" />

          {/* Isometric Data Bar Chart Pillars on Middle Plate (Rising bars) */}
          {/* Bar 1 */}
          <path d="M 215 198 L 222 195 L 222 182 L 215 185 Z" fill="#00c2cb" fillOpacity="0.8" />
          <path d="M 222 195 L 229 198 L 229 185 L 222 182 Z" fill="#00e5ff" fillOpacity="0.9" />
          <path d="M 215 185 L 222 182 L 229 185 L 222 188 Z" fill="#a7f3d0" />

          {/* Bar 2 */}
          <path d="M 228 192 L 235 189 L 235 170 L 228 173 Z" fill="#00c2cb" fillOpacity="0.85" />
          <path d="M 235 189 L 242 192 L 242 173 L 235 170 Z" fill="#00e5ff" fillOpacity="0.95" />
          <path d="M 228 173 L 235 170 L 242 173 L 235 176 Z" fill="#6ee7b7" />

          {/* Bar 3 */}
          <path d="M 241 186 L 248 183 L 248 160 L 241 163 Z" fill="#0284c7" fillOpacity="0.85" />
          <path d="M 248 183 L 255 186 L 255 163 L 248 160 Z" fill="#38bdf8" />
          <path d="M 241 163 L 248 160 L 255 163 L 248 166 Z" fill="#bae6fd" />
        </g>

        {/* ── Second Tier Platform with UI Details ── */}
        <g filter="url(#layerShadow)">
          {/* Top-Mid Plate Edge */}
          <path
            d="M 130 154 L 190 184 L 250 154 L 250 160 L 190 190 L 130 160 Z"
            fill="#a7f3d0"
            fillOpacity="0.6"
          />
          {/* Top-Mid Plate Surface */}
          <path
            d="M 190 124 L 250 154 L 190 184 L 130 154 Z"
            fill="url(#glassLayer2)"
            stroke="#67e8f9"
            strokeWidth="1.2"
          />
        </g>

        {/* ── Floating Isometric 3D Data Cubes around Stage ── */}
        {/* Cube 1: Top Right */}
        <g transform="translate(290, 95)">
          <path d="M 0 10 L 12 16 L 24 10 L 12 4 Z" fill="#67e8f9" />
          <path d="M 0 10 L 12 16 L 12 28 L 0 22 Z" fill="#00c2cb" />
          <path d="M 12 16 L 24 10 L 24 22 L 12 28 Z" fill="#0284c7" />
        </g>

        {/* Cube 2: Bottom Left */}
        <g transform="translate(68, 175)">
          <path d="M 0 8 L 10 13 L 20 8 L 10 3 Z" fill="#a7f3d0" />
          <path d="M 0 8 L 10 13 L 10 23 L 0 18 Z" fill="#00c2cb" />
          <path d="M 10 13 L 20 8 L 20 18 L 10 23 Z" fill="#0284c7" />
        </g>

        {/* Cube 3: Mid Left */}
        <g transform="translate(105, 105)">
          <path d="M 0 6 L 8 10 L 16 6 L 8 2 Z" fill="#bae6fd" />
          <path d="M 0 6 L 8 10 L 8 18 L 0 14 Z" fill="#38bdf8" />
          <path d="M 8 10 L 16 6 L 16 14 L 8 18 Z" fill="#0284c7" />
        </g>

        {/* Cube 4: Bottom Right */}
        <g transform="translate(280, 220)">
          <path d="M 0 7 L 9 11 L 18 7 L 9 3 Z" fill="#6ee7b7" />
          <path d="M 0 7 L 9 11 L 9 20 L 0 16 Z" fill="#00c2cb" />
          <path d="M 9 11 L 18 7 L 18 16 L 9 20 Z" fill="#0d8b99" />
        </g>

        {/* Glowing Particle Nodes with Connection Lines */}
        <circle cx="110" cy="115" r="3" fill="#00c2cb" />
        <circle cx="300" cy="110" r="3.5" fill="#00e5ff" />
        <circle cx="80" cy="190" r="2.5" fill="#38bdf8" />
        <circle cx="290" cy="235" r="3" fill="#00f5d4" />

        <line x1="110" y1="115" x2="145" y2="135" stroke="#00c2cb" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.4" />
        <line x1="300" y1="110" x2="255" y2="135" stroke="#00c2cb" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.4" />
        <line x1="290" y1="235" x2="250" y2="215" stroke="#00c2cb" strokeWidth="1" strokeDasharray="2 3" strokeOpacity="0.4" />
      </svg>

      {/* ── Top Hovering Floating Cyan Tile with Eye Icon (Animated) ── */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[28px] sm:top-[34px] left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
      >
        <div
          className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#00f5d4] via-[#00c2cb] to-[#0284c7] border border-cyan-200/90 shadow-[0_12px_32px_rgba(0,194,203,0.48)] flex items-center justify-center p-4"
          style={{
            transform: "rotateX(55deg) rotateZ(-45deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Subtle Glass Sheen on Top of Tile */}
          <div className="absolute inset-1 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-xs" />

          {/* Centered Pure White Eye Icon */}
          <Eye className="w-9 h-9 sm:w-10 sm:h-10 text-white relative z-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]" strokeWidth={2.3} />
        </div>
      </motion.div>
    </div>
  );
}
