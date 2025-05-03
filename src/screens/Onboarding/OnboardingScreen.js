import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../../../AuthProvider';

export default function OnboardingScreen({ navigation }) {
  const { user } = useAuth(); // this is how you access the user from AuthProvider

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Onboarding Screen (Vivian)
      </Text>
      <Text>
        Hi{user.displayName ? `, ${user.displayName}` : ' Friend'}!
      </Text>
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
