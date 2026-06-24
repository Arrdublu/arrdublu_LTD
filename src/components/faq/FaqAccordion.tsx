
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
    {
        question: "What specific services fall under your 'Creative', 'Lifestyle', and 'SEO' categories?",
        answer: "Our services are designed to be comprehensive. In 'Creative,' we offer Brand Identity Suites, Social Media Visual Packs, and Promotional Video Production. 'Lifestyle' includes Artisanal Portrait Sessions and Lifestyle Product Photography. Our 'SEO' category covers everything from a Comprehensive SEO Audit and Strategic Keyword Research to a full Content Marketing Strategy."
    },
    {
        question: "How does the hourly billing work for services like Event Photography?",
        answer: "For services like Event Photography and Videography, you book us by the hour. When you add the service to your bag, you can adjust the quantity to match the number of hours you need us for your event. The total cost is automatically calculated in your cart."
    },
    {
        question: "What is the process after I purchase a service like the 'Brand Identity Suite'?",
        answer: "Once you purchase a service, our team will contact you within one business day via the email you provided at checkout. We'll schedule an initial consultation to discuss your vision, goals, and project requirements. From there, we'll outline a project timeline and keep you updated at every stage."
    },
    {
        question: "Can I request a service that isn't listed on your site?",
        answer: "Absolutely. We love unique challenges. Please use the 'Custom Request Form' on our homepage to send us the details of your project. We'll review it and get back to you to discuss how we can bring your vision to life."
    },
    {
        question: "What is the typical turnaround time for a project?",
        answer: "Turnaround times vary depending on the service's scope. A Comprehensive SEO Audit typically takes 5-7 business days. A full Brand Identity Suite can take 2-3 weeks from the initial consultation to final delivery. For hourly services, the work is performed on the scheduled day. We will always provide a detailed timeline with your project proposal."
    },
    {
        question: "How do discount codes work?",
        answer: "You can apply a valid discount code in your shopping bag before proceeding to checkout. The discount, whether it's a percentage or a fixed amount, will be calculated and subtracted from your subtotal. Only one discount code can be used per order."
    },
    {
        question: "Do you offer ongoing support or retainers for services like SEO?",
        answer: "Yes, we believe in long-term partnerships. We offer monthly retainer packages for ongoing SEO management, content creation, and social media support. If you're interested in a retainer, please fill out our support form to schedule a consultation."
    },
    {
        question: "What is your refund policy?",
        answer: "Due to the digital nature of our services and the upfront creative work involved, we do not offer refunds once a project has commenced. However, client satisfaction is our absolute priority. If you have any concerns about a service, please contact us immediately so we can find a solution. You can view our full Terms & Conditions for more details."
    }
]

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
                <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                    {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80 prose prose-lg max-w-none">
                    <p>{item.answer}</p>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
  );
}
