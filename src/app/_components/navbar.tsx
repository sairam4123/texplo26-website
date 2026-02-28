"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Instructions", href: "#instructions" },
  { label: "Location", href: "#location" },
  { label: "Contact", href: "#coordinators" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-900/90 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <Image
            src="/logos/texplo.png"
            alt="Tecxplo logo"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
          />
          <span className="text-xl font-bold tracking-tight text-white">
            TECXPLO&apos;26
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-cyan-400"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#register-cta"
            className="rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
          >
            Register
          </a>
          {/* MCE logo */}
          <a
            href="https://mookambigai.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform hover:scale-110"
          >
            <Image
              src="/logos/mce-logo-2-og.png"
              alt="MCE logo"
              width={30}
              height={30}
              className="h-7 w-7 object-contain"
            />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-slate-900/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-slate-300 transition-colors hover:text-cyan-400"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#events"
                onClick={() => setMobileOpen(false)}
                className="rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-5 py-2 text-center text-sm font-semibold text-white"
              >
                Register
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
