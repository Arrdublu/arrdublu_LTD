
'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from '@/components/magazine/SocialShare';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Zap, Film, Star } from 'lucide-react';

const caseStudy = {
  title: 'Futuristic Tech Launch: A 3D Animated Reveal',
  category: '3D Motion Graphics',
  heroImage: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
  dataAiHint: 'futuristic technology circuit',
  url: '/discover/case-studies/futuristic-tech-launch',
  overview: "A cutting-edge tech startup, 'Nexus Innovations,' needed to make a huge splash for their debut product. They tasked us with creating a product reveal video that was as innovative as their technology. Using our '3D Motion Graphics Package,' we produced a fully animated video that built suspense, showcased the product's sleek design, and highlighted its key features, resulting in a viral launch campaign.",
  keyMetrics: [
    { metric: '2M+', label: 'Views on Launch Day', icon: Zap },
    { metric: 'Featured', label: 'By Top Tech Blogs', icon: Star },
    { metric: '4x', label: 'Pre-Order Goal Exceeded', icon: Film },
  ],
  challenge: "The product was still in pre-production, so no physical prototype was available for filming. The challenge was to create a photorealistic, high-energy product video that felt tangible and exciting, building consumer trust and driving pre-orders without a physical item to show.",
  solution: "Our team created a detailed 3D model of the product based on the client's CAD files. We then developed a compelling storyboard for a 30-second animation, focusing on dynamic camera movements, dramatic lighting, and sleek visual effects. The '3D Motion Graphics Package' allowed us to handle everything from modeling and texturing to final compositing, delivering a video that looked and felt like a blockbuster movie trailer.",
  results: "The animated reveal was a massive success. The video went viral on social media, accumulating over two million views in the first 24 hours and securing features on major tech publications. The excitement translated directly into sales, with Nexus Innovations exceeding their pre-order target by 400%. The project demonstrated the power of 3D animation to create a powerful launch moment, even without a physical product.",
  services: [
    { name: '3D Product Modeling & Texturing', icon: CheckCircle },
    { name: 'Animated Storyboarding', icon: CheckCircle },
    { name: 'Cinematic 3D Animation', icon: CheckCircle },
    { name: 'Visual Effects & Compositing', icon: CheckCircle },
  ]
};

export default function FuturisticTechLaunchPage() {

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
