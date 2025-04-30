import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NextChapter</Text>

      {/* Sign Up Button with dark green background */}
      <TouchableOpacity style={styles.button1} onPress={() => console.log('Sign Up Pressed')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Log In Button with dark green text and outline */}
      <TouchableOpacity style={styles.button2} onPress={() => console.log('Log In Pressed')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F0EB',
  },
  title: {
    fontFamily: 'BentonMod-Bold',
    fontSize: 50,
    color: '#000',
    marginBottom: 20,
  },
  button1: {
    backgroundColor: '#013220', // Dark Green background
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 20,
    width: '75%',
    alignItems: 'center',
  },
  button2: {
    borderColor: '#013220', // Dark Green border
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '75%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#013220', // Dark Green text for the Log In button
    fontSize: 18,
    fontFamily: 'BentonMod-Bold',
  },
});
