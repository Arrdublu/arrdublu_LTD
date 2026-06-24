'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Cpu, Eye, Globe, Sparkles, X } from 'lucide-react'

interface PortfolioNode {
  title: string
  subtitle: string
  description: string
  accent: 'cyan' | 'gold' | 'dual'
  metrics: { label: string; value: string }[]
  tags: string[]
  details: string[]
}

const PORTFOLIO_NODES: PortfolioNode[] = [
  {
    title: 'Holographic Creative Production',
    subtitle: 'High-Fidelity Cinema & Brand Storytelling',
    description: 'Fusing bespoke commercial photography, digital motion capture, and state-of-the-art camera dynamics. We produce cinematic, eye-catching visual content for brands demanding absolute technical precision.',
    accent: 'cyan',
    metrics: [
      { label: 'Resolution Core', value: '8K RED V-Raptor' },
      { label: 'Capture Velocity', value: '120fps Native' },
      { label: 'Visual Impact', value: '+300% Organic CTR' }
    ],
    tags: ['Cinema', 'Branded Media', 'High-Fidelity Capture', 'Post-FX'],
    details: [
      'Bespoke production environments customized around product geometry and light reflections.',
      'Advanced color grading pipelines calibrated for deep contrast displays.',
      'Spatially optimized story structures engineered for rapid audience capture.',
      'Proprietary high-speed robotics integration for pristine camera sweeps.'
    ]
  },
  {
    title: 'Cognitive SEO & Digital Dominance',
    subtitle: 'Search Dominance & Organic Penetration',
    description: 'Deep market intelligence and semantic structure architecture designed to override competitor gravity. We don\'t optimize search matches; we project dominant content pipelines that sweep organic traffic.',
    accent: 'gold',
    metrics: [
      { label: 'Search Visibility', value: 'Top 0.1% Guaranteed' },
      { label: 'Latency Core', value: '100 SpeedScore' },
      { label: 'Organic Scale', value: '10x Multiplier' }
    ],
    tags: ['Algorithms', 'Structural Markup', 'Semantic Targeting', 'Rank Control'],
    details: [
      'Architectural parsing to conform with deep-learning semantic indexing search systems.',
      'High-velocity structural layouts boasting Google Lighthouse Perfect 100 SpeedScores.',
      'High-authority natural reference curation to establish domain dominance.',
      'Intent-mapping architectures bypassing standard keyword systems for deep-user capture.'
    ]
  },
  {
    title: 'Luxury Lifestyle & Elite Identity',
    subtitle: 'Personal Curation & Brand Equity Curation',
    description: 'Tailored digital identity production for ultra-high-net-worth brands, executives, and discerning personal campaigns. We synthesize elite photo captures with premium lifestyle optics to cement permanent cultural status.',
    accent: 'dual',
    metrics: [
      { label: 'Identity Focus', value: 'discerning Class' },
      { label: 'Brand Premium', value: 'discerning Segment' },
      { label: 'Engagement Index', value: 'Elite Core' }
    ],
    tags: ['Identity', 'Luxury Optics', 'Elite Styling', 'Status Campaigns'],
    details: [
      'Tailored portrait sessions reflecting professional sophistication and technical command.',
      'Bespoke visual content layouts tailored around high-luxury aesthetics.',
      'Curation guidelines emphasizing selective presence over volume slop.',
      'Confidential digital asset management systems ensuring complete security and alignment.'
    ]
  }
]

interface PortfolioSectionProps {
  activeIndex: number | null
  setActiveIndex: (index: number | null) => void
}

