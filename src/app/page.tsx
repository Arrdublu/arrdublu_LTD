import { Metadata } from 'next';
import PageClient from './page-client';

export const metadata: Metadata = {
  title: 'Arrdublu | Digital & Experiential Design Agency',
  description: 'Arrdublu delivers high-impact digital experiences, specializing in WebGL, real-time engines, and innovative brand identities.',
  openGraph: {
    title: 'Arrdublu | Creative Tech & Visual Experiences',
    description: 'Arrdublu delivers high-impact digital experiences, specializing in WebGL, real-time engines, and innovative brand identities.',
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/Header_Starting_white_Logo.png?alt=media&token=1fcb002e-29e8-499a-bd7a-66ef2c125021',
        width: 1200,
        height: 630,
        alt: 'Arrdublu Experience',
      },
    ],
  },
}

export default function Home() {
  return <PageClient />;
}
