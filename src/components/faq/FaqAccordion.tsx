
'use client'

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FaqCategory = 'Services' | 'Pricing' | 'General';

type FaqItem = {
    question: string;
    answer: string;
    category: FaqCategory;
};

const faqItems: FaqItem[] = [
    {
        question: "What specific services fall under your 'Creative', 'Lifestyle', and 'SEO' categories?",
        answer: "Our services are designed to be comprehensive. In 'Creative,' we offer Brand Identity Suites, Social Media Visual Packs, and Promotional Video Production. 'Lifestyle' includes Artisanal Portrait Sessions and Lifestyle Product Photography. Our 'SEO' category covers everything from a Comprehensive SEO Audit and Strategic Keyword Research to a full Content Marketing Strategy.",
        category: "Services"
    },
    {
        question: "How does the hourly billing work for services like Event Photography?",
        answer: "For services like Event Photography and Videography, you book us by the hour. When you add the service to your bag, you can adjust the quantity to match the number of hours you need us for your event. The total cost is automatically calculated in your cart.",
        category: "Pricing"
    },
    {
        question: "What is the process after I purchase a service like the 'Brand Identity Suite'?",
        answer: "Once you purchase a service, our team will contact you within one business day via the email you provided at checkout. We'll schedule an initial consultation to discuss your vision, goals, and project requirements. From there, we'll outline a project timeline and keep you updated at every stage.",
        category: "Services"
    },
    {
        question: "Can I request a service that isn't listed on your site?",
        answer: "Absolutely. We love unique challenges. Please use the 'Custom Request Form' on our homepage to send us the details of your project. We'll review it and get back to you to discuss how we can bring your vision to life.",
        category: "Services"
    },
    {
        question: "What is the typical turnaround time for a project?",
        answer: "Turnaround times vary depending on the service's scope. A Comprehensive SEO Audit typically takes 5-7 business days. A full Brand Identity Suite can take 2-3 weeks from the initial consultation to final delivery. For hourly services, the work is performed on the scheduled day. We will always provide a detailed timeline with your project proposal.",
        category: "General"
    },
    {
        question: "How do discount codes work?",
        answer: "You can apply a valid discount code in your shopping bag before proceeding to checkout. The discount, whether it's a percentage or a fixed amount, will be calculated and subtracted from your subtotal. Only one discount code can be used per order.",
        category: "Pricing"
    },
    {
        question: "Do you offer ongoing support or retainers for services like SEO?",
        answer: "Yes, we believe in long-term partnerships. We offer monthly retainer packages for ongoing SEO management, content creation, and social media support. If you're interested in a retainer, please fill out our support form to schedule a consultation.",
        category: "Services"
    },
    {
        question: "Do you offer Virtual Production and Unreal Engine 5 integrations?",
        answer: "Yes, Arrdublu specializes in next-generation virtual production services. We offer Unreal Engine 5 custom environment mapping and 3D digital stage creation, integrated with curved LED volume screen capture for reality-bending visual narratives.",
        category: "Services"
    },
    {
        question: "What is Holographic Production and how does it benefit my brand?",
        answer: "Holographic Production at Arrdublu refers to our high-performance 3D WebGL experiences and real-time interactive product visualizations that break standard browser limitations to create high-impact, immersive engagement.",
        category: "Services"
    },
    {
        question: "What does Cognitive SEO mean?",
        answer: "Cognitive SEO is our algorithmic dominance framework that goes beyond simple keyword stuffing. We construct advanced, semantically dense content structures and technical search architectures designed to establish permanent organic authority in your industry.",
        category: "Services"
    },
    {
        question: "Where are your headquarters, and do you work with international clients?",
        answer: "Arrdublu is headquartered in Kingston, Jamaica, blending the vibrant creative energy of the Caribbean with cutting-edge global technical standards. We deploy high-fidelity digital solutions to enterprise and luxury brand partners worldwide.",
        category: "General"
    },
    {
        question: "What is your refund policy?",
        answer: "Due to the digital nature of our services and the upfront creative work involved, we do not offer refunds once a project has commenced. However, client satisfaction is our absolute priority. If you have any concerns about a service, please contact us immediately so we can find a solution. You can view our full Terms & Conditions for more details.",
        category: "General"
    }
]

export function FaqAccordion() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'All'>('All');

  const filteredItems = faqItems.filter(
    (item) => activeCategory === 'All' || item.category === activeCategory
  );

  const categories: (FaqCategory | 'All')[] = ['All', 'Services', 'Pricing', 'General'];

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((cat) => (
          <Button
            key={cat}
            variant="outline"
            size="sm"
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "font-mono text-xs uppercase tracking-wider transition-all duration-300 rounded",
              activeCategory === cat
                ? "bg-cyan-500 text-slate-950 border-cyan-500 hover:bg-cyan-400"
                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50"
            )}
          >
            {cat}
          </Button>
        ))}
      </div>

      <Accordion type="single" collapsible className="w-full">
          {filteredItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-slate-800/50">
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-white hover:text-cyan-400 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center gap-3">
                        <span className="font-sans text-base md:text-lg font-medium">{item.question}</span>
                        <span className="md:ml-auto w-fit text-[10px] font-mono uppercase tracking-widest text-cyan-500/70 border border-cyan-500/20 px-2 py-0.5 rounded-sm bg-cyan-950/20">
                          {item.category}
                        </span>
                      </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm md:text-base text-slate-400 leading-relaxed pb-6 pt-2">
                      <p>{item.answer}</p>
                  </AccordionContent>
              </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
}
