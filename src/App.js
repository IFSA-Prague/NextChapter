import React from 'react';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';
import { AuthProvider } from '../AuthProvider';

export default function App() {
  const [fontsLoaded] = useFonts({
    'BentonMod-Regular': require('./assets/fonts/BentonMod-Regular.otf'),
    'BentonMod-Italic': require('./assets/fonts/BentonMod-RegularIt.otf'),
    'BentonMod-Bold': require('./assets/fonts/BentonMod-SemiBold.otf'),
  });

  if (!fontsLoaded) return null;

  return (
    <AuthProvider>
        <Navigation />
    </AuthProvider>
  );
}
