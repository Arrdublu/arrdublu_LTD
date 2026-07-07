
import { FeaturedArticle } from '@/components/magazine/FeaturedArticle';
import { ArticleGrid } from '@/components/magazine/ArticleGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Arrdublu Mag | Insights & Inspiration',
  description: 'Explore insightful articles, trends, and inspiration from the world of digital media and experiential design.',
  openGraph: {
    title: 'Arrdublu Mag | Insights & Inspiration',
    description: 'Explore insightful articles, trends, and inspiration from the world of digital media and experiential design.',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Arrdublu Mag',
    }],
  },
};

export default function ArrdubluMagPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Arrdublu Mag
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Explore insightful articles, trends, and inspiration from the world of media and design.
        </p>
      </div>

      <div className="space-y-16">
        <FeaturedArticle />
        <ArticleGrid />
      </div>
    </div>
  );
}
