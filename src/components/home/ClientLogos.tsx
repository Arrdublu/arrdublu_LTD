'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { getClientLogos, ClientLogo } from '@/lib/logo-actions';

const defaultLogos = [
  { id: '1', name: 'Brand 1', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: '2', name: 'Brand 2', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: '3', name: 'Brand 3', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: '4', name: 'Brand 4', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: '5', name: 'Brand 5', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
  { id: '6', name: 'Brand 6', imageUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=200&h=100&auto=format&fit=crop' },
];

export function ClientLogos() {
  const [logos, setLogos] = useState<Partial<ClientLogo>[]>(defaultLogos);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const fetchedLogos = await getClientLogos();
        if (fetchedLogos.length > 0) {
          setLogos(fetchedLogos);
        }
      } catch (err) {
        console.error('Failed to fetch client logos', err);
      }
    }
    fetchLogos();
  }, []);

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
          {[...logos, ...logos].map((logo, index) => {
            const content = (
              <div className="relative w-32 h-16 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
                <Image 
                  src={logo.imageUrl || ''}
                  alt={logo.name || 'Brand Logo'}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            );

            return (
              <div key={`${logo.id}-${index}`}>
                {logo.link ? (
                  <a href={logo.link} target="_blank" rel="noopener noreferrer" className="block">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
