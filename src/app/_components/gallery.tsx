"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage from "next/image";
import { X, ZoomIn, Image as ImageIcon } from "lucide-react";
import photos from "~/data/gallery.json";

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const handleImgError = (i: number) => {
    setImgErrors((prev) => new Set(prev).add(i));
  };

  return (
    <section
      id="gallery"
      className="relative bg-linear-to-b from-slate-900 to-slate-950 px-4 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-2 text-center text-3xl font-extrabold text-white md:text-4xl">
            Gallery
          </h2>
          <p className="mb-10 text-center text-slate-400">
            Moments captured from past Texplo editions
          </p>
        </motion.div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelected(i)}
              className="group relative aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-800/50"
            >
              {imgErrors.has(i) ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-linear-to-br from-slate-800 to-slate-900">
                  <ImageIcon className="h-8 w-8 text-slate-600" />
                  <span className="px-2 text-center text-[10px] text-slate-500">
                    {photo.src}
                  </span>
                </div>
              ) : (
                <NextImage
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={() => handleImgError(i)}
                />
              )}
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {imgErrors.has(selected) ? (
                <div className="flex h-[60vh] w-[80vw] max-w-5xl flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-800 to-slate-900">
                  <ImageIcon className="h-20 w-20 text-slate-600" />
                  <span className="text-sm text-slate-500">
                    {photos[selected]!.src}
                  </span>
                </div>
              ) : (
                <NextImage
                  src={photos[selected]!.src}
                  alt={photos[selected]!.alt}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain"
                  onError={() => handleImgError(selected)}
                />
              )}

              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-6 pt-8 pb-4">
                <p className="text-sm font-medium text-white/90">
                  {photos[selected]!.alt}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
