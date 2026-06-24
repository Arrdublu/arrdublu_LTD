
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Briefcase, Eye, UserCheck } from 'lucide-react';

const caseStudy = {
  title: 'Executive Branding Portraits',
  category: 'Lifestyle Photography',
  heroImage: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
  dataAiHint: 'executive portrait confident',
  url: '/discover/case-studies/executive-portraits',
  overview: "A rising tech CEO approached us to create a portfolio of executive portraits that conveyed confidence, approachability, and vision. The images were needed for a major magazine feature, investor relations, and a complete website overhaul. Our 'Artisanal Portrait Session' was the perfect fit, providing a curated and sophisticated look that elevated the CEO's personal brand.",
  keyMetrics: [
    { metric: '35%', label: 'Increase in LinkedIn Engagement', icon: UserCheck },
    { metric: 'Featured', label: 'In Major Tech Publication', icon: Eye },
    { metric: '100%', label: 'Positive Investor Feedback', icon: Briefcase },
  ],
  challenge: "The CEO's existing headshots were generic and didn't reflect the dynamic and innovative nature of their company. They needed a set of images that were professional yet authentic, avoiding the stiff, overly corporate look. The challenge was to capture the subject's personality and leadership style in a way that felt both powerful and genuine.",
  solution: "We conducted a pre-session consultation to understand the CEO's brand values and desired image. The 'Artisanal Portrait Session' was tailored to include both studio and on-location shots at their modern office, providing a variety of backdrops. We focused on natural lighting and coached the CEO on posing and expression to capture a range of moods, from contemplative and serious to open and engaging.",
  results: "The new portraits were a huge success. The magazine feature prominently displayed the images, and the CEO's updated LinkedIn profile saw a significant boost in engagement. The new branding, anchored by the portraits, was praised by investors and partners for its professionalism and authenticity, helping to secure a new round of funding.",
  services: [
    { name: 'Artisanal Portrait Session', icon: CheckCircle },
    { name: 'On-Location & Studio Photography', icon: CheckCircle },
    { name: 'Personal Branding Consultation', icon: CheckCircle },
    { name: 'Professional Retouching', icon: CheckCircle },
  ]
};

export default function ExecutivePortraitsPage() {

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
                <div key={item.label} className="p-6 bg-muted/50 rounded-lg">
                  <item.icon className="h-10 w-10 text-primary mx-auto mb-4" />
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
