'use client';

import type { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, Percent, Clock } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ServiceActionsProps {
  service: Service;
}

export function ServiceActions({ service }: ServiceActionsProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [hours, setHours] = useState(1);

  const handleBookNowClick = () => {
    addToCart(service, service.unit === 'hr' ? hours : 1);
    router.push('/cart');
  };

  const handleDepositClick = () => {
    addToCart(service, service.unit === 'hr' ? hours : 1);
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
                value={hours}
                onChange={(e) => setHours(Math.max(1, parseInt(e.target.value) || 1))}
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
