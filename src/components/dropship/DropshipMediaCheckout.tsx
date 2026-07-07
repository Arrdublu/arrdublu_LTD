'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Check, Facebook, Twitter, Linkedin, Link as LinkIcon, CreditCard, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DROPSHIP_SERVICES = [
  { id: 'social-pack', name: 'Social Media Visual Pack', price: 150, type: 'flat' },
  { id: 'brand-identity', name: 'Brand Identity Suite', price: 850, type: 'flat' },
  { id: 'video-editing', name: 'Video Editing & VFX', price: 75, type: 'hourly' },
  { id: 'seo-audit', name: 'Comprehensive SEO Audit', price: 350, type: 'flat' },
  { id: 'event-photo', name: 'Event Photography/Videography', price: 120, type: 'hourly' },
  { id: 'virtual-production', name: 'Virtual Production Mapping', price: 250, type: 'hourly' },
];

export function DropshipMediaCheckout() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [details, setDetails] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();

  const selectedService = DROPSHIP_SERVICES.find(s => s.id === selectedServiceId);

  const subtotal = selectedService ? selectedService.price * quantity : 0;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      toast({ title: 'Please select a service', variant: 'destructive' });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: 'Payment Successful',
        description: `Your order for ${selectedService.name} has been processed.`,
      });
      setSelectedServiceId('');
      setQuantity(1);
      setDetails('');
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Link copied to clipboard!' });
  };

  const shareText = `Check out Arrdublu Dropship Media services!`;
  
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
                      {service.name} - ${service.price}{service.type === 'hourly' ? '/hr' : ''}
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

        {/* Social Share */}
        <div className="pt-4 border-t border-slate-800">
          <Label className="mb-3 block text-muted-foreground">Share this service</Label>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent('https://arrdublu.us/dropship-media')}`)}>
              <Twitter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://arrdublu.us/dropship-media')}`)}>
              <Facebook className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://arrdublu.us/dropship-media')}`)}>
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <form onSubmit={handleCheckout}>
          <Card className="bg-slate-950 border-cyan-500/20 sticky top-24">
            <CardHeader className="bg-cyan-950/20 border-b border-cyan-500/10">
              <CardTitle className="text-xl flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-cyan-400" />
                Secure Checkout
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Order Summary */}
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Order Summary</h3>
                <div className="flex justify-between items-start">
                  <span className="text-slate-200">{selectedService ? selectedService.name : 'No service selected'}</span>
                  <span className="font-mono text-slate-200">
                    {selectedService ? `$${selectedService.price}` : '$0'}
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
                  <span className="font-mono font-bold text-xl text-cyan-400">${subtotal}</span>
                </div>
              </div>

              {/* Card Details (Mock) */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="operator@domain.com" required className="bg-slate-900 border-slate-700" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="card-name">Name on Card</Label>
                  <Input id="card-name" placeholder="John Doe" required className="bg-slate-900 border-slate-700" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Information</Label>
                  {/* Clean unbranded card input look */}
                  <div className="relative">
                    <Input id="card-number" placeholder="0000 0000 0000 0000" required className="bg-slate-900 border-slate-700 font-mono tracking-widest pl-10" maxLength={19} />
                    <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <Input placeholder="MM/YY" required className="bg-slate-900 border-slate-700 font-mono" maxLength={5} />
                    <Input placeholder="CVC" required type="password" className="bg-slate-900 border-slate-700 font-mono" maxLength={4} />
                  </div>
                </div>
              </div>

            </CardContent>
            <CardFooter className="pb-6">
              <Button 
                type="submit" 
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold"
                disabled={!selectedService || isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${subtotal}`
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}
