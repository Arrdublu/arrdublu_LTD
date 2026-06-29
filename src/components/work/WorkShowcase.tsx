'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Activity, Archive } from 'lucide-react';

import { caseStudies } from '@/lib/data';

export function WorkShowcase() {
  if (caseStudies.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {caseStudies.map((project) => (
        <Card key={project.id} className="group overflow-hidden relative">
          <Link href={project.link}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={project.dataAiHint}
              />
              {project.status && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge 
                    variant={project.status === 'Live' ? 'default' : 'secondary'}
                    className={`flex items-center gap-1.5 px-2.5 py-1 backdrop-blur-md font-mono text-[10px] uppercase tracking-wider ${project.status === 'Live' ? 'bg-cyan-500/80 text-white border-cyan-400' : 'bg-slate-900/80 text-slate-400 border-slate-700'}`}
                  >
                    {project.status === 'Live' ? (
                      <><Activity className="w-3 h-3" /> LIVE</>
                    ) : (
                      <><Archive className="w-3 h-3" /> ARCHIVED</>
                    )}
                  </Badge>
                </div>
              )}
            </div>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{project.category}</Badge>
              <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center text-sm font-semibold text-primary">
                View Project <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
