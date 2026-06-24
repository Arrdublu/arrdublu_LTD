
import { Suspense } from 'react';
import { OrdersPageContent } from '@/components/orders/OrdersPageContent';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

function OrdersLoadingSkeleton() {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline font-bold text-primary mb-8">Your Orders</h1>
        <div className="space-y-8">
            {[...Array(2)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="bg-muted/50 flex flex-row justify-between items-center py-4 px-6">
                        <div className="space-y-2">
                           <Skeleton className="h-5 w-48" />
                           <Skeleton className="h-4 w-32" />
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    );
  }

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersLoadingSkeleton />}>
      <OrdersPageContent />
    </Suspense>
  );
}
