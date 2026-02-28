"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Volume2,
  VolumeX,
} from "lucide-react";
import slides from "~/data/carousel.json";

const VIDEO_EXTS = [".mp4", ".webm", ".ogg", ".mov"];
const MAX_VIDEO_SECS = 60; // stop playback at 1 min

function isVideo(src: string) {
  return VIDEO_EXTS.some((ext) => src.toLowerCase().endsWith(ext));
}

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  }, []);

  // Auto-advance — paused while a video is playing
  useEffect(() => {
    if (isVideoPlaying) return;
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [paginate, isVideoPlaying]);

  // When the active slide changes, reset video state
  useEffect(() => {
    const slide = slides[index];
    if (slide && isVideo(slide.src)) {
      setIsVideoPlaying(true);
    } else {
      setIsVideoPlaying(false);
    }
  }, [index]);

  const handleImgError = (i: number) => {
    setImgErrors((prev) => new Set(prev).add(i));
  };

  /** Called on every video timeupdate — stops at MAX_VIDEO_SECS and advances */
  const handleTimeUpdate = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.currentTime >= MAX_VIDEO_SECS) {
      vid.pause();
      setIsVideoPlaying(false);
      paginate(1);
    }
  }, [paginate]);

  const handleVideoEnd = useCallback(() => {
    setIsVideoPlaying(false);
    paginate(1);
  }, [paginate]);

  const currentSlide = slides[index]!;
  const currentIsVideo = isVideo(currentSlide.src);

  return (
    <section className="relative bg-linear-to-b from-slate-950 to-slate-900 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-center text-3xl font-extrabold text-white md:text-4xl">
            Event Highlights
          </h2>
          <p className="mb-10 text-center text-slate-400">
            Glimpses from our previous editions
          </p>

          {/* Carousel container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 shadow-2xl">
            <div className="relative aspect-video w-full">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="absolute inset-0"
                >
                  {imgErrors.has(index) ? (
                    /* Placeholder when media is missing */
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-800 to-slate-900">
                      <ImageIcon className="h-16 w-16 text-slate-600" />
                      <span className="text-sm text-slate-500">
                        Add media: {currentSlide.src}
                      </span>
                    </div>
                  ) : currentIsVideo ? (
                    <video
                      ref={videoRef}
                      key={currentSlide.src}
                      src={currentSlide.src}
                      className="h-full w-full object-cover"
                      autoPlay
                      muted={muted}
                      playsInline
                      onTimeUpdate={handleTimeUpdate}
                      onEnded={handleVideoEnd}
                      onError={() => handleImgError(index)}
                    />
                  ) : (
                    <Image
                      src={currentSlide.src}
                      alt={currentSlide.caption}
                      fill
                      className="object-cover"
                      onError={() => handleImgError(index)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Gradient overlay for caption readability */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/70 to-transparent" />

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-sm font-medium text-white/90 sm:text-base"
                  >
                    {currentSlide.caption}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
                className="absolute top-1/2 left-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => paginate(1)}
                aria-label="Next slide"
                className="absolute top-1/2 right-3 z-10 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Mute / unmute toggle for videos */}
              {currentIsVideo && !imgErrors.has(index) && (
                <button
                  onClick={() => setMuted((m) => !m)}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="absolute top-3 right-3 z-10 rounded-full bg-black/40 p-2 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
                >
                  {muted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>
              )}
            </div>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-2 py-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-cyan-400"
                      : "w-2 bg-slate-600 hover:bg-slate-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
