
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function SupportForm() {
    const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const mailtoLink = `mailto:hi@arrdublu.us?subject=${encodeURIComponent(
      values.subject
    )}&body=${encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\n\nMessage:\n${values.message}`
    )}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Your message has been prepared. Please send it from your email application.",
      className: "bg-cyan-950 border-cyan-500 text-white",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="font-mono text-xs uppercase text-cyan-400 tracking-wider">Operator Identity</FormLabel>
                  <FormControl>
                      <Input placeholder="Enter your full name" className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 font-sans" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-[10px]" />
                  </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="font-mono text-xs uppercase text-cyan-400 tracking-wider">Return Frequency (Email)</FormLabel>
                  <FormControl>
                      <Input placeholder="you@domain.com" className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 font-sans" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-[10px]" />
                  </FormItem>
              )}
              />
          </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="font-mono text-xs uppercase text-cyan-400 tracking-wider">Transmission Subject</FormLabel>
                  <FormControl>
                      <Input placeholder="e.g. Identity Architecture Consultation" className="bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 font-sans" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-400 font-mono text-[10px]" />
                  </FormItem>
              )}
              />
          <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
              <FormItem>
              <FormLabel className="font-mono text-xs uppercase text-cyan-400 tracking-wider">Encrypted Payload (Message)</FormLabel>
              <FormControl>
                  <Textarea
                  placeholder="Detail your project specifications or required support operations here..."
                  className="min-h-[160px] bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-600 focus-visible:ring-cyan-500/50 focus-visible:border-cyan-500 font-sans resize-none"
                  {...field}
                  />
              </FormControl>
              <FormMessage className="text-red-400 font-mono text-[10px]" />
              </FormItem>
          )}
          />
          <Button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:text-slate-900 transition-colors uppercase font-mono tracking-wider text-xs font-bold py-6 group">
            <Send className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            Transmit Data
          </Button>
      </form>
    </Form>
  );
}
