
'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartProvider';

export function Cart() {
  const { cartCount } = useCart();

  return (
      <Link href="/cart" passHref>
        <Button variant="ghost" size="icon" asChild>
          <div className="relative">
            <ShoppingBag />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
             <span className="sr-only">Shopping Bag</span>
          </div>
        </Button>
      </Link>
  );
}
