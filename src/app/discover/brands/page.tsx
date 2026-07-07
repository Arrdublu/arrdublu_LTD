
import { BrandGrid } from '@/components/brands/BrandGrid';
import { ClientLogos } from '@/components/home/ClientLogos';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Partners & Collaborators | Arrdublu',
  description: 'We are proud to have worked with a diverse range of innovative and inspiring brands to elevate their digital presence.',
  openGraph: {
    title: 'Our Partners & Collaborators | Arrdublu',
    description: 'We are proud to have worked with a diverse range of innovative and inspiring brands to elevate their digital presence.',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Arrdublu Partners',
    }],
  },
};

export default function BrandsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Partners & Collaborators
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          We are proud to have worked with a diverse range of innovative and inspiring brands.
        </p>
      </div>
      <ClientLogos />
      <BrandGrid />
    </div>
  );
}
