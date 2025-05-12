import React, { createContext, useEffect, useState, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [preferencesSet, setPreferencesSet] = useState(false);
  const [initializing, setInitializing] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);

        try {
          const docRef = doc(db, 'users', firebaseUser.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            const prefs = data.genrePreferences;
            setPreferencesSet(Array.isArray(prefs) && prefs.length > 0);
          } else {
            setPreferencesSet(false);
          }
        } catch (err) {
          console.error('Error fetching preferences:', err);
          setPreferencesSet(false);
        }
      } else {
        setUser(null);
        setPreferencesSet(false);
      }

      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, preferencesSet, setPreferencesSet, initializing }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
