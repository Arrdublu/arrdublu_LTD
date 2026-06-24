
"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const HeroSlider = dynamic(() => import('@/components/home/HeroSlider').then(mod => mod.HeroSlider), {
  ssr: false,
  loading: () => <div className="h-[60vh] md:h-[80vh] bg-muted animate-pulse" />
});

const KeywordFilter = dynamic(() => import('@/components/services/KeywordFilter').then(mod => mod.KeywordFilter), {
  ssr: false,
  loading: () => <div className="h-10 w-full bg-muted animate-pulse rounded-full mb-12" />
});

const Recommendations = dynamic(() => import('@/components/services/Recommendations').then(mod => mod.Recommendations), {
  ssr: false,
  loading: () => <div className="h-40 bg-muted animate-pulse" />
});

export function HomePageClient() {
  return (
    <>
      <section className="h-[60vh] md:h-[80vh] w-full relative">
        <Suspense fallback={<div className="h-[60vh] md:h-[80vh] bg-muted animate-pulse" />}>
          <HeroSlider />
        </Suspense>
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white p-4">
            <div className="relative z-10">
                <h1 className="text-4xl md:text-7xl font-headline font-bold drop-shadow-md">
                    Elevate Your Vision
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-sm">
                    Exquisite media services for the discerning client. Unparalleled quality in SEO, creative, and lifestyle content.
                </p>
            </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Suspense fallback={<div className="h-10 w-full bg-muted animate-pulse rounded-full mb-12" />}>
          <KeywordFilter />
        </Suspense>
      </div>

      {/* Recommendations will be rendered at the bottom, but we define it here to be part of the client flow if needed, or we can move it to a separate client component at the bottom of page.tsx */}
    </>
  );
}

export function RecommendationsClient() {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<div className="h-40 bg-muted animate-pulse" />}>
                <Recommendations />
            </Suspense>
        </div>
    )
}
