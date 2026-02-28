"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  ClipboardList,
  FileText,
} from "lucide-react";
import FloatingParticles from "./floating-particles";

const instructions = [
  "All participants should bring their College ID Card.",
  "Participants are instructed to be formally dressed.",
  "Registration starts at 9:00 AM.",
  "Events will start at 9:30 AM.",
  "The Symposium is open for all Engineering and Technology Departments.",
  "Proper decorum must be maintained in the campus.",
  "The college rules must be adhered during the events.",
  "Judge\u2019s decision will be the final and binding.",
  "Any events can be cancelled based on the decision of organizing committee.",
];

const screenSpeaksRules = [
  "Maximum 2 students per team.",
  "Plagiarism is not allowed.",
  "Technical paper should not exceed 4 pages.",
  "Send the paper to the mentioned Gmail Id while registering.",
];

const importantDates = [
  { label: "Paper Submission", date: "25.02.2026" },
  { label: "Intimation of Acceptance", date: "28.02.2026" },
  { label: "Event Day", date: "04.03.2026" },
];

export default function Instructions() {
  return (
    <section
      id="instructions"
      className="relative bg-linear-to-b from-slate-950 to-slate-900 px-4 py-24"
    >
      {/* Background motions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-16 right-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="animate-float-slower absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <FloatingParticles count={10} color="bg-slate-400" maxSize={2} />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-4xl font-extrabold text-white">
            General Instructions
          </h2>
          <div className="mb-10 h-1 w-16 rounded bg-linear-to-r from-cyan-500 to-blue-500" />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Instructions list */}
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl lg:col-span-2">
              <div className="p-8 md:p-10">
                <div className="mb-4 flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-cyan-500" />
                  <h3 className="text-xl font-bold text-slate-900">
                    Rules &amp; Guidelines
                  </h3>
                </div>
                <ul className="space-y-3">
                  {instructions.map((item, i) => {
                    const isWarning =
                      item.includes("Judge") || item.includes("cancelled");
                    return (
                      <li key={i} className="flex items-start gap-3">
                        {isWarning ? (
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        ) : (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" />
                        )}
                        <span
                          className={`text-sm leading-relaxed ${
                            isWarning
                              ? "font-semibold text-slate-800"
                              : "text-slate-600"
                          }`}
                        >
                          {item}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Important Dates + Registration Fee + Paper Rules */}
            <div className="flex flex-col gap-6">
              {/* Important Dates */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
                <div className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-cyan-500" />
                    <h3 className="text-lg font-bold text-slate-900">
                      Important Dates
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {importantDates.map((d) => (
                      <li
                        key={d.label}
                        className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-2.5"
                      >
                        <span className="text-sm font-medium text-slate-700">
                          {d.label}
                        </span>
                        <span className="text-sm font-bold text-cyan-600">
                          {d.date}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Registration Fee */}
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-lg font-bold text-slate-900">
                    Registration Fee
                  </h3>
                  <p className="text-3xl font-extrabold text-cyan-600">
                    &#8377;200
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Per Student</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
