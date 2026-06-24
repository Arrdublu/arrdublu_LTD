
import { CaseStudyGrid } from '@/components/case-studies/CaseStudyGrid';

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">
          Case Studies
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-foreground/80">
          Explore our successful partnerships and see how we've helped our clients achieve their goals.
        </p>
      </div>
      <CaseStudyGrid />
    </div>
  );
}
