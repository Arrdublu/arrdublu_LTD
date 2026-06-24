
import { getServiceById, getCaseStudiesByIds } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ServicePageClient } from './ServicePageClient';
import type { CaseStudy } from '@/lib/types';
import type { Metadata, ResolvingMetadata } from 'next';

interface ServicePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata(
  { params }: ServicePageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params
  const service = getServiceById(id)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  const parentOpenGraph = (await parent).openGraph ?? {};
  const parentTwitter = (await parent).twitter ?? {};

  const imageUrl = service.image;

  return {
    title: `${service.name} | Arrdublu`,
    description: service.description.substring(0, 160),
    openGraph: {
      ...parentOpenGraph,
      title: `${service.name} | Arrdublu`,
      description: service.description.substring(0, 160),
      url: `/service/${service.id}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      ...parentTwitter,
      card: 'summary_large_image',
      title: `${service.name} | Arrdublu`,
      description: service.description.substring(0, 160),
      images: [imageUrl],
    },
  }
}


export default async function ServicePage({ params }: ServicePageProps) {
  const { id } = await params;
  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  let relatedCaseStudies: CaseStudy[] = [];
  if (service.caseStudyIds && service.caseStudyIds.length > 0) {
    relatedCaseStudies = await getCaseStudiesByIds(service.caseStudyIds);
  }

  return <ServicePageClient service={service} caseStudies={relatedCaseStudies} />;
}
