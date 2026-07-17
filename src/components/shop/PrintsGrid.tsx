'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyProvider';
import { useCart } from '@/context/CartProvider';
import type { Service } from '@/lib/types';
import { getPrints, Print } from '@/lib/firebase/prints';
import { Loader2 } from 'lucide-react';

export function PrintsGrid() {
    const { getFormattedPrice } = useCurrency();
    const { addToCart } = useCart();
    const [prints, setPrints] = useState<Print[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getPrints().then(fetchedPrints => {
            setPrints(fetchedPrints);
            setIsLoading(false);
        });
    }, []);

    const handleAddToCart = (print: Print) => {
        const serviceItem: Service = {
            ...print,
            category: 'Lifestyle',
            description: `High-quality print of ${print.name}`,
            previews: [],
        };
        addToCart(serviceItem);
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (prints.length === 0) {
        return (
            <div className="text-center py-20 text-muted-foreground">
                <p>No prints available at the moment. Please check back later.</p>
            </div>
        );
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
