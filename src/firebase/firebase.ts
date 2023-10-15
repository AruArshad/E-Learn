// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgwlAhbzTBeagk30vueRdCG2h489iyWDA",
  authDomain: "e-learn-70411.firebaseapp.com",
  projectId: "e-learn-70411",
  storageBucket: "e-learn-70411.appspot.com",
  messagingSenderId: "518108163119",
  appId: "1:518108163119:web:03facb78816e0a377baada"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
