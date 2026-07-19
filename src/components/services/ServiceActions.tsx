'use client';

import type { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, Percent, Clock, Sparkles, ShieldCheck, Mail, Send, Check } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ServiceActionsProps {
  service: Service;
}

export function ServiceActions({ service }: ServiceActionsProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  // HOOKS: Defined at the very top level of the component (unconditionally)
  const [videoHours, setVideoHours] = useState(2);
  const [defaultHours, setDefaultHours] = useState(1);
  const [depositAmount, setDepositAmount] = useState(100);
  const [showDepositForm, setShowDepositForm] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [isSubmittingQuote, setIsSubmittingQuote] = useState(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    footageDetails: '',
    targetBudget: '100',
    message: '',
  });

  // HANDLERS FOR BOTH FLOWS
  const handleHoursChange = (val: number) => {
    setVideoHours(Math.max(2, val));
  };

  const handleBookFullProject = () => {
    if (videoHours < 2) {
      toast({
        title: "Minimum Requirement",
        description: "Video Editing, VFX & Post-production bookings require a minimum of 2 hours.",
        variant: "destructive",
      });
      return;
    }
    addToCart(service, videoHours);
    router.push('/cart');
  };

  const handleCustomDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (depositAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid deposit amount.",
        variant: "destructive",
      });
      return;
    }

    // Create a cloned service item with the overridden price
    const depositService: Service = {
      ...service,
      id: `${service.id}-deposit-${Date.now()}`,
      name: `${service.name} (Custom Project Deposit)`,
      price: depositAmount,
      unit: undefined, // remove '/hr' tag
    };

    addToCart(depositService, 1);
    router.push('/cart');
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingQuote(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: quoteForm.name,
          email: quoteForm.email,
          message: `[Quote/Discount Request]\nTarget Budget Request: $${quoteForm.targetBudget}\nFootage Details: ${quoteForm.footageDetails}\n\nCreative notes & comments:\n${quoteForm.message}`,
          serviceName: service.name,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit quote request');
      }

      toast({
        title: "Proposal Sent Successfully!",
        description: "Ramone Wynter has received your specifications. Expect a response in 24 hours.",
      });
      setQuoteOpen(false);
      setQuoteForm({
        name: '',
        email: '',
        footageDetails: '',
        targetBudget: '100',
        message: '',
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Submission Error",
        description: "There was a problem sending your details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingQuote(false);
    }
  };

  const handleBookNowClick = () => {
    addToCart(service, service.unit === 'hr' ? defaultHours : 1);
    router.push('/cart');
  };

  const handleDepositClick = () => {
    addToCart(service, service.unit === 'hr' ? defaultHours : 1);
    router.push('/cart');
  };

  const handleDiscountRequestClick = () => {
    const subject = `Discount Request for: ${service.name}`;
    const body = `Hello,\n\nI am interested in the "${service.name}" service and would like to inquire about any available discounts or promotions.\nService ID: ${service.id}\n\nThank you for your time.\n\nRegards,\n[Your Name]`;
    const mailtoLink = `mailto:hi@arrdublu.us?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  // BESPOKE EXPERIENCE FOR THE VIDEO EDITING PRODUCT
  if (service.id === 'video-editing') {
    return (
      <div className="flex flex-col gap-6 bg-black/40 border border-zinc-800 rounded-xl p-6 cyber-corner relative overflow-hidden">
        {/* Dynamic Scan Line effect */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-cyan-500/30 laser-scanning-line pointer-events-none" />

        <div className="flex justify-between items-center pb-4 border-b border-zinc-800">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 block mb-1">Standard Industry Rate</span>
            <span className="text-3xl font-display font-bold text-white tracking-tight">$75.00 <span className="text-lg font-normal text-zinc-500">/ hr</span></span>
          </div>
          <div className="bg-zinc-900/80 px-2.5 py-1.5 rounded border border-zinc-800 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-300">Director-Led</span>
          </div>
        </div>

        {/* Option A: Book Full Project (Standard hourly intake) */}
        <div className="space-y-3">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 block font-bold">01. STANDARD CLIENT INTAKE</span>
            <span className="text-xs text-zinc-400">Pristine 12K editing & syncing (Minimum 2 hours)</span>
          </div>
          
          <div className="flex items-center gap-4 bg-zinc-950/80 border border-zinc-850 rounded-lg p-3">
            <Clock className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <div className="flex-1">
              <label className="text-xs font-mono uppercase text-zinc-300">Session Duration</label>
            </div>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={() => handleHoursChange(videoHours - 1)}
                disabled={videoHours <= 2}
                className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 disabled:opacity-40 disabled:hover:bg-zinc-900 transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-mono text-sm text-white font-bold">{videoHours}</span>
              <button 
                type="button"
                onClick={() => handleHoursChange(videoHours + 1)}
                className="w-8 h-8 rounded border border-zinc-800 bg-zinc-900 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
              >
                +
              </button>
              <span className="text-xs font-mono text-zinc-400 ml-1">hrs</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-xs px-1 py-1 font-mono text-zinc-400">
            <span>Project estimate ({videoHours} hrs):</span>
            <span className="text-cyan-400 font-bold">${videoHours * 75}.00 USD</span>
          </div>

          <Button size="lg" className="w-full bg-white text-zinc-950 hover:bg-zinc-200 font-bold uppercase tracking-wider text-xs" onClick={handleBookFullProject}>
            Book Full Project
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Option B: Make a Custom Deposit (Supports Safaa's $100 agreement) */}
        <div className="space-y-3 pt-4 border-t border-zinc-800/60">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-amber-500 block font-bold">02. COMPROMISE & BUDGET AGREEMENT</span>
            <span className="text-xs text-zinc-400">Lock in production with a custom deposit amount</span>
          </div>

          {!showDepositForm ? (
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 text-zinc-200 uppercase text-xs tracking-wider font-semibold" 
              onClick={() => setShowDepositForm(true)}
            >
              Make a Custom Deposit
              <DollarSign className="ml-1.5 h-4 w-4 text-amber-500" />
            </Button>
          ) : (
            <form onSubmit={handleCustomDepositSubmit} className="space-y-4 bg-zinc-950/60 border border-zinc-850 p-4 rounded-lg animate-in fade-in duration-200">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="deposit-input" className="text-xs font-mono uppercase text-zinc-300">Deposit Sum (USD)</Label>
                  <span className="text-[10px] text-zinc-500 font-mono">Preset: $100</span>
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-sm">$</span>
                  <Input
                    id="deposit-input"
                    type="number"
                    min="10"
                    max="10000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Math.max(1, parseInt(e.target.value) || 0))}
                    className="pl-7 bg-zinc-900 border-zinc-800 text-white font-mono placeholder-zinc-600 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  className="flex-1 text-xs text-zinc-400 hover:text-white"
                  onClick={() => setShowDepositForm(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  size="sm"
                  className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-zinc-950 font-bold text-xs uppercase"
                >
                  Pay Deposit
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Option C: Custom Proposal Form */}
        <div className="pt-4 border-t border-zinc-800/60">
          <Dialog open={quoteOpen} onOpenChange={setQuoteOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full border-dashed border-zinc-800 hover:border-zinc-600 bg-transparent text-zinc-400 hover:text-zinc-200 uppercase text-xs tracking-widest"
              >
                Request a Discount / Quote
                <Percent className="ml-1.5 h-3.5 w-3.5 text-zinc-500" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] bg-[#090a0c] border border-zinc-800 text-slate-100">
              <DialogHeader>
                <DialogTitle className="font-display font-light text-2xl text-white">Custom Project Proposal</DialogTitle>
                <DialogDescription className="text-zinc-400 text-xs leading-relaxed">
                  Submit project parameters directly to Ramone Wynter. Perfect for specialized editing timelines, music videos, or discussing friendly flat-rates.
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleQuoteSubmit} className="space-y-4 py-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="quote-name" className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Full Name</Label>
                    <Input 
                      id="quote-name" 
                      required 
                      value={quoteForm.name}
                      onChange={(e) => setQuoteForm({...quoteForm, name: e.target.value})}
                      placeholder="Jane Doe" 
                      className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quote-email" className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Email Address</Label>
                    <Input 
                      id="quote-email" 
                      type="email" 
                      required 
                      value={quoteForm.email}
                      onChange={(e) => setQuoteForm({...quoteForm, email: e.target.value})}
                      placeholder="jane@example.com" 
                      className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quote-footage" className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Footage Length & Format</Label>
                  <Input 
                    id="quote-footage" 
                    required 
                    value={quoteForm.footageDetails}
                    onChange={(e) => setQuoteForm({...quoteForm, footageDetails: e.target.value})}
                    placeholder="e.g. 10 mins of multi-cam live-session footage, 4K RED" 
                    className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quote-budget" className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Target Budget Request ($ USD)</Label>
                  <Input 
                    id="quote-budget" 
                    type="text"
                    required 
                    value={quoteForm.targetBudget}
                    onChange={(e) => setQuoteForm({...quoteForm, targetBudget: e.target.value})}
                    placeholder="e.g. 100 for a friendly flat-rate arrangement" 
                    className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-cyan-500"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="quote-message" className="text-xs uppercase tracking-wider text-zinc-400 font-mono">Creative Vision & Notes</Label>
                  <Textarea 
                    id="quote-message" 
                    rows={3}
                    value={quoteForm.message}
                    onChange={(e) => setQuoteForm({...quoteForm, message: e.target.value})}
                    placeholder="Describe your editing style reference, track speed, color preferences..." 
                    className="bg-zinc-900 border-zinc-800 text-white placeholder-zinc-600 focus:border-cyan-500 focus:ring-cyan-500 resize-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmittingQuote} className="w-full mt-4 bg-white text-zinc-950 hover:bg-zinc-200 font-bold uppercase tracking-wider text-xs">
                  {isSubmittingQuote ? "Submitting Proposal..." : "Submit Quote Request"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    );
  }

  // DEFAULT INTAKE FOR OTHER SERVICES
  return (
      <div className="mt-4 flex flex-col gap-3">
          {service.unit === 'hr' && (
            <div className="flex items-center gap-4 mb-2 p-3 border border-slate-800 rounded-md bg-slate-950/30">
              <Clock className="w-5 h-5 text-slate-400" />
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-200">Select Hours</label>
                <p className="text-xs text-slate-500">Minimum 1 hour</p>
              </div>
              <input
                type="number"
                min="1"
                value={defaultHours}
                onChange={(e) => setDefaultHours(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 bg-slate-900 border border-slate-700 rounded p-2 text-center text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}
          
           <Button size="lg" className="w-full" onClick={handleBookNowClick}>
              Book Now
              <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button size="lg" variant="secondary" className="w-full" onClick={handleDepositClick}>
              Make a Deposit
              <DollarSign className="ml-2 h-5 w-5" />
          </Button>

           <Button size="lg" variant="outline" className="w-full" onClick={handleDiscountRequestClick}>
              Request a Discount
              <Percent className="ml-2 h-5 w-5" />
          </Button>
      </div>
  )
}

