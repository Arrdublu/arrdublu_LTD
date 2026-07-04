
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  writeBatch,
  serverTimestamp,
  query,
  where,
  limit,
  DocumentReference,
  CollectionReference
} from 'firebase/firestore';
import { firestore as clientDb } from './firebase';

export enum OperationType {
  GET = 'GET',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  LIST = 'LIST'
}

export function handleFirestoreError(error: any, operation: OperationType, collectionName: string) {
  console.error(`Firestore error during ${operation} on ${collectionName}:`, error);
  throw new Error(`Database operation failed: ${error?.message || error}`);
}

export const FieldValue = {
  serverTimestamp: () => serverTimestamp()
};

class DocRefWrapper {
  constructor(public ref: DocumentReference<any, any>) {}

  get id() {
    return this.ref.id;
  }

  async get() {
    const snapshot = await getDoc(this.ref);
    return {
      id: snapshot.id,
      exists: snapshot.exists(),
      data: () => snapshot.data(),
      ref: this
    };
  }

  async update(data: any) {
    await updateDoc(this.ref, data);
  }

  async set(data: any, options?: { merge: boolean }) {
    if (options) {
      await setDoc(this.ref, data, options);
    } else {
      await setDoc(this.ref, data);
    }
  }

  async delete() {
    await deleteDoc(this.ref);
  }
}

class CollectionRefWrapper {
  private queryConstraints: any[] = [];
  constructor(public ref: CollectionReference | any) {}

  where(field: string, op: string, value: any) {
    this.queryConstraints.push(where(field, op as any, value));
    return this;
  }

  limit(n: number) {
    this.queryConstraints.push(limit(n));
    return this;
  }

  async add(data: any) {
    const docRef = await addDoc(this.ref, data);
    return new DocRefWrapper(docRef);
  }

  doc(id?: string) {
    if (id) {
      return new DocRefWrapper(doc(this.ref, id));
    } else {
      return new DocRefWrapper(doc(this.ref));
    }
  }

  async get() {
    let q = this.ref;
    if (this.queryConstraints.length > 0) {
      q = query(this.ref, ...this.queryConstraints);
    }
    const snapshot = await getDocs(q);
    return {
      docs: snapshot.docs.map(d => ({
        id: d.id,
        exists: d.exists(),
        data: () => d.data(),
        ref: new DocRefWrapper(d.ref as DocumentReference<any, any>)
      })),
      empty: snapshot.empty
    };
  }
}

class BatchWrapper {
  private batch;
  constructor() {
    this.batch = writeBatch(clientDb);
  }

  set(docWrapper: DocRefWrapper, data: any, options?: { merge: boolean }) {
    this.batch.set(docWrapper.ref, data, options);
    return this;
  }

  update(docWrapper: DocRefWrapper, data: any) {
    this.batch.update(docWrapper.ref, data);
    return this;
  }

  delete(docWrapper: DocRefWrapper) {
    this.batch.delete(docWrapper.ref);
    return this;
  }

  async commit() {
    await this.batch.commit();
  }
}

class DbWrapper {
  collection(path: string) {
    return new CollectionRefWrapper(collection(clientDb, path));
  }
  
  batch() {
    return new BatchWrapper();
  }
}

export function getAdminDb() {
  return new DbWrapper();
}

