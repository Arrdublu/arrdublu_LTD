'use server';

import { firestore } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from './firebase-admin';

export type ClientLogo = {
  id: string;
  name: string;
  imageUrl: string;
  link?: string;
  order: number;
};

export async function getClientLogos(): Promise<ClientLogo[]> {
  try {
    const q = query(collection(firestore, 'client-logos'), orderBy('order', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => {
      const data = doc.data() as Record<string, any>;
      let rawUrl = data.imageUrl || '';
      if (rawUrl.startsWith('httpsa://')) {
        rawUrl = rawUrl.replace('httpsa://', 'https://');
      }
      return {
        id: doc.id,
        name: data.name || '',
        imageUrl: rawUrl,
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
  try {
    const docRef = await addDoc(collection(firestore, 'client-logos'), logo);
    return { ...logo, id: docRef.id };
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'client-logos');
    throw new Error('Failed to add logo');
  }
}

export async function updateClientLogo(id: string, updates: Partial<ClientLogo>): Promise<void> {
  try {
    const docRef = doc(firestore, 'client-logos', id);
    await updateDoc(docRef, updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `client-logos/${id}`);
  }
}

export async function deleteClientLogo(id: string): Promise<void> {
  try {
    const docRef = doc(firestore, 'client-logos', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `client-logos/${id}`);
  }
}
