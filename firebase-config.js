// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyC5n4M39liBqdlA-AZWb15qIGm7ZS-hyig",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "pooja-dream-paris.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "pooja-dream-paris",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "pooja-dream-paris.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "57512640426",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:57512640426:web:a13dcf724eee6663d0f5d3",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-44V6GMJJQ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;