import { constructMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import { DropshipMediaCheckout } from '@/components/dropship/DropshipMediaCheckout';

export const metadata: Metadata = constructMetadata({
  title: 'Dropship Media | Industry Pricing & Fast Checkout | Arrdublu',
  description: 'Instantly book Arrdublu media services.',
});

export default function DropshipMediaPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Express Booking</span>
        </div>
      </div>
      <DropshipMediaCheckout />
    </div>
  );
}
