// BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from '../screens/Feed/FeedScreen';
import BookclubsStack from './BookclubsStack';
import UserProfileScreen from '../screens/Profile/UserProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={FeedScreen} /> 
      <Tab.Screen name="Bookclubs" component={BookclubsStack} options={{ headerShown: false }}/>
      <Tab.Screen name="Profile" component={UserProfileScreen} />
    </Tab.Navigator>
  );
}

/**
 * create a feedNavigator.js file for the feed screens
 * for example: FeedScreen, SearchScreen, JoinBookclubScreen, etc.
 * 
 * create a userProfileNavigator.js file for the user profile screens
 * for example: UserProfileScreen, EditProfileScreen, ViewPosts,etc.
*/
