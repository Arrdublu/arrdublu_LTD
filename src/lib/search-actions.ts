'use server';

import { caseStudies } from './data';
import type { Service } from './types';
import { getAdminDb } from './firebase-admin';
import { getServices } from './service-actions';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'service' | 'case-study' | 'shop' | 'page';
  url: string;
  image?: string;
  price?: number;
  unit?: string;
  tags?: string[];
  rawService?: Service;
}

async function logSearchQuery(query: string, resultsCount: number) {
  try {
    const db = getAdminDb();
    if (!db) {
      console.warn('logSearchQuery: DB not initialized.');
      return;
    }
    await db.collection('search_logs').add({
      query: query.trim(),
      resultsCount,
      resultsFound: resultsCount > 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to log search query:', err);
  }
}

export async function searchServices(query: string): Promise<Service[]> {
  if (!query || !query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const allServices = await getServices();

  const filteredServices = allServices.filter((service) => {
    return (
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm) ||
      service.whatsIncluded?.some((item) => item.toLowerCase().includes(searchTerm))
    );
  });

  logSearchQuery(query, filteredServices.length).catch((err) => {
    console.error('Background logging error:', err);
  });

  return filteredServices;
}

export async function searchEntireWebsite(query: string): Promise<SearchResult[]> {
  if (!query || !query.trim()) {
    return [];
  }

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // 1. Search Services (dynamically fetched with overrides)
  const servicesList = await getServices();
  servicesList.forEach((service) => {
    const matchName = service.name.toLowerCase().includes(searchTerm);
    const matchDesc = service.description.toLowerCase().includes(searchTerm);
    const matchCat = service.category.toLowerCase().includes(searchTerm);
    const matchIncluded = service.whatsIncluded?.some((inc) => inc.toLowerCase().includes(searchTerm));

    if (matchName || matchDesc || matchCat || matchIncluded) {
      results.push({
        id: `service-${service.id}`,
        title: service.name,
        description: service.description,
        category: service.category,
        type: 'service',
        url: `/service/${service.id}`,
        image: service.image,
        price: service.price,
        unit: service.unit,
        rawService: service,
      });
    }
  });

  // 2. Search Case Studies & Selected Works
  caseStudies.forEach((study) => {
    const matchTitle = study.title.toLowerCase().includes(searchTerm);
    const matchDesc = study.description.toLowerCase().includes(searchTerm);
    const matchCat = study.category.toLowerCase().includes(searchTerm);

    if (matchTitle || matchDesc || matchCat) {
      results.push({
        id: `case-study-${study.id}`,
        title: study.title,
        description: study.description,
        category: study.category || 'Selected Work',
        type: 'case-study',
        url: study.link || `/discover/case-studies/${study.id}`,
        image: study.image,
      });
    }
  });

  // 3. Search Shop & Digital Assets
  const shopItems = [
    {
      id: 'shop-prints',
      title: 'Fine Art Limited Edition Prints',
      description: 'Archival quality photography prints, hand-numbered and certified.',
      category: 'Fine Art Prints',
      type: 'shop' as const,
      url: '/shop',
      image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_06.jpg?alt=media&token=b317a006-5cfb-4591-83fb-6f0a2f61f80b',
      price: 250,
    },
    {
      id: 'shop-dropship',
      title: 'Dropship Media Production Package',
      description: 'Turnkey visual media licensing and production packages for ecommerce brands.',
      category: 'Media Production',
      type: 'shop' as const,
      url: '/dropship-media',
      image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
      price: 499,
    },
    {
      id: 'shop-free-downloads',
      title: 'Free Production LUTs & Cinema Presets',
      description: 'Download professional color grading LUTs and lightroom presets.',
      category: 'Digital Assets',
      type: 'shop' as const,
      url: '/shop',
      image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
      price: 0,
    },
  ];

  shopItems.forEach((item) => {
    if (
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    ) {
      results.push(item);
    }
  });

  // 4. Search Pages & Information
  const pages = [
    {
      id: 'page-about',
      title: 'The Director & Brand Story',
      description: 'Learn about Ramone Wynter, creative direction, and cinematic vision.',
      category: 'About',
      type: 'page' as const,
      url: '/about',
    },
    {
      id: 'page-contact',
      title: 'Inquire & Booking Request',
      description: 'Contact Arrdublu for custom creative direction, booking, or production inquiries.',
      category: 'Contact',
      type: 'page' as const,
      url: '/contact',
    },
    {
      id: 'page-faq',
      title: 'Frequently Asked Questions',
      description: 'Answers to common questions regarding timelines, rate sheets, and production.',
      category: 'Support',
      type: 'page' as const,
      url: '/faq',
    },
    {
      id: 'page-brands',
      title: 'Client & Brand Collaborations',
      description: 'Explore leading global brands and corporate partners worked with.',
      category: 'Collaborations',
      type: 'page' as const,
      url: '/discover/brands',
    },
  ];

  pages.forEach((p) => {
    if (
      p.title.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    ) {
      results.push(p);
    }
  });

  logSearchQuery(query, results.length).catch((err) => {
    console.error('Background logging error:', err);
  });

  return results;
}
