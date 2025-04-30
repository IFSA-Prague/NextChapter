import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper'; // Import Paper components
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';

const userCollection = collection(db, "users");

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const addUser = async () => {
    try {
      const docRef = await addDoc(userCollection, {
        name: "Vienna",
        email: email,
      });
      console.log("User added with ID:", docRef.id);
    } catch (e) {
      console.error("Error adding user:", e);
    }
  };

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} =>`, doc.data());
      });
    } catch (e) {
      console.error('Error fetching users:', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f1f0eb' }}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10, width: '100%' }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 20, width: '100%' }}
      />
      <Button mode="contained" onPress={addUser} style={{ marginBottom: 10, width: '100%' }}>
        Add User
      </Button>
      <Button mode="outlined" onPress={fetchUsers} style={{ width: '100%' }}>
        Fetch Users
      </Button>
    </View>
  );
}
