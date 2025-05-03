// BookclubNavigator.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookclubsScreen from './screens/BookclubsScreen';
import BookclubHomeScreen from './screens/BookclubHomeScreen';

const Stack = createNativeStackNavigator();

export default function BookclubNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookclubsScreen"
        component={BookclubsScreen}
      />
      <Stack.Screen
        name="BookclubHome"
        component={BookclubHomeScreen}
        options={{ title: 'Bookclub Home' }}
      />
    </Stack.Navigator>
  );
}
