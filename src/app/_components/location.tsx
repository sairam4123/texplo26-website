"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, ExternalLink } from "lucide-react";
import FloatingParticles from "./floating-particles";

const locationDetails = {
  name: "Mookambigai College of Engineering",
  address:
    "Srinivasa Nagar, Kalamavur, Pudukkottai \u2013 622 502, Tamil Nadu, India",
  affiliation:
    "Approved by AICTE, New Delhi and Affiliated to Anna University, Chennai",
  date: "March 4, 2026",
  registrationTime: "9:00 AM",
  eventsStart: "9:30 AM",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125544.57007886066!2d78.71305910686343!3d10.479541359072996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa85f41fe68af5%3A0xc7e93b286e3dd4c8!2sMookambigai%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1772311040108!5m2!1sen!2sin",
  directionsUrl:
    "https://www.google.com/maps/dir//Mookambigai+College+of+Engineering,+Keeranur,+Pudukkottai,+Tamil+Nadu+622502",
};

export default function Location() {
  return (
    <section
      id="location"
      className="relative bg-linear-to-b from-slate-950 to-slate-900 px-4 py-24"
    >
      {/* Background motions */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -top-16 left-1/4 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />
        <div className="animate-float-slower absolute right-1/3 -bottom-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
      </div>
      <FloatingParticles count={10} color="bg-blue-400" maxSize={2} />

      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-4xl font-extrabold text-white">Location</h2>
          <div className="mb-10 h-1 w-16 rounded bg-linear-to-r from-cyan-500 to-blue-500" />

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-2xl">
            {/* Map embed */}
            <div className="relative h-64 w-full sm:h-80">
              <iframe
                src={locationDetails.mapEmbedUrl}
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mookambigai College of Engineering - Map"
              />
            </div>

            {/* Info section */}
            <div className="p-8 md:p-10">
              <div className="mb-6 flex items-start gap-3">
                <MapPin className="mt-1 h-6 w-6 shrink-0 text-cyan-500" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {locationDetails.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {locationDetails.address}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {locationDetails.affiliation}
                  </p>
                </div>
              </div>

              {/* Date & Time chips */}
              <div className="mb-6 flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock className="h-4 w-4 text-cyan-500" />
                  {locationDetails.date}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock className="h-4 w-4 text-cyan-500" />
                  Registration: {locationDetails.registrationTime}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  <Clock className="h-4 w-4 text-cyan-500" />
                  Events start: {locationDetails.eventsStart}
                </div>
              </div>

              {/* Directions CTA */}
              <a
                href={locationDetails.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-[1.02]"
              >
                <Navigation className="h-4 w-4" />
                Get Directions
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
