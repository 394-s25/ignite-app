import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyADVZzaLzSYk9RpxuBxdOrPbJoa4rPrrWg",
  authDomain: "ignite-app-red.firebaseapp.com",
  databaseURL: "https://ignite-app-red-default-rtdb.firebaseio.com",
  projectId: "ignite-app-red",
  storageBucket: "ignite-app-red.firebasestorage.app",
  messagingSenderId: "604286876019",
  appId: "1:604286876019:web:fbeabe75b4fd7ae6eaad06",
  measurementId: "G-DGC3J9J4FE",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app;
