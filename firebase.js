// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAs2QiIbe6XI9mCTfaeUbI7QcA8-2mNidI",
  authDomain: "next-chapter-react.firebaseapp.com",
  projectId: "next-chapter-react",
  storageBucket: "next-chapter-react.firebasestorage.app",
  messagingSenderId: "426313599641",
  appId: "1:426313599641:web:0a0ccc1d00273f9f980608",
  measurementId: "G-37E4K70L9E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Initialize Firebase Authentication and get a reference to the service
export { app, auth };