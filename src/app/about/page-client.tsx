'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Video, Target, Camera } from 'lucide-react';
import { ClientLogos } from '@/components/home/ClientLogos';

export default function AboutDirectorClient() {
  return (
    <main className="w-full min-h-screen bg-[#020304] text-slate-100 flex flex-col pt-24 pb-16">
      {/* Header Section */}
      <section className="px-4 md:px-8 max-w-5xl mx-auto w-full pt-12 md:pt-20">
        <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-slate-400" /> The Director
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-light text-white tracking-tight leading-[1.1] mb-8">
          A Singular Vision. <br />
          <span className="font-serif italic text-slate-400">Uncompromising Execution.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl leading-relaxed font-light mb-12">
          "I founded Arrdublu because I saw a gap between grand creative ideas and the technical execution required to bring them to life. By remaining deeply involved in every project, I ensure the original vision survives the entire production pipeline."
        </p>
        <p className="text-sm font-sans uppercase tracking-widest text-slate-500 font-medium">
          — Ramone Wynter, Founder
        </p>
      </section>

      {/* Main Content & Image */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto w-full mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="aspect-[4/5] rounded-sm overflow-hidden bg-slate-900 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547621113-e4bb2a19bdd6?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020304] via-transparent to-transparent" />
          </div>

          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-display font-light text-white mb-4">The Hands-On Approach</h2>
              <p className="text-slate-400 leading-relaxed font-light">
                In an industry of outsourced post-production and disconnected creative teams, Arrdublu operates differently. Ramone is on set, operating the 6K Blackmagic cameras, tweaking the Unreal Engine lighting on our curved LED stages, and personally approving the final color grade. This isn't just about control; it's about a relentless commitment to craft.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Video className="w-6 h-6 text-slate-300" />
                <h3 className="font-sans font-medium text-white tracking-wide">Cinematography</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Deep expertise in cinematic capture, utilizing dual native ISO systems to paint with light and shadow.
                </p>
              </div>
              <div className="space-y-3">
                <Target className="w-6 h-6 text-slate-300" />
                <h3 className="font-sans font-medium text-white tracking-wide">Technical Direction</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Bridging the gap between physical sets and digital environments using real-time rendering.
                </p>
              </div>
              <div className="space-y-3">
                <Camera className="w-6 h-6 text-slate-300" />
                <h3 className="font-sans font-medium text-white tracking-wide">Art Direction</h3>
                <p className="text-sm text-slate-400 font-light leading-relaxed">
                  Crafting the visual narrative from the ground up, ensuring every frame aligns with the brand's premium identity.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-900">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-slate-950 font-sans text-xs uppercase tracking-widest font-medium rounded-sm hover:bg-slate-200 transition-colors"
              >
                Discuss a Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Process / How We Work */}
      <section className="w-full bg-[#030608] mt-32 py-24 border-y border-slate-900">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-4">Our Methodology</h2>
            <p className="text-slate-400 font-light">A streamlined, director-led process designed for clarity, impact, and elite results.</p>
          </div>

          <div className="space-y-12 relative">
            <div className="absolute left-6 top-6 bottom-6 w-px bg-slate-800 hidden md:block" />
            
            {[
              { num: '01', title: 'Consultation & Scoping', desc: 'Every engagement begins with a direct conversation with Ramone. We define the technical requirements, the aesthetic vision, and the specific market positioning we aim to achieve.' },
              { num: '02', title: 'Pre-Production & Architecture', desc: 'Whether it is a semantic SEO architecture or a virtual production storyboard, we lay out a meticulous blueprint. No assumptions are made; every detail is mapped.' },
              { num: '03', title: 'Hands-On Execution', desc: 'The studio shifts into high gear. Ramone personally directs the photography, leads the digital capture, and oversees the code deployment, ensuring the aesthetic is faithfully reproduced.' },
              { num: '04', title: 'Refinement & Delivery', desc: 'Premium color grading, rigorous performance testing, and final polishing. We deliver assets and experiences that are ready to dominate the market immediately upon launch.' }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 relative"
              >
                <div className="md:w-12 h-12 rounded-full bg-[#030608] border border-slate-700 flex items-center justify-center shrink-0 text-slate-300 font-sans text-xs tracking-widest relative z-10 md:-ml-6">
                  {step.num}
                </div>
                <div className="flex-1 glass-panel p-8 rounded-sm border border-slate-800 bg-[#020304]/50">
                  <h3 className="text-xl font-sans font-medium text-white mb-3 tracking-wide">{step.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-16">
        <ClientLogos />
      </div>
    </main>
  );
}
