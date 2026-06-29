
import { CaseStudyGrid } from '@/components/case-studies/CaseStudyGrid';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

export default function CaseStudiesPage() {
  return (
    <div className="container mx-auto px-4 py-24 min-h-screen">
      <Breadcrumbs items={[
        { label: 'Discover', href: '/discover' },
        { label: 'Case Studies', href: '/discover/case-studies' },
      ]} />
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">Global Portfolio</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase tracking-tight">
          Case Studies
        </h1>
        <p className="mt-6 text-sm md:text-base max-w-2xl mx-auto text-slate-400 font-sans leading-relaxed">
          Explore our high-fidelity productions, cognitive search architectures, and luxury identity transformations. Real-world applications of our core engineering capabilities.
        </p>
      </div>
      <CaseStudyGrid />
    </div>
  );
}
