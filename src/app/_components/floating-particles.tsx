"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface Particle {
  id: number;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

interface FloatingParticlesProps {
  /** Number of particles (default: 20) */
  count?: number;
  /** Base colour class e.g. "bg-cyan-400" (default) */
  color?: string;
  /** Max particle diameter in px (default: 4) */
  maxSize?: number;
}

export default function FloatingParticles({
  count = 20,
  color = "bg-cyan-400",
  maxSize = 4,
}: FloatingParticlesProps) {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: Math.max(1.5, Math.random() * maxSize),
      duration: 6 + Math.random() * 10,
      delay: Math.random() * 5,
      opacity: 0.15 + Math.random() * 0.35,
    }));
  }, [count, maxSize]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className={`absolute rounded-full ${color}`}
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            opacity: 0,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 8, 0],
            opacity: [0, p.opacity, p.opacity * 0.5, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
