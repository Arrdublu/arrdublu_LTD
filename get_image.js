const { initializeApp } = require('firebase/app');
const { getFirestore, doc, getDoc } = require('firebase/firestore');

const firebaseConfig = require('./firebase-applet-config.json');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function run() {
  const docRef = doc(db, 'website_images', 'The_Hands_On_Approach');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("FOUND:", docSnap.data().url.substring(0, 50) + "...");
    
    const fs = require('fs');
    fs.writeFileSync('image_url.txt', docSnap.data().url);
  } else {
    console.log("Not found!");
    // check with hyphens
    const docRef2 = doc(db, 'website_images', 'The_Hands-On_Approach');
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) {
        console.log("FOUND2:", docSnap2.data().url.substring(0, 50) + "...");
        const fs = require('fs');
        fs.writeFileSync('image_url.txt', docSnap2.data().url);
    } else {
        console.log("Not found 2!");
    }
  }
}
run();
