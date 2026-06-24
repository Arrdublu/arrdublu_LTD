
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { CheckCircle } from 'lucide-react';

const caseStudy = {
  title: 'Annual Corporate Summit',
  category: 'Event Videography',
  heroImage: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
  dataAiHint: 'corporate summit presentation',
  url: '/discover/case-studies/annual-corporate-summit',
  overview: "We were tasked with capturing the energy and key moments of a major tech corporation's annual three-day summit. Our goal was to produce a dynamic highlights reel for internal and external promotion, as well as full recordings of all keynote sessions for archival and training purposes.",
  keyMetrics: [
    { metric: '3-Day', label: 'Event Coverage' },
    { metric: '5-Min', label: 'Highlight Reel' },
    { metric: '10+', label: 'Keynote Sessions Recorded' },
  ],
  challenge: "The main challenge was to discreetly cover multiple simultaneous breakout sessions, mainstage keynotes, and networking events without disrupting the attendees' experience. The client required a fast turnaround on the highlight reel to maintain post-event momentum.",
  solution: "Our team deployed a multi-camera setup with a combination of manned and robotic cameras. We utilized a central video village for live switching and recording, allowing the director to capture the best angles from all sessions. Our on-site editing team began cutting the highlight reel on day one, incorporating daily footage to ensure a final product was ready within 48 hours of the event's conclusion.",
  results: 'The client was thrilled with the polished and energetic highlight reel, which garnered over 500,000 views on their social channels. The high-quality keynote recordings have become a valuable asset for their internal training library, viewed by thousands of employees globally.',
  services: [
    { name: 'Multi-camera Videography', icon: CheckCircle },
    { name: 'Live Switching & Recording', icon: CheckCircle },
    { name: 'On-site Editing', icon: CheckCircle },
    { name: 'Highlight Reel Production', icon: CheckCircle },
  ]
};

export default function AnnualCorporateSummitPage() {

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
              {caseStudy.keyMetrics.map((item) => (
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
               <p className="text-foreground/80 leading-relaxed mb-6">{caseStudy.solution}</p>
            </section>
          </div>
          
           <section className="mt-12">
                <h2 className="text-2xl font-headline font-semibold text-primary mb-4">Services Provided</h2>
                 <ul className="space-y-4">
                  {caseStudy.services.map((service, index) => (
                      <li key={index} className="flex items-start">
                          <service.icon className="h-6 w-6 text-primary mr-3 mt-1 flex-shrink-0" />
                          <span className="text-foreground/80 leading-relaxed">{service.name}</span>
                      </li>
                  ))}
              </ul>
            </section>

          <Separator className="my-12" />

          <section className="mb-12">
            <h2 className="text-3xl font-headline font-semibold text-primary mb-4">Results & Impact</h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              {caseStudy.results}
            </p>
          </section>

          <div className="text-center bg-muted/30 p-8 rounded-xl">
            <SocialShare url={caseStudy.url} title={caseStudy.title} image={caseStudy.heroImage} />
          </div>
        </div>
      </div>
    </div>
  );
}
