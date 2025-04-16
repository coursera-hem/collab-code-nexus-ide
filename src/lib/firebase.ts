
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-AVyKriBQb_pDhKrair9xc2--iQ-1x9w",
  authDomain: "creativetutorial-b9226.firebaseapp.com",
  databaseURL: "https://creativetutorial-b9226-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-b9226",
  storageBucket: "creativetutorial-b9226.firebasestorage.app",
  messagingSenderId: "230911171823",
  appId: "1:230911171823:web:3199de4c937cbaa7de8f1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
