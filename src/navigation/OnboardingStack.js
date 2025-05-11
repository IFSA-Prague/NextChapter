import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import PreferencesScreen from '../screens/Onboarding/PreferencesScreen';

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="OnboardingScreen" 
        component={OnboardingScreen} 
      />
      <Stack.Screen 
        name="PreferencesScreen" 
        component={PreferencesScreen} 
      />
    </Stack.Navigator>
  );
}
