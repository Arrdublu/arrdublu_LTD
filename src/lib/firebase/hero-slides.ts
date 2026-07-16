import { firestore } from '../firebase';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, query, orderBy, getDoc } from 'firebase/firestore';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrlMobile: string;
  videoUrlDesktop: string;
  order: number;
}

const COLLECTION_NAME = 'hero_slides';

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const q = query(collection(firestore, COLLECTION_NAME), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as HeroSlide));
  } catch (error) {
    console.error('Error getting hero slides:', error);
    return [];
  }
}

export async function addHeroSlide(slide: Omit<HeroSlide, 'id'>): Promise<string> {
  const docRef = await addDoc(collection(firestore, COLLECTION_NAME), slide);
  return docRef.id;
}

export async function updateHeroSlide(id: string, data: Partial<HeroSlide>): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
}

export async function deleteHeroSlide(id: string): Promise<void> {
  const docRef = doc(firestore, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}
