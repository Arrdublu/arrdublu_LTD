import { getAdminDb, FieldValue } from './src/lib/firebase-admin';

async function testContact() {
  const db = getAdminDb();
  if (!db) {
    console.error("Database wrapper failed to initialize");
    return;
  }
  try {
    console.log("Attempting to write to 'contacts' collection...");
    const docRef = await db.collection("contacts").add({
      name: "Test User",
      email: "test@example.com",
      subject: "Test Subject From Agent",
      message: "This is a test message of sufficient length (longer than ten characters).",
      createdAt: FieldValue.serverTimestamp(),
    });
    console.log("Success! Document ID:", docRef.id);
  } catch (err: any) {
    console.error("Failed to write contact:", err);
    if (err.stack) {
      console.error(err.stack);
    }
  }
  process.exit(0);
}

testContact();
