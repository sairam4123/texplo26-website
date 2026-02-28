"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Trophy, BookOpen, ArrowRight } from "lucide-react";

const stats = [
  { icon: Users, label: "Departments", value: "8" },
  { icon: Calendar, label: "Events", value: "20+" },
  { icon: Trophy, label: "Cash Prizes", value: "Massive" },
  { icon: BookOpen, label: "Workshops", value: "Multiple" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl"
        >
          <div className="p-8 md:p-12">
            <h2 className="mb-6 text-4xl font-extrabold text-slate-900">
              About Texplo&apos;26
            </h2>

            <div className="space-y-4 leading-relaxed text-slate-700">
              <p>
                Happening offline every year,{" "}
                <span className="font-semibold text-cyan-600">
                  TEXPLO&apos;26
                </span>{" "}
                is more than just an event &mdash; it&apos;s a knowledge-sharing
                playground where learning gets gamified.
              </p>
              <p>
                Whether you&apos;re here to upskill, compete, or connect,
                we&apos;ve crafted a lineup of dynamic tech challenges and
                experiences that bring out the best in you.
              </p>
              <p>
                With massive cash prizes and a stage that celebrates real
                talent, this is your chance to learn, level up, and lead.
              </p>
              <p>
                With <span className="font-bold text-cyan-600">8</span>{" "}
                departments and{" "}
                <span className="font-bold text-cyan-600">20+</span> events,{" "}
                <span className="font-semibold text-cyan-600">
                  TEXPLO&apos;26
                </span>{" "}
                is a platform for students to showcase their skills and
                knowledge in various technical fields.
              </p>
              <p>
                From coding competitions to workshops, we have something for
                everyone. Whether you&apos;re a seasoned pro or just starting
                out, we invite you to join us and be part of this exciting
                journey.
              </p>
            </div>

            {/* Stats row */}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-xl bg-slate-50 p-4 text-center"
                >
                  <stat.icon className="mb-2 h-6 w-6 text-cyan-500" />
                  <span className="text-lg font-bold text-slate-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#events"
              className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 py-3 text-center font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
            >
              Learn more
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
