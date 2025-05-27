import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCI0_x8L1eFiy7AN4RSV3wh2FHMdnY8FXk",
  authDomain: "task-manager-8887d.firebaseapp.com",
  projectId: "task-manager-8887d",
  storageBucket: "task-manager-8887d.firebasestorage.app",
  messagingSenderId: "1073096066734",
  appId: "1:1073096066734:web:b03c2660a08c10dd4b0f3f",
  measurementId: "G-GE5VJG0LMW",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;
