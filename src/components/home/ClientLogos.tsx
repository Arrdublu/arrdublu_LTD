'use client';

import React, { useState, useEffect } from 'react';
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
  const [logos, setLogos] = useState<Partial<ClientLogo>[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchLogos() {
      try {
        const fetchedLogos = await getClientLogos();
        if (fetchedLogos.length > 0) {
          setLogos(fetchedLogos);
        } else {
          setLogos(defaultLogos);
        }
      } catch (err) {
        console.error('Failed to fetch client logos', err);
        setLogos(defaultLogos);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLogos();
  }, []);

  return (
    <div className="w-full bg-[#020304] py-16 border-y border-slate-900">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center flex flex-col items-center">
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500 mb-4">
          Trusted by Industry Leaders
        </h3>
        <div className="inline-flex items-center gap-2 bg-slate-900/50 border border-slate-800 px-4 py-2 rounded-full">
          <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
          <span className="text-sm font-medium text-slate-300">
            {isLoading ? (
              <span className="animate-pulse">Loading partners...</span>
            ) : (
              `Partnered with ${logos.length} brands & collaborators`
            )}
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative w-[324px] h-[204px] bg-slate-900/30 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 justify-items-center">
            {logos.map((logo, index) => {
              let imgUrl = logo.imageUrl || '';
              if (imgUrl.startsWith('httpsa://')) {
                imgUrl = imgUrl.replace('httpsa://', 'https://');
              }
              const content = (
                <div className="relative w-[324px] h-[204px] opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
                  <Image 
                    src={imgUrl}
                    alt={logo.name || 'Brand Logo'}
                    fill
                    className="object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              );

              return (
                <div key={logo.id || index} className="flex items-center justify-center">
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
          </div>
        )}
      </div>
    </div>
  );
}
