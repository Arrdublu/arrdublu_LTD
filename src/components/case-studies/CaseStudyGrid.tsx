
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Activity, Archive } from 'lucide-react';
import { caseStudies } from '@/lib/data';
import { PortfolioItem, getPortfolioItems } from '@/lib/portfolio-actions';

interface CaseStudyGridProps {
  initialItems?: PortfolioItem[];
}

export function CaseStudyGrid({ initialItems }: CaseStudyGridProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems || []);

  useEffect(() => {
    if (!initialItems) {
      getPortfolioItems().then(fetched => {
        if (fetched && fetched.length > 0) {
          setItems(fetched);
        }
      });
    }
  }, [initialItems]);

  const displayItems = items.length > 0
    ? items.map(item => ({
        id: item.id || '',
        title: item.title,
        category: item.services[0] || 'Creative',
        image: item.imageUrl || 'https://picsum.photos/seed/placeholder/800/600',
        description: item.description,
        link: `/discover/case-studies/${item.id}`,
        status: item.status || 'Live',
        dataAiHint: 'case study'
      }))
    : caseStudies.map(study => ({
        id: study.id,
        title: study.title,
        category: study.category,
        image: study.image,
        description: study.description,
        link: study.link,
        status: study.status || 'Live',
        dataAiHint: study.dataAiHint
      }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayItems.map((project, idx) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="group relative h-full flex flex-col"
        >
          <Link href={project.link} className="flex flex-col h-full cyber-corner glass-panel rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all duration-300">
            {/* Image Container with hover zoom */}
            <div className="relative aspect-video overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10 duration-500" />
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                data-ai-hint={project.dataAiHint}
                referrerPolicy="no-referrer"
              />
              {project.status && (
                <div className="absolute top-4 right-4 z-20">
                  <div 
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md font-mono text-[10px] uppercase tracking-wider border ${project.status === 'Live' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-slate-900/80 text-slate-400 border-slate-700'}`}
                  >
                    {project.status === 'Live' ? (
                      <><Activity className="w-3 h-3" /> LIVE</>
                    ) : (
                      <><Archive className="w-3 h-3" /> ARCHIVED</>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/30 px-2 py-0.5 rounded-sm bg-cyan-950/30">
                  {project.category}
                </span>
              </div>
              
              <h3 className="font-display text-xl text-white font-medium mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                {project.title}
              </h3>
              
              <p className="text-sm text-slate-400 leading-relaxed mb-6 flex-1">
                {project.description}
              </p>
              
              <div className="flex items-center text-xs font-mono font-semibold text-white uppercase tracking-wider group-hover:text-cyan-400 transition-colors duration-300">
                <span>View Brief</span> 
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
