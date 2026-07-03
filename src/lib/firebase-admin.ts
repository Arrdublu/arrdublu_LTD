
import { 
  collection, 
  doc, 
  addDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  setDoc,
  query, 
  where as fsWhere, 
  limit as fsLimit,
  writeBatch,
  serverTimestamp,
  QueryConstraint
} from 'firebase/firestore';
import { firestore } from './firebase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
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

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, userId?: string | null): never {
  const errMessage = error instanceof Error ? error.message : String(error);
  const errInfo: FirestoreErrorInfo = {
    error: errMessage,
    authInfo: {
      userId: userId || null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  const stringified = JSON.stringify(errInfo);
  console.error('Firestore Error: ', stringified);
  throw new Error(stringified);
}

// Mock of FieldValue for standard Firestore client
export const FieldValue = {
  serverTimestamp: () => serverTimestamp()
};

// Lightweight wrappers around modular Client SDK to retain legacy/Admin SDK class structure
class DocRefWrapper {
  constructor(public path: string, public id: string) {}

  async get(): Promise<DocSnapshotWrapper> {
    try {
      const dSnapshot = await getDoc(doc(firestore, this.path, this.id));
      return new DocSnapshotWrapper(dSnapshot, this.path);
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `${this.path}/${this.id}`);
    }
  }

  async update(data: any) {
    try {
      await updateDoc(doc(firestore, this.path, this.id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `${this.path}/${this.id}`);
    }
  }

  async set(data: any) {
    try {
      await setDoc(doc(firestore, this.path, this.id), data);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `${this.path}/${this.id}`);
    }
  }

  async delete() {
    try {
      await deleteDoc(doc(firestore, this.path, this.id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `${this.path}/${this.id}`);
    }
  }
}

class DocSnapshotWrapper {
  public id: string;
  public exists: boolean;
  constructor(private snapshot: any, private path: string) {
    this.id = snapshot.id;
    this.exists = snapshot.exists();
  }

  data() {
    const d = this.snapshot.data();
    if (d && d.createdAt && typeof d.createdAt.toDate !== 'function') {
      if (d.createdAt.seconds) {
        d.createdAt.toDate = () => new Date(d.createdAt.seconds * 1000);
      } else if (d.createdAt instanceof Date) {
        d.createdAt.toDate = () => d.createdAt;
      } else {
        d.createdAt.toDate = () => new Date(d.createdAt);
      }
    }
    return d;
  }

  get ref() {
    return new DocRefWrapper(this.path, this.id);
  }
}

class QuerySnapshotWrapper {
  public docs: any[];
  public empty: boolean;
  constructor(docs: any[], path: string) {
    this.docs = docs.map(d => new DocSnapshotWrapper(d, path));
    this.empty = docs.length === 0;
  }
}

class CollectionRefWrapper {
  constructor(private path: string, private constraints: QueryConstraint[] = []) {}

  where(field: string, opStr: string, value: any) {
    const newConstraints = [...this.constraints, fsWhere(field, opStr as any, value)];
    return new CollectionRefWrapper(this.path, newConstraints);
  }

  limit(num: number) {
    const newConstraints = [...this.constraints, fsLimit(num)];
    return new CollectionRefWrapper(this.path, newConstraints);
  }

  async add(data: any) {
    try {
      const cleanData = this.cleanupTimestamps(data);
      const docRef = await addDoc(collection(firestore, this.path), cleanData);
      return new DocRefWrapper(this.path, docRef.id);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, this.path);
    }
  }

  doc(id: string) {
    return new DocRefWrapper(this.path, id);
  }

  async get(): Promise<QuerySnapshotWrapper> {
    try {
      const q = query(collection(firestore, this.path), ...this.constraints);
      const qSnapshot = await getDocs(q);
      return new QuerySnapshotWrapper(qSnapshot.docs, this.path);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, this.path);
    }
  }

  private cleanupTimestamps(data: any): any {
    if (!data) return data;
    const result = { ...data };
    for (const key of Object.keys(result)) {
      if (result[key] && typeof result[key] === 'object' && typeof result[key].toString === 'function' && result[key].toString().includes('serverTimestamp')) {
        result[key] = serverTimestamp();
      }
    }
    return result;
  }
}

class BatchWrapper {
  private batch: any;
  constructor() {
    this.batch = writeBatch(firestore);
  }

  delete(docRef: DocRefWrapper) {
    this.batch.delete(doc(firestore, docRef.path, docRef.id));
    return this;
  }

  set(docRef: DocRefWrapper, data: any) {
    this.batch.set(doc(firestore, docRef.path, docRef.id), data);
    return this;
  }

  update(docRef: DocRefWrapper, data: any) {
    this.batch.update(doc(firestore, docRef.path, docRef.id), data);
    return this;
  }

  async commit() {
    try {
      await this.batch.commit();
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'batch');
    }
  }
}

class AdminDbWrapper {
  collection(path: string) {
    return new CollectionRefWrapper(path);
  }

  batch() {
    return new BatchWrapper();
  }
}

const dbInstance = new AdminDbWrapper();

export function getAdminDb() {
  return dbInstance;
}

export function getAdminAuth() {
  return null;
}

export { dbInstance as adminDb };

