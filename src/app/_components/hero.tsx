"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import Countdown from "./countdown";
import FloatingParticles from "./floating-particles";

function getTimeLeft(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

const EVENT_DATE = new Date("2026-03-04T09:00:00");

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(EVENT_DATE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(EVENT_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-slate-900 px-4 pt-24 pb-16 text-center"
    >
      {/* Animated background elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Floating orbs */}
        <div className="animate-float-slow absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="animate-float-slower absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="animate-pulse-glow absolute top-1/4 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-indigo-500/8 blur-3xl" />
        {/* Orbiting accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="animate-orbit h-3 w-3 rounded-full bg-cyan-400/20 blur-sm" />
        </div>
      </div>

      {/* Floating particles */}
      <FloatingParticles count={25} color="bg-cyan-400" maxSize={3} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mx-auto max-w-3xl"
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-sm text-cyan-300">
          <Sparkles className="h-4 w-4" />
          <span>Mookambigai College of Engineering</span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            TEXPLO&apos;26
          </h1>
          <p className="mb-1 text-lg font-medium text-cyan-300">
            Skill. Compete. Conquer.
          </p>
          <p className="mb-8 text-slate-400">is Happening in</p>

          {timeLeft ? (
            <Countdown
              days={timeLeft.days}
              hours={timeLeft.hours}
              minutes={timeLeft.minutes}
              seconds={timeLeft.seconds}
              variant="dark"
            />
          ) : (
            <p className="text-2xl font-bold text-emerald-400">It&apos;s ON!</p>
          )}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 z-10"
      >
        <ChevronDown className="h-8 w-8 animate-bounce text-slate-400" />
      </motion.a>
    </section>
  );
}
