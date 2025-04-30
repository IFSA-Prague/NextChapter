import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UserProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        UserProfile Screen (Vivian)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0eb', // Optional background
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
