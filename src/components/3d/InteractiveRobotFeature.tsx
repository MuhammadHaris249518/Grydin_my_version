"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Code2, Cloud, BarChart3, Sparkles } from "lucide-react";

export function InteractiveRobotFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [desktopMotion, setDesktopMotion] = useState(false);

  // Mouse tracking physics with spring dampening
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations for the robot container
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  // Parallax offsets for floating badges
  const badge1X = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const badge1Y = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);

  const badge2X = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const badge2Y = useTransform(smoothY, [-0.5, 0.5], [16, -16]);

  const badge3X = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const badge3Y = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Scroll into view detection
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const updateMotion = () => setDesktopMotion(media.matches);
    updateMotion();
    media.addEventListener("change", updateMotion);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      media.removeEventListener("change", updateMotion);
      observer.disconnect();
    };
  }, []);

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
      onMouseMove={desktopMotion ? handleMouseMove : undefined}
      onMouseEnter={desktopMotion ? () => setIsHovered(true) : undefined}
      onMouseLeave={desktopMotion ? handleMouseLeave : undefined}
      className="relative flex h-[285px] w-full select-none items-center justify-center sm:h-[460px] lg:h-[480px]"
      style={{ perspective: 1200 }}
    >
      {/* ── Background Atmospheric Light Rings ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        {/* Soft radial teal bloom */}
        <div className="h-[260px] w-[260px] rounded-full bg-gradient-to-tr from-teal-400/20 via-cyan-300/25 to-transparent blur-3xl sm:h-[440px] sm:w-[440px]" />

        {/* Orbit Ring 1: Outer dashed cyan circle */}
        <motion.div
          animate={desktopMotion ? { rotate: 360 } : undefined}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute h-[240px] w-[240px] rounded-full border border-teal-300/40 border-dashed sm:h-[420px] sm:w-[420px]"
        />

        {/* Orbit Ring 2: Subtle secondary ring */}
        <motion.div
          animate={desktopMotion ? { rotate: -360 } : undefined}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute h-[130px] w-[280px] -rotate-12 rounded-full border border-teal-200/30 sm:h-[220px] sm:w-[440px]"
        />
      </div>

      {/* ── 3D Robot Figure with Entrance & Breathing Floating Physics ── */}
      <motion.div
        style={{
          rotateX: desktopMotion ? rotateX : 0,
          rotateY: desktopMotion ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={
          isInView && desktopMotion
            ? {
                opacity: 1,
                y: [0, -10, 0],
                scale: 1,
              }
            : isInView ? { opacity: 1, y: 0, scale: 1 } : {}
        }
        transition={
          isInView && desktopMotion
            ? {
                opacity: { duration: 0.8, ease: "easeOut" },
                scale: { duration: 0.8, ease: "easeOut" },
                y: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              }
            : {}
        }
        className="relative flex h-full w-full max-w-[300px] items-center justify-center sm:max-w-[440px] sm:cursor-grab sm:active:cursor-grabbing"
      >
        {/* Main 3D Robot Render Asset */}
        <div className="relative h-[230px] w-[245px] drop-shadow-[0_14px_25px_rgba(13,139,153,0.16)] sm:h-[390px] sm:w-[410px] sm:drop-shadow-[0_20px_35px_rgba(13,139,153,0.18)]">
          <Image
            src="/images/robot/robot-3d-character.png"
            alt="GrydIn 3D AI Assistant Robot"
            fill
            sizes="(max-width: 640px) 245px, 410px"
            className="object-contain pointer-events-none select-none"
            priority
          />

          {/* Interactive Holographic Light Scan over the Tablet */}
          <motion.div
            animate={desktopMotion ? {
              x: ["-100%", "200%"],
              opacity: [0, 0.7, 0],
            } : undefined}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2,
              ease: "easeInOut",
            }}
            className="absolute left-[12%] bottom-[20%] w-[38%] h-[30%] bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent skew-x-[-25deg] pointer-events-none"
          />

          {/* Extra Cyan Glow on Robot Visor Eyes on Hover / Entrance */}
          <motion.div
            animate={desktopMotion ? {
              opacity: isHovered ? [0.4, 0.85, 0.4] : [0.2, 0.5, 0.2],
              scale: isHovered ? [1, 1.08, 1] : 1,
            } : undefined}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[22%] left-[36%] w-[28%] h-[12%] bg-cyan-400/25 blur-lg rounded-full pointer-events-none"
          />
        </div>

        {/* ── Layered 3D Floating Glass Badge 1: Code brackets </> (Left) ── */}
        <motion.div
          style={{ x: desktopMotion ? badge1X : 0, y: desktopMotion ? badge1Y : 0 }}
          animate={desktopMotion ? {
            y: [0, -8, 0],
            rotate: [-2, 2, -2],
          } : undefined}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[2%] sm:left-[6%] top-[24%] z-20"
        >
          <div className="bg-white/90 backdrop-blur-md border border-teal-200/90 shadow-lg shadow-teal-500/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-center text-[#0D8B99] transition-transform hover:scale-110 duration-200">
            <Code2 className="w-4 h-4 sm:w-6 sm:h-6 text-[#0D8B99] stroke-[2.5]" />
          </div>
        </motion.div>

        {/* ── Layered 3D Floating Glass Badge 2: Cloud (Top Right) ── */}
        <motion.div
          style={{ x: desktopMotion ? badge2X : 0, y: desktopMotion ? badge2Y : 0 }}
          animate={desktopMotion ? {
            y: [0, 9, 0],
            rotate: [1, -2, 1],
          } : undefined}
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute right-[4%] sm:right-[10%] top-[14%] z-20"
        >
          <div className="bg-white/90 backdrop-blur-md border border-teal-200/90 shadow-lg shadow-teal-500/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-center text-[#0D8B99] transition-transform hover:scale-110 duration-200">
            <Cloud className="w-4 h-4 sm:w-6 sm:h-6 text-[#0D8B99] stroke-[2.2]" />
          </div>
        </motion.div>

        {/* ── Layered 3D Floating Glass Badge 3: Analytics (Far Right) ── */}
        <motion.div
          style={{ x: desktopMotion ? badge3X : 0, y: desktopMotion ? badge3Y : 0 }}
          animate={desktopMotion ? {
            y: [0, -7, 0],
            rotate: [-1, 2, -1],
          } : undefined}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute right-[0%] sm:right-[4%] top-[48%] z-20"
        >
          <div className="bg-white/90 backdrop-blur-md border border-teal-200/90 shadow-lg shadow-teal-500/10 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 flex items-center justify-center text-[#0D8B99] transition-transform hover:scale-110 duration-200">
            <BarChart3 className="w-4 h-4 sm:w-6 sm:h-6 text-[#0D8B99] stroke-[2.2]" />
          </div>
        </motion.div>

        {/* ── Floating Pulse Pill: "AI Online" (Bottom Right) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute right-[8%] bottom-[8%] z-20 bg-white/95 backdrop-blur-md border border-teal-200/90 shadow-md rounded-full px-3 py-1 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-teal-500 md:animate-pulse" />
          <span className="text-[11px] font-bold text-slate-800 tracking-tight flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0D8B99]" />
            Autonomous AI
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
