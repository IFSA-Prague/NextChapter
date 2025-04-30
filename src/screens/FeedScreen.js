import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function FeedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Feed / Book Recommendation (Sanjana)
      </Text>

      {/* Button that navigates to BookclubsScreen */}
      <Button
        title="Bookclubs"
        onPress={() => navigation.navigate('Bookclubs')} // Navigating to BookclubsScreen
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0eb', // Optional light background
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});
