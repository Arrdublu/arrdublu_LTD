import { Metadata } from 'next';
import { DropshipMediaCheckout } from '@/components/dropship/DropshipMediaCheckout';

export const metadata: Metadata = {
  title: 'Dropship Media | Industry Pricing & Fast Checkout | Arrdublu',
  description: 'Instantly book Arrdublu\'s premium media services, creative design, and virtual production at industry-standard pricing with our seamless checkout.',
  openGraph: {
    title: 'Dropship Media | Fast Checkout | Arrdublu',
    description: 'Instantly book Arrdublu\'s premium media services, creative design, and virtual production at industry-standard pricing with our seamless checkout.',
    url: 'https://arrdublu.us/dropship-media',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Arrdublu Dropship Media',
    }],
  },
};

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
