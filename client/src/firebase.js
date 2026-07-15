// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
   authDomain: "website-builder-bff44.firebaseapp.com",
  projectId: "website-builder-bff44",
  storageBucket: "website-builder-bff44.firebasestorage.app",
  messagingSenderId: "747362250952",
  appId: "1:747362250952:web:808da46cfdc33fbda535fd",
  measurementId: "G-5DCW20L5TS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth= getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider}
