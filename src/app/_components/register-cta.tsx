"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";
import Countdown from "./countdown";
import FloatingParticles from "./floating-particles";

const REG_DEADLINE = new Date("2026-03-03T23:59:59");

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

export default function RegisterCta() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(REG_DEADLINE));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(REG_DEADLINE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="register-cta"
      className="relative bg-linear-to-b from-slate-950 to-slate-900 px-4 py-24"
    >
      {/* Background motions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-16 left-1/3 h-64 w-64 rounded-full bg-cyan-500/6 blur-3xl" />
        <div className="animate-float-slower absolute right-1/4 -bottom-20 h-72 w-72 rounded-full bg-blue-500/6 blur-3xl" />
        <div className="animate-pulse-glow absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>
      <FloatingParticles count={16} color="bg-cyan-300" maxSize={3} />

      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        >
          <div className="p-8 text-center md:p-12">
            <h2 className="mb-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
              What are you waiting for?
            </h2>
            <p className="mb-8 text-xl font-bold text-slate-900 md:text-2xl">
              Join us now by registering today!
            </p>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-cyan-50 px-5 py-2 text-sm font-bold text-cyan-700">
              Registration Fee: &#8377;200 per student
            </div>

            <p className="mb-1 text-base font-semibold text-slate-700">
              Registration ends
            </p>
            <p className="mb-4 text-sm text-slate-500">in</p>

            {timeLeft ? (
              <div className="mb-8">
                <Countdown
                  days={timeLeft.days}
                  hours={timeLeft.hours}
                  minutes={timeLeft.minutes}
                  seconds={timeLeft.seconds}
                  variant="light"
                />
              </div>
            ) : (
              <p className="mb-8 text-lg font-bold text-red-500">
                Registration closed.
              </p>
            )}
          </div>

          {/* Register button */}
          <a
            href="https://forms.gle/B5S7Gg26fTTtMexg7"
            className="flex items-center justify-center gap-2 bg-linear-to-r from-cyan-500 to-blue-500 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
          >
            <Clock className="h-5 w-5" />
            Register Now
            <ArrowRight className="h-5 w-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
