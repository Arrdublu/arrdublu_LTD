import { constructMetadata } from '@/lib/utils';
import { Metadata } from 'next';
import PageClient from './page-client';

export const metadata: Metadata = constructMetadata({
  title: 'Arrdublu | Digital & Experiential Design Agency',
  description: 'Arrdublu delivers high-impact digital experiences, specializing in WebGL, real-time engines, and innovative brand identities.',
});

export default function Home() {
  return <PageClient />;
}
