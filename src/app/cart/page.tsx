
import { CartPageClient } from '@/components/cart/CartPageClient';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function CartLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">
        <Skeleton className="h-10 w-48" />
      </h1>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-32 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-lg" />
        </div>
        <div className="md:col-span-1">
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}


export default function CartPage() {
    return (
        <Suspense fallback={<CartLoadingSkeleton />}>
            <CartPageClient />
        </Suspense>
    );
}
