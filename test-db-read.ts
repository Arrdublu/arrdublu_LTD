import { getAdminDb } from './src/lib/firebase-admin';

async function checkErrors() {
  const db = getAdminDb();
  if (!db) {
    console.error("No db");
    process.exit(1);
  }
  
  const snapshot = await db.collection("email_delivery_errors").get();
  console.log("Errors count:", snapshot.docs.length);
  snapshot.docs.forEach((doc: any) => console.log(doc.id, doc.data()));

  const contactsSnapshot = await db.collection("contacts").get();
  console.log("Contacts count:", contactsSnapshot.docs.length);
  
  process.exit(0);
}

checkErrors();
