
import { WorkShowcase } from '@/components/work/WorkShowcase';

export default function WorkPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Our Work
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          A collection of our favorite projects. See how we've helped clients elevate their vision.
        </p>
      </div>
      <WorkShowcase />
    </div>
  );
}
