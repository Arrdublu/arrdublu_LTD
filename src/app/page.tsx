'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { Cpu, Eye, Globe, ChevronDown, Check, Send, Sparkles, MessageCircleCode, Terminal } from 'lucide-react'
import HeroCanvas from '@/components/home/HeroCanvas'
import PortfolioSection from '@/components/home/PortfolioSection'
import VirtualProductionShowcase from '@/components/work/VirtualProductionShowcase'

export default function Home() {
  const [viewState, setViewState] = useState<'HERO' | 'PORTFOLIO'>('HERO')
  const [activeNodeIndex, setActiveNodeIndex] = useState<number | null>(null)

  // Dynamic AI HUD overlays and coordinate telemetry tracking
  const [telemetry, setTelemetry] = useState({
    vA: { x: '3.195', y: '1.298', z: '-0.384' },
    vB: { x: '-0.822', y: '2.441', z: '1.034' },
    vC: { x: '1.492', y: '-1.890', z: '0.628' },
    scanPass: 8122,
    bufferRate: '104.29 Gbps',
    microsecondClock: '00:00:00'
  })
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const trackMouse = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', trackMouse)

    const interval = setInterval(() => {
      setTelemetry(prev => {
        const drift = () => (Math.random() * 0.08 - 0.04)
        const parseNum = (val: string) => {
          const parsed = parseFloat(val) + drift()
          return (parsed > 5 ? 2.5 : parsed < -5 ? -2.5 : parsed).toFixed(3)
        }
        
        return {
          vA: { x: parseNum(prev.vA.x), y: parseNum(prev.vA.y), z: parseNum(prev.vA.z) },
          vB: { x: parseNum(prev.vB.x), y: parseNum(prev.vB.y), z: parseNum(prev.vB.z) },
          vC: { x: parseNum(prev.vC.x), y: parseNum(prev.vC.y), z: parseNum(prev.vC.z) },
          scanPass: prev.scanPass + Math.floor(Math.random() * 3) + 1,
          bufferRate: (104 + Math.random() * 0.8).toFixed(2) + ' Gbps',
          microsecondClock: new Date().toTimeString().split(' ')[0] + '.' + String(new Date().getMilliseconds()).padStart(3, '0')
        }
      })
    }, 150)

    return () => {
      window.removeEventListener('mousemove', trackMouse)
      clearInterval(interval)
    }
  }, [])
  
  // Form status state
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false)
  const [formInput, setFormInput] = useState({ name: '', email: '', message: '' })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formInput.email) return
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormInput({ name: '', email: '', message: '' })
    }, 4500)
  }

  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 1], [0, -600])
  const yPortfolio = useTransform(scrollYProgress, [0, 1], [0, -300])
  const yDetails = useTransform(scrollYProgress, [0, 1], [0, -150])

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
      <div className="fixed inset-0 glow-glow-cyan pointer-events-none" />
      <div className="fixed inset-0 glow-glow-gold pointer-events-none" />

      {/* 2. Sleek Modern Cyberpunk Header */}
      <header className="sticky top-0 w-full z-40 border-b border-cyan-500/10 bg-[#020304]/80 backdrop-blur-md px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1 rounded bg-slate-950/60 border border-cyan-400/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]">
            <span className="font-mono text-sm font-black tracking-tighter text-cyan-400">AA</span>
          </div>
          <div>
            <h1 className="text-sm font-sans font-medium tracking-[0.18em] uppercase text-slate-100">ARRDUBLU</h1>
            <p className="text-[9px] font-mono text-cyan-400 tracking-wider font-semibold uppercase leading-none">GRID // MASTER_ACTIVE</p>
          </div>
        </div>

        {/* Branding status lines */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[10px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            SYS_LATENCY: 1.2MS
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[10px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            NODE_LINK: ESTABLISHED
          </div>
        </div>

        <div>
          <a
            href="#contact"
            className="px-4 py-1.5 rounded border border-cyan-400/30 hover:border-cyan-400 bg-cyan-950/20 hover:bg-cyan-950/40 font-mono text-xs text-cyan-400 tracking-wider uppercase transition-all duration-300 shadow-[0_0_15px_rgba(0,240,255,0.05)] cursor-pointer"
          >
            Initiate Connection
          </a>
        </div>
      </header>

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
          [ HERO_CORE ]
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

      {/* 3. Hero Visual Presentation Layer (Text & Subheadings) */}
      <motion.section 
        style={{ y: yHero }}
        animate={{ 
          opacity: viewState === 'HERO' ? 1 : 0.05,
          scale: viewState === 'HERO' ? 1 : 0.96,
          filter: viewState === 'HERO' ? 'blur(0px)' : 'blur(4px)'
        }}
        transition={{ duration: 0.5 }}
        className={`w-full flex-1 flex flex-col justify-center items-center py-16 px-4 md:px-8 max-w-7xl mx-auto text-center z-10 relative ${
          viewState === 'HERO' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        
        {/* Flanking AI-Inspired HUD Telemetry Containers (Desktop) */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 w-60 font-mono text-[10px] text-slate-500 border border-slate-900/50 p-4 rounded-lg bg-[#020304]/80 backdrop-blur-md pointer-events-auto h-auto select-none text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-cyan-400 font-semibold uppercase tracking-wider">[ SCANNER_CORE_A ]</span>
            <span className="animate-ping w-2 h-2 rounded-full bg-cyan-400" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">ALPHA_CLUSTER_NODE_V1</p>
              <p className="font-semibold text-slate-300 font-mono">X: <span className="text-cyan-400">{telemetry.vA.x}</span></p>
              <p className="font-semibold text-slate-300 font-mono">Y: <span className="text-cyan-400">{telemetry.vA.y}</span></p>
              <p className="font-semibold text-slate-300 font-mono">Z: <span className="text-cyan-400">{telemetry.vA.z}</span></p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">BETA_CLUSTER_NODE_V2</p>
              <p className="font-semibold text-slate-400 font-mono">X: <span className="text-amber-500">{telemetry.vB.x}</span></p>
              <p className="font-semibold text-slate-400 font-mono">Y: <span className="text-amber-500">{telemetry.vB.y}</span></p>
              <p className="font-semibold text-slate-400 font-mono">Z: <span className="text-amber-500">{telemetry.vB.z}</span></p>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[9px] text-slate-500 space-y-1">
              <p className="flex justify-between"><span>SYS_STABILITY:</span> <span className="text-emerald-400">100%</span></p>
              <p className="flex justify-between"><span>COMPILER:</span> <span className="text-slate-400">WORKER_0</span></p>
            </div>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5 w-60 font-mono text-[10px] text-slate-500 border border-slate-900/50 p-4 rounded-lg bg-[#020304]/80 backdrop-blur-md pointer-events-auto h-auto select-none text-left shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-900 pb-2">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">[ ANALYST_GATE_B ]</span>
            <span className="w-2 h-2 bg-amber-400 rounded-sm" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">GAMMA_CLUSTER_NODE_V3</p>
              <p className="font-semibold text-slate-300 font-mono">X: <span className="text-violet-400">{telemetry.vC.x}</span></p>
              <p className="font-semibold text-slate-300 font-mono">Y: <span className="text-violet-400">{telemetry.vC.y}</span></p>
              <p className="font-semibold text-slate-300 font-mono">Z: <span className="text-violet-400">{telemetry.vC.z}</span></p>
            </div>
            <div>
              <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">SYSTEM_COMPILER_LOG</p>
              <div className="bg-slate-950/90 rounded border border-slate-900 p-2 font-mono text-[8px] text-cyan-500 space-y-1 leading-normal overflow-hidden max-h-24">
                <p className="text-amber-400 animate-pulse">&gt; SYS_MORPH_OK_702</p>
                <p>&gt; RENDERING_GLSL_PASS</p>
                <p>&gt; BUF_SWAP: {telemetry.scanPass}</p>
                <p className="text-slate-600">&gt; FRAME_LATCH_ACTIVE</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-900 text-[9px] text-slate-500 space-y-1">
              <p className="flex justify-between"><span>CAM_FOCUS:</span> <span className="text-cyan-400">AUTO_LATCH</span></p>
              <p className="flex justify-between"><span>LINKED_SVR:</span> <span className="text-slate-400">ACTIVE_3000</span></p>
            </div>
          </div>
        </div>

        {/* Simulated general system header bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.7 }}
          className="mb-6 flex items-center gap-2 px-3 py-1 bg-slate-950/80 border border-slate-900 rounded-full shadow-inner select-none font-mono"
        >
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[10px] tracking-[0.2em] uppercase text-cyan-400">
            Arrdublu Media Synthesizer // Online
          </span>
        </motion.div>

        {/* Massive Machined Display Typography Container */}
        <div className="relative w-full flex flex-col items-center select-none py-10 px-6 sm:px-10 border border-cyan-500/10 rounded-xl bg-[#020304]/40 backdrop-blur-sm shadow-[inset_0_0_40px_rgba(0,240,255,0.03)] border-neon-cyan max-w-4xl mx-auto overflow-hidden my-4 group">
          {/* Corner Accents mirroring high-precision optical cameras */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 opacity-60" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 opacity-60" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 opacity-60" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 opacity-60" />

          {/* Dynamic Laser Scanning Line Overlay */}
          <div className="absolute left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.8)] opacity-45 pointer-events-none laser-scanning-line" />

          {/* Top Bounding Telemetry Ticker inside the main typography container */}
          <div className="w-full flex justify-between items-center font-mono text-[9px] text-slate-500 mb-8 tracking-widest uppercase border-b border-slate-900 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-cyan-400 animate-ping rounded-full" />
              <span>TARGET_GEO_LOCK: MULTIPLEX_CLUSTER</span>
            </div>
            <div className="hidden sm:block text-slate-400">
              <span>CURSOR: X_{mouseCoords.x}PX // Y_{mouseCoords.y}PX</span>
            </div>
            <div>
              <span>REF_PASS: #{telemetry.scanPass}</span>
            </div>
          </div>

          {/* Massively Oversized Milled Headings */}
          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter text-white leading-none text-center uppercase"
          >
            UNPARALLELED
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
            className="font-display font-black text-[10vw] sm:text-7xl md:text-8xl lg:text-[6.8rem] tracking-tight leading-none text-center text-transparent [-webkit-text-stroke:1.5px_rgba(0,240,255,0.75)] hover:text-cyan-400/10 transition-all duration-300 py-2 sm:py-0 select-none cursor-default"
          >
            CREATIVE
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-slate-100 to-amber-300 leading-none text-center uppercase drop-shadow-lg"
          >
            DOMINANCE
          </motion.h1>

          {/* Bottom Framing Telemetry Data strings */}
          <div className="w-full flex justify-between items-center font-mono text-[9px] text-slate-500 mt-8 tracking-widest uppercase border-t border-slate-900 pt-3">
            <div>
              <span>BUFFER: {telemetry.bufferRate}</span>
            </div>
            <div className="hidden sm:block text-slate-400">
              <span>SIGMA_ACCURACY: 99.9873%</span>
            </div>
            <div>
              <span>CLOCK_L_U: {telemetry.microsecondClock}</span>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl leading-relaxed font-sans"
        >
          We construct exquisite media environments, orchestrate dominant cognitive search systems, and craft luxury campaigns representing true authority.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-xs sm:max-w-md relative z-30 pointer-events-auto"
        >
          <motion.button
            onClick={() => triggerStateToggle('PORTFOLIO')}
            className="w-full sm:w-auto px-8 py-3 rounded-md bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.3)] shadow-[0_4px_12px_rgba(0,240,255,0.1)] cursor-pointer"
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.98 }}
          >
            Access Portfolio
          </motion.button>
          <motion.a
            href="#details"
            className="w-full sm:w-auto px-8 py-3 rounded-md border border-slate-700 bg-slate-950/60 hover:bg-slate-900/60 hover:text-white font-mono text-xs uppercase tracking-wider text-slate-300 transition-all duration-300 cursor-pointer text-center"
            whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
            whileTap={{ scale: 0.98 }}
          >
            Learn Architecture
          </motion.a>
        </motion.div>

        {/* Scroll Indicator helper */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors duration-200 select-none"
          onClick={() => triggerStateToggle('PORTFOLIO')}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.25em]">Scroll to Morph</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </motion.div>
      </motion.section>

      {/* 4. Portfolio Section Trigger */}
      <motion.section 
        style={{ y: yPortfolio }}
        id="portfolio-section" 
        animate={{ 
          opacity: viewState === 'PORTFOLIO' ? 1 : 0.15,
          scale: viewState === 'PORTFOLIO' ? 1 : 0.98,
          filter: viewState === 'PORTFOLIO' ? 'blur(0px)' : 'blur(4px)'
        }}
        transition={{ duration: 0.5 }}
        className={`w-full min-h-screen flex flex-col justify-center relative py-16 z-20 ${
          viewState === 'PORTFOLIO' ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <PortfolioSection 
          activeIndex={activeNodeIndex} 
          setActiveIndex={setActiveNodeIndex} 
        />
      </motion.section>

      {/* 5. Supplemental Detail Section */}
      <section id="details" className="w-full bg-[#030608]/90 border-t border-slate-950 py-24 px-4 md:px-8 relative z-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-1.5 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="font-mono text-xs tracking-wider uppercase text-amber-400">
              Technical Curation
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-sans font-medium tracking-tight text-white mb-10 leading-tight">
            Designed for those who understand <br />
            and demand technical perfection.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-400 text-sm md:text-base leading-relaxed">
            <div>
              <p className="mb-6">
                Arrdublu does not manufacture commodity agency outputs. We assemble engineered systems. We approach branding and production as technologists in a digitized environment. Every pixel, layout speed index, domain markup hierarchy, and light interaction is customized for the target audience profile.
              </p>
              <p>
                From capturing premium campaigns with extreme dynamics range RED cinema modules to crafting structural content search architectures that override traditional search index bounds, our operational capabilities prove our complete technical command of modern media.
              </p>
            </div>
            
            <div className="glass-panel p-6 rounded-lg border border-slate-800/40 relative">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-900">
                <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">System Parameters</span>
                <span className="font-mono text-[9px] px-2 py-0.5 bg-cyan-950/40 border border-cyan-400/20 text-cyan-400 rounded">v2.96_active</span>
              </div>
              <ul className="space-y-3 font-mono text-xs">
                <li className="flex justify-between">
                  <span className="text-slate-500">[01] RENDER_PIPELINE</span>
                  <span className="text-cyan-400">WebGL / GLSL Shaders</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">[02] UI_FRAMEWORK</span>
                  <span className="text-slate-300">Next.js 15 App Router</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">[03] GRAPH_GEOMETRIES</span>
                  <span className="text-cyan-400">Linear Lerped Clusters</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">[04] ANIM_CONTROLLERS</span>
                  <span className="text-slate-300">Framer Motion Active Core</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-500">[05] CORE_HOSTING</span>
                  <span className="text-cyan-400">Optimized Cloud Run Node</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <VirtualProductionShowcase />

      {/* 6. High-Tech Cyber Contact Form Section */}
      <section id="contact" className="w-full bg-[#020304] border-t border-cyan-500/10 py-24 px-4 md:px-8 relative z-20">
        <div className="max-w-3xl mx-auto cyber-corner glass-panel p-8 rounded-xl relative">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 border border-slate-900 rounded font-mono text-[9px] text-slate-500">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            SECURE_PORT: 3000
          </div>

          <div className="text-center sm:text-left mb-8">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2">
              <MessageCircleCode className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs tracking-wider uppercase text-cyan-400">Secure Uplink Portal</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-white mb-2">
              Initiate Dynamic Project Scoping
            </h3>
            
            <p className="text-slate-400 text-xs md:text-sm">
              Transmit your technical details directly to our creative technology engineering lead.
            </p>
          </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                      Operator Identifier
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      value={formInput.name}
                      onChange={handleFormChange}
                      placeholder="e.g., Lead Strategist"
                      className="px-4 py-3 bg-slate-950/60 border border-slate-900 rounded focus:border-cyan-500/50 text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                    />
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
                      className="px-4 py-3 bg-slate-950/60 border border-slate-900 rounded focus:border-cyan-500/50 text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                    Project Specifications // Intent
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    value={formInput.message}
                    onChange={handleFormChange}
                    placeholder="Describe target requirements, visibility parameters, scope or aesthetic intent..."
                    className="px-4 py-3 bg-slate-950/60 border border-slate-900 rounded focus:border-cyan-500/50 text-slate-100 font-sans text-xs focus:outline-none transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  id="contact-submit-button"
                  type="submit"
                  className="w-full py-3 rounded bg-gradient-to-r from-cyan-400 to-cyan-500 border border-cyan-400/50 hover:from-cyan-300 hover:to-cyan-400 text-slate-950 font-mono text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.95] active:brightness-90 select-none"
                >
                  <Send className="w-3.5 h-3.5" />
                  Transmit Specification Packet
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
                <div className="w-12 h-12 rounded-full border border-green-500/30 bg-green-950/30 text-green-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.1)]">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-mono text-sm uppercase tracking-wider text-green-400">
                    Transmission Complete // Packet Received
                  </h4>
                  <p className="text-slate-400 text-xs mt-2 max-w-sm mx-auto leading-relaxed">
                    Uplink code established successfully. Our creative technologist will parse your parameters and initiate a secure video link shortly.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  )
}
