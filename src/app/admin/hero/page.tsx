import React from 'react';
import HeroSlideManager from '@/components/admin/HeroSlideManager';
import { constructMetadata } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Manage Hero Slides - Admin',
});

export default function AdminHeroPage() {
  return (
    <div className="max-w-4xl w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Hero Slides</h1>
        <p className="text-slate-400">Manage the carousel slides shown on the home page. You can add up to 3 slides.</p>
      </div>
      
      <HeroSlideManager />
    </div>
  );
}
