"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownTileProps {
  value: number;
  label: string;
  variant?: "dark" | "light";
}

function CountdownTile({ value, label, variant = "dark" }: CountdownTileProps) {
  const display = String(value).padStart(2, "0");
  const prevRef = useRef(display);

  useEffect(() => {
    prevRef.current = display;
  }, [display]);

  const isDark = variant === "dark";

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative flex h-16 w-14 items-center justify-center overflow-hidden rounded-xl sm:h-20 sm:w-[72px] ${
          isDark
            ? "bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            : "bg-slate-100 shadow-sm"
        }`}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -24, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 24, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className={`text-3xl font-extrabold tabular-nums sm:text-4xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className={`text-[10px] font-semibold tracking-widest uppercase sm:text-xs ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* Colon separator */
function Separator({ variant = "dark" }: { variant?: "dark" | "light" }) {
  return (
    <span
      className={`mt-1 self-start pt-4 text-xl font-bold sm:pt-5 sm:text-2xl ${
        variant === "dark" ? "text-cyan-400/60" : "text-cyan-500/60"
      }`}
    >
      :
    </span>
  );
}

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  variant?: "dark" | "light";
}

export default function Countdown({
  days,
  hours,
  minutes,
  seconds,
  variant = "dark",
}: CountdownProps) {
  return (
    <div className="flex items-start justify-center gap-1.5 sm:gap-2.5">
      <CountdownTile value={days} label="days" variant={variant} />
      <Separator variant={variant} />
      <CountdownTile value={hours} label="hours" variant={variant} />
      <Separator variant={variant} />
      <CountdownTile value={minutes} label="mins" variant={variant} />
      <Separator variant={variant} />
      <CountdownTile value={seconds} label="secs" variant={variant} />
    </div>
  );
}
