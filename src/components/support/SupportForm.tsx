
'use client';

import { useState } from "react";
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
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { submitContactRequest } from "@/lib/actions";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export function SupportForm() {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitStatus("loading");
    try {
      await submitContactRequest(values);
      setSubmitStatus("success");
      form.reset();
    } catch (error) {
      setSubmitStatus("error");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {submitStatus === "success" && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-start gap-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-wider">Transmission Successful</p>
              <p className="text-sm mt-1 text-emerald-400/80">Your message has been securely transmitted to our support team.</p>
            </div>
          </div>
        )}

        {submitStatus === "error" && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-start gap-3 text-red-400">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <div>
              <p className="font-mono text-sm font-bold uppercase tracking-wider">Transmission Failed</p>
              <p className="text-sm mt-1 text-red-400/80">There was an error communicating with the server. Please try again later.</p>
            </div>
          </div>
        )}

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
          <Button id="contact-submit-button" disabled={submitStatus === "loading"} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 hover:text-slate-900 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] focus-visible:ring-2 focus-visible:ring-cyan-500/50 uppercase font-mono tracking-wider text-xs font-bold py-6 group disabled:opacity-70 disabled:cursor-not-allowed">
            {submitStatus === "loading" ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            )}
            {submitStatus === "loading" ? "Transmitting..." : "Transmit Data"}
          </Button>
      </form>
    </Form>
  );
}
