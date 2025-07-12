// src/firebase/config.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCUfsKPkgJ-vCf3GNUohsJoCeuSgRSX8_w",
  authDomain: "letterflow-srm.firebaseapp.com",
  projectId: "letterflow-srm",
  storageBucket: "letterflow-srm.appspot.com",
  messagingSenderId: "831032216581",
  appId: "1:831032216581:web:08121f91a7d6762349a06c"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
