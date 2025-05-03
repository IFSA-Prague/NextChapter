import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import { db } from '../../../firestore.js';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

import { auth } from '../../../firebase.js';

export default function SignUpScreen({ navigation }) {
  const [firstName, setFirstName] = useState(' ');
  const [lastName, setLastName] = useState(' ');
  const [displayName, setDisplayName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // to do: set up email confirmation
  
  const handleSignUp = async () => {
    if (!email || !password || !firstName || !lastName || !displayName) {
      Alert.alert('Error', 'Please complete all fields.');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: displayName,
      });
  
      // Save extra fields in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email,
        createdAt: new Date(),
        firstName,
        lastName,
        displayName,
      });
  
      Alert.alert('Success', 'Account created!');
      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error during sign-up:', error.code, error.message);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor="#888"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor="#888"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        placeholderTextColor="#888"
        value={displayName}
        onChangeText={setDisplayName}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 30,
    backgroundColor: '#f1f0eb',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});
