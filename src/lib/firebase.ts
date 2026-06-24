import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getAuth, type Auth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let firestore: Firestore;
let auth: Auth;

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

export { app, firestore, auth, firebaseConfig };
