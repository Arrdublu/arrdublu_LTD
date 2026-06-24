
import { SupportForm } from '@/components/support/SupportForm';

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Support Center
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          We&apos;re here to help. Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>
      <div className="max-w-2xl mx-auto">
        <SupportForm />
      </div>
    </div>
  );
}
