
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '@/lib/data';


export function CaseStudyGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {caseStudies.map((project) => (
        <Card key={project.id} className="group overflow-hidden">
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
                View Case Study <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </CardContent>
          </Link>
        </Card>
      ))}
    </div>
  );
}
