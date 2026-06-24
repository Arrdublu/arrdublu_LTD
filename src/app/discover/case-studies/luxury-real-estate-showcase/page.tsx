
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Home, Eye, TrendingUp } from 'lucide-react';

const caseStudy = {
  title: 'Luxury Real Estate Showcase',
  category: 'Cinematic Home Tour',
  heroImage: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
  dataAiHint: 'luxury home exterior',
  url: '/discover/case-studies/luxury-real-estate-showcase',
  overview: "A premier real estate agency needed to market a high-value property in a competitive luxury market. Standard photos weren't enough to capture the home's grandeur and unique flow. Our 'Cinematic Home Tour' service was used to create a compelling video narrative that brought the property to life, resulting in a faster sale at the desired price point.",
  keyMetrics: [
    { metric: '50%', label: 'Less Time on Market', icon: TrendingUp },
    { metric: '20K+', label: 'Video Views in First Week', icon: Eye },
    { metric: '100%', label: 'Achieved Asking Price', icon: Home },
  ],
  challenge: "The challenge was to convey the property's expansive spaces, high-end finishes, and stunning views in a way that static images could not. The agency needed to create an emotional connection with potential buyers before they even stepped foot on the property, justifying its premium price tag.",
  solution: "Our team produced a 2-minute cinematic tour using smooth, stabilized walkthrough footage, drone shots for aerial context, and detail shots of key architectural features. We focused on storytelling, guiding the viewer through the home as if they were experiencing it firsthand. The final video was professionally color-graded and set to licensed music to create an aspirational and luxurious mood.",
  results: "The cinematic tour became the centerpiece of the marketing campaign. It was shared widely on social media and featured on top real estate portals. The video generated significant buzz, leading to multiple qualified inquiries within days. The property sold in half the average time for its bracket, and the seller received their full asking price, demonstrating a clear return on investment.",
  services: [
    { name: 'Cinematic Video Walkthrough', icon: CheckCircle },
    { name: 'Drone & Aerial Videography', icon: CheckCircle },
    { name: 'Professional Color Grading & Editing', icon: CheckCircle },
    { name: 'Licensed Music & Sound Design', icon: CheckCircle },
  ]
};

export default function LuxuryRealEstateShowcasePage() {

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
