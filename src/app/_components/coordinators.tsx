"use client";

import { motion } from "framer-motion";
import { Phone, Mail, GraduationCap, Crown } from "lucide-react";
import FloatingParticles from "./floating-particles";
import coordinatorsData from "~/data/coordinators.json";

interface CoordinatorInfo {
  name: string;
  designation: string;
  phone: string;
  email?: string;
}

const convenor: CoordinatorInfo = coordinatorsData.convenor as CoordinatorInfo;
const coConvenor: CoordinatorInfo =
  coordinatorsData.coConvenor as CoordinatorInfo;
const studentCoordinators: CoordinatorInfo[] =
  coordinatorsData.studentCoordinators as CoordinatorInfo[];

function CoordinatorCard({ person }: { person: CoordinatorInfo }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 transition-shadow hover:shadow-md">
      {/* Avatar placeholder */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-cyan-500 to-blue-500 text-lg font-bold text-white">
        {person.name
          .split(" ")
          .map((w) => w[0])
          .join("")
          .slice(0, 2)}
      </div>
      <div className="min-w-0">
        <h4 className="text-base font-bold text-slate-900">{person.name}</h4>
        <p className="mb-2 text-xs text-slate-500">{person.designation}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={`tel:+91${person.phone}`}
            className="inline-flex items-center gap-1.5 text-sm text-cyan-600 transition-colors hover:text-cyan-700"
          >
            <Phone className="h-3.5 w-3.5" />
            {person.phone}
          </a>
          {person.email && (
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-cyan-600 transition-colors hover:text-cyan-700"
            >
              <Mail className="h-3.5 w-3.5" />
              {person.email}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Coordinators() {
  return (
    <section
      id="coordinators"
      className="relative bg-linear-to-b from-slate-900 to-slate-950 px-4 py-24"
    >
      {/* Background motions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slower absolute -top-20 -right-16 h-72 w-72 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="animate-float-slow absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <FloatingParticles count={12} color="bg-cyan-300" maxSize={2} />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-4xl font-extrabold text-white">
            Coordinators
          </h2>
          <div className="mb-10 h-1 w-16 rounded bg-linear-to-r from-cyan-500 to-blue-500" />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            <div className="p-8 md:p-10">
              {/* Convenor & Co-Convenor */}
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-2">
                  <Crown className="h-5 w-5 text-cyan-500" />
                  <h3 className="text-xl font-bold text-slate-900">
                    Convenor &amp; Co-Convenor
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <CoordinatorCard person={convenor} />
                  <CoordinatorCard person={coConvenor} />
                </div>
              </div>

              {/* Student Coordinators */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-cyan-500" />
                  <h3 className="text-xl font-bold text-slate-900">
                    Student Coordinators
                  </h3>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {studentCoordinators.map((person) => (
                    <CoordinatorCard key={person.phone} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
