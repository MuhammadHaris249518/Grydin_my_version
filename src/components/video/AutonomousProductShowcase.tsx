"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AutonomousProductShowcaseProps {
  videoSrc?: string;
}

export function AutonomousProductShowcase({
  videoSrc = "/videos/Video.mp4",
}: AutonomousProductShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(10);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play immediately when component mounts
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, []);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration || 10);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressTrackRef.current || !videoRef.current || !duration) return;
    const rect = progressTrackRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const newProgress = clickX / rect.width;
    const newTime = newProgress * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
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

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full select-none">
      {/* ── Subtle Visual Depth Behind Video Frame ── */}
      <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-tr from-teal-400/15 via-teal-300/10 to-transparent rounded-[2.5rem] sm:rounded-[3rem] blur-2xl -z-10 pointer-events-none" />
      <div className="absolute -inset-1 rounded-[2.2rem] bg-gradient-to-b from-teal-500/20 via-transparent to-slate-900/10 blur-xs -z-10 pointer-events-none" />

      {/* ── The Elevated Product Console Frame (Exact Same Size & Bezel) ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-2xl sm:rounded-[2rem] bg-[#070d18] border border-slate-800/90 shadow-[0_30px_70px_-15px_rgba(2,6,23,0.45)] overflow-hidden flex flex-col text-slate-100"
      >
        {/* ── Product Header Bar ── */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800/90 bg-[#060a13]">
          {/* Left: Window Controls + Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="h-3.5 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D8B99] animate-pulse" />
              <span className="font-semibold text-xs sm:text-sm text-slate-200 tracking-tight">
                GrydIn
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono hidden md:inline">
                / orchestration-console
              </span>
            </div>
          </div>

          {/* Right: Live Production Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Production Live
            </span>
          </div>
        </div>

        {/* ── Main Video Area: Directly Plays Video in That Exact Size ── */}
        <div className="relative aspect-[16/10.5] sm:aspect-[16/10] w-full bg-black overflow-hidden flex items-center justify-center cursor-pointer group/video">
          <video
            ref={videoRef}
            src={videoSrc}
            playsInline
            autoPlay
            muted={isMuted}
            loop
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="w-full h-full object-cover select-none"
          />

          {/* Big Center Play Button Overlay when Paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs z-20 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 text-[#0D8B99] shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-[#0D8B99] text-[#0D8B99] ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Simplified, Clean Control Bar ── */}
        <div className="px-4 sm:px-6 py-3 bg-[#05080f]/95 border-t border-slate-800/90 flex items-center gap-3 sm:gap-4 z-20">
          {/* Play/Pause Button */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 hover:bg-[#0D8B99] hover:text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-current" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
            )}
          </button>

          {/* Time Stamp (e.g., 00:07 / 00:10) */}
          <span className="font-mono text-[11px] text-slate-300 whitespace-nowrap shrink-0">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          {/* Minimal Progress Bar */}
          <div
            ref={progressTrackRef}
            onClick={handleSeek}
            className="relative flex-1 h-1.5 sm:h-2 bg-slate-800 hover:h-2.5 rounded-full cursor-pointer transition-all flex items-center group/track"
          >
            <div
              className="h-full bg-gradient-to-r from-teal-500 to-[#0D8B99] rounded-full relative"
              style={{ width: `${progressPercent}%` }}
            >
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border border-teal-400 opacity-90 group-hover/track:scale-125 transition-transform" />
            </div>
          </div>

          {/* Right Quick Controls: Mute Toggle & Fullscreen */}
          <div className="flex items-center gap-1.5 text-slate-400 shrink-0">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              className="w-7 h-7 rounded-md hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
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
              className="w-7 h-7 rounded-md hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* ── Unified Footer Caption: "Watch how our agents work" ── */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#03060c] border-t border-slate-900 text-slate-400 text-xs flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-slate-300 font-medium">Watch how our agents work</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              Real execution · Live logs · No narration
            </span>
          </div>

          <span className="text-[11px] font-mono text-teal-400 font-semibold ml-auto flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#0D8B99]" />
            Video.mp4 Active
          </span>
        </div>
      </div>
    </div>
  );
}
