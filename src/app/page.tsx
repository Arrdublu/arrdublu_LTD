import { constructMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import PageClient from './page-client';
import { getWebsiteImage } from '@/lib/actions';

export const metadata: Metadata = constructMetadata({
  title: 'Arrdublu | Digital & Experiential Design Agency',
  description: 'Arrdublu delivers high-impact digital experiences, specializing in WebGL, real-time engines, and innovative brand identities.',
});

export default async function Home() {
  const founderImage = await getWebsiteImage('The_Hands_On_Approach');
  return <PageClient founderImage={founderImage} />;
}
