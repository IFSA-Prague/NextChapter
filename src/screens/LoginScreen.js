import React from 'react';
import { View, Button } from 'react-native';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firestore';

const userCollection = collection(db, "users");

// Testing that Firebase works. 

export default function LoginScreen() {
  const addUser = async () => {
    try {
      const docRef = await addDoc(userCollection, {
        name: "Vienna",
        email: "vienna@example.com"
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
    <View style={{ padding: 20 }}>
      <Button title="Add User" onPress={addUser} />
      <View style={{ height: 10 }} /> {/* spacer */}
      <Button title="Fetch Users" onPress={fetchUsers} />
    </View>
  );
}
