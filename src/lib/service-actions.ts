'use server';

import { getAdminDb, FieldValue } from './firebase-admin';
import { revalidatePath } from 'next/cache';
import { services as staticServices } from './data';
import type { Service } from './types';

/**
 * Get all services, merging static definitions with Firestore 'service_cards' overrides.
 */
export async function getServices(): Promise<Service[]> {
  const db = getAdminDb();
  if (!db) {
    return staticServices;
  }

  try {
    const snapshot = await db.collection('service_cards').get();
    if (snapshot.empty) {
      return staticServices;
    }

    const overridesMap = new Map<string, Partial<Service>>();
    snapshot.docs.forEach((docSnap: any) => {
      overridesMap.set(docSnap.id, docSnap.data() as Partial<Service>);
    });

    return staticServices.map(service => {
      const override = overridesMap.get(service.id);
      if (!override) return service;
      return {
        ...service,
        ...override,
        image: override.image || service.image,
        previews: override.previews && override.previews.length > 0 ? override.previews : service.previews,
      };
    });
  } catch (error) {
    console.error('Error fetching service card overrides:', error);
    return staticServices;
  }
}

/**
 * Get a specific service by ID, including any Firestore card image overrides.
 */
export async function getServiceById(id: string): Promise<Service | undefined> {
  const allServices = await getServices();
  return allServices.find(s => s.id === id);
}

/**
 * Update service card preview image(s) and metadata in Firestore.
 */
export async function updateServiceCardImages(
  serviceId: string,
  data: {
    image?: string;
    previews?: string[];
    name?: string;
    description?: string;
    price?: number;
    category?: 'SEO' | 'Creative' | 'Lifestyle';
    unit?: 'hr';
  }
): Promise<{ success: boolean; error?: string }> {
  const db = getAdminDb();
  if (!db) {
    return { success: false, error: 'Database connection is not available.' };
  }

  try {
    await db.collection('service_cards').doc(serviceId).set(
      {
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    revalidatePath('/service');
    revalidatePath(`/service/${serviceId}`);
    revalidatePath('/search');
    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to update service card preview images:', error);
    return { success: false, error: error?.message || 'Failed to update service card images.' };
  }
}

/**
 * Reset service card images back to the static defaults by removing the override.
 */
export async function resetServiceCardImages(serviceId: string): Promise<{ success: boolean; error?: string }> {
  const db = getAdminDb();
  if (!db) {
    return { success: false, error: 'Database connection is not available.' };
  }

  try {
    await db.collection('service_cards').doc(serviceId).delete();
    revalidatePath('/service');
    revalidatePath(`/service/${serviceId}`);
    revalidatePath('/search');
    revalidatePath('/admin/services');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to reset service card preview images:', error);
    return { success: false, error: error?.message || 'Failed to reset service card images.' };
  }
}
