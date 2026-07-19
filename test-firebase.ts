import { app, firestore } from './src/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

async function run() {
  try {
    const docRef = await addDoc(collection(firestore, "orders"), {
      items: [{
        itemId: "item1",
        name: "Item 1",
        quantity: 1,
        price: 100
      }],
      subtotal: 100,
      totalAmount: 100,
      status: "pending",
      currency: "USD",
      createdAt: serverTimestamp()
    });
    console.log("Success", docRef.id);
  } catch (err) {
    console.error("Failed", err);
  }
  process.exit(0);
}

run();
