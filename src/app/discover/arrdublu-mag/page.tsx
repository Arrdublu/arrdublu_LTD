
import { FeaturedArticle } from '@/components/magazine/FeaturedArticle';
import { ArticleGrid } from '@/components/magazine/ArticleGrid';

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
