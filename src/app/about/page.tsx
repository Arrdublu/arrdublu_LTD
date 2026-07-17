import { constructMetadata } from '@/lib/utils';
import React from 'react';
import { Metadata } from 'next';
import AboutDirectorClient from './page-client';

export const metadata: Metadata = constructMetadata({
  title: 'The Director | Arrdublu Studio',
  description: 'Meet Ramone Wynter, the Creative Director and founder of Arrdublu. Discover his vision and hands-on approach to premium digital and cinematic production.',
});

export default function AboutDirectorPage() {
  return <AboutDirectorClient />;
}
