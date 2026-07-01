
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export default function FaqPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What specific services fall under your 'Creative', 'Lifestyle', and 'SEO' categories?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our services are designed to be comprehensive. In 'Creative,' we offer Brand Identity Suites, Social Media Visual Packs, and Promotional Video Production. 'Lifestyle' includes Artisanal Portrait Sessions and Lifestyle Product Photography. Our 'SEO' category covers everything from a Comprehensive SEO Audit and Strategic Keyword Research to a full Content Marketing Strategy."
        }
      },
      {
        "@type": "Question",
        "name": "How does the hourly billing work for services like Event Photography?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For services like Event Photography and Videography, you book us by the hour. When you add the service to your bag, you can adjust the quantity to match the number of hours you need us for your event. The total cost is automatically calculated in your cart."
        }
      },
      {
        "@type": "Question",
        "name": "What is the process after I purchase a service like the 'Brand Identity Suite'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once you purchase a service, our team will contact you within one business day via the email you provided at checkout. We'll schedule an initial consultation to discuss your vision, goals, and project requirements. From there, we'll outline a project timeline and keep you updated at every stage."
        }
      },
      {
        "@type": "Question",
        "name": "Can I request a service that isn't listed on your site?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. We love unique challenges. Please use the 'Custom Request Form' on our homepage to send us the details of your project. We'll review it and get back to you to discuss how we can bring your vision to life."
        }
      },
      {
        "@type": "Question",
        "name": "What is the typical turnaround time for a project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Turnaround times vary depending on the service's scope. A Comprehensive SEO Audit typically takes 5-7 business days. A full Brand Identity Suite can take 2-3 weeks from the initial consultation to final delivery. For hourly services, the work is performed on the scheduled day. We will always provide a detailed timeline with your project proposal."
        }
      },
      {
        "@type": "Question",
        "name": "How do discount codes work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can apply a valid discount code in your shopping bag before proceeding to checkout. The discount, whether it's a percentage or a fixed amount, will be calculated and subtracted from your subtotal. Only one discount code can be used per order."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer ongoing support or retainers for services like SEO?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we believe in long-term partnerships. We offer monthly retainer packages for ongoing SEO management, content creation, and social media support. If you're interested in a retainer, please fill out our support form to schedule a consultation."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer Virtual Production and Unreal Engine 5 integrations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, Arrdublu specializes in next-generation virtual production services. We offer Unreal Engine 5 custom environment mapping and 3D digital stage creation, integrated with curved LED volume screen capture for reality-bending visual narratives."
        }
      },
      {
        "@type": "Question",
        "name": "What is Holographic Production and how does it benefit my brand?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Holographic Production at Arrdublu refers to our high-performance 3D WebGL experiences and real-time interactive product visualizations that break standard browser limitations to create high-impact, immersive engagement."
        }
      },
      {
        "@type": "Question",
        "name": "What does Cognitive SEO mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cognitive SEO is our algorithmic dominance framework that goes beyond simple keyword stuffing. We construct advanced, semantically dense content structures and technical search architectures designed to establish permanent organic authority in your industry."
        }
      },
      {
        "@type": "Question",
        "name": "Where are your headquarters, and do you work with international clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Arrdublu is headquartered in Kingston, Jamaica, blending the vibrant creative energy of the Caribbean with cutting-edge global technical standards. We deploy high-fidelity digital solutions to enterprise and luxury brand partners worldwide."
        }
      },
      {
        "@type": "Question",
        "name": "What is your refund policy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Due to the digital nature of our services and the upfront creative work involved, we do not offer refunds once a project has commenced. However, client satisfaction is our absolute priority. If you have any concerns about a service, please contact us immediately so we can find a solution. You can view our full Terms & Conditions for more details."
        }
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Find answers to common questions about our services and policies.
        </p>
      </div>
       <div className="max-w-3xl mx-auto">
        <FaqAccordion />
      </div>
    </div>
  );
}
