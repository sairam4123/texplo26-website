"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Code2,
  Database,
  HelpCircle,
  Map,
  ChevronDown,
  Clock,
  Users,
  MapPin,
  Phone,
  Trophy,
  Info,
} from "lucide-react";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import eventsData from "~/data/events.json";

/* ------------------------------------------------------------------ */
/*  Icon map                                                           */
/* ------------------------------------------------------------------ */
const iconMap: Record<string, LucideIcon> = {
  FileText,
  Code2,
  Database,
  HelpCircle,
  Map,
};

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface EventRound {
  name: string;
  description: string;
}

interface Coordinator {
  name: string;
  phone: string;
}

interface EventDetails {
  teamSize: string;
  duration: string;
  venue: string;
  rounds: EventRound[];
  prizes: { first: string; second: string; third: string };
  coordinators: Coordinator[];
  moreInfo: string[];
}

interface EventItem {
  id: string;
  title: string;
  icon: string;
  eventType: "TECHNICAL" | "NON_TECHNICAL";
  desc: string;
  rules: string[];
  details: EventDetails;
}

interface Department {
  name: string;
  events: EventItem[];
}

const departments: Department[] = eventsData.departments as Department[];

/* ------------------------------------------------------------------ */
/*  Flip card                                                          */
/* ------------------------------------------------------------------ */
function FlipCard({ event }: { event: EventItem }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = iconMap[event.icon] ?? FileText;
  const d = event.details;

  return (
    <div
      className="group h-[420px] cursor-pointer [perspective:1200px]"
      onClick={() => setFlipped((f) => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
        className="relative h-full w-full transform-3d"
      >
        {/* ---- FRONT ---- */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm [backface-visibility:hidden]">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                {event.title}
              </h4>
            </div>
            <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {event.desc}
            </p>
            <h5 className="mb-2 text-sm font-bold text-slate-800">Rules</h5>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
              {event.rules.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
          </div>
          <span className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 py-2.5 text-sm font-semibold text-white shadow">
            Tap to see details
          </span>
        </div>

        {/* ---- BACK ---- */}
        <div className="absolute inset-0 flex [transform:rotateY(180deg)] flex-col overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 shadow-sm [backface-visibility:hidden]">
          <h4 className="mb-3 text-lg font-bold text-slate-900">
            {event.title}
          </h4>

          {/* Quick chips */}
          <div className="mb-4 flex flex-wrap gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
              <Users className="h-3 w-3 text-cyan-500" />
              {d.teamSize}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
              <Clock className="h-3 w-3 text-cyan-500" />
              {d.duration}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-slate-700">
              <MapPin className="h-3 w-3 text-cyan-500" />
              {d.venue}
            </span>
          </div>

          {/* Coordinators */}
          <h5 className="mb-1.5 text-sm font-bold text-slate-800">
            Event Coordinators
          </h5>
          <ul className="mb-4 list-disc pl-5 text-sm text-slate-600">
            {d.coordinators.map((c) => (
              <li key={c.phone} className="flex items-center gap-1">
                <Phone className="inline h-3 w-3 text-cyan-500" />
                {c.name} &ndash; {c.phone}
              </li>
            ))}
          </ul>

          {/* More Info */}
          {d.moreInfo.length > 0 && (
            <>
              <h5 className="mb-1.5 text-sm font-bold text-slate-800">
                More Info
              </h5>
              <ul className="mb-4 list-disc pl-5 text-sm text-slate-600">
                {d.moreInfo.map((info) => (
                  <li key={info}>{info}</li>
                ))}
              </ul>
            </>
          )}

          {/* Prizes */}
          {d.prizes ? (
            <div className="mt-auto grid grid-cols-3 gap-2 text-center">
              {(
                [
                  ["1st", d.prizes?.first],
                  ["2nd", d.prizes?.second],
                  ["3rd", d.prizes?.third],
                ] as const
              ).map(
                ([place, amt]) =>
                  place && (
                    <div
                      key={place}
                      className="rounded-lg border border-slate-100 bg-slate-50 py-2"
                    >
                      <Trophy className="mx-auto mb-0.5 h-3.5 w-3.5 text-cyan-500" />
                      <p className="text-[10px] text-slate-500">{place}</p>
                      <p className="text-xs font-bold text-slate-900">
                        Rs. {amt}
                      </p>
                    </div>
                  ),
              )}
            </div>
          ) : (
            <p className="mt-auto text-center text-sm font-semibold text-slate-700">
              Prizes will be announced later.
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Events section                                                */
/* ------------------------------------------------------------------ */
export default function Events() {
  const [openDept, setOpenDept] = useState<number>(0);

  return (
    <section
      id="events"
      className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-4xl font-extrabold text-white">Events</h2>
          <div className="mb-10 h-1 w-16 rounded bg-gradient-to-r from-cyan-500 to-blue-500" />

          {departments.map((dept, deptIdx) => {
            const technical = dept.events.filter(
              (e) => e.eventType === "TECHNICAL",
            );
            const nonTechnical = dept.events.filter(
              (e) => e.eventType === "NON_TECHNICAL",
            );

            return (
              <div key={dept.name} className="mb-10">
                <button
                  onClick={() =>
                    setOpenDept(openDept === deptIdx ? -1 : deptIdx)
                  }
                  className="mb-6 flex w-full items-center gap-2 text-left text-xl font-semibold text-slate-200 transition-colors hover:text-cyan-400"
                >
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      openDept === deptIdx ? "rotate-0" : "-rotate-90"
                    }`}
                  />
                  {dept.name}
                </button>

                <AnimatePresence>
                  {openDept === deptIdx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      {/* Technical */}
                      {technical.length > 0 && (
                        <div className="mb-10">
                          <div className="mb-4 flex items-center gap-2">
                            <Code2 className="h-5 w-5 text-cyan-400" />
                            <h3 className="text-lg font-semibold text-cyan-300">
                              Technical Events
                            </h3>
                          </div>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {technical.map((event) => (
                              <FlipCard key={event.id} event={event} />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Non-Technical */}
                      {nonTechnical.length > 0 && (
                        <div className="mb-4">
                          <div className="mb-4 flex items-center gap-2">
                            <Info className="h-5 w-5 text-emerald-400" />
                            <h3 className="text-lg font-semibold text-emerald-300">
                              Non-Technical Events
                            </h3>
                          </div>
                          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {nonTechnical.map((event) => (
                              <FlipCard key={event.id} event={event} />
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
