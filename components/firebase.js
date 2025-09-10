// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// your Firebase config (replace with your own values)
const firebaseConfig = {
  apiKey: "AIzaSyB1IparOzxxgmBG_izKTuq4W2MKfaFMZ9M",
  authDomain: "project1-71847.firebaseapp.com",
  projectId: "project1-71847",
  storageBucket: "project1-71847.appspot.com",
  messagingSenderId: "375856044262",
  appId: "1:375856044262:web:aa81461c8c783572b80327",
};

// prevent multiple initializations in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
