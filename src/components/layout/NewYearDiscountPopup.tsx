'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

export function NewYearDiscountPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenNewYearPopup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenNewYearPopup', 'true');
      }, 2000); // Show after 2 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NEWYEAR2025');
    toast({
      title: 'Code Copied!',
      description: 'The discount code NEWYEAR2025 has been copied to your clipboard.',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden">
        <div className="relative h-48 w-full bg-primary/10">
            <Image 
                src="https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4"
                alt="New Year Celebration"
                fill
                className="object-cover opacity-80"
                data-ai-hint="celebration background"
                sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        <DialogHeader className="p-6">
          <DialogTitle className="font-headline text-2xl text-primary">New Year, New Savings!</DialogTitle>
          <DialogDescription className="pt-2">
            Start the year off right with a special discount. Use the code below to get 
            <span className="font-bold text-primary"> 15% OFF</span> your next order.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <pre className="py-2 px-3 text-sm font-mono bg-muted rounded-md text-center">NEWYEAR2025</pre>
            </div>
            <Button onClick={handleCopyCode} className="px-3">
              Copy Code
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
