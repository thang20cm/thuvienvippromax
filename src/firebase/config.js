// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsXMtUBAsoxCnOM-X4kLHvdVil9ZvR8cM",
  authDomain: "ninja-firegram-76eba.firebaseapp.com",
  databaseURL: "https://ninja-firegram-76eba-default-rtdb.firebaseio.com",
  projectId: "ninja-firegram-76eba",
  storageBucket: "ninja-firegram-76eba.appspot.com",
  messagingSenderId: "446158104116",
  appId: "1:446158104116:web:7ec9b2728c54900e920c61",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
