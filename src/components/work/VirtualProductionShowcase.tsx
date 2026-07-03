'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Laptop } from 'lucide-react'

export default function VirtualProductionShowcase() {
  return (
    <section className="w-full bg-[#020304] border-t border-cyan-500/10 py-24 px-4 md:px-8 relative z-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs tracking-wider uppercase text-cyan-400">
                Virtual Production & Real-Time Displays
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white mb-6">
              Engineering Immersive <br />
              Digital Environments.
            </h3>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              We leverage cutting-edge real-time engines to create seamlessly integrated virtual sets. Our mastery over curved LED stages allows for unprecedented depth, lighting, and interactivity in your visual productions.
            </p>
            <ul className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8 space-y-3 border-l-2 border-cyan-500/30 pl-4">
              <li><strong className="text-cyan-400 font-mono font-medium">12-bit Blackmagic RAW:</strong> Absolute fidelity capturing every photon of dynamic range for seamless grading.</li>
              <li><strong className="text-cyan-400 font-mono font-medium">UE5 Color Integration:</strong> Unrestricted color science compatibility mapping directly into virtual volumes.</li>
              <li><strong className="text-cyan-400 font-mono font-medium">High-Bandwidth Processing:</strong> Native SSD recording formats allowing blistering on-set edit turnarounds.</li>
            </ul>
            <div className="grid grid-cols-2 gap-4 font-mono text-[10px] uppercase tracking-wider">
              <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-slate-300">
                Unreal Engine 5 Integration
              </div>
              <div className="bg-slate-900/50 p-3 rounded border border-slate-800 text-slate-300">
                Curved LED Stage Logic
              </div>
            </div>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Unreal Engine Aesthetics Visualization */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950 via-slate-900 to-amber-950/20" />
            <div className="absolute inset-0 flex items-center justify-center opacity-70">
              <div className="w-[80%] h-[60%] border-l-4 border-r-4 border-t-2 border-cyan-400/50 rounded-t-[4rem] rounded-b-lg p-2 bg-gradient-to-b from-cyan-900/20 to-transparent">
                  <div className="w-full h-full border border-cyan-400/20 rounded-t-[3rem] rounded-b-lg bg-cyan-950/30 flex items-center justify-center">
                     <span className="text-cyan-400/50 font-mono text-sm tracking-widest">REAL_TIME_RENDER_ACTIVE</span>
                  </div>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 p-2 bg-black/60 rounded backdrop-blur">
                <Laptop className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
