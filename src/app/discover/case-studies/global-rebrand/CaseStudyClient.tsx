
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const icons: { [key: string]: React.ElementType } = {
  CheckCircle,
};

export function GlobalRebrandClient({ caseStudy }: { caseStudy: any }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        }
    }, []);

  return (
    <div className="bg-background text-foreground">
      <header className="relative h-[60vh] w-full">
        <Image
          src={caseStudy.heroImage}
          alt={caseStudy.title}
          fill
          className="object-cover"
          data-ai-hint={caseStudy.dataAiHint}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="container mx-auto px-4 absolute bottom-0 pb-12">
          <Badge variant="secondary" className="mb-4">{caseStudy.category}</Badge>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary">
            {caseStudy.title}
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <section className="mb-12">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Project Overview</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {caseStudy.overview}
            </p>
          </section>

          <section className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {caseStudy.keyMetrics.map((item: any) => (
                <div key={item.metric} className="p-6 bg-muted/50 rounded-lg">
                  <p className="text-4xl font-bold text-accent-foreground dark:text-accent">{item.metric}</p>
                  <p className="text-muted-foreground mt-2">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <Separator className="my-12" />

          <div className="grid md:grid-cols-2 gap-12">
            <section>
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">The Challenge</h2>
              <p className="text-foreground/80 leading-relaxed">
                {caseStudy.challenge}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Our Solution</h2>
              <ul className="space-y-4">
                  {caseStudy.services.map((service: any, index: number) => {
                      const Icon = icons[service.icon];
                      return (
                        <li key={index} className="flex items-start">
                            {Icon && <Icon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />}
                            <span className="text-foreground/80 leading-relaxed">{service.name}</span>
                        </li>
                      );
                  })}
              </ul>
            </section>
          </div>
          
           <section className="mt-12">
                <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Detailed Solution</h2>
                <p className="text-foreground/80 leading-relaxed mb-6">{caseStudy.solution}</p>
            </section>


          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Results & Impact</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {caseStudy.results}
            </p>
          </section>
          
            {isMounted && (
                <section className="mb-12">
                    <h2 className="text-3xl font-headline font-semibold text-primary mb-8 text-center">Behind The Scenes</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                    {caseStudy.instagramEmbeds.map((embed: string, index: number) => (
                        <div key={index} className="w-full" dangerouslySetInnerHTML={{ __html: embed }} />
                    ))}
                    </div>
                </section>
            )}

          <div className="text-center bg-muted/30 p-8 rounded-xl">
            <SocialShare url={caseStudy.url} title={caseStudy.title} image={caseStudy.heroImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
