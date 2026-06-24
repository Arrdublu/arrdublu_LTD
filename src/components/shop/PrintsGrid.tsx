'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyProvider';
import { useCart } from '@/context/CartProvider';
import type { Service } from '@/lib/types';

const prints: Omit<Service, 'category' | 'description' | 'previews' >[] = [
  {
    id: 'print-1',
    name: 'Serenity Bridge',
    price: 45.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_01.png?alt=media&token=7883a21a-472d-4876-8f36-391f17387431',
    paymentLink: 'https://buy.stripe.com/placeholder_print1'
  },
  {
    id: 'print-2',
    name: 'Urban Geometry',
    price: 55.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_02.png?alt=media&token=f074a381-8742-498c-8519-7589d891636c',
    paymentLink: 'https://buy.stripe.com/placeholder_print2'
  },
  {
    id: 'print-3',
    name: 'Golden Hour Peaks',
    price: 65.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    paymentLink: 'https://buy.stripe.com/placeholder_print3'
  },
  {
    id: 'print-4',
    name: 'Ocean\'s Breath',
    price: 50.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    paymentLink: 'https://buy.stripe.com/placeholder_print4'
  }
];


export function PrintsGrid() {
    const { getFormattedPrice } = useCurrency();
    const { addToCart } = useCart();

    const handleAddToCart = (print: Omit<Service, 'category' | 'description' | 'previews' >) => {
        const serviceItem: Service = {
            ...print,
            category: 'Lifestyle',
            description: `High-quality print of ${print.name}`,
            previews: [],
        };
        addToCart(serviceItem);
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {prints.map((print) => (
        <Card key={print.id} className="group overflow-hidden">
            <div className="relative aspect-square">
            <Image
                src={print.image}
                alt={print.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="art print"
            />
            </div>
            <CardHeader>
                <CardTitle className="font-headline text-xl">
                    {print.name}
                </CardTitle>
            </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-lg font-semibold text-primary">{getFormattedPrice(print.price)}</p>
            <Button onClick={() => handleAddToCart(print)}>Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
