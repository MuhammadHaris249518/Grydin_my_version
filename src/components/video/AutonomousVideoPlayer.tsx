"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Settings,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AutonomousVideoPlayerProps {
  src?: string;
  poster?: string;
}

export function AutonomousVideoPlayer({
  src = "/videos/Video.mp4",
  poster,
}: AutonomousVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.8);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // Auto-play on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setHasStarted(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  // Update time and duration
  const handleTimeUpdate = () => {
    if (!videoRef.current || isScrubbing) return;
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDuration(videoRef.current.duration);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      video.volume = volume || 0.8;
    } else {
      video.muted = true;
      setIsMuted(true);
    }
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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error("Fullscreen error:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "0:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="relative w-full select-none">
      {/* ── Soft Pastel Mint/Teal Backdrop Plate (Matching Mockup) ── */}
      <div className="absolute -inset-4 sm:-inset-6 lg:-inset-8 bg-gradient-to-tr from-teal-100/70 via-emerald-50/50 to-cyan-100/40 rounded-[2.5rem] sm:rounded-[3.5rem] -rotate-1 -z-10 border border-teal-200/40 pointer-events-none transform transition-transform duration-700 hover:rotate-0" />

      {/* ── Handwritten Annotation: "Watch it in action" (Top Right) ── */}
      <div className="absolute -top-12 right-2 sm:right-6 hidden sm:flex items-center gap-2 z-20 pointer-events-none">
        <span className="font-serif italic font-semibold text-teal-700 text-sm tracking-wide">
          Watch it in action
        </span>
        {/* Curved Hand-Drawn Style Arrow */}
        <svg
          width="40"
          height="32"
          viewBox="0 0 40 32"
          fill="none"
          className="text-teal-600 stroke-current -rotate-6"
        >
          <path
            d="M 6 6 C 18 2, 32 8, 30 24"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 24 20 L 30 24 L 33 17"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Video Monitor / Tablet Bezel Frame ── */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group rounded-3xl sm:rounded-[2.2rem] bg-slate-950 p-2 sm:p-3 md:p-3.5 shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] border border-slate-800/90 overflow-hidden"
      >
        {/* Screen Glass Inner Wrapper */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl sm:rounded-[1.75rem] overflow-hidden bg-slate-950 cursor-pointer">
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            playsInline
            autoPlay
            muted
            loop
            onClick={togglePlay}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            className="w-full h-full object-cover object-center select-none"
          />

          {/* Center Play/Pause Glass Icon Overlay when Paused */}
          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-xs z-20 cursor-pointer"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 text-teal-700 shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-teal-600 text-teal-600 ml-1" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Custom Video Controls Bar (Matching Mockup) ── */}
          <div
            className={`absolute bottom-0 inset-x-0 z-30 bg-gradient-to-t from-slate-950/95 via-slate-950/80 to-transparent pt-8 pb-3 px-4 sm:px-6 transition-opacity duration-300 ${
              isHovered || !isPlaying ? "opacity-100" : "opacity-90 sm:opacity-75 hover:opacity-100"
            }`}
          >
            <div className="flex items-center gap-3 sm:gap-4 text-white">
              {/* Play / Pause Toggle Button */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-200 hover:text-white hover:bg-white/10 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                )}
              </button>

              {/* Time Display (e.g., 0:00 / 1:24) */}
              <span className="font-mono text-[11px] sm:text-xs text-slate-300 whitespace-nowrap">
                {formatTime(currentTime)} / {formatTime(duration || 10)}
              </span>

              {/* Interactive Scrubbing Progress Bar */}
              <div
                ref={progressTrackRef}
                onClick={handleSeek}
                className="relative flex-1 h-2 bg-slate-700/60 hover:h-2.5 rounded-full cursor-pointer transition-all flex items-center group/track"
              >
                {/* Buffered/Fill Background */}
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-[#0D8B99] rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  {/* Scrubber Knob */}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md shadow-black/40 border border-teal-400 opacity-90 group-hover/track:scale-125 transition-transform" />
                </div>
              </div>

              {/* Right Controls: Volume, Settings, Fullscreen */}
              <div className="flex items-center gap-1.5 sm:gap-2 text-slate-300">
                {/* Volume / Mute Toggle */}
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-slate-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-teal-400" />
                  )}
                </button>

                {/* Settings Icon */}
                <button
                  type="button"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.playbackRate = videoRef.current.playbackRate === 1 ? 1.5 : 1;
                    }
                  }}
                  title="Toggle playback speed (1x / 1.5x)"
                  className="w-8 h-8 rounded-lg hidden sm:flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-400 hover:rotate-45 transition-transform" />
                </button>

                {/* Fullscreen Button */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:text-white hover:bg-white/10 transition-colors"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Floating Badge on Bottom Right: "Watch how our agents work" ── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="absolute -bottom-7 sm:-bottom-8 right-1 sm:right-6 z-30"
      >
        <div className="relative group/pill">
          {/* Subtle curved arrow pointing to video */}
          <div className="absolute -top-6 -right-2 hidden sm:block pointer-events-none">
            <svg
              width="32"
              height="30"
              viewBox="0 0 32 30"
              fill="none"
              className="text-teal-500 stroke-current"
            >
              <path
                d="M 26 24 C 28 16, 26 8, 16 4"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="3 3"
                fill="none"
              />
              <path
                d="M 21 6 L 16 4 L 18 10"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div
            onClick={togglePlay}
            className="cursor-pointer bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl shadow-slate-300/40 hover:shadow-2xl hover:border-teal-300 transition-all rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3.5"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-teal-100/90 border border-teal-200/90 text-[#0D8B99] flex items-center justify-center shrink-0 group-hover/pill:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-[#0D8B99] text-[#0D8B99] ml-0.5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                Watch how our agents work
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                Real execution • Live logs • No lag
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
