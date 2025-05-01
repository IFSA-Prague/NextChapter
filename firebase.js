import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

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
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Auth
const auth = getAuth(app);

// If this is a fresh installation, set persistence
if (!getApps().length) {
  try {
    initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  } catch (error) {
    console.log("Error setting auth persistence: " + error);
  }
}

export { app, auth };