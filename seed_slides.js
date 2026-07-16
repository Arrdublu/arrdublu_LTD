import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import fs from "fs";

const config = JSON.parse(fs.readFileSync("./firebase-applet-config.json", "utf-8"));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function seed() {
  const slidesRef = collection(db, "hero_slides");
  const docs = await getDocs(slidesRef);
  for (const doc of docs.docs) {
    await deleteDoc(doc.ref);
  }
  
  // Slide 1: Text
  await addDoc(slidesRef, {
    title: "Crafting Elite\n<span class=\"font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 drop-shadow-sm\">Digital Experiences</span>",
    subtitle: "Kingston, Jamaica // Global Creative Studio",
    description: "Arrdublu is a boutique creative studio led by Director Ramone Wynter. We specialize in Virtual Production, Cinematic Storytelling, and Luxury Identity. From concept to final cut, we ensure uncompromising quality and a deeply personal touch.",
    videoUrlDesktop: "", // No video on the text slide
    videoUrlMobile: "", // No video on the text slide
    order: 0
  });

  // Slide 2: Video Loop
  await addDoc(slidesRef, {
    title: "",
    subtitle: "",
    description: "",
    videoUrlDesktop: "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/mobile_web_wide.mp4?alt=media&token=4b5c3db0-22a1-4bea-8f3e-f5a0361d774b",
    videoUrlMobile: "https://firebasestorage.googleapis.com/v0/b/arrdublu-d1c06.firebasestorage.app/o/motion_portrait.mp4?alt=media&token=74cddd9f-390f-4a2f-b23d-84fbe7ef3042",
    order: 1
  });

  console.log("Seeded slides correctly");
  process.exit(0);
}

seed();
