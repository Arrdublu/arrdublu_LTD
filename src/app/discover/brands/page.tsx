
import { BrandGrid } from '@/components/brands/BrandGrid';

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
      <BrandGrid />
    </div>
  );
}
