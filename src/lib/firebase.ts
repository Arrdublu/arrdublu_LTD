import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;
let storage: FirebaseStorage;

if (getApps().length) {
  app = getApp();
} else {
  // Basic validation to check if config is not placeholder
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes('TODO')) {
    console.warn('Firebase API Key is missing or appears to be a placeholder. Firebase features may not work correctly.');
  }
  app = initializeApp(firebaseConfig);
}

firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
auth = getAuth(app);
storage = getStorage(app);

export { app, firestore, firestore as db, auth, storage, firebaseConfig };
