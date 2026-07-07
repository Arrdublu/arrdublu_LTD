
import { JobList } from '@/components/careers/JobList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers | Arrdublu',
  description: 'Join our team. We\'re looking for passionate individuals to help us shape the future of digital and experiential design.',
  openGraph: {
    title: 'Careers | Arrdublu',
    description: 'Join our team. We\'re looking for passionate individuals to help us shape the future of digital and experiential design.',
    images: [{
      url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
      width: 1200,
      height: 630,
      alt: 'Careers at Arrdublu',
    }],
  },
};

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Join Our Team
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          We&apos;re looking for passionate individuals to help us shape the future of media services.
        </p>
      </div>
      <JobList />
    </div>
  );
}
