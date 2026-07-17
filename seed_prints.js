import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

// Setup basic Firebase Admin
const app = initializeApp({
  projectId: "arrdublu-d1c06"
});

const db = getFirestore(app);

const prints = [
  {
    name: 'Serenity Bridge',
    price: 45.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_01.png?alt=media&token=7883a21a-472d-4876-8f36-391f17387431',
    paymentLink: 'https://buy.stripe.com/placeholder_print1'
  },
  {
    name: 'Urban Geometry',
    price: 55.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_02.png?alt=media&token=f074a381-8742-498c-8519-7589d891636c',
    paymentLink: 'https://buy.stripe.com/placeholder_print2'
  },
  {
    name: 'Golden Hour Peaks',
    price: 65.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/arrdublu_03.png?alt=media&token=941dd80b-98e9-4ff4-92b4-222ddf15e8d9',
    paymentLink: 'https://buy.stripe.com/placeholder_print3'
  },
  {
    name: 'Ocean\'s Breath',
    price: 50.00,
    image: 'https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/blurred%20water%20front.jpg?alt=media&token=3cb002b8-eedb-40b3-9394-ce115accc1d4',
    paymentLink: 'https://buy.stripe.com/placeholder_print4'
  }
];

async function seed() {
  const collectionRef = db.collection('prints');
  const snapshot = await collectionRef.get();
  
  if (snapshot.empty) {
    console.log('Seeding prints...');
    for (const print of prints) {
      await collectionRef.add(print);
    }
    console.log('Seeded successfully!');
  } else {
    console.log('Prints already exist, skipping seed.');
  }
}

seed().catch(console.error);
