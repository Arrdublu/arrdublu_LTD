'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { ChevronDown, Check, Send, ArrowRight, Play, Award, Globe, Video, Hexagon } from 'lucide-react'
import HeroCanvas from '@/components/home/HeroCanvas'
import HeroCarousel from '@/components/home/HeroCarousel'
import PortfolioSection from '@/components/home/PortfolioSection'
import VirtualProductionShowcase from '@/components/work/VirtualProductionShowcase'
import { ClientLogos } from '@/components/home/ClientLogos'
import Link from 'next/link'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name must be under 50 characters." }),
  email: z.string()
    .email({ message: "A valid email address is required." }),
  message: z.string()
    .min(10, { message: "Project details must be at least 10 characters." })
    .max(1000, { message: "Project details must be under 1000 characters." })
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
      <HeroCanvas 
        viewState={viewState} 
        activeIndex={activeNodeIndex}
        onNodeClick={setActiveNodeIndex}
      />

      <motion.div 
        className="fixed inset-0 pointer-events-none opacity-[0.15] z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 200]) }}
      />
      <div className="fixed inset-0 glow-glow-cyan pointer-events-none opacity-50" />
      <div className="fixed inset-0 glow-glow-gold pointer-events-none opacity-50" />

      <div className="fixed right-4 bottom-4 z-40 hidden lg:flex flex-col gap-2">
        <button
          onClick={() => triggerStateToggle('HERO')}
          className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase text-right border transition-all duration-300 cursor-pointer ${
            viewState === 'HERO'
              ? 'border-slate-400 bg-slate-900/60 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]'
              : 'border-slate-800 bg-slate-950/80 text-slate-500 hover:text-slate-300'
          }`}
        >
          [ INTRO ]
        </button>
        <button
          onClick={() => triggerStateToggle('PORTFOLIO')}
          className={`px-3 py-1.5 rounded font-mono text-[10px] tracking-wider uppercase text-right border transition-all duration-300 cursor-pointer ${
            viewState === 'PORTFOLIO'
              ? 'border-slate-400 bg-slate-900/60 text-white shadow-[0_0_10px_rgba(255,255,255,0.05)]'
              : 'border-slate-800 bg-slate-950/80 text-slate-500 hover:text-slate-300'
          }`}
        >
          [ WORK ]
        </button>
      </div>

      <motion.section 
        style={{ y: yHero }}
        animate={{ 
          opacity: viewState === 'HERO' ? 1 : 0.05,
          scale: viewState === 'HERO' ? 1 : 0.96,
          filter: viewState === 'HERO' ? 'blur(0px)' : 'blur(4px)'
        }}
        transition={{ duration: 0.5 }}
        className={`w-full min-h-screen flex flex-col justify-center items-center py-16 px-4 md:px-8 text-center z-10 relative overflow-hidden ${
          viewState === 'HERO' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <HeroCarousel triggerStateToggle={triggerStateToggle} />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors duration-200 select-none z-20"
          onClick={() => triggerStateToggle('PORTFOLIO')}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll to Explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce text-slate-300" />
        </motion.div>
      </motion.section>

      <section className="w-full bg-[#030608] border-t border-slate-900 py-24 px-4 md:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-light text-white tracking-tight mb-4">Studio Disciplines</h2>
            <p className="text-slate-400 max-w-2xl mx-auto font-light">Hands-on creative direction ensuring uncompromising vision from pre-production to final delivery.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-slate-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-500/50">
                <Video className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-sans font-medium text-white mb-3">Cinematic Production</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">High-end 6K commercial photography and video. Meticulously directed and graded to match premium brand standards.</p>
              <Link href="/service/cinematic-production" className="font-sans text-xs text-white tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-slate-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-500/50">
                <Award className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-sans font-medium text-white mb-3">Luxury Identity</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">Elite brand curation and personal branding for high-net-worth individuals, athletes, and premium hospitality.</p>
              <Link href="/service/luxury-identity" className="font-sans text-xs text-white tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-slate-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-500/50">
                <Hexagon className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-sans font-medium text-white mb-3">Virtual Production</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">Next-gen Unreal Engine 5 environments and curved LED stage shoots for reality-bending narratives.</p>
              <Link href="/service/virtual-production" className="font-sans text-xs text-white tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="glass-panel p-8 rounded-xl border border-slate-800/60 hover:border-slate-500/30 transition-colors group">
              <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center mb-6 border border-slate-800 group-hover:border-slate-500/50">
                <Globe className="w-5 h-5 text-slate-300" />
              </div>
              <h3 className="text-lg font-sans font-medium text-white mb-3">Cognitive SEO</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6 font-light">Algorithmic dominance frameworks and advanced search architectures to own the digital conversation.</p>
              <Link href="/service/cognitive-seo" className="font-sans text-xs text-white tracking-widest uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                Explore <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight Section */}
      <section className="w-full bg-[#05080a] py-24 px-4 md:px-8 relative z-20 border-y border-slate-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full relative">
            <div className="aspect-[3/4] w-full rounded-sm overflow-hidden bg-slate-900 border border-slate-800 relative">
              {/* Replace with actual founder image, using placeholder style for now */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80 mix-blend-luminosity"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-transparent to-transparent"></div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-slate-400" /> Director-Led Studio
            </div>
            <h3 className="text-3xl md:text-5xl font-display font-light text-white leading-tight">
              A Personal Commitment <br /> to <span className="font-serif italic text-slate-300">Creative Excellence.</span>
            </h3>
            <p className="text-slate-400 leading-relaxed font-light text-lg">
              "At Arrdublu, we don't hand your project off to junior teams. I personally direct and oversee every phase of production—from the initial lighting setups on our LED stages to the final 6K color grade."
            </p>
            <p className="text-slate-500 leading-relaxed font-light text-sm">
              — Ramone Wynter, Founder & Creative Director
            </p>
            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-widest text-white hover:text-slate-300 transition-colors border-b border-slate-700 hover:border-slate-400 pb-1"
              >
                Read the Director's Vision <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

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

      <section id="contact" className="w-full bg-[#030608] py-24 px-4 md:px-8 relative z-20 border-t border-slate-900">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">
          
          <div className="flex-1">
            <h3 className="text-3xl md:text-5xl font-display font-light tracking-tight text-white mb-6">
              Let's Discuss <br /> Your Vision.
            </h3>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10 font-light">
              We partner with visionary brands, hospitality leaders, and high-profile individuals to create work that resonates. Reach out to schedule a private consultation with our Director.
            </p>
            <div className="space-y-6 font-sans text-sm text-slate-400 font-light">
              <div>
                <h4 className="text-white font-medium mb-1 uppercase tracking-widest text-xs">Studio Location</h4>
                <p>Kingston, Jamaica</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 uppercase tracking-widest text-xs">Direct Inquiries</h4>
                <p className="text-slate-300">hi@arrdublu.us</p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-1 uppercase tracking-widest text-xs">Availability</h4>
                <p className="text-slate-300">Accepting select projects</p>
              </div>
            </div>
          </div>

          <div className="flex-1 glass-panel p-8 md:p-10 rounded-sm relative border border-slate-800/50 bg-[#020304]/80 backdrop-blur">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleFormSubmit}
                  className="space-y-6"
                >
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-name" className="font-sans text-xs text-slate-400 uppercase tracking-widest">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formInput.name}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                      className={`px-4 py-3 bg-slate-900/50 border-b rounded-none text-slate-100 font-sans text-sm focus:outline-none transition-colors duration-200 ${
                        formErrors.name 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-slate-800 focus:border-slate-400'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-xs font-sans text-red-400 mt-1">
                        {formErrors.name}
                      </span>
                    )}
                  </div>
                    
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-email" className="font-sans text-xs text-slate-400 uppercase tracking-widest">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      value={formInput.email}
                      onChange={handleFormChange}
                      placeholder="Your email address"
                      className={`px-4 py-3 bg-slate-900/50 border-b rounded-none text-slate-100 font-sans text-sm focus:outline-none transition-colors duration-200 ${
                        formErrors.email 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-slate-800 focus:border-slate-400'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-xs font-sans text-red-400 mt-1">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-message" className="font-sans text-xs text-slate-400 uppercase tracking-widest">
                      Project Details
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={4}
                      value={formInput.message}
                      onChange={handleFormChange}
                      placeholder="Tell us about your project goals and timeline..."
                      className={`px-4 py-3 bg-slate-900/50 border-b rounded-none text-slate-100 font-sans text-sm focus:outline-none transition-colors duration-200 resize-none ${
                        formErrors.message 
                          ? 'border-red-500/50 focus:border-red-500' 
                          : 'border-slate-800 focus:border-slate-400'
                      }`}
                    />
                    {formErrors.message && (
                      <span className="text-xs font-sans text-red-400 mt-1">
                        {formErrors.message}
                      </span>
                    )}
                  </div>

                  <button
                    id="contact-submit-button"
                    type="submit"
                    className="w-full py-4 rounded-sm bg-white hover:bg-slate-200 text-slate-950 font-sans text-sm uppercase tracking-widest font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    Send Inquiry
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="py-16 flex flex-col justify-center items-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full border border-slate-700 bg-slate-900/50 text-white flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-sans text-lg text-white font-medium mb-2">
                      Inquiry Received
                    </h4>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto leading-relaxed font-light">
                      Thank you for reaching out. Director Ramone Wynter or a member of our team will be in touch shortly.
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
