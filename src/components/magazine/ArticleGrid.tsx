'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SocialShare } from './SocialShare';

const articles = [
  {
    id: 'article-1',
    title: 'The Psychology of Color in Branding',
    category: 'Creative',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_01.png?alt=media&token=7883a21a-472d-4876-8f36-391f17387431',
    dataAiHint: 'color psychology',
    url: '/discover/arrdublu-mag/color-psychology',
  },
  {
    id: 'article-2',
    title: 'SEO in 2024: Navigating the AI Revolution',
    category: 'SEO',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_02.png?alt=media&token=f074a381-8742-498c-8519-7589d891636c',
    dataAiHint: 'seo ai',
    url: '/discover/arrdublu-mag/seo-ai-revolution',
  },
  {
    id: 'article-3',
    title: 'Visual Storytelling for Lifestyle Brands',
    category: 'Lifestyle',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    dataAiHint: 'lifestyle storytelling',
    url: '/discover/arrdublu-mag/visual-storytelling',
  },
  {
    id: 'article-4',
    title: 'Beyond the Logo: Building a Resonant Brand Voice',
    category: 'Creative',
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    dataAiHint: 'brand voice',
    url: '/discover/arrdublu-mag/building-brand-voice',
  },
];

export function ArticleGrid() {
  return (
    <section>
       <h2 className="text-3xl font-headline font-semibold mb-8 text-primary border-b pb-4">
        Latest Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {articles.map((article) => (
          <Card key={article.id} className="group overflow-hidden flex flex-col">
            <Link href={article.url} className="block">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={article.dataAiHint}
                />
              </div>
            </Link>
            <CardHeader>
              <Badge variant="secondary" className="w-fit mb-2">{article.category}</Badge>
              <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
                <Link href={article.url}>{article.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="mt-auto pt-4">
              <SocialShare url={article.url} title={article.title} image={article.image} />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
