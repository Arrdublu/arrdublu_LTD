'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { subscribeToNewsletter } from '@/lib/actions';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if the user has already seen the popup
    const hasSeenPopup = localStorage.getItem('exit_intent_seen');
    if (hasSeenPopup) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Show when the cursor leaves the top edge of the window
      if (e.clientY <= 0) {
        setIsOpen(true);
        localStorage.setItem('exit_intent_seen', 'true');
        // Remove the event listener after showing the popup
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await subscribeToNewsletter(email);

      toast({
        title: "Subscribed!",
        description: "You've successfully joined our newsletter.",
      });
      setIsOpen(false);
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem subscribing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-zinc-950 border-zinc-800 p-8">
        <DialogHeader>
          <div className="mx-auto bg-cyan-500/10 p-3 rounded-full mb-4">
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
          <DialogTitle className="text-2xl text-center text-white">Before you go...</DialogTitle>
          <DialogDescription className="text-center text-zinc-400 mt-2">
            Subscribe to our newsletter to get the latest updates on free downloads, new prints, and exclusive offers.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <Input 
            type="email" 
            placeholder="Enter your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-zinc-900 border-zinc-800 text-white"
          />
          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" disabled={isSubmitting}>
            {isSubmitting ? "Subscribing..." : "Join Newsletter"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
            No thanks, I'll pass
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
