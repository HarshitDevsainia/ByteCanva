// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-caa9f.firebaseapp.com",
  projectId: "mern-blog-caa9f",
  storageBucket: "mern-blog-caa9f.appspot.com",
  messagingSenderId: "336688288860",
  appId: "1:336688288860:web:0fd492b247ded2d9800299"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);