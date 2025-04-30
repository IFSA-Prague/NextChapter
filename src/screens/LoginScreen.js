import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { db } from '../../firestore'; // Import your Firebase configuration
import { getDocs, query, where, collection } from 'firebase/firestore'; // Import Firestore methods

const userCollection = collection(db, "users");

export default function LoginScreen({ navigation }) {
  // State for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Check if the user exists in Firestore
  const handleLogin = async () => {
    try {
      const q = query(userCollection, where("username", "==", username));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        Alert.alert('Error', 'No user found with this username');
        return;
      }

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.password === password) {
          // Navigate to the next screen if login is successful
          Alert.alert('Success', 'Logged in successfully');
          navigation.navigate('Feed');
        } else {
          Alert.alert('Error', 'Incorrect password');
        }
      });
    } catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={{ color: 'white'}}>Log In</Text>
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
    backgroundColor: '#f1f0eb', // Light background color
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    width: '60%',
    height: 40,
    alignItems: 'center',
  }
});