export default function PortfolioSection({ activeIndex, setActiveIndex }: PortfolioSectionProps) {
  const [showDetailDrawer, setShowDetailDrawer] = useState<boolean>(false)

  const handleNodeClick = (index: number) => {
    setActiveIndex(index)
    setShowDetailDrawer(true)
  }

  const handleCloseDrawer = () => {
    setShowDetailDrawer(false)
    setActiveIndex(null)
  }

  const handleInitiateLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (activeIndex === null) return
    
    const currentNode = PORTFOLIO_NODES[activeIndex]
    const title = currentNode.title
    const bullets = currentNode.details.map(d => `- ${d}`).join('\n')
    
    // Auto-populate the contact form's message field if it exists
    const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null
    if (messageField) {
      messageField.value = `Transmission Initiated: Requesting detailed specification review for division: "${title}".\n\n[Division Specs]\n${bullets}\n\n[Operator Notes]\n`
      // Dispatch input event so React state receives the string update
      const event = new Event('input', { bubbles: true })
      messageField.dispatchEvent(event)
    }

    // Close the drawer overlay
    handleCloseDrawer()

    // Smooth scroll down to the contact section with a timing buffer
    setTimeout(() => {
      const contactSec = document.getElementById('contact')
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }

  return (
    <div className="w-full relative z-10 py-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col justify-center min-h-[85vh]">
      <div className="mb-12 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center md:justify-start gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 text-neon-cyan" />
          <span className="font-mono text-xs tracking-wider uppercase text-cyan-400">
            Advanced Operational Divisions
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-sans font-medium tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent"
        >
          Our 3D Capability Matrix
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed"
        >
          Click any holographic cluster node to align the WebGL space and explore the advanced technological operational details of our agency.
        </motion.p>
      </div>

      {/* Grid of interactive holographic nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {PORTFOLIO_NODES.map((node, idx) => {
          const isSelected = activeIndex === idx
          const isAccentCyan = node.accent === 'cyan'
          const isAccentGold = node.accent === 'gold'
          const isAccentDual = node.accent === 'dual'

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                scale: isSelected ? 1.02 : 1,
              }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => handleNodeClick(idx)}
              className={`cyber-corner glass-panel cursor-pointer p-6 rounded-lg transition-shadow duration-300 flex flex-col justify-between group h-full relative ${
                isSelected 
                  ? 'border-cyan-400/80 shadow-2xl shadow-cyan-950/20' 
                  : 'hover:border-slate-500/30'
              } ${
                isAccentGold && isSelected ? 'border-amber-400/80 shadow-amber-950/20' : ''
              } ${
                isAccentDual && isSelected ? 'border-indigo-400/80' : ''
              }`}
            >
              {/* Subtle background glow when active */}
              {isSelected && (
                <div className={`absolute inset-0 -z-10 rounded-lg blur-2xl opacity-10 ${
                  isAccentCyan ? 'bg-[#00f0ff]' : isAccentGold ? 'bg-[#fbbf24]' : 'bg-gradient-to-r from-cyan-400 to-amber-400'
                }`} />
              )}

              <div>
                {/* Node indicator */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      isAccentCyan ? 'bg-[#00f0ff]' : isAccentGold ? 'bg-[#fbbf24]' : 'bg-gradient-to-r from-cyan-400 to-amber-400'
                    }`} />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      Node_0{idx + 1}
                    </span>
                  </div>
                  
                  {isAccentCyan ? (
                    <Eye className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform duration-200" />
                  ) : isAccentGold ? (
                    <Cpu className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform duration-200" />
                  )}
                </div>

                <h3 className={`text-xl font-sans font-medium tracking-tight mb-2 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'
                }`}>
                  {node.title}
                </h3>
                
                <p className="font-mono text-[11px] text-slate-500 mb-4 uppercase tracking-wider">
                  {node.subtitle}
                </p>

                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  {node.description}
                </p>

                {/* Tech Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-900 py-3 mb-6">
                  {node.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest leading-none mb-1">
                        {metric.label}
                      </p>
                      <p className={`text-xs font-sans font-semibold leading-none ${
                        isAccentCyan ? 'text-cyan-400' : isAccentGold ? 'text-amber-400' : 'text-purple-400'
                      }`}>
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {node.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 bg-slate-950/60 border border-slate-900 rounded font-mono text-[9px] text-slate-400 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 group/btn select-none pt-2">
                  <span className={`text-[11px] font-mono uppercase tracking-wider transition-all duration-200 ${
                    isAccentCyan ? 'text-cyan-400' : isAccentGold ? 'text-amber-400' : 'text-purple-400'
                  } group-hover:pr-1`}>
                    Analyze Structure
                  </span>
                  <ArrowRight className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    isAccentCyan ? 'text-cyan-400' : isAccentGold ? 'text-amber-400' : 'text-purple-400'
                  } group-hover/btn:translate-x-1`} />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center md:text-left">
        <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
          Secure Grid Interface | Operational Control Center v2.96
        </p>
      </div>

      {/* Cyber Drawer Overlay for detailed analysis */}
      <AnimatePresence>
        {showDetailDrawer && activeIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/65 backdrop-blur-md">
            {/* Click backdrop to exit */}
            <div className="absolute inset-0" onClick={handleCloseDrawer} />

            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`w-full max-w-lg h-[90vh] md:h-full rounded-xl overflow-y-auto p-6 md:p-8 flex flex-col justify-between border relative ${
                PORTFOLIO_NODES[activeIndex].accent === 'cyan' 
                  ? 'glass-panel border-cyan-400/40 shadow-2xl shadow-cyan-950/20' 
                  : PORTFOLIO_NODES[activeIndex].accent === 'gold'
                  ? 'glass-panel-gold border-amber-400/40 shadow-amber-950/20'
                  : 'glass-panel border-purple-400/40 shadow-purple-950/10'
              }`}
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseDrawer}
                className="absolute top-4 right-4 p-2 rounded-full border border-slate-900 bg-slate-950 hover:bg-slate-900 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-4 h-4 text-slate-400 hover:text-white" />
              </button>

              <div>
                <div className="flex items-center gap-1.5 mb-6">
                  <span className={`w-2 h-2 rounded-full ${
                    PORTFOLIO_NODES[activeIndex].accent === 'cyan' ? 'bg-[#00f0ff]' : PORTFOLIO_NODES[activeIndex].accent === 'gold' ? 'bg-[#fbbf24]' : 'bg-gradient-to-r from-cyan-400 to-amber-400'
                  }`} />
                  <span className="font-mono text-xs tracking-wider uppercase text-slate-400">
                    Analytical Breakdown // Node_0{activeIndex + 1}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-sans font-medium tracking-tight text-white mb-2">
                  {PORTFOLIO_NODES[activeIndex].title}
                </h3>
                
                <p className="font-mono text-xs text-slate-400 mb-6 uppercase tracking-wider">
                  {PORTFOLIO_NODES[activeIndex].subtitle}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-8">
                  {PORTFOLIO_NODES[activeIndex].description}
                </p>

                {/* Technical Specifications */}
                <div>
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-900 pb-2">
                    Operational Specs & Target Architecture
                  </h4>
                  <ul className="space-y-4">
                    {PORTFOLIO_NODES[activeIndex].details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-3">
                        <span className={`text-xs font-mono mt-1 ${
                          PORTFOLIO_NODES[activeIndex].accent === 'cyan' ? 'text-cyan-400' : PORTFOLIO_NODES[activeIndex].accent === 'gold' ? 'text-amber-400' : 'text-purple-400'
                        }`}>
                          [0{dIdx + 1}]
                        </span>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action footer */}
              <div className="mt-8 pt-6 border-t border-slate-950 flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleCloseDrawer}
                  className="flex-1 px-4 py-2.5 rounded border border-slate-800 font-mono text-xs text-slate-300 hover:bg-slate-950 hover:text-white transition-colors duration-200 cursor-pointer text-center"
                >
                  Return to Grid [ESC]
                </button>
                <a 
                  href="#contact"
                  onClick={handleInitiateLink}
                  className={`flex-1 px-4 py-2.5 rounded font-mono text-xs text-center font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer text-slate-950 flex items-center justify-center gap-1.5 focus:outline-none group/action-btn ${
                    PORTFOLIO_NODES[activeIndex].accent === 'cyan' 
                      ? 'bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] active:scale-95' 
                      : PORTFOLIO_NODES[activeIndex].accent === 'gold'
                      ? 'bg-amber-400 hover:bg-amber-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] active:scale-95'
                      : 'bg-gradient-to-r from-cyan-400 to-amber-400 hover:brightness-110 active:scale-95 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                  }`}
                >
                  <span>Initiate Secure Link</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/action-btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
