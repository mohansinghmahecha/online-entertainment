// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvWSTQwoqZxp7pfXXBEXZPBrY6CIiihXM",
  authDomain: "entertainment-2870a.firebaseapp.com",
  projectId: "entertainment-2870a",
  storageBucket: "entertainment-2870a.appspot.com",
  messagingSenderId: "815527157157",
  appId: "1:815527157157:web:ee3e46542dc37da9195c4c",
  measurementId: "G-C7QWTZTDZJ",
};

// Initialize Firebase
const loginFirebase = initializeApp(firebaseConfig);
export const auth = getAuth();
export default loginFirebase;
