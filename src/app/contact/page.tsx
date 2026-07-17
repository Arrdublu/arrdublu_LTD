import { constructMetadata } from '@/lib/utils';

import { SupportForm } from '@/components/support/SupportForm';
import { Metadata } from 'next';

export const metadata: Metadata = constructMetadata({
  title: 'Contact | Arrdublu',
  description: 'Request a secure consultation or project specification review. Our team of elite directors and search architects is standing by.',
});

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Secure Comms</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
          Initiate Contact
        </h1>
        <p className="mt-6 text-sm md:text-base max-w-2xl mx-auto text-slate-400 font-sans leading-relaxed">
          Request a secure consultation or project specification review. Our team of elite directors and search architects is standing by.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="cyber-corner glass-panel p-8 rounded-xl border border-slate-800">
          <SupportForm />
        </div>
      </div>
    </div>
  );
}
