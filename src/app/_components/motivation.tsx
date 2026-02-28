"use client";

import { motion } from "framer-motion";
import { Flame, Target, Zap, Award } from "lucide-react";
import FloatingParticles from "./floating-particles";

const highlights = [
  {
    icon: Flame,
    title: "Cutting-Edge Events",
    desc: "Dive into tech events built around the latest industry trends and tools.",
  },
  {
    icon: Target,
    title: "Compete & Excel",
    desc: "Go head to head with brilliant minds. Push your limits and prove your craft.",
  },
  {
    icon: Zap,
    title: "Bring Ideas to Life",
    desc: "From concept to code, turn your vision into reality on a stage that matters.",
  },
  {
    icon: Award,
    title: "Rewarding Prizes",
    desc: "Some of the most rewarding cash prizes that recognize real talent and effort.",
  },
];

export default function Motivation() {
  return (
    <section
      id="motivation"
      className="relative bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-24"
    >
      {/* Background motions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute top-10 -right-24 h-80 w-80 rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="animate-pulse-glow absolute -bottom-10 left-1/4 h-48 w-48 rounded-full bg-cyan-500/5 blur-3xl" />
      </div>
      <FloatingParticles count={14} color="bg-indigo-400" maxSize={2.5} />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        >
          <div className="p-8 md:p-12">
            <h2 className="mb-2 text-4xl font-extrabold text-slate-900">
              Motivation
            </h2>
            <div className="mb-8 h-1 w-16 rounded bg-gradient-to-r from-cyan-500 to-blue-500" />

            <div className="mb-10 space-y-4 leading-relaxed text-slate-700">
              <p>
                <span className="font-semibold text-cyan-600">
                  TEXPLO&apos;25
                </span>{" "}
                is more than just a tech event; it&apos;s a revolution in the
                making.
              </p>
              <p>
                We&apos;re creating a platform for students to dive into
                cutting-edge tech events, compete with brilliant minds, and
                bring their ideas to life. Whether you&apos;re a coder, creator,
                hacker, or innovator &mdash; this is your arena.
              </p>
              <p>
                With some of the most rewarding cash prizes and a commitment to
                recognizing real talent, we go beyond just hosting events
                &mdash; we spotlight the future of tech. Unleash your skills,
                make your mark, and be part of something bigger.
              </p>
            </div>

            {/* Highlight cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 transition-shadow hover:shadow-md"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
