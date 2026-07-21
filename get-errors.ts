import { firestore } from "./src/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

async function run() {
  const snapshot = await getDocs(collection(firestore, "email_delivery_errors"));
  snapshot.docs.forEach(doc => console.log(doc.data()));
  process.exit(0);
}
run();
