import { ProductManager } from '@/components/admin/ProductManager';

export const dynamic = 'force-dynamic';

export default function StorePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Manage Store Products</h1>
      </div>
      
      <div className="w-full max-w-4xl">
        <ProductManager />
      </div>
    </div>
  );
}
