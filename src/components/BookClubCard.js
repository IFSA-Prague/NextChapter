import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function BookClubCard({ name, description, imageUrl, members, currentBook }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.placeholderText}>{name ? name.charAt(0) : 'B'}</Text>
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.members}>{members?.length || 0} members</Text>
        </View>
      </View>
      
      {description && (
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      )}
      
      {currentBook && (
        <View style={styles.currentBookContainer}>
          <Text style={styles.currentBookLabel}>Current Book:</Text>
          <Text style={styles.currentBookTitle}>{currentBook}</Text>
      </View>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  placeholderText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  members: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  currentBookContainer: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
  },
  currentBookLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  currentBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  currentBookAuthor: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});