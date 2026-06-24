
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartProvider';
import { useCurrency } from '@/context/CurrencyProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingBag, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createPaymentIntent } from '@/lib/actions';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { verifyDiscountCode } from '@/lib/discount-actions';
import type { Discount, Service } from '@/lib/types';

// Ensure you have your Stripe publishable key in your environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export function CartPageClient() {
  const { cartItems, removeFromCart, updateQuantity, getFormattedPrice, getCartTotal } = useCart();
  const { selectedCurrency } = useCurrency();
  const { toast } = useToast();

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [discountError, setDiscountError] = useState<string | null>(null);
  const [isVerifyingDiscount, setIsVerifyingDiscount] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const subtotal = getCartTotal();
  let discountAmount = 0;
  if (appliedDiscount) {
    if (appliedDiscount.type === 'percentage') {
      discountAmount = subtotal * (appliedDiscount.value / 100);
    } else {
      discountAmount = appliedDiscount.value;
    }
  }
  const total = Math.max(0, subtotal - discountAmount);
  
  const handleApplyDiscount = async () => {
    if (!discountCode.trim()) return;
    setIsVerifyingDiscount(true);
    setDiscountError(null);
    try {
        const verifiedDiscount = await verifyDiscountCode(discountCode);
        setAppliedDiscount(verifiedDiscount);
        toast({
            title: "Discount applied",
            description: `Successfully applied code: ${verifiedDiscount.code}`,
        });
    } catch (error: any) {
        setDiscountError(error.message);
        setAppliedDiscount(null);
    } finally {
        setIsVerifyingDiscount(false);
    }
  };


  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const itemsToProcess = cartItems.map(item => ({ service: item.service, quantity: item.quantity }));
      const { clientSecret, orderId } = await createPaymentIntent(itemsToProcess, selectedCurrency, appliedDiscount?.code);
      setClientSecret(clientSecret);
      setOrderId(orderId);
    } catch (error) {
      console.error("Failed to create payment intent:", error);
      toast({
        title: "Checkout Error",
        description: "Could not initiate the checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null; // or a loading skeleton
  }

  if (clientSecret && orderId) {
    const appearance = {
        theme: 'night' as const,
        variables: {
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeightNormal: '400',
            borderRadius: '12px',
            colorBackground: 'rgba(255, 255, 255, 0.05)',
            colorPrimary: '#d4af37',
            colorPrimaryText: '#ffffff',
            colorText: '#ffffff',
            colorTextSecondary: '#a1a1aa',
            colorTextPlaceholder: '#a1a1aa',
            colorIconTab: '#ffffff',
            colorLogo: 'dark',
            spacingUnit: '4px',
            colorDanger: '#ef4444',
            spacingGridRow: '16px',
        },
        rules: {
            '.Input': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                backdropFilter: 'blur(10px)',
                color: '#ffffff',
            },
            '.Input:focus': {
                border: '1px solid #d4af37',
                boxShadow: '0 0 0 1px #d4af37',
            },
            '.Tab': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
            },
            '.Tab:hover': {
                color: '#d4af37',
            },
            '.Tab--selected': {
                borderColor: '#d4af37',
                color: '#d4af37',
            },
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
             <h1 className="text-4xl font-headline font-bold text-primary mb-8 text-center">Complete Your Payment</h1>
            <Card className="max-w-xl mx-auto bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-b border-white/5 pb-8 pt-8">
                    <CardTitle className="text-center text-3xl font-light tracking-wide text-white">
                        Total: <span className="font-semibold text-[#d4af37]">{getFormattedPrice(total)}</span>
                    </CardTitle>
                    <p className="text-center text-sm text-zinc-400 mt-2">Secure checkout powered by Stripe</p>
                </CardHeader>
                <CardContent className="p-8">
                    <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
                        <CheckoutForm totalAmount={total} />
                    </Elements>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold text-primary mb-8">Your Shopping Bag</h1>
      {cartItems.length === 0 ? (
        <Card className="text-center py-20">
          <CardContent className="flex flex-col items-center gap-4 pt-6">
             <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <h2 className="text-2xl font-semibold">Your bag is empty</h2>
            <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
            <Button asChild className="mt-4">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-3 gap-12 items-start">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map(item => (
              <Card key={item.service.id} className="flex items-center p-4">
                <div className="relative h-24 w-24 rounded-md overflow-hidden mr-4">
                  <Image src={item.service.image} alt={item.service.name} fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <Link href={`/service/${item.service.id}`} className="font-semibold hover:text-primary">{item.service.name}</Link>
                  <p className="text-sm text-muted-foreground">{getFormattedPrice(item.service.price)}</p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.service.id, parseInt(e.target.value, 10))}
                      className="w-20 h-9"
                      disabled={item.service.unit !== 'hr'}
                    />
                    {item.service.unit === 'hr' && <span className="ml-2 text-sm text-muted-foreground">hr(s)</span>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{getFormattedPrice(item.service.price * item.quantity)}</p>
                   <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.service.id)} className="mt-2 text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-5 w-5" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="md:col-span-1 sticky top-24">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-end gap-2">
                    <div className="flex-grow">
                        <Input 
                            placeholder="Discount code" 
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            disabled={isVerifyingDiscount || !!appliedDiscount}
                        />
                         {discountError && <p className="text-xs text-destructive mt-1">{discountError}</p>}
                    </div>
                    <Button onClick={handleApplyDiscount} disabled={isVerifyingDiscount || !discountCode || !!appliedDiscount}>
                        {isVerifyingDiscount && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Apply
                    </Button>
                 </div>
                 <Separator />
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{getFormattedPrice(subtotal)}</span>
                </div>
                {appliedDiscount && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span>Discount ({appliedDiscount.code})</span>
                        <span>-{getFormattedPrice(discountAmount)}</span>
                    </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{getFormattedPrice(total)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleProceedToCheckout} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
