
import { JobList } from '@/components/careers/JobList';

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
