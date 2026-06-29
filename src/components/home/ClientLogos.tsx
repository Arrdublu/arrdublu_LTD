'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';

const logos = [
  { id: 1, name: 'Brand 1', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: 2, name: 'Brand 2', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: 3, name: 'Brand 3', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: 4, name: 'Brand 4', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: 5, name: 'Brand 5', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: 6, name: 'Brand 6', src: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
];

export function ClientLogos() {
  return (
    <div className="w-full overflow-hidden bg-[#020304] py-16 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
          Trusted by Industry Leaders
        </h3>
      </div>
      <div className="relative flex overflow-x-hidden">
        <motion.div
          className="flex whitespace-nowrap items-center space-x-16 px-8"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 20, repeat: Infinity }}
        >
          {/* Double the array for seamless infinite scrolling */}
          {[...logos, ...logos].map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="relative w-32 h-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
              <Image 
                src={logo.src}
                alt={logo.name}
                fill
                className="object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
