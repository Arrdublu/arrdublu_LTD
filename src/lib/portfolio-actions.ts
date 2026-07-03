'use server';

import { getAdminDb, FieldValue } from './firebase-admin';
import { revalidatePath } from 'next/cache';
import { caseStudies } from './data';

export interface PortfolioItem {
  id?: string;
  title: string;
  client: string;
  description: string;
  imageUrl: string;
  videoEmbed?: string;
  videoCaption?: string;
  services: string[];
  createdAt?: any;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const db = getAdminDb();
  if (!db) {
    return [];
  }
  try {
    const snapshot = await db.collection('portfolio').get();
    
    if (snapshot.empty) {
      const seededItems: PortfolioItem[] = [];
      const DEFAULT_CLIENTS: Record<string, string> = {
        'global-rebrand': 'The Saint T Collective',
        'annual-corporate-summit': 'Corporate Tech Client',
        'executive-portraits': 'C-Suite Executive',
        'production-makeup-collaboration': 'Ioka Beautiful Purpose',
        'luxury-lifestyle-launch': 'Luxury Brand',
        'viral-post': 'Local Cafe',
        'executive-identity': 'Top Consulting Firm',
        'futuristic-tech-launch': 'Tech Innovator',
        'luxury-real-estate-showcase': 'Elite Real Estate Group'
      };

      for (const study of caseStudies) {
        const item: Omit<PortfolioItem, 'id'> = {
          title: study.title,
          client: DEFAULT_CLIENTS[study.id] || study.category || 'Elite Client',
          description: study.description,
          imageUrl: study.image,
          services: [study.category],
          videoEmbed: '',
          videoCaption: ''
        };
        await db.collection('portfolio').doc(study.id).set({
          ...item,
          createdAt: FieldValue.serverTimestamp()
        });
        seededItems.push({ id: study.id, ...item });
      }
      return seededItems;
    }

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        client: data.client || '',
        description: data.description || '',
        imageUrl: data.imageUrl || '',
        videoEmbed: data.videoEmbed || '',
        videoCaption: data.videoCaption || '',
        services: data.services || [],
      };
    }) as PortfolioItem[];
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}

export async function addPortfolioItem(data: Omit<PortfolioItem, 'id' | 'createdAt'>): Promise<{ success: boolean; id?: string }> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Database connection is not available.');
  }
  
  const docRef = await db.collection('portfolio').add({
    ...data,
    createdAt: FieldValue.serverTimestamp()
  });
  
  revalidatePath('/admin/portfolio');
  return { success: true, id: docRef?.id };
}

export async function updatePortfolioItem(id: string, data: Partial<PortfolioItem>): Promise<{ success: boolean }> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Database connection is not available.');
  }
  
  await db.collection('portfolio').doc(id).update(data);
  revalidatePath('/admin/portfolio');
  return { success: true };
}

export async function deletePortfolioItem(id: string): Promise<{ success: boolean }> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Database connection is not available.');
  }
  
  await db.collection('portfolio').doc(id).delete();
  revalidatePath('/admin/portfolio');
  return { success: true };
}
