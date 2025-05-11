import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../../AuthProvider'; // your custom auth context
import AuthNavigator from './AuthNavigator'; // login/signup
import BottomTabNavigator from './BottomTabNavigator'; // main app
import OnboardingStack from './OnboardingStack'; // onboarding + preferences

export default function AppNavigator() {
  const { user, initializing, preferencesSet } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!user ? (
        <AuthNavigator />
      ) : !preferencesSet ? (
        <OnboardingStack />
      ) : (
        <BottomTabNavigator />
      )}
    </NavigationContainer>
  );
}
