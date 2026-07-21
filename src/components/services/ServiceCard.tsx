
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Service } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/context/CurrencyProvider';
import { ArrowRight, Send } from 'lucide-react';
import { useCart } from '@/context/CartProvider';
import { SocialShare } from '@/components/magazine/SocialShare';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { getFormattedPrice } = useCurrency();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);

  const handleBookNowClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(service);
  };

  const handleQuickRequestSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
          serviceName: service.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || 'Failed to send request');
      }

      toast({
        title: "Request Sent!",
        description: `We'll be in touch regarding ${service.name} shortly.`,
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "There was a problem sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-xl group">
      <div className="relative">
        <Link href={`/service/${service.id}`} className="block">
          <div className="aspect-video relative overflow-hidden">
            <Image
              src={service.image}
              alt={service.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={`${service.category.toLowerCase()} service`}
            />
          </div>
        </Link>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-sm z-10">
           <SocialShare 
            url={`/service/${service.id}`} 
            title={service.name} 
            image={service.image}
            layout="compact" 
          />
        </div>
      </div>
      <CardHeader>
        <Link href={`/service/${service.id}`}>
          <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors">
            {service.name}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <CardDescription className="flex-grow mb-4">
            {service.description.substring(0, 100)}...
        </CardDescription>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
            <p className="text-lg font-semibold text-primary dark:text-accent">
                {getFormattedPrice(service.price)}
                {service.unit === 'hr' && <span className="text-sm font-normal text-muted-foreground">/hr</span>}
            </p>
            <div className="flex gap-2">
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button variant="secondary" size="sm" onClick={(e) => e.stopPropagation()}>
                        Quick Request
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]" onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle>Quick Request</DialogTitle>
                      <DialogDescription>
                        Interested in <strong>{service.name}</strong>? Fill out this quick form and we'll get back to you.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleQuickRequestSubmit} className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required placeholder="Jane Doe" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" required placeholder="jane@example.com" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea id="message" name="message" placeholder={`I'm interested in the ${service.name} service...`} />
                      </div>
                      <Button type="submit" disabled={isSubmitting} className="w-full mt-2">
                        {isSubmitting ? "Sending..." : (
                          <>
                            Send Request <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                
                <Button variant="outline" size="sm" onClick={handleBookNowClick}>
                    Book
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
