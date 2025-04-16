
// Firebase configuration mock (will be replaced with actual Firebase implementation)
const firebaseConfig = {
  apiKey: "AIzaSyD-AVyKriBQb_pDhKrair9xc2--iQ-1x9w",
  authDomain: "creativetutorial-b9226.firebaseapp.com",
  databaseURL: "https://creativetutorial-b9226-default-rtdb.firebaseio.com",
  projectId: "creativetutorial-b9226",
  storageBucket: "creativetutorial-b9226.firebasestorage.app",
  messagingSenderId: "230911171823",
  appId: "1:230911171823:web:3199de4c937cbaa7de8f1a"
};

// Mock Firebase objects for initial setup
const app = { name: 'app-mock' };
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    callback(null);
    return () => {};
  }
};
const db = {
  collection: () => ({
    doc: () => ({
      get: async () => ({ data: () => ({}) }),
      set: async () => {},
      update: async () => {},
    }),
  }),
};
const storage = {};

export { app, auth, db, storage };
