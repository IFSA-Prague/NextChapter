import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';  // Required for persistence

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication with persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

// Export the initialized app and auth
export { app, auth };