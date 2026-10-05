"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Home,
  Bot,
  Workflow,
  Wrench,
  FileText,
  Settings,
  User,
  Clock,
  Database,
  CheckCircle2,
  RefreshCw,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AutonomousProductShowcaseProps {
  videoSrc?: string;
  isPlaying?: boolean;
  setIsPlaying?: (playing: boolean) => void;
}

export function AutonomousProductShowcase({
  videoSrc = "/videos/Video.mp4",
  isPlaying: controlledIsPlaying,
  setIsPlaying: controlledSetIsPlaying,
}: AutonomousProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [internalIsPlaying, setInternalIsPlaying] = useState(true);
  const isPlaying = controlledIsPlaying !== undefined ? controlledIsPlaying : internalIsPlaying;
  const setIsPlaying = controlledSetIsPlaying || setInternalIsPlaying;

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10); // Exact 10s default matching video length
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  // Synchronize duration dynamically from the video element
  const syncDuration = useCallback(() => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
      setDuration(Math.round(video.duration));
    }
    setHasLoaded(true);
  }, []);

  // Sync video play/pause with isPlaying state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    syncDuration();
  }, [syncDuration, videoSrc]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.duration && !isNaN(video.duration) && isFinite(video.duration) && video.duration > 0) {
      const d = Math.round(video.duration);
      if (d !== duration) {
        setDuration(d);
      }
    }
  };

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full select-none group/showcase">
      {/* ── Soft Ambient Teal Glow Behind Monitor Frame ── */}
      <div className="absolute -inset-6 sm:-inset-8 lg:-inset-12 bg-gradient-to-tr from-teal-500/20 via-cyan-500/10 to-transparent rounded-[3rem] blur-3xl -z-10 pointer-events-none" />
      <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-b from-teal-500/15 via-transparent to-slate-900/10 blur-xs -z-10 pointer-events-none" />

      {/* ── Outer Monitor Bezel Frame (Hardware Console Window) ── */}
      <div
        ref={containerRef}
        className="relative rounded-2xl sm:rounded-[2.2rem] bg-[#0c1322] border border-slate-800/90 shadow-[0_30px_70px_-15px_rgba(2,6,23,0.55),0_0_40px_-15px_rgba(13,139,153,0.25)] overflow-hidden flex flex-col text-slate-100"
      >
        {/* ── Sleek Console Window Header Bar ── */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 bg-[#090f1d] border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-xs" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-xs" />
            </div>
            <span className="text-[11px] sm:text-xs font-mono font-semibold text-slate-400 ml-2 hidden sm:inline">
              grydin-console <span className="text-teal-400/80 font-normal">v2.4.0</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE PRODUCTION STREAM
            </span>
          </div>
        </div>

        {/* ── Screen Main Viewport Area ── */}
        <div className="relative aspect-[16/10.5] min-h-[360px] sm:min-h-[420px] md:min-h-[460px] w-full bg-[#0c1322] overflow-hidden flex items-center justify-center">
          {/* Active Playing Video Layer */}
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            muted={isMuted}
            loop
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={syncDuration}
            onDurationChange={syncDuration}
            onCanPlay={syncDuration}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 cursor-pointer ${
              hasLoaded || isPlaying ? "opacity-100 z-10" : "opacity-0 pointer-events-none -z-10"
            }`}
          />

          {/* Active Live Session Floating Pill Badge */}
          {isPlaying && (
            <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/85 backdrop-blur-md border border-teal-500/40 text-[10px] font-bold text-teal-300 shadow-xl">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider uppercase">Live Production Run</span>
            </div>
          )}

          {/* ── Orchestration Console UI (Displayed when video loading or as fallback) ── */}
          <div
            className={`w-full h-full flex flex-row overflow-hidden transition-opacity duration-300 ${
              hasLoaded || isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 z-0"
            }`}
          >
            {/* Left Sidebar (Dark Navy #0c1322) */}
            <div className="w-28 sm:w-36 md:w-44 bg-[#0a101d] border-r border-slate-800/80 p-2.5 sm:p-3.5 flex flex-col justify-between shrink-0">
              <div>
                {/* GrydIn Logo */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-1">
                  <div className="w-5 h-5 rounded-md bg-[#0D8B99] flex items-center justify-center text-white font-bold text-[10px]">
                    G
                  </div>
                  <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight">
                    GrydIn
                  </span>
                </div>

                {/* Sidebar Navigation */}
                <nav className="space-y-1 sm:space-y-1.5">
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-[#0D8B99]/20 text-teal-400 font-semibold text-[10px] sm:text-xs border border-[#0D8B99]/30">
                    <Home className="w-3.5 h-3.5" />
                    <span>Home</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 text-[10px] sm:text-xs">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Agents</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 text-[10px] sm:text-xs">
                    <Workflow className="w-3.5 h-3.5" />
                    <span>Workflows</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 text-[10px] sm:text-xs">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Tools</span>
                  </div>
                  <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-slate-400 text-[10px] sm:text-xs">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Logs</span>
                  </div>
                </nav>
              </div>

              {/* Bottom Settings Link */}
              <div className="flex items-center gap-2 px-2.5 py-1 text-slate-400 text-[10px] sm:text-xs">
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </div>
            </div>

            {/* Main Console Canvas (Clean White/Slate Surface #f8fafc) */}
            <div className="flex-1 bg-[#f8fafc] text-slate-900 p-3 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden">
              {/* Header Row */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm md:text-base text-slate-900 leading-tight">
                    Orchestration Console
                  </h3>
                  <p className="text-[9px] sm:text-[11px] text-slate-500 font-medium">
                    Monitor and manage your autonomous agents in real time.
                  </p>
                </div>

                {/* Right Status Badges */}
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-800/80 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    LIVE DEMO
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    System Online
                  </span>
                </div>
              </div>

              {/* 4 Stat Cards Row */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 my-2.5 sm:my-3">
                <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-tight">Active Agents</span>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-none">4</span>
                    <span className="block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1" />
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-tight">Running Workflows</span>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-none">2</span>
                    <span className="block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1" />
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <Wrench className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-tight">Tools Connected</span>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-none">6</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-2.5 border border-slate-200/80 shadow-xs flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </div>
                  <div>
                    <span className="block text-[8px] sm:text-[9px] text-slate-500 uppercase tracking-tight">Avg. Response Time</span>
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900 leading-none">1.2s</span>
                  </div>
                </div>
              </div>

              {/* Lower Section: Recent Activity (Left) + Live Logs (Right) */}
              <div className="grid grid-cols-12 gap-2.5 sm:gap-3 flex-1 overflow-hidden">
                {/* Recent Activity */}
                <div className="col-span-7 flex flex-col justify-between">
                  <span className="font-bold text-[10px] sm:text-xs text-slate-800 mb-1 block">
                    Recent Activity
                  </span>
                  <div className="space-y-1.5 text-[9px] sm:text-[10px]">
                    <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/70 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <Zap className="w-2.5 h-2.5" />
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">Agent detected new event</span>
                          <span className="text-slate-400 text-[8px] block">Invoice processing · 2s ago</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        Success
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/70 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                          <Database className="w-2.5 h-2.5" />
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">Agent executed tool</span>
                          <span className="text-slate-400 text-[8px] block">Database query · 4s ago</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        Success
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/70 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-2.5 h-2.5" />
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">Workflow completed</span>
                          <span className="text-slate-400 text-[8px] block">Order processing · 12s ago</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                        Success
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-1.5 sm:p-2 border border-slate-200/70 flex items-center justify-between shadow-2xs">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="w-4 h-4 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center shrink-0">
                          <RefreshCw className="w-2.5 h-2.5" />
                        </span>
                        <div className="truncate">
                          <span className="font-bold text-slate-900 block truncate">Agent waiting for response</span>
                          <span className="text-slate-400 text-[8px] block">API call · 18s ago</span>
                        </div>
                      </div>
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
                        Running
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Live Logs Box */}
                <div className="col-span-5 flex flex-col justify-between">
                  <span className="font-bold text-[10px] sm:text-xs text-slate-800 mb-1 block">
                    Live Logs
                  </span>
                  <div className="bg-[#0c1322] rounded-lg p-2 text-[8px] sm:text-[8.5px] font-mono text-slate-300 leading-tight space-y-1 h-full overflow-hidden flex flex-col justify-between border border-slate-800">
                    <div className="space-y-1 truncate">
                      <div className="truncate"><span className="text-slate-500">14:32:10</span> <span className="text-teal-400 font-bold">INFO</span> Agent started</div>
                      <div className="truncate"><span className="text-slate-500">14:32:12</span> <span className="text-teal-400 font-bold">INFO</span> Fetching data from API...</div>
                      <div className="truncate"><span className="text-slate-500">14:32:14</span> <span className="text-emerald-400 font-bold">INFO</span> Data received (200)</div>
                      <div className="truncate"><span className="text-slate-500">14:32:15</span> <span className="text-teal-400 font-bold">INFO</span> Processing with AI model...</div>
                      <div className="truncate"><span className="text-slate-500">14:32:17</span> <span className="text-emerald-400 font-bold">INFO</span> Tool execution completed</div>
                      <div className="truncate"><span className="text-slate-500">14:32:18</span> <span className="text-teal-400 font-bold">INFO</span> Updating database...</div>
                      <div className="truncate"><span className="text-slate-500">14:32:20</span> <span className="text-emerald-400 font-bold">INFO</span> Workflow completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Center Play / Pause Indicator (Shown only when paused) ── */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-xs z-30 cursor-pointer select-none"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-900/90 backdrop-blur-xl text-white shadow-[0_0_35px_rgba(13,139,153,0.4)] border border-teal-400/40 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-teal-400 active:scale-95">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white ml-1 text-white drop-shadow" />
                </div>
                <span className="mt-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[11px] font-mono text-slate-300 font-medium">
                  Paused · Click to Resume
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Subtle Floating Micro-Controls (Only softly appear on hover, zero clutter) ── */}
          <div className="absolute bottom-3 right-3 z-30 flex items-center gap-1.5 opacity-0 group-hover/showcase:opacity-100 transition-opacity duration-300 pointer-events-auto">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="w-7 h-7 rounded-lg bg-slate-950/75 backdrop-blur-md border border-white/10 hover:border-teal-400/40 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 text-teal-400" />
              )}
            </button>
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="w-7 h-7 rounded-lg bg-slate-950/75 backdrop-blur-md border border-white/10 hover:border-teal-400/40 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-lg cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* ── Hairline Ambient Telemetry Progress Line (Zero Clutter, Ultra-Sleek) ── */}
          <div className="absolute bottom-0 inset-x-0 h-[2px] bg-slate-800/40 overflow-hidden z-20 pointer-events-none">
            <div
              className="h-full bg-gradient-to-r from-teal-500 via-cyan-400 to-[#0D8B99] shadow-[0_0_8px_rgba(45,212,191,0.6)] transition-[width] duration-150 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Section Caption & Tags (Outside the Bezel - Matching Mockup) ── */}
      <div className="mt-4 sm:mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 px-1 text-xs">
        {/* Left: ● LIVE EXECUTION | Agents coordinating tools in real time */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500" />
          </span>
          <span className="font-extrabold uppercase tracking-wider text-teal-700 text-[11px] sm:text-xs">
            LIVE EXECUTION
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-600 font-medium text-[11px] sm:text-xs">
            Agents coordinating tools in real time
          </span>
        </div>

        {/* Right: Three Pills [ Real execution ] [ Live logs ] [ No narration ] */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50/90 text-teal-800 border border-teal-200/90 shadow-2xs hover:bg-teal-100/80 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            Real execution
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50/90 text-teal-800 border border-teal-200/90 shadow-2xs hover:bg-teal-100/80 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            Live logs
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-teal-50/90 text-teal-800 border border-teal-200/90 shadow-2xs hover:bg-teal-100/80 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
            No narration
          </span>
        </div>
      </div>
    </div>
  );
}
