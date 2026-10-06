"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { MessageSquare, Mail, Sparkles, ArrowRight } from "lucide-react";

export function ContactRobotAssistant() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking physics with spring dampening for true 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 140 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations for the robot
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);

  // Parallax offsets for floating cards & badges
  const badgeChatX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const badgeChatY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const badgeMailX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const badgeMailY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const holoCardX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const holoCardY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[360px] sm:h-[420px] xl:h-full min-h-[380px] xl:min-h-[520px] flex items-center justify-center select-none overflow-hidden rounded-2xl xl:rounded-3xl bg-gradient-to-b from-[#f4fcfc]/70 via-[#eaf7f7]/40 to-white/90 border border-teal-100/60 p-4"
      style={{ perspective: 1200 }}
    >
      {/* ── Cyber Atmospheric Light Bloom & Orbital Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-0">
        {/* Soft radial teal aura */}
        <div className="w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] bg-gradient-to-tr from-teal-400/25 via-cyan-300/30 to-transparent rounded-full blur-3xl" />

        {/* Outer dashed cyan orbit ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute w-[290px] h-[290px] sm:w-[340px] sm:h-[340px] rounded-full border border-teal-300/40 border-dashed"
        />

        {/* Inner tilted orbit ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[340px] h-[190px] sm:w-[400px] sm:h-[220px] rounded-full border border-teal-200/40 -rotate-12"
        />

        {/* Faint Cyber Grid in background */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `radial-gradient(#0D8B99 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      {/* ── 3D Robot Figure with Mouse Tilt & Breathing Floating Physics ── */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.8, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" },
          y: {
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative w-full max-w-[340px] sm:max-w-[380px] h-full flex items-center justify-center cursor-grab active:cursor-grabbing z-10"
      >
        {/* Main 3D Robot Render Asset (Crisp, High-Resolution Studio Render) */}
        <div className="relative w-[280px] sm:w-[320px] h-[260px] sm:h-[310px] drop-shadow-[0_20px_40px_rgba(13,139,153,0.22)]">
          <Image
            src="/images/robot/robot-3d-character.png"
            alt="GrydIn 3D AI Assistant Robot"
            fill
            sizes="(max-width: 640px) 280px, 320px"
            className="object-contain pointer-events-none select-none"
            priority
          />

          {/* Interactive Holographic Light Beam scan across the robot tablet */}
          <motion.div
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 0.75, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="absolute left-[12%] bottom-[20%] w-[38%] h-[30%] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent skew-x-[-25deg] pointer-events-none"
          />

          {/* Cyan Glow on Robot Visor Eyes on Hover */}
          <motion.div
            animate={{
              opacity: isHovered ? [0.5, 0.9, 0.5] : [0.2, 0.5, 0.2],
              scale: isHovered ? [1, 1.1, 1] : 1,
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[22%] left-[36%] w-[28%] h-[12%] bg-cyan-400/35 blur-lg rounded-full pointer-events-none"
          />
        </div>

        {/* ── Floating Glass Badge 1: Chat Message (Top Left) ── */}
        <motion.div
          style={{ x: badgeChatX, y: badgeChatY }}
          animate={{
            y: [0, -8, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[4%] top-[16%] z-20"
        >
          <div className="bg-white/85 backdrop-blur-md border border-teal-200/90 shadow-lg shadow-teal-500/10 rounded-2xl p-2.5 sm:p-3 flex items-center justify-center text-[#0D8B99] hover:scale-110 transition-transform duration-200">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99] stroke-[2.2]" />
          </div>
        </motion.div>

        {/* ── Floating Glass Badge 2: Direct Mail (Top Right) ── */}
        <motion.div
          style={{ x: badgeMailX, y: badgeMailY }}
          animate={{
            y: [0, 8, 0],
            rotate: [2, -2, 2],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute right-[4%] top-[12%] z-20"
        >
          <div className="bg-white/85 backdrop-blur-md border border-teal-200/90 shadow-lg shadow-teal-500/10 rounded-2xl p-2.5 sm:p-3 flex items-center justify-center text-[#0D8B99] hover:scale-110 transition-transform duration-200">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#0D8B99] stroke-[2.2]" />
          </div>
        </motion.div>

        {/* ── Floating Holographic Glass Card: "Let's create something amazing" ── */}
        <motion.div
          style={{ x: holoCardX, y: holoCardY }}
          animate={{
            y: [0, -6, 0],
            rotate: [-1, 1, -1],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
          className="absolute right-[2%] sm:right-[4%] bottom-[14%] sm:bottom-[16%] z-20 max-w-[170px]"
        >
          <div className="bg-gradient-to-br from-white/95 via-[#f0faf9]/90 to-[#e2f5f4]/85 backdrop-blur-lg border border-teal-200/80 shadow-xl shadow-teal-900/10 rounded-2xl p-3 sm:p-3.5 transition-transform hover:scale-105 duration-200">
            <div className="flex items-center gap-2 mb-1.5">
              {/* GrydIn Logo SVG mark */}
              <div className="w-4 h-4 text-[#0D8B99] shrink-0">
                <svg viewBox="0 0 132.5 145" fill="currentColor" className="w-full h-full">
                  <path d="M66.354,25.354l26.286,26.286c0.197,0.197,0.518,0.19,0.706-0.015l11.757-12.784c0.176-0.191,0.172-0.486-0.009-0.672 L68.144,0.148C68.052,0.053,67.925,0,67.793,0h-2.848c-0.13,0-0.255,0.052-0.347,0.144L0.143,64.857 C0.051,64.949,0,65.073,0,65.202v13.456c0,0.128,0.05,0.251,0.14,0.343l64.716,65.853c0.092,0.094,0.218,0.146,0.349,0.146h2.897 c0.133,0,0.26-0.054,0.352-0.15l33.409-34.708c0.088-0.091,0.137-0.213,0.137-0.34l-0.023-20.266 c-0.001-1.224-1.461-1.857-2.356-1.023l-31.48,29.355c-0.091,0.084-0.21,0.131-0.334,0.131h-2.601c-0.132,0-0.258-0.053-0.35-0.147 l-42.717-43.71C22.05,74.051,22,73.928,22,73.801v-2.604c0-0.126,0.049-0.247,0.136-0.338l43.519-45.497 C65.844,25.163,66.16,25.16,66.354,25.354z" />
                  <path d="M66.5,63.5v20h43v17.775c0,1.146,1.407,1.695,2.183,0.852l20.407-22.181c0.264-0.287,0.41-0.662,0.41-1.052V63.95 c0-0.249-0.202-0.45-0.45-0.45H66.5z" />
                </svg>
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider text-teal-800 uppercase">
                GrydIn
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
              Let&apos;s create something amazing
            </p>
            <div className="flex items-center gap-1 text-[10px] text-[#0D8B99] font-semibold mt-1.5">
              <span>Connect</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </motion.div>

        {/* ── Cyber Platform Pedestal at base ── */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[240px] sm:w-[280px] h-[34px] pointer-events-none -z-10 flex flex-col items-center">
          <div className="w-full h-[18px] rounded-full bg-gradient-to-r from-teal-200/30 via-cyan-100/60 to-teal-200/30 border border-teal-300/40 shadow-inner" />
          <div className="w-[180px] h-[10px] -mt-1 rounded-full bg-teal-400/20 blur-sm" />
        </div>
      </motion.div>

      {/* ── Bottom Status Pill: "AI Online • 24/7 Telemetry" ── */}
      <div className="absolute bottom-3 left-4 z-20 bg-white/90 backdrop-blur-md border border-teal-200/80 shadow-sm rounded-full px-3 py-1 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-slate-700 tracking-tight flex items-center gap-1 font-mono uppercase">
          <Sparkles className="w-3 h-3 text-[#0D8B99]" />
          AI System Online
        </span>
      </div>
    </div>
  );
}
