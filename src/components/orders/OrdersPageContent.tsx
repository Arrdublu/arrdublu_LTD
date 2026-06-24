
'use client';
import { useEffect, useState } from 'react';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import type { Order, OrderItem, Currency } from '@/lib/types';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyProvider';


export function OrdersPageContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(!!sessionId);
  const { getFormattedPrice } = useCurrency();


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!firestore) {
            setError('Firebase is not initialized. Please try refreshing the page.');
            setLoading(false);
            return;
        }

        setLoading(true);
        const ordersRef = collection(firestore, 'orders');
        const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);

        const fetchedOrders: Order[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (!data?.createdAt?.toDate || !data?.totalAmount || !data?.status || !data?.items) {
            console.warn(`Incomplete order data for ID: ${doc.id}`);
            return;
          }
          const validStatuses = ['paid', 'pending', 'cancelled'] as const;
          const status = validStatuses.includes(data.status) ? data.status : 'pending';

          fetchedOrders.push({
            id: doc.id,
            date: format(data.createdAt.toDate(), 'MMMM d, yyyy'),
            total: Number(data.totalAmount) || 0,
            status,
            items: (data.items || []).map((item: { itemId: string; name?: string; quantity?: number; price?: number }) => ({
              itemId: item.itemId,
              name: item.name || 'Unknown Item',
              quantity: item.quantity ? Number(item.quantity) : 1,
              price: Number(item.price) || 0,
            })) as OrderItem[],
            currency: data.currency || 'USD',
          });
        });
        setOrders(fetchedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);


  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-lg text-destructive">{error}</p>
        <Button asChild className="mt-4">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {showSuccess && (
        <Card className="mb-8 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800/50">
           <CardHeader className="flex flex-row items-start gap-4 p-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mt-1" />
            <div className="flex-1">
              <CardTitle className="text-green-800 dark:text-green-300">Payment Successful!</CardTitle>
              <CardDescription className="text-green-700 dark:text-green-400">
 Thank you for your order. A confirmation email has been sent to you.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSuccess(false)}
              className="text-green-800 dark:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 -mt-2 -mr-2"
              aria-label="Dismiss success message"
            >
              ✕
            </Button>
          </CardHeader>
        </Card>
      )}
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Your Orders</h1>
      {orders.length === 0 ? (
        <Card className="text-center py-20">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
            <h2 className="text-2xl font-semibold">You haven't placed any orders yet.</h2>
            <p className="text-muted-foreground">When you do, your orders will appear here.</p>
            <Button asChild className="mt-4">
              <Link href="/">Continue Browsing</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="bg-muted/50 flex flex-row justify-between items-center py-4 px-6">
                <div>
                  <p className="font-semibold">Order ID: <span className="font-mono text-sm">{order.id}</span></p>
                  <p className="text-sm text-muted-foreground">Date: {order.date}</p>
                </div>
                 <Badge 
                  className={`capitalize ${
                    order.status === 'paid' ? 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700' : 'bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700'
                  }`}
                  variant="outline"
                  >
                  {order.status}
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="px-6">Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right px-6">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium px-6">{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right px-6">{getFormattedPrice(item.price * item.quantity, order.currency as Currency)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="bg-muted/50 py-4 px-6 mt-0">
                <div className="w-full flex justify-end">
                  <p className="text-lg font-bold">Total: {getFormattedPrice(order.total, order.currency as Currency)}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
