// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAkfrTBLsdke3VHxmjCawpUpgzYiATU2Zo",
  authDomain: "notipad-2f8f2.firebaseapp.com",
  projectId: "notipad-2f8f2",
  storageBucket: "notipad-2f8f2.firebasestorage.app",
  messagingSenderId: "1072689853417",
  appId: "1:1072689853417:web:48e338deeca4e56545d178",
  measurementId: "G-1FPC7WGRRZ",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
