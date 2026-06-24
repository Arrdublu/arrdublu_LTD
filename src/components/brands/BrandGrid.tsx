import Image from 'next/image';
import { Card } from '@/components/ui/card';

const brands = [
  { name: 'The Saint T Collective', dataAiHint: 'tech logo' },
  { name: 'Ioka Beautiful Purpose', dataAiHint: 'fashion logo' },
  { name: 'Elite Events', dataAiHint: 'food logo' },
  { name: 'Visionary Tech', dataAiHint: 'auto logo' },
  { name: 'Creative Minds', dataAiHint: 'startup logo' },
  { name: 'Media Masters', dataAiHint: 'media logo' },
  { name: 'Design Studio', dataAiHint: 'creative agency' },
  { name: 'Lifestyle Co', dataAiHint: 'lifestyle brand' },
];

export function BrandGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {brands.map((brand) => (
        <Card key={brand.name} className="p-6 flex justify-center items-center aspect-video transition-all hover:shadow-lg hover:border-primary/50 bg-card/50">
          <span className="text-xl font-headline font-bold text-center text-muted-foreground group-hover:text-primary">
            {brand.name}
          </span>
        </Card>
      ))}
    </div>
  );
}
