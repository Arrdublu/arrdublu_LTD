
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Importing Input explicitly
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { services } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  preferredService: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters.").describe("Details of the custom request."),
});

export function CustomRequestForm() {
    const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      preferredService: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const subject = "Custom Service Request";
    const body = `Name: ${values.name}
Email: ${values.email}
Preferred Service: ${values.preferredService || 'Not specified'}

Message:
${values.message}`;
    
    const mailtoLink = `mailto:hi@arrdublu.us?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;

    toast({
      title: "Opening Email Client",
      description: "Your custom request has been prepared. Please send it from your email application.",
    });
    form.reset();
  }

  return (
    <Card> {/* Card component is used */}
        <CardContent className="pt-6">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <FormField
                    control={form.control}
 name="name"
 render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                            <Input placeholder="John Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
 name="email"
 render={({ field }: { field: any }) => (
                        <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                            <Input placeholder="you@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                </div>

                 <FormField
 control={form.control}
                    name="preferredService"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Preferred Service (Optional)</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a service" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {services.map(service => (
                                    <SelectItem key={service.id} value={service.name}>{service.name}</SelectItem>
                                ))}
                                <SelectItem value="Other">Other (please specify in message)</SelectItem>
                            </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                <FormField
                control={form.control}
 name="message"
 render={({ field }: { field: any }) => (
                    <FormItem>
                    <FormLabel>Describe Your Request</FormLabel>
                    <FormControl>
                        <Textarea
                        placeholder="Tell us about your project needs, budget, and timeline..."
                        className="min-h-[120px]"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full md:w-auto">
                <Send className="mr-2 h-4 w-4" />
                Submit Custom Request
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
