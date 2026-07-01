
'use server';

import { services } from './data';
import type { Service } from './types';
import { getAdminDb } from './firebase-admin';

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
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Failed to log search query:', err);
  }
}

export async function searchServices(query: string): Promise<Service[]> {
  if (!query) {
    return [];
  }

  const searchTerm = query.toLowerCase();

  const filteredServices = services.filter((service) => {
    return (
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.category.toLowerCase().includes(searchTerm)
    );
  });

  // Log the search query in the background asynchronously
  logSearchQuery(query, filteredServices.length).catch(err => {
    console.error('Background logging error:', err);
  });

  // Simulate network latency for demonstration purposes
  await new Promise(resolve => setTimeout(resolve, 500));

  return filteredServices;
}
