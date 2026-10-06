"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { MessageSquare, Mail, Sparkles, ArrowRight } from "lucide-react";
import { SITE } from "@/app/globalscope/site-config";

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
      className="relative w-full h-[360px] sm:h-[420px] xl:h-[470px] min-h-[360px] flex items-center justify-center select-none overflow-hidden rounded-2xl xl:rounded-3xl bg-gradient-to-br from-[#e8f9f8] via-[#f7fcfc] to-[#c9f4f1] border border-teal-100/60 p-4"
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
          <a href={SITE.whatsappUrl} target="_blank" rel="noopener noreferrer" className="block bg-[#032b38]/95 backdrop-blur-lg border border-teal-300/80 shadow-xl shadow-teal-900/25 rounded-2xl p-3 sm:p-3.5 text-white transition-transform hover:scale-105 duration-200">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-full bg-[#00c985] flex items-center justify-center text-white shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-xs font-bold text-teal-200">Chat on WhatsApp</span>
                <span className="block text-[9px] text-slate-300">Quick questions? We&apos;re here.</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-1 rounded-full bg-[#00bd83] py-1.5 text-[10px] font-bold text-white">
              <span>Chat Now</span><ArrowRight className="w-3 h-3" />
            </div>
          </a>
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
