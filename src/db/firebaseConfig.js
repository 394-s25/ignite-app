import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyADVZzaLzSYk9RpxuBxdOrPbJoa4rPrrWg",
    authDomain: "ignite-app-red.firebaseapp.com",
    databaseURL: "https://ignite-app-red-default-rtdb.firebaseio.com",
    projectId: "ignite-app-red",
    storageBucket: "ignite-app-red.firebasestorage.app",
    messagingSenderId: "604286876019",
    appId: "1:604286876019:web:fbeabe75b4fd7ae6eaad06",
    measurementId: "G-DGC3J9J4FE"
  };

export const app = initializeApp(firebaseConfig);