'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '@/lib/actions';

export function EmailNewsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await subscribeToNewsletter(email);
      setEmail('');
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-900 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto my-16 shadow-xl">
      <div className="inline-flex items-center justify-center p-3 bg-slate-900 rounded-full mb-6">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-2xl md:text-3xl font-headline font-bold text-white mb-4">
        Subscribe to our Newsletter
      </h2>
      <p className="text-slate-400 mb-8 max-w-lg mx-auto text-sm md:text-base">
        Subscribe to our newsletter to get the latest updates on free downloads, new prints, and exclusive offers.
      </p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 h-12"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="h-12 px-8"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  );
}
