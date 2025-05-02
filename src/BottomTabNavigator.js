// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './screens/FeedScreen';
import BookclubsScreen from './screens/BookclubsScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import BookclubHomeScreen from './screens/BookclubHomeScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Bookclubs" component={BookclubsScreen} />
      <Tab.Screen name="Profile" component={UserProfileScreen} />
      <Tab.Screen name="BookclubHome" component={BookclubHomeScreen}/>
    </Tab.Navigator>
  );
}
