import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '../../../AuthProvider';

const db = getFirestore();

export default function BookSearchScreen({ navigation }) {
  const { user, setPreferencesSet } = useAuth();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addedBookIds, setAddedBookIds] = useState(new Set());

  const searchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
      );
      const data = await response.json();
      setResults(data.items || []);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (book) => {
    const bookId = book.id;
    const title = book.volumeInfo.title || 'Untitled';
    const authors = book.volumeInfo.authors || [];
  
    if (addedBookIds.has(bookId)) {
      Alert.alert('Already Added', 'You have already added this book.');
      return;
    }
  
    try {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (!userSnap.exists()) {
        // If user doc doesn't exist, create it with empty arrays
        await setDoc(userRef, {
          bookPreferences: [],
          authorPreferences: [],
          completedBooks: [],
        });
      }
  
      const updates = {};
  
      if (title) {
        updates.bookPreferences = arrayUnion(title);
      }
  
      if (authors.length > 0) {
        // Add only the first author to avoid duplicates
        updates.authorPreferences = arrayUnion(authors[0]);
      }
  
      // Add the bookId to completedBooks
      updates.completedBooks = arrayUnion(bookId);
  
      await updateDoc(userRef, updates);
  
      setAddedBookIds(new Set([...addedBookIds, bookId]));
      Alert.alert('Success', 'Book added to your preferences!');
    } catch (err) {
      console.error('Error adding book to preferences:', err);
      Alert.alert('Error', 'Failed to add book to preferences.');
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search for a Book</Text>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Enter book title or author"
        onSubmitEditing={searchBooks}
        returnKeyType="search"
      />
      <TouchableOpacity style={styles.searchButton} onPress={searchBooks}>
        <Text style={styles.searchButtonText}>Search Books</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
              <Text style={styles.title}>{item.volumeInfo.title}</Text>
              {item.volumeInfo.authors && (
                <Text style={styles.author}>by {item.volumeInfo.authors[0]}</Text>
              )}
              {addedBookIds.has(item.id) && (
                <Text style={styles.addedLabel}>✓ Added</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
      <TouchableOpacity style={styles.continueButton} onPress={() => setPreferencesSet(true)}>
        <Text style={styles.continueButtonText}>Continue to Feed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0eb',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  author: {
    fontSize: 14,
    color: '#666',
  },
  addedLabel: {
    marginTop: 4,
    color: 'green',
    fontSize: 13,
  },
  searchButton: {
    backgroundColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  continueButton: {
    backgroundColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },  
});
