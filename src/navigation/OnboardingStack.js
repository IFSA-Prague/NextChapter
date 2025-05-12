import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import PreferencesScreen from '../screens/Onboarding/PreferencesScreen';
import BookSearchScreen from '../screens/Onboarding/BookSearchScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen}
      />
      <Stack.Screen 
        name="Preferences" 
        component={PreferencesScreen} 
      />
      <Stack.Screen
        name="BookSearch"
        component={BookSearchScreen}
      />
    </Stack.Navigator>
  );
}
