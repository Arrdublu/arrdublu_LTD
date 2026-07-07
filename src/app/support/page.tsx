
import { SupportForm } from '@/components/support/SupportForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Support Center | Arrdublu',
  description: 'We\'re here to help. Reach out to our support team for any questions or issues.',
  openGraph: {
    title: 'Support Center | Arrdublu',
    description: 'We\'re here to help. Reach out to our support team for any questions or issues.',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Arrdublu Support',
    }],
  },
};

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
