// BookclubNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BookclubHomeScreen from './screens/BookclubHomeScreen'; // Make sure this path is correct

const Stack = createStackNavigator();

export default function BookclubNavigator() {
  return (
    <Stack.Navigator initialRouteName="BookclubHome">
      <Stack.Screen name="BookclubHome" component={BookclubHomeScreen} />
    </Stack.Navigator>
  );
}
