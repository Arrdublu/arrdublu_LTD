
import { getCaseStudiesByIds } from '@/lib/data';
import { getServiceById } from '@/lib/service-actions';
import { notFound } from 'next/navigation';
import { ServicePageClient } from './ServicePageClient';
import type { CaseStudy } from '@/lib/types';
import type { Metadata, ResolvingMetadata } from 'next';
import { constructMetadata } from '@/lib/utils';

export const revalidate = 0;

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: ServicePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    return constructMetadata({
      title: 'Service Not Found',
    });
  }

  const imageUrl = service.image;

  return constructMetadata({
    title: `${service.name} | Arrdublu`,
    description: service.description.substring(0, 160),
    image: imageUrl,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = await getServiceById(id);

  if (!service) {
    notFound();
  }

  let relatedCaseStudies: CaseStudy[] = [];
  if (service.caseStudyIds && service.caseStudyIds.length > 0) {
    relatedCaseStudies = await getCaseStudiesByIds(service.caseStudyIds);
  }

  return <ServicePageClient service={service} caseStudies={relatedCaseStudies} />;
}
