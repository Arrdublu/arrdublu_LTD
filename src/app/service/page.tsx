import { constructMetadata } from '@/lib/utils';
import { getServices } from '@/lib/service-actions';
import { ServiceCard } from '@/components/services/ServiceCard';
import { Metadata } from 'next';
import RateSheetDrawer from '@/components/services/RateSheetDrawer';
import StructuredData from '@/components/services/StructuredData';

export const revalidate = 0;

export const metadata: Metadata = constructMetadata({
  title: 'Services | Arrdublu',
  description: 'Explore our range of creative, lifestyle, and production services.',
});

export default async function ServicesPage() {
  const servicesList = await getServices();

  return (
    <div className="container mx-auto px-4 py-12">
      <StructuredData />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Services
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80 mb-6">
          Explore our range of creative, lifestyle, and production services designed to elevate your brand.
        </p>
        <RateSheetDrawer />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
