
'use server';

import { revalidatePath } from 'next/cache';
import { getAdminDb, handleFirestoreError, OperationType } from './firebase-admin';
import type { Discount } from './types';

type DiscountCreate = Omit<Discount, 'id'>;

// Admin action to create a discount
export async function createDiscount(
  discountData: DiscountCreate
): Promise<Discount> {
  const db = getAdminDb();
  if (!db) throw new Error('Database connection is not available.');

  // Check if discount code already exists
  let existingDiscountQuery;
  try {
    existingDiscountQuery = await db
      .collection('discounts')
      .where('code', '==', discountData.code)
      .limit(1)
      .get();
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'discounts');
  }

  if (existingDiscountQuery && !existingDiscountQuery.empty) {
    throw new Error(`Discount code "${discountData.code}" already exists.`);
  }

  let docRef;
  try {
    docRef = await db.collection('discounts').add({
      ...discountData,
      isActive: true,
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, 'discounts');
  }

  if (!docRef) {
      throw new Error("Failed to create discount");
  }

  revalidatePath('/admin/discounts');

  return {
    id: docRef.id,
    ...discountData,
  };
}

// Admin action to get all discounts
export async function getDiscounts(): Promise<Discount[]> {
  const db = getAdminDb();
  if (!db) return [];
  try {
    const snapshot = await db.collection('discounts').get();
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...(doc.data() as any) } as Discount)
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'discounts');
    return [];
  }
}

// Admin action to delete a discount
export async function deleteDiscount(id: string): Promise<void> {
    const db = getAdminDb();
    if (!db) throw new Error('Database connection is not available.');
    try {
      await db.collection('discounts').doc(id).delete();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `discounts/${id}`);
    }
    revalidatePath('/admin/discounts');
}


// Client action to verify a discount code
export async function verifyDiscountCode(code: string): Promise<Discount> {
  const db = getAdminDb();
  if (!db) throw new Error('Database connection is not available.');
  const uppercaseCode = code.toUpperCase();
  try {
    const snapshot = await db
      .collection('discounts')
      .where('code', '==', uppercaseCode)
      .where('isActive', '==', true)
      .limit(1)
      .get();

    if (snapshot.empty) {
      throw new Error('This discount code is not valid or has expired.');
    }

    const doc = snapshot.docs[0];
    return { id: doc.id, ...(doc.data() as any) } as Discount;
  } catch (error) {
    if (error instanceof Error && error.message.includes('not valid or has expired')) {
      throw error;
    }
    handleFirestoreError(error, OperationType.GET, 'discounts');
    throw error;
  }
}
