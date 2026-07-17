'use client';

import React, { useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'motion/react';
import { HeroSlide, getHeroSlides } from '@/lib/firebase/hero-slides';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

export default function HeroCarousel({ triggerStateToggle }: { triggerStateToggle: (state: 'HERO' | 'PORTFOLIO') => void }) {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    getHeroSlides().then(fetched => {
      setSlides(fetched);
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();
  }, [emblaApi]);

  if (slides.length === 0) {
    // Fallback if no slides exist yet
    return (
      <div className="absolute inset-0 w-full h-full -z-10">
        <div className="absolute inset-0 bg-[#020304]/60 z-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020304] via-transparent to-[#020304]/40 z-10" />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-80"
        />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center relative z-20 w-full max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex items-center gap-2 px-4 py-1.5 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 rounded-full shadow-inner select-none font-mono"
          >
            <span className="w-2 h-2 rounded-full bg-slate-300" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300">
              Kingston, Jamaica // Global Creative Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] tracking-tight text-white leading-[1.1] text-center max-w-5xl"
          >
            Crafting Elite <br />
            <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 drop-shadow-sm">Digital Experiences</span>
          </motion.h1>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden" ref={emblaRef}>
      <div className="flex w-full h-full">
        {slides.map((slide, index) => (
          <div key={slide.id} className="relative flex-[0_0_100%] min-w-0 w-full h-full flex flex-col items-center justify-center text-center px-4 md:px-8">
            <div className="absolute inset-0 w-full h-full -z-10 bg-[#020304]">
              {/* Background gradient overlays if video or image exists */}
              {(slide.videoUrlDesktop || slide.videoUrlMobile || slide.backgroundImage) && (
                <>
                  <div className="absolute inset-0 bg-[#020304]/60 z-10 mix-blend-multiply" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020304] via-transparent to-[#020304]/40 z-10" />
                </>
              )}

              {slide.backgroundImage && (
                <img
                  src={slide.backgroundImage}
                  alt={slide.title || "Hero Slide Background"}
                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
              )}
              
              {slide.videoUrlDesktop && (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover hidden md:block opacity-80"
                >
                  <source src={slide.videoUrlDesktop} type="video/mp4" />
                </video>
              )}
              
              {slide.videoUrlMobile && (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover md:hidden opacity-80"
                >
                  <source src={slide.videoUrlMobile} type="video/mp4" />
                </video>
              )}
            </div>

            <div className="max-w-7xl mx-auto flex flex-col items-center justify-center relative z-20 w-full">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className={`mb-8 flex items-center gap-2 px-4 py-1.5 bg-slate-950/40 backdrop-blur-sm border border-slate-800/80 rounded-full shadow-inner select-none font-mono ${!slide.title ? 'opacity-0' : ''}`}
              >
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-300">
                  {slide.subtitle || 'Kingston, Jamaica // Global Creative Studio'}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="font-display font-light text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] tracking-tight text-white leading-[1.1] text-center max-w-5xl"
                dangerouslySetInnerHTML={{ __html: slide.title ? slide.title.replace(/\n/g, '<br />') : '' }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8 text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed font-sans font-light"
              >
                {slide.description}
              </motion.p>

              {slide.title && index === selectedIndex && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-12 flex flex-col sm:flex-row gap-6 items-center justify-center w-full relative z-30 pointer-events-auto"
                >
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-white hover:bg-slate-200 text-slate-950 font-sans text-sm uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Inquire Now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={() => triggerStateToggle('PORTFOLIO')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-sm border border-slate-600 bg-slate-900/40 backdrop-blur-sm hover:bg-slate-800 font-sans text-sm uppercase tracking-widest text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <Play className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
                    Selected Works
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
