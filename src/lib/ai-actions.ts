
'use server';

import { getServicesByIds } from '@/lib/data';
import { getServiceRecommendations } from '@/ai/dev'; // Assuming getServiceRecommendation is the function you need
import type { Service } from '@/lib/types';

export async function getRecommendedServicesAction(
  viewingHistory: string[],
  shoppingBagContents: string[]
): Promise<Service[]> {
  try {
    const allInputIds = new Set([...viewingHistory, ...shoppingBagContents]);

    const recommendations = await getServiceRecommendations({ // Using getServiceRecommendation
      viewingHistory,
      shoppingBagContents,
    });
    
    const filteredIds = recommendations.recommendedServices.filter((id: string) => !allInputIds.has(id));

    if (filteredIds.length === 0) {
      return [];
    }

    const recommendedServices = await getServicesByIds(filteredIds);
    return recommendedServices;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    return [];
  }
}
