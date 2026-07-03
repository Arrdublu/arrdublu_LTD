import { ServiceCardManager } from '@/components/admin/ServiceCardManager';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Manage Services</h1>
      </div>
      
      <div className="w-full max-w-4xl">
        <ServiceCardManager />
      </div>
    </div>
  );
}
