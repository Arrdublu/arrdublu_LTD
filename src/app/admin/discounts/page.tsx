
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DiscountForm } from '@/components/admin/DiscountForm';
import { DiscountList } from '@/components/admin/DiscountList';
import { getDiscounts } from '@/lib/discount-actions';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const dynamic = 'force-dynamic';

function DiscountListSkeleton() {
    return (
        <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-2">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            ))}
        </div>
    )
}

export default async function AdminDiscountsPage() {
  const discounts = await getDiscounts();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Manage Discounts</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
            <DiscountForm />
        </div>
        <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Existing Discounts</h2>
            <Suspense fallback={<DiscountListSkeleton />}>
                <DiscountList initialDiscounts={discounts} />
            </Suspense>
        </div>
      </div>
    </>
  );
}
