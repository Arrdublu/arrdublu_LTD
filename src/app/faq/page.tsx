
import { FaqAccordion } from '@/components/faq/FaqAccordion';

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12">
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
