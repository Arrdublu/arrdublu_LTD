
'use server';

import { services } from './data';
import type { Service } from './types';

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

  // Simulate network latency for demonstration purposes
  await new Promise(resolve => setTimeout(resolve, 500));

  return filteredServices;
}
