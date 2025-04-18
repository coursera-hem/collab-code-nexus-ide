
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEV0nKTqzkRZxGmvZeQwhDLgG3SvnbOnI",
  authDomain: "my-live-music-web.firebaseapp.com",
  projectId: "my-live-music-web",
  storageBucket: "my-live-music-web.firebasestorage.app",
  messagingSenderId: "870155164661",
  appId: "1:870155164661:web:661bc08e6645db83bd1ebc",
  measurementId: "G-P5NCFF7X4X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, analytics };

