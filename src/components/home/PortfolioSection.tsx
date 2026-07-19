'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowRight, Video, Eye, Globe, Sparkles, X } from 'lucide-react'

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
    title: 'Holographic & Creative Production',
    subtitle: 'High-Fidelity Cinema & Brand Storytelling',
    description: 'Fusing bespoke commercial photography, digital motion capture, and state-of-the-art camera dynamics. Directed personally by Ramone Wynter, ensuring absolute cinematic quality and technical precision.',
    accent: 'cyan',
    metrics: [
      { label: 'Quality Standard', value: '12K Cinematic' },
      { label: 'Color Science', value: 'Premium Grade' },
      { label: 'Oversight', value: 'Director-Led' }
    ],
    tags: ['Cinema', 'Branded Media', 'Photography', 'Art Direction'],
    details: [
      'Bespoke production environments customized around product geometry and light reflections.',
      'Advanced color grading pipelines calibrated for deep contrast displays.',
      'Spatially optimized story structures engineered for audience engagement.',
      'Hands-on direction from concept to final cut.'
    ]
  },
  {
    title: 'Cognitive SEO & Digital Strategy',
    subtitle: 'Search Dominance & Organic Penetration',
    description: 'Deep market intelligence and semantic structure architecture designed to elevate premium brands. We build authoritative content strategies that position our clients as industry leaders.',
    accent: 'gold',
    metrics: [
      { label: 'Visibility', value: 'Premium Placement' },
      { label: 'Performance', value: '100 SpeedScore' },
      { label: 'Architecture', value: 'Semantic Web' }
    ],
    tags: ['Strategy', 'SEO', 'Semantic Targeting', 'Authority'],
    details: [
      'Architectural parsing to conform with modern semantic indexing search systems.',
      'High-velocity structural layouts boasting Google Lighthouse Perfect 100 SpeedScores.',
      'High-authority natural reference curation to establish domain dominance.',
      'Intent-mapping architectures for deep-user capture and premium lead generation.'
    ]
  },
  {
    title: 'Luxury Lifestyle & Elite Identity',
    subtitle: 'Personal Curation & Brand Equity',
    description: 'Tailored digital identity production for ultra-high-net-worth brands, athletes, and discerning personal campaigns. We synthesize elite photo captures with premium lifestyle optics.',
    accent: 'dual',
    metrics: [
      { label: 'Focus', value: 'Elite Status' },
      { label: 'Aesthetic', value: 'Ultra-Premium' },
      { label: 'Curation', value: 'Bespoke' }
    ],
    tags: ['Identity', 'Luxury Optics', 'Elite Styling', 'Status Campaigns'],
    details: [
      'Tailored portrait sessions reflecting professional sophistication and technical command.',
      'Bespoke visual content layouts tailored around high-luxury aesthetics.',
      'Curation guidelines emphasizing selective presence over volume.',
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
    
    const messageField = document.querySelector('textarea[name="message"]') as HTMLTextAreaElement | null
    if (messageField) {
      messageField.value = `I'm interested in discussing a project regarding: ${title}.\n\nProject goals:\n\nTimeline:\n`
      const event = new Event('input', { bubbles: true })
      messageField.dispatchEvent(event)
    }

    handleCloseDrawer()

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
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="font-sans text-xs tracking-widest uppercase text-slate-400 font-medium">
            Selected Works & Capabilities
          </span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-light tracking-tight text-white"
        >
          Our Capability Matrix
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-slate-400 max-w-2xl text-sm md:text-base leading-relaxed font-light"
        >
          Select a node to explore our disciplines. Each area is personally overseen by Director Ramone Wynter to ensure aesthetic and technical excellence.
        </motion.p>
      </div>

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
              className={`glass-panel cursor-pointer p-8 rounded-sm transition-all duration-300 flex flex-col justify-between group h-full relative border ${
                isSelected 
                  ? 'border-slate-500 bg-slate-900/80 shadow-2xl shadow-black/50' 
                  : 'border-slate-800 hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                      0{idx + 1}
                    </span>
                  </div>
                  
                  {isAccentCyan ? (
                    <Video className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
                  ) : isAccentGold ? (
                    <Globe className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
                  ) : (
                    <Sparkles className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-200" />
                  )}
                </div>

                <h3 className={`text-xl font-sans font-medium tracking-tight mb-2 transition-colors duration-200 ${
                  isSelected ? 'text-white' : 'text-slate-100 group-hover:text-white'
                }`}>
                  {node.title}
                </h3>
                
                <p className="font-sans text-[11px] text-slate-400 mb-4 uppercase tracking-widest">
                  {node.subtitle}
                </p>

                <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                  {node.description}
                </p>

                <div className="grid grid-cols-3 gap-2 border-t border-b border-slate-800 py-4 mb-6">
                  {node.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="text-center">
                      <p className="text-[10px] font-sans text-slate-500 uppercase tracking-widest leading-none mb-1.5">
                        {metric.label}
                      </p>
                      <p className="text-xs font-sans font-medium text-slate-300 leading-none">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {node.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-1 bg-slate-900 border border-slate-800 rounded-sm font-sans text-[10px] text-slate-400 uppercase tracking-widest"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 group/btn select-none pt-2">
                  <span className="text-xs font-sans uppercase tracking-widest text-slate-300 transition-all duration-200 group-hover:pr-1 group-hover:text-white">
                    Explore Details
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 transition-transform duration-200 group-hover/btn:translate-x-1 group-hover:text-white" />
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {showDetailDrawer && activeIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/80 backdrop-blur-sm">
            <div className="absolute inset-0" onClick={handleCloseDrawer} />

            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-lg h-[90vh] md:h-full rounded-sm overflow-y-auto p-6 md:p-10 flex flex-col justify-between border relative bg-[#020304] border-slate-800 shadow-2xl"
            >
              <button 
                onClick={handleCloseDrawer}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 hover:bg-slate-800 transition-colors duration-200 cursor-pointer"
              >
                <X className="w-5 h-5 text-slate-400 hover:text-white" />
              </button>

              <div>
                <div className="flex items-center gap-2 mb-6">
                  <span className="font-mono text-xs tracking-widest uppercase text-slate-500">
                    Discipline 0{activeIndex + 1}
                  </span>
                </div>

                <h3 className="text-3xl font-display font-light tracking-tight text-white mb-2">
                  {PORTFOLIO_NODES[activeIndex].title}
                </h3>
                
                <p className="font-sans text-xs text-slate-400 mb-8 uppercase tracking-widest font-medium">
                  {PORTFOLIO_NODES[activeIndex].subtitle}
                </p>

                <p className="text-slate-300 text-sm leading-relaxed mb-10 font-light">
                  {PORTFOLIO_NODES[activeIndex].description}
                </p>

                <div>
                  <h4 className="text-xs font-sans font-medium text-white uppercase tracking-widest mb-6 border-b border-slate-800 pb-3">
                    Approach & Methodology
                  </h4>
                  <ul className="space-y-6">
                    {PORTFOLIO_NODES[activeIndex].details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex gap-4">
                        <span className="text-xs font-mono mt-0.5 text-slate-500">
                          {dIdx + 1}.
                        </span>
                        <p className="text-slate-400 text-sm leading-relaxed font-light">
                          {detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleCloseDrawer}
                  className="flex-1 px-4 py-3.5 rounded-sm border border-slate-700 font-sans text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200 cursor-pointer text-center tracking-widest uppercase"
                >
                  Close
                </button>
                <a 
                  href="#contact"
                  onClick={handleInitiateLink}
                  className="flex-1 px-4 py-3.5 rounded-sm bg-white hover:bg-slate-200 font-sans text-xs text-center font-medium uppercase tracking-widest transition-all duration-300 cursor-pointer text-slate-950 flex items-center justify-center gap-2 focus:outline-none group/action-btn"
                >
                  <span>Inquire Now</span>
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
