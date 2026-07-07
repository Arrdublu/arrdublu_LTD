
import { WorkShowcase } from '@/components/work/WorkShowcase';
import { getPortfolioItems } from '@/lib/portfolio-actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Work | Arrdublu',
  description: 'A collection of our favorite projects. See how we\'ve helped clients elevate their vision.',
  openGraph: {
    title: 'Our Work | Arrdublu',
    description: 'A collection of our favorite projects. See how we\'ve helped clients elevate their vision.',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Arrdublu Work',
    }],
  },
};

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const items = await getPortfolioItems();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Work
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          A collection of our favorite projects. See how we've helped clients elevate their vision.
        </p>
      </div>
      <WorkShowcase initialItems={items} />
    </div>
  );
}
