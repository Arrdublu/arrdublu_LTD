'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link as LinkIcon, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { createPaymentIntent } from '@/lib/actions';
import { useCurrency } from '@/context/CurrencyProvider';
import type { Service } from '@/lib/types';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const DROPSHIP_SERVICES = [
  { id: 'social-pack', name: 'Social Media Visual Pack', price: 150, type: 'flat' },
  { id: 'brand-identity', name: 'Brand Identity Suite', price: 850, type: 'flat' },
  { id: 'video-editing', name: 'Video Editing & VFX', price: 75, type: 'hourly' },
  { id: 'seo-audit', name: 'Comprehensive SEO Audit', price: 350, type: 'flat' },
  { id: 'event-photo', name: 'Event Photography/Videography', price: 120, type: 'hourly' },
  { id: 'virtual-production', name: 'Virtual Production Mapping', price: 250, type: 'hourly' },
];

function CheckoutForm({ clientSecret, formattedTotal }: { clientSecret: string, formattedTotal: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/orders`,
      },
    });

    if (error) {
      toast({ title: 'Payment Failed', description: error.message, variant: 'destructive' });
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      <Button 
        type="submit" 
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all hover:scale-[1.02]"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : `Pay ${formattedTotal}`}
      </Button>
    </form>
  );
}

export function DropshipMediaCheckout() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [details, setDetails] = useState<string>('');
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  
  const { toast } = useToast();
  const { selectedCurrency, getFormattedPrice } = useCurrency();

  const selectedService = DROPSHIP_SERVICES.find(s => s.id === selectedServiceId);
  const subtotal = selectedService ? selectedService.price * quantity : 0;

  useEffect(() => {
    if (selectedService && subtotal > 0) {
      createPaymentIntent([{ service: { ...selectedService, category: 'Creative', description: details, image: '', previews: [] } as Service, quantity }], selectedCurrency)
        .then(({ clientSecret }) => setClientSecret(clientSecret))
        .catch(err => toast({ title: 'Error', description: 'Failed to initialize payment.', variant: 'destructive' }));
    }
  }, [selectedService, quantity, details, subtotal, toast, selectedCurrency]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 space-y-8">
        <div>
          <h2 className="text-3xl font-headline font-bold text-primary mb-4">Dropship Media Services</h2>
          <p className="text-foreground/80 mb-6 leading-relaxed">
            Select an industry-standard service, specify your requirements, and checkout instantly. Our elite team will begin processing your request immediately.
          </p>
        </div>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle>Service Configuration</CardTitle>
            <CardDescription>Customize your media package</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="service">Select Service</Label>
              <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
                <SelectTrigger id="service" className="bg-slate-950 border-slate-800">
                  <SelectValue placeholder="Choose a service..." />
                </SelectTrigger>
                <SelectContent>
                  {DROPSHIP_SERVICES.map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - {getFormattedPrice(service.price)}{service.type === 'hourly' ? '/hr' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedService && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                <Label htmlFor="quantity">
                  {selectedService.type === 'hourly' ? 'Number of Hours' : 'Quantity'}
                </Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="bg-slate-950 border-slate-800"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="details">Project Details & Requirements</Label>
              <Textarea 
                id="details" 
                placeholder="Briefly describe your project needs, target audience, and any specific deliverables..." 
                className="min-h-[120px] bg-slate-950 border-slate-800"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-5">
        <Card className="bg-slate-950 border-cyan-500/20 sticky top-24">
          <CardHeader className="bg-cyan-950/20 border-b border-cyan-500/10">
            <CardTitle className="text-xl flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" />
              Secure Checkout
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Order Summary</h3>
              <div className="flex justify-between items-start">
                <span className="text-slate-200">{selectedService ? selectedService.name : 'No service selected'}</span>
                <span className="font-mono text-slate-200">
                  {selectedService ? getFormattedPrice(selectedService.price) : getFormattedPrice(0)}
                </span>
              </div>
              {selectedService && (
                <div className="flex justify-between items-start text-sm text-slate-400">
                  <span>{selectedService.type === 'hourly' ? `Hours: ${quantity}` : `Qty: ${quantity}`}</span>
                  <span className="font-mono">x{quantity}</span>
                </div>
              )}
              <div className="pt-4 mt-4 border-t border-slate-800 flex justify-between items-center">
                <span className="font-bold text-lg text-white">Total</span>
                <span className="font-mono font-bold text-xl text-cyan-400">{getFormattedPrice(subtotal)}</span>
              </div>
            </div>

            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm clientSecret={clientSecret} formattedTotal={getFormattedPrice(subtotal)} />
              </Elements>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

