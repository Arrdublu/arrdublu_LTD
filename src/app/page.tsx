'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Check, Send, MessageCircleCode, Terminal, ArrowRight, Play, Award, Shield, Globe } from 'lucide-react'
import HeroCanvas from '@/components/home/HeroCanvas'
import PortfolioSection from '@/components/home/PortfolioSection'
import VirtualProductionShowcase from '@/components/work/VirtualProductionShowcase'
import { ClientLogos } from '@/components/home/ClientLogos'
import Link from 'next/link'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Operator name must be at least 2 characters." })
    .max(50, { message: "Operator name must be under 50 characters." }),
  email: z.string()
    .email({ message: "A valid return network address (email) is required." }),
  message: z.string()
    .min(10, { message: "Project specifications must be at least 10 characters." })
    .max(1000, { message: "Project specifications must be under 1000 characters." })
})

export default function Home() {
  const [viewState, setViewState] = useState<'HERO' | 'PORTFOLIO'>('HERO')
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null)
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [formInput, setFormInput] = useState({ name: '', email: '', message: '' })
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({})

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const updatedInput = { ...formInput, [name]: value }
    setFormInput(updatedInput)

    // Immediate dynamic feedback
    try {
      const fieldSchema = contactSchema.pick({ [name]: true } as any)
      const result = fieldSchema.safeParse({ [name]: value })
      if (!result.success) {
        const formatted = result.error.format() as any
        setFormErrors(prev => ({ ...prev, [name]: formatted[name]?._errors[0] }))
      } else {
        setFormErrors(prev => {
          const next = { ...prev }
          delete next[name as keyof typeof next]
          return next
        })
      }
    } catch (err) {
      // ignore
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(formInput)
    if (!result.success) {
      const formatted = result.error.format()
      setFormErrors({
        name: formatted.name?._errors[0],
        email: formatted.email?._errors[0],
        message: formatted.message?._errors[0]
      })
      return
    }
    setFormErrors({})
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormInput({ name: '', email: '', message: '' })
    }, 4500)
  }

  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -400])

  // Automatic scroll transition trigger between Hero and Portfolio
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = window.innerHeight * 0.45

      if (scrollY >= threshold && viewState === 'HERO') {
        setViewState('PORTFOLIO')
      } else if (scrollY < threshold && viewState === 'PORTFOLIO') {
        setViewState('HERO')
        setActiveNodeIndex(null)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [viewState])

  const triggerStateToggle = (targetState: 'HERO' | 'PORTFOLIO') => {
    setViewState(targetState)
    if (targetState === 'HERO') {
      setActiveNodeIndex(null)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setTimeout(() => {
        const portfolioSection = document.getElementById('portfolio-section')
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }

  return (
    <main className="w-full min-h-screen bg-[#020304] text-slate-100 flex flex-col relative">
      {/* 1. Immersive WebGL Background */}
      <HeroCanvas 
        viewState={viewState} 
        activeIndex={activeNodeIndex}
        onNodeClick={setActiveNodeIndex}
      />

      {/* Subtle overlay ambient background grids or lighting filters */}
      <motion.div 
        className="fixed inset-0 pointer-events-none opacity-40 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
      />
      <div className="fixed inset-0 glow-glow-cyan pointer-events-none" />
      <div className="fixed inset-0 glow-glow-gold pointer-events-none" />

      {/* Grid status indicator for users */}
      <div className="fixed right-4 bottom-4 z-40 hidden lg:flex flex-col gap-2">
        <button
          onClick={() => triggerStateToggle('HERO')}
          className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase text-right border transition-all duration-300 cursor-pointer ${
            viewState === 'HERO'
              ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_10px_rgba(0,240,255,0.1)]'
              : 'border-slate-900 bg-slate-950/80 text-slate-500 hover:text-slate-300'
          }`}
        >
          [ HOME_CORE ]
        </button>
        <button
          onClick={() => triggerStateToggle('PORTFOLIO')}
          className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase text-right border transition-all duration-300 cursor-pointer ${
            viewState === 'PORTFOLIO'
              ? 'border-amber-400 bg-amber-950/40 text-amber-300 shadow-[0_0_10px_rgba(251,191,36,0.1)]'
              : 'border-slate-900 bg-slate-950/80 text-slate-500 hover:text-slate-300'
          }`}
        >
          [ PORTFOLIO_SPLIT ]
        </button>
      </div>

      {/* 2. Hero Visual Presentation Layer */}
      <motion.section 
        style={{ y: yHero }}
        animate={{ 
          opacity: viewState === 'HERO' ? 1 : 0.05,
          scale: viewState === 'HERO' ? 1 : 0.96,
          filter: viewState === 'HERO' ? 'blur(0px)' : 'blur(4px)'
        }}
        transition={{ duration: 0.5 }}
        className={`w-full min-h-[90vh] flex flex-col justify-center items-center py-16 px-4 md:px-8 max-w-7xl mx-auto text-center z-10 relative ${
          viewState === 'HERO' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8 flex items-center gap-2 px-4 py-1.5 bg-slate-950/80 border border-slate-800 rounded-full shadow-inner select-none font-mono"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-cyan-400">
            Kingston, Jamaica // Global Creative Engine
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="font-display font-black text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] tracking-tighter text-white leading-[0.9] text-center uppercase max-w-5xl"
        >
          CINEMATIC <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-slate-100 to-amber-300 drop-shadow-lg">DOMINANCE</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-slate-300 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed font-sans"
        >
          Arrdublu is a premium creative media agency specializing in <strong>Virtual Production</strong>, <strong>Cognitive SEO</strong>, and <strong>Elite Identity Curation</strong>. We engineer digital authority for the world's most ambitious brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center w-full relative z-30 pointer-events-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-3.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-sm uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 group"
          >
            Start a Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => triggerStateToggle('PORTFOLIO')}
            className="w-full sm:w-auto px-8 py-3.5 rounded border border-slate-700 bg-slate-950/60 hover:bg-slate-900/80 hover:border-slate-500 font-mono text-sm uppercase tracking-wider text-slate-300 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <Play className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            View Portfolio
          </button>
        </motion.div>

        {/* Scroll Indicator helper */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors duration-200 select-none"
          onClick={() => triggerStateToggle('PORTFOLIO')}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Explore Capabilities</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-cyan-400" />
        </motion.div>
      </motion.section>

      {/* 3. Core Services / Value Proposition Section */}
      <section className="w-full bg-[#030608] border-t border-slate-900 py-24 px-4 md:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-tight mb-4">Core Engineering</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">We deploy high-fidelity architectures designed to establish market dominance and captivate audiences globally.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Service 1 */}
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-cyan-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-cyan-500/50">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-3">Holographic Production</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Immersive WebGL experiences and 3D product visualizations that break standard browser limitations.</p>
              <Link href="/service/holographic-production" className="font-mono text-[10px] text-cyan-400 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Service 2 */}
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-amber-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-amber-500/50">
                <Award className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-3">Luxury Identity</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Elite brand curation, high-end storytelling, and identity systems designed for premium market positioning.</p>
              <Link href="/service/luxury-identity" className="font-mono text-[10px] text-amber-400 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Service 3 */}
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-violet-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-violet-500/50">
                <Globe className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-3">Cognitive SEO</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Algorithmic dominance frameworks and advanced search structures to own the digital conversation.</p>
              <Link href="/service/cognitive-seo" className="font-mono text-[10px] text-violet-400 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            {/* Service 4 */}
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-emerald-500/50">
                <Play className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-white mb-3">Virtual Production</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">Next-gen Unreal Engine 5 integrations and curved LED stage cinematic capture for reality-bending narratives.</p>
              <Link href="/service/virtual-production" className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Portfolio Section Trigger */}
      <section 
        id="portfolio-section" 
        className="w-full relative z-20 bg-[#020304]"
      >
        <PortfolioSection 
          activeIndex={activeNodeIndex} 
          setActiveIndex={setActiveNodeIndex} 
        />
      </section>

      <VirtualProductionShowcase />
      <ClientLogos />

      {/* 5. Trust Signals & Credentials */}
      <section className="w-full bg-[#030608]/90 border-y border-slate-900 py-20 px-4 md:px-8 relative z-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest">
              <Shield className="w-4 h-4" /> Trusted Authority
            </div>
            <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white leading-tight">
              Built in Jamaica. <br />
              Deployed Globally.
            </h3>
            <p className="text-slate-400 leading-relaxed">
              Arrdublu combines the vibrant, undeniable energy of the West Indies with ruthless technical precision. We don't just build websites; we engineer digital moats for luxury brands and enterprise tech firms.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
            <div className="p-6 border border-slate-800 bg-slate-900/50 rounded-lg text-center">
              <div className="text-3xl font-display font-bold text-white mb-1">100</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Lighthouse Perf</div>
            </div>
            <div className="p-6 border border-slate-800 bg-slate-900/50 rounded-lg text-center">
              <div className="text-3xl font-display font-bold text-white mb-1">8K</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">RED Cinema Capture</div>
            </div>
            <div className="p-6 border border-slate-800 bg-slate-900/50 rounded-lg text-center">
              <div className="text-3xl font-display font-bold text-white mb-1">UE5</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Virtual Stages</div>
            </div>
            <div className="p-6 border border-slate-800 bg-slate-900/50 rounded-lg text-center">
              <div className="text-3xl font-display font-bold text-white mb-1">24/7</div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Global Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. High-Tech Cyber Contact Form Section */}
      <section id="contact" className="w-full bg-[#020304] py-24 px-4 md:px-8 relative z-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
          
          <div className="flex-1">
            <div className="flex items-center gap-1.5 mb-4">
              <MessageCircleCode className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs tracking-wider uppercase text-cyan-400">Initiate Uplink</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-bold tracking-tight text-white mb-4 uppercase">
              Ready to <br /> Dominate?
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
              Transmit your technical details directly to our engineering lead. Whether it's a holographic web presence or a virtual production shoot, we respond with precision scoping.
            </p>
            <div className="space-y-4 font-mono text-xs text-slate-500">
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span>HEADQUARTERS</span>
                <span className="text-slate-300">Kingston, Jamaica</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span>SECURE COMMS</span>
                <span className="text-cyan-400">hello@arrdublu.com</span>
              </div>
              <div className="flex justify-between border-b border-slate-900 pb-2">
                <span>NETWORK STATUS</span>
                <span className="text-emerald-400">ACCEPTING PROJECTS</span>
              </div>
            </div>
          </div>

          <div className="flex-1 cyber-corner glass-panel p-8 rounded-xl relative border border-slate-800/50 bg-[#020304]/80 backdrop-blur">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-5"
                >
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      Operator Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formInput.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Lead Strategist"
                      className={`px-4 py-3 bg-slate-950/60 border rounded text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200 ${
                        formErrors.name 
                          ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                          : 'border-slate-900 focus:border-cyan-500/50'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 flex items-center gap-1 select-none">
                        <span>[!]</span> {formErrors.name}
                      </span>
                    )}
                  </div>
                    
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      Return Network Address (Email)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formInput.email}
                      onChange={handleFormChange}
                      placeholder="e.g., operator@network.com"
                      className={`px-4 py-3 bg-slate-950/60 border rounded text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200 ${
                        formErrors.email 
                          ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                          : 'border-slate-900 focus:border-cyan-500/50'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 flex items-center gap-1 select-none">
                        <span>[!]</span> {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-message" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      Project Specifications
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formInput.message}
                      onChange={handleFormChange}
                      placeholder="Describe target requirements, visibility parameters, scope or aesthetic intent..."
                      className={`px-4 py-3 bg-slate-950/60 border rounded text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200 resize-none ${
                        formErrors.message 
                          ? 'border-red-500/50 focus:border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.1)]' 
                          : 'border-slate-900 focus:border-cyan-500/50'
                      }`}
                    />
                    {formErrors.message && (
                      <span className="text-[10px] font-mono text-red-400 mt-1 flex items-center gap-1 select-none">
                        <span>[!]</span> {formErrors.message}
                      </span>
                    )}
                  </div>

                  <button
                    id="contact-submit-button"
                    type="submit"
                    className="w-full py-3.5 rounded bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-sm uppercase tracking-wider font-bold hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.95]"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Specifications
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-12 flex flex-col justify-center items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full border border-green-500/30 bg-green-950/30 text-green-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm uppercase tracking-wider text-green-400 font-bold mb-2">
                      Transmission Complete
                    </h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed">
                      Uplink established. Our creative technologist will parse your parameters and respond shortly.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  )
}
