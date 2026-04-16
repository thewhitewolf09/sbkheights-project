"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StaggerContainer, StaggerItem } from "@/components/animation/Stagger";

interface GalleryImage {
  title: string;
  type: string;
  url: string;
}

interface GalleryGridProps {
  items: GalleryImage[];
}

export default function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div className="px-12 max-w-7xl mx-auto mb-32">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <StaggerItem key={i} className="relative group overflow-hidden cursor-pointer block aspect-[4/3]" onClick={() => setSelectedImage(item)}>
            <img
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0 image-emerald"
              src={item.url}
            />
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-6 text-center">
              <span className="material-symbols-outlined text-white text-4xl mb-4 font-variation-fill">zoom_in</span>
              <p className="text-white text-xs font-bold uppercase tracking-widest leading-relaxed">{item.title}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-white group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="material-symbols-outlined text-4xl group-hover:text-secondary">close</span>
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full max-h-[80vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain shadow-[0_0_100px_rgba(0,0,0,0.5)] border border-white/5"
              />
              <div className="mt-8 text-center">
                <span className="text-secondary font-label text-[10px] uppercase tracking-[0.3rem] mb-2 block font-bold">{selectedImage.type}</span>
                <h3 className="text-white text-2xl font-headline font-bold uppercase tracking-tighter italic">{selectedImage.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
