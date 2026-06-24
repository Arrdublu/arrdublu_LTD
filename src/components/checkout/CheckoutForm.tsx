
'use client';

import { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/context/CartProvider';

interface CheckoutFormProps {
  totalAmount: number;
}

export function CheckoutForm({ totalAmount }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { getFormattedPrice } = useCart();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required', // Prevent automatic redirection
    });

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Otherwise, your customer will be redirected to
      // your `return_url`. For some payment methods like iDEAL, your customer will
      // be redirected to an intermediate site first to authorize the payment, then
      // redirected to the `return_url`.
      toast({
        title: 'Payment failed',
        description: error.message,
        variant: 'destructive',
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Redirect to order confirmation page
        // The webhook will handle the backend order fulfillment.
        window.location.href = `/orders?session_id=${paymentIntent.id}`;
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <Button 
        disabled={isLoading || !stripe || !elements} 
        className="w-full mt-8 bg-gradient-to-r from-[#d4af37] to-[#b49020] hover:from-[#e5c048] hover:to-[#c5a131] text-black font-semibold text-lg h-14 rounded-xl shadow-lg transition-all"
      >
        {isLoading && <Loader2 className="animate-spin mr-2" />}
        <span>{isLoading ? 'Processing...' : `Pay ${getFormattedPrice(totalAmount)}`}</span>
      </Button>
    </form>
  );
}
