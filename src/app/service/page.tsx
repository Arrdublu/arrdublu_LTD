import { constructMetadata } from '@/lib/utils';
import { services } from '@/lib/data';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Services | Arrdublu',
  description: 'Explore our range of creative, lifestyle, and production services.',
});

export default function ServicesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[
        { label: 'Services', href: '/service' },
      ]} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Services
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Explore our range of creative, lifestyle, and production services designed to elevate your brand.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
