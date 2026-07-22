import { firestore, auth } from './firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  writeBatch,
  type QueryConstraint
} from 'firebase/firestore';

export enum OperationType {
  GET = 'GET',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LIST = 'LIST',
  WRITE = 'WRITE'
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

export const FieldValue = {
  serverTimestamp: () => serverTimestamp(),
};

class DocRefWrapper {
  constructor(public colName: string, public docId: string) {}

  get id() {
    return this.docId;
  }

  get ref() {
    return doc(firestore, this.colName, this.docId);
  }

  async get() {
    try {
      const snap = await getDoc(this.ref);
      return {
        exists: snap.exists(),
        id: snap.id,
        ref: this,
        data: () => snap.data() || undefined,
      };
    } catch (err) {
      console.error(`DocRefWrapper.get error on ${this.colName}/${this.docId}:`, err);
      return {
        exists: false,
        id: this.docId,
        ref: this,
        data: () => undefined,
      };
    }
  }

  async set(data: any, options?: { merge?: boolean }) {
    try {
      await setDoc(this.ref, data, options || {});
    } catch (err) {
      console.error(`DocRefWrapper.set error on ${this.colName}/${this.docId}:`, err);
    }
    return this;
  }

  async update(data: any) {
    try {
      await updateDoc(this.ref, data);
    } catch (err) {
      console.error(`DocRefWrapper.update error on ${this.colName}/${this.docId}:`, err);
    }
    return this;
  }

  async delete() {
    try {
      await deleteDoc(this.ref);
    } catch (err) {
      console.error(`DocRefWrapper.delete error on ${this.colName}/${this.docId}:`, err);
    }
  }
}

class QueryWrapper {
  constructor(
    private colName: string,
    private constraints: QueryConstraint[] = []
  ) {}

  where(field: string, op: any, value: any) {
    return new QueryWrapper(this.colName, [...this.constraints, where(field, op, value)]);
  }

  orderBy(field: string, direction: 'asc' | 'desc' = 'asc') {
    return new QueryWrapper(this.colName, [...this.constraints, orderBy(field, direction)]);
  }

  limit(n: number) {
    return new QueryWrapper(this.colName, [...this.constraints, limit(n)]);
  }

  async get() {
    try {
      const q = query(collection(firestore, this.colName), ...this.constraints);
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(snap => ({
        id: snap.id,
        exists: snap.exists(),
        ref: new DocRefWrapper(this.colName, snap.id),
        data: () => snap.data(),
      }));

      return {
        empty: snapshot.empty,
        size: snapshot.size,
        docs,
        forEach: (callback: (doc: any) => void) => docs.forEach(callback),
      };
    } catch (err) {
      console.error(`QueryWrapper.get error on ${this.colName}:`, err);
      return {
        empty: true,
        size: 0,
        docs: [],
        forEach: (_cb: any) => {},
      };
    }
  }

  async add(data: any) {
    try {
      const docRef = await addDoc(collection(firestore, this.colName), data);
      return new DocRefWrapper(this.colName, docRef.id);
    } catch (err) {
      console.error(`QueryWrapper.add error on ${this.colName}:`, err);
      const autoId = doc(collection(firestore, this.colName)).id;
      return new DocRefWrapper(this.colName, autoId);
    }
  }

  doc(id?: string) {
    const actualId = id || doc(collection(firestore, this.colName)).id;
    return new DocRefWrapper(this.colName, actualId);
  }
}

class BatchWrapper {
  private batchInstance = writeBatch(firestore);

  update(docRefWrapper: any, data: any) {
    const targetRef = docRefWrapper?.ref ? docRefWrapper.ref : docRefWrapper;
    this.batchInstance.update(targetRef, data);
    return this;
  }

  set(docRefWrapper: any, data: any, options?: any) {
    const targetRef = docRefWrapper?.ref ? docRefWrapper.ref : docRefWrapper;
    this.batchInstance.set(targetRef, data, options);
    return this;
  }

  delete(docRefWrapper: any) {
    const targetRef = docRefWrapper?.ref ? docRefWrapper.ref : docRefWrapper;
    this.batchInstance.delete(targetRef);
    return this;
  }

  async commit() {
    try {
      await this.batchInstance.commit();
    } catch (err) {
      console.error('BatchWrapper.commit error:', err);
    }
  }
}

export function getAdminDb() {
  return {
    collection(colName: string) {
      return new QueryWrapper(colName);
    },
    batch() {
      return new BatchWrapper();
    }
  } as any;
}


