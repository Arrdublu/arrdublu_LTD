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
  status?: 'Live' | 'Archived';
  sortOrder?: number;
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const db = getAdminDb();
  if (!db) {
    return [];
  }
  try {
    const snapshot = await db.collection('portfolio').get();
    
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

    if (snapshot.empty) {
      const seededItems: PortfolioItem[] = [];
      let index = 0;
      for (const study of caseStudies) {
        const title = study.id === 'viral-post' ? 'KFC Viral Visual: The Power of a Single Post' : study.title;
        const item: Omit<PortfolioItem, 'id'> = {
          title,
          client: DEFAULT_CLIENTS[study.id] || study.category || 'Elite Client',
          description: study.description,
          imageUrl: study.image,
          services: [study.category],
          videoEmbed: '',
          videoCaption: '',
          status: study.status || 'Live',
          sortOrder: index++,
        };
        await db.collection('portfolio').doc(study.id).set({
          ...item,
          createdAt: FieldValue.serverTimestamp()
        });
        seededItems.push({ id: study.id, ...item });
      }
      return seededItems;
    }

    // Self-healing / Migration: check if any item is missing 'sortOrder' or has old 'viral-post' title
    let needsMigration = false;
    const batch = db.batch();
    
    snapshot.docs.forEach((doc, idx) => {
      const data = doc.data();
      let updatedData: any = {};
      
      if (doc.id === 'viral-post' && data.title !== 'KFC Viral Visual: The Power of a Single Post') {
        updatedData.title = 'KFC Viral Visual: The Power of a Single Post';
        needsMigration = true;
      }
      
      if (data.sortOrder === undefined) {
        updatedData.sortOrder = idx;
        needsMigration = true;
      }
      
      if (!data.status) {
        const staticStudy = caseStudies.find(s => s.id === doc.id);
        updatedData.status = staticStudy?.status || 'Live';
        needsMigration = true;
      }
      
      if (Object.keys(updatedData).length > 0) {
        batch.update(doc.ref, updatedData);
      }
    });
    
    if (needsMigration) {
      await batch.commit();
      // Re-fetch fresh data after batch commit completes
      const freshSnapshot = await db.collection('portfolio').get();
      const items = freshSnapshot.docs.map(doc => {
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
          status: data.status || 'Live',
          sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
        };
      }) as PortfolioItem[];
      return items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
    }

    const items = snapshot.docs.map(doc => {
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
        status: data.status || 'Live',
        sortOrder: data.sortOrder !== undefined ? data.sortOrder : 0,
      };
    }) as PortfolioItem[];

    return items.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
  } catch (error) {
    console.error("Error fetching portfolio items:", error);
    return [];
  }
}

export async function updatePortfolioOrders(orderedIds: string[]): Promise<{ success: boolean }> {
  const db = getAdminDb();
  if (!db) {
    throw new Error('Database connection is not available.');
  }
  
  const batch = db.batch();
  orderedIds.forEach((id, index) => {
    const docRef = db.collection('portfolio').doc(id);
    batch.update(docRef, { sortOrder: index });
  });
  
  await batch.commit();
  revalidatePath('/admin/portfolio');
  return { success: true };
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
