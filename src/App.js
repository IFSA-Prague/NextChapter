import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'; // Import expo-font for font loading
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    'BentonMod-Regular': require('./assets/fonts/BentonMod-Regular.otf'),
    'BentonMod-Italic': require('./assets/fonts/BentonMod-RegularIt.otf'),
    'BentonMod-Bold': require('./assets/fonts/BentonMod-SemiBold.otf'),
  });

  // If fonts are not loaded yet, return null to prevent rendering
  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Log In' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
