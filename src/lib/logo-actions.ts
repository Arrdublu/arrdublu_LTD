'use server';

import { getAdminDb, handleFirestoreError, OperationType } from './firebase-admin';

export type ClientLogo = {
  id: string;
  name: string;
  imageUrl: string;
  link?: string;
  order: number;
};

export async function getClientLogos(): Promise<ClientLogo[]> {
  const db = getAdminDb();
  if (!db) {
    return [];
  }

  try {
    const snapshot = await db.collection('client-logos').orderBy('order', 'asc').get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as Record<string, any>;
      return {
        id: doc.id,
        name: data.name || '',
        imageUrl: data.imageUrl || '',
        link: data.link || '',
        order: data.order || 0,
      } as ClientLogo;
    });
  } catch (error) {
    console.error('Error fetching client logos:', error);
    return [];
  }
}

export async function addClientLogo(logo: Omit<ClientLogo, 'id'>): Promise<ClientLogo> {
  const db = getAdminDb();
  if (!db) throw new Error('Database connection is not available');

  try {
    const docRef = await db.collection('client-logos').add(logo);
    return { ...logo, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'client-logos');
    throw new Error('Failed to add logo');
  }
}

export async function updateClientLogo(id: string, updates: Partial<ClientLogo>): Promise<void> {
  const db = getAdminDb();
  if (!db) throw new Error('Database connection is not available');

  try {
    await db.collection('client-logos').doc(id).update(updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `client-logos/${id}`);
  }
}

export async function deleteClientLogo(id: string): Promise<void> {
  const db = getAdminDb();
  if (!db) throw new Error('Database connection is not available');

  try {
    await db.collection('client-logos').doc(id).delete();
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `client-logos/${id}`);
  }
}
