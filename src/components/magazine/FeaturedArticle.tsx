'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { SocialShare } from './SocialShare';
import { Badge } from '../ui/badge';
import Link from 'next/link';

const featuredArticle = {
  title: 'Special Ops: The Art of Covert Creative Campaigns',
  category: 'Special Operations',
  image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1200',
  dataAiHint: 'special ops',
  excerpt: 'Dive deep into the strategies behind our most successful and unconventional creative campaigns. Discover how we blend stealth, precision, and artistry to deliver results that make a massive impact without making a sound.',
  url: '/discover/arrdublu-mag/special-ops-creative-campaigns',
};

export function FeaturedArticle() {
  return (
    <section>
      <h2 className="text-3xl font-headline font-semibold mb-8 text-primary border-b pb-4">
        Featured Story
      </h2>
      <Card className="overflow-hidden shadow-lg md:grid md:grid-cols-2 md:gap-0">
        <Link href={featuredArticle.url} className="block relative aspect-video md:aspect-auto">
          <Image
            src={featuredArticle.image}
            alt={featuredArticle.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={featuredArticle.dataAiHint}
          />
        </Link>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <Badge variant="outline" className="mb-2 w-fit">{featuredArticle.category}</Badge>
          <h3 className="text-2xl font-headline font-bold mb-4 hover:text-primary transition-colors">
            <Link href={featuredArticle.url}>
                {featuredArticle.title}
            </Link>
          </h3>
          <p className="text-muted-foreground mb-6">
            {featuredArticle.excerpt}
          </p>
          <div className="flex items-center gap-4 mt-auto">
            <SocialShare url={featuredArticle.url} title={featuredArticle.title} image={featuredArticle.image} />
          </div>
        </div>
      </Card>
    </section>
  );
}
