import { firestore } from '../firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';

export interface Print {
  id: string;
  name: string;
  price: number;
  image: string;
  paymentLink?: string;
}

const COLLECTION_NAME = 'prints';

export async function getPrints(): Promise<Print[]> {
  try {
    const querySnapshot = await getDocs(collection(firestore, COLLECTION_NAME));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Print));
  } catch (error) {
    console.error('Error getting prints:', error);
    return [];
  }
}

export async function addPrint(print: Omit<Print, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(firestore, COLLECTION_NAME), print);
  return docRef.id;
}

export async function updatePrint(id: string, data: Partial<Print>): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

export async function deletePrint(id: string): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
