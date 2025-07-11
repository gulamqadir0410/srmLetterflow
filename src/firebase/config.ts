// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUfsKPkgJ-vCf3GNUohsJoCeuSgRSX8_w",
  authDomain: "letterflow-srm.firebaseapp.com",
  projectId: "letterflow-srm",
  storageBucket: "letterflow-srm.appspot.com", // ✅ FIXED TYPO
  messagingSenderId: "831032216581",
  appId: "1:831032216581:web:08121f91a7d6762349a06c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore database instance
export const db = getFirestore(app);
