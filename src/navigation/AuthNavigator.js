// Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import OnboardingScreen from '../screens/Onboarding/OnboardingScreen';
import FeedScreen from '../screens/Feed/FeedScreen';
import BookclubsScreen from '../screens/Bookclubs/BookclubsScreen';
import BookclubHomeScreen from '../screens/Bookclubs/BookclubHomeScreen';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="LogIn" component={LoginScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Feed" component={FeedScreen} />
      <Stack.Screen name="Bookclubs" component={BookclubsScreen} />
      <Stack.Screen name="BookclubHome" component={BookclubHomeScreen} />
    </Stack.Navigator>
  );
}
