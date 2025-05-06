import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookclubsScreen from '../screens/Bookclubs/BookclubsScreen';
import BookclubHomeScreen from '../screens/Bookclubs/BookclubHomeScreen';
import BookclubDiscussionScreen from '../screens/Bookclubs/BookclubDiscussionScreen';

const Stack = createNativeStackNavigator();

export default function BookclubsStack() {
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
      <Stack.Screen
        name="BookclubDiscussionScreen"
        component={BookclubDiscussionScreen}
        options={{ title: 'Bookclub Discussion' }}
      />
    </Stack.Navigator>
  );
}
