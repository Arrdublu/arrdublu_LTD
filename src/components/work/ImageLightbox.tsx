'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LightboxItem {
  id: string;
  title: string;
  category?: string;
  image: string;
  description?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: LightboxItem[];
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function ImageLightbox({ isOpen, currentIndex, items, onClose, onNavigate }: ImageLightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === 'ArrowRight' && currentIndex < items.length - 1) onNavigate(currentIndex + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const currentItem = items[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {currentIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {currentIndex < items.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        <div
          className="relative max-w-5xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full h-[65vh] md:h-[70vh] rounded-lg overflow-hidden bg-slate-950 border border-slate-800">
            <Image
              src={currentItem.image}
              alt={currentItem.title}
              fill
              sizes="100vw"
              className="object-contain"
              priority
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="mt-4 text-center max-w-2xl px-4">
            {currentItem.category && (
              <span className="inline-block font-mono text-[10px] uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded-sm mb-2">
                {currentItem.category}
              </span>
            )}
            <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-1">
              {currentItem.title}
            </h3>
            {currentItem.description && (
              <p className="text-sm text-slate-400 font-sans line-clamp-2">
                {currentItem.description}
              </p>
            )}
            <div className="mt-2 text-xs font-mono text-slate-500">
              {currentIndex + 1} of {items.length}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
