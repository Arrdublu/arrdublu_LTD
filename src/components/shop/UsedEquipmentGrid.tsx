'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyProvider';
import { useCart } from '@/context/CartProvider';
import type { Service } from '@/lib/types';
import { Badge } from '@/components/ui/badge';

const usedEquipment: (Omit<Service, 'category' | 'description' | 'previews'> & { condition: 'Like New' | 'Excellent' | 'Good' | 'Used' })[] = [
  {
    id: 'used-gear-1',
    name: 'Canon EOS R5 Camera Body',
    price: 2800.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_01.png?alt=media&token=7883a21a-472d-4876-8f36-391f17387431',
    paymentLink: 'https://buy.stripe.com/placeholder_used_r5',
    condition: 'Excellent',
  },
  {
    id: 'used-gear-2',
    name: 'DJI Mavic 3 Drone',
    price: 1500.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_02.png?alt=media&token=f074a381-8742-498c-8519-7589d891636c',
    paymentLink: 'https://buy.stripe.com/placeholder_used_mavic3',
    condition: 'Like New',
  },
  {
    id: 'used-gear-3',
    name: 'Sony FE 24-70mm f/2.8 GM Lens',
    price: 1350.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    paymentLink: 'https://buy.stripe.com/placeholder_used_sony_lens',
    condition: 'Good',
  },
  {
    id: 'used-gear-4',
    name: 'Aputure Light Storm C300d II',
    price: 850.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    paymentLink: 'https://buy.stripe.com/placeholder_used_aputure',
    condition: 'Used',
  }
];


export function UsedEquipmentGrid() {
    const { getFormattedPrice } = useCurrency();
    const { addToCart } = useCart();

    const handleAddToCart = (item: Omit<Service, 'category' | 'description' | 'previews'>) => {
        const serviceItem: Service = {
            ...item,
            category: 'Lifestyle',
            description: `Used Equipment: ${item.name}`,
            previews: [],
        };
        addToCart(serviceItem);
    }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {usedEquipment.map((item) => (
        <Card key={item.id} className="group overflow-hidden">
            <div className="relative aspect-square">
            <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint="used camera gear"
            />
             <Badge variant="secondary" className="absolute top-2 right-2">{item.condition}</Badge>
            </div>
            <CardHeader>
                <CardTitle className="font-headline text-xl">
                    {item.name}
                </CardTitle>
            </CardHeader>
          <CardContent className="flex justify-between items-center">
            <p className="text-lg font-semibold text-primary">{getFormattedPrice(item.price)}</p>
            <Button onClick={() => handleAddToCart(item)}>Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
