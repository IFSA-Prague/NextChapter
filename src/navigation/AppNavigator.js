import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../AuthProvider'; // Import your AuthContext hook
import AuthNavigator from './AuthNavigator'; // Login/SignUp/Onboarding stack
import BottomTabNavigator from './BottomTabNavigator'; // Main app with bottom tabs
import { ActivityIndicator, View } from 'react-native';

export default function AppNavigator() {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <BottomTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
