import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../../../AuthProvider';

export default function OnboardingScreen({ navigation }) {
  const { user } = useAuth(); // this is how you access the user from AuthProvider

  return (
    <View style={styles.container}>
    <Text style={styles.welcomeText}>Welcome to NextChapter!</Text>
    <Text style={styles.description}>We're excited to help you discover your next great book. To get started, we'll ask you a few quick questions to understand your interests and preferences. This will allow us to recommend the best books tailored just for you. Ready to find your next chapter? </Text>
    <Button title="Get Started" onPress={() => navigation.navigate('Preferences')} />
</View> 
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0eb',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
