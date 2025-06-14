// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyBMbLfLgDoVRLo5wBZlfD_WHsy6n3EhtT4",
  authDomain: "prepwise-7d108.firebaseapp.com",
  projectId: "prepwise-7d108",
  storageBucket: "prepwise-7d108.firebasestorage.app",
  messagingSenderId: "560891936166",
  appId: "1:560891936166:web:5b2c08b5f43a752727a367",
  measurementId: "G-P3L62N7WNQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
