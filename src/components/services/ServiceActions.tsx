'use client';

import type { Service } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowRight, DollarSign, Percent } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { useRouter } from 'next/navigation';

interface ServiceActionsProps {
  service: Service;
}

export function ServiceActions({ service }: ServiceActionsProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBookNowClick = () => {
    addToCart(service);
    router.push('/cart');
  };

  const handleDepositClick = () => {
    addToCart(service);
    router.push('/cart');
  };

  const handleDiscountRequestClick = () => {
    const subject = `Discount Request for: ${service.name}`;
    const body = `Hello,

I am interested in the "${service.name}" service and would like to inquire about any available discounts or promotions.

Service ID: ${service.id}

Thank you for your time.

Regards,
[Your Name]`;
    const mailtoLink = `mailto:hi@arrdublu.us?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
      <div className="mt-4 flex flex-col gap-3">
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
