'use client';

import React, { useState, useEffect } from 'react';

const SERVICES_DATA = [
  { name: 'Brand Identity Suite', category: 'Branding', type: 'Fixed Package', price: '$1,200.00' },
  { name: 'Lifestyle Product Photography', category: 'Photography', type: 'Fixed Package', price: '$950.00' },
  { name: 'Cinematic Production', category: 'Video & Film', type: 'Fixed Package', price: '$3,500.00' },
  { name: 'Holographic Production', category: 'Interactive', type: 'Fixed Package', price: '$3,500.00' },
  { name: 'Cognitive SEO', category: 'Digital Strategy', type: 'Fixed Package', price: '$3,500.00' },
  { name: 'Luxury Identity', category: 'Branding', type: 'Fixed Package', price: '$8,000.00' },
  { name: 'Virtual Production', category: '3D / Unreal Engine', type: 'Fixed Package', price: '$15,000.00' },
  { name: 'Event Photo & Videography', category: 'Live Events', type: 'Hourly Rate', price: '$120.00 / hr' },
  { name: 'Video Editing, VFX & Post', category: 'Post-Production', type: 'Hourly Rate', price: '$75.00 / hr' },
];

export default function RateSheetDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 text-sm font-medium tracking-wide uppercase bg-neutral-900 text-white rounded-md hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 border border-neutral-700 transition-colors"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        View Rate Sheet
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity no-print"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer / Print Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rate-sheet-title"
        className={`print-rate-sheet fixed top-0 right-0 h-full w-full max-w-2xl bg-neutral-950 text-neutral-100 z-50 p-6 md:p-8 shadow-2xl transition-transform duration-300 ease-in-out border-l border-neutral-800 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* PDF Document Header (Formatted for Print) */}
        <div className="flex items-center justify-between pb-6 border-b border-neutral-800 print:border-neutral-300">
          <div>
            <span className="hidden print:block text-xs font-bold uppercase tracking-widest text-neutral-500 mb-1">
              ARRDUBLU Studio Rate Sheet
            </span>
            <h2 id="rate-sheet-title" className="text-2xl font-bold tracking-tight text-white print:text-black">
              Services & Pricing Directory
            </h2>
            <p className="text-sm text-neutral-400 print:text-neutral-600 mt-1">
              Director-led production and studio service rates.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="no-print p-2 text-neutral-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-neutral-400 rounded-md"
            aria-label="Close rate sheet"
          >
            ✕
          </button>
        </div>

        {/* Actions Bar (Screen Only) */}
        <div className="no-print flex justify-between items-center my-4">
          <span className="text-xs text-neutral-500">Official Studio Rates</span>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-neutral-300 hover:text-white underline underline-offset-4 focus:outline-none"
          >
            📄 Print / Save as PDF
          </button>
        </div>

        {/* Rate Sheet Table */}
        <div className="overflow-x-auto mt-2">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-neutral-800 print:border-neutral-300 text-neutral-400 print:text-neutral-700 uppercase text-xs tracking-wider">
                <th scope="col" className="py-3 px-2">Service</th>
                <th scope="col" className="py-3 px-2">Category</th>
                <th scope="col" className="py-3 px-2">Structure</th>
                <th scope="col" className="py-3 px-2 text-right">Price (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 print:divide-neutral-200">
              {SERVICES_DATA.map((service, index) => (
                <tr key={index} className="hover:bg-neutral-900/50 print:hover:bg-transparent transition-colors">
                  <th scope="row" className="py-3.5 px-2 font-medium text-white print:text-black">
                    {service.name}
                  </th>
                  <td className="py-3.5 px-2 text-neutral-400 print:text-neutral-700">{service.category}</td>
                  <td className="py-3.5 px-2 text-neutral-400 print:text-neutral-700 text-xs">
                    <span className="inline-block px-2 py-0.5 rounded bg-neutral-900 print:bg-neutral-100 border border-neutral-800 print:border-neutral-300">
                      {service.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right font-mono font-semibold text-neutral-200 print:text-black">
                    {service.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Note & Contact (Visible in PDF export) */}
        <div className="mt-8 pt-4 border-t border-neutral-800 print:border-neutral-300 text-xs text-neutral-500 print:text-neutral-700 flex justify-between items-start">
          <div>
            <p>* Custom scopes, enterprise retainers, and multi-day packages available upon request.</p>
            <p className="mt-1">Inquiries: <strong>https://arrdublu.us/contact</strong></p>
          </div>
          <div className="hidden print:block text-right">
            <p>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
          </div>
        </div>
      </div>
    </>
  );
}

