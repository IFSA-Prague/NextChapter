import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import PreferencesScreen from '../screens/Onboarding/PreferencesScreen';

const Stack = createNativeStackNavigator();

// although the onboarding stack is currently quite short, it's nice to have it 
// in case we want to expand and ask for more preferences from the user

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
    </Stack.Navigator>
  );
}
