import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../../../AuthProvider';

const db = getFirestore();

export default function BookclubsScreen({ navigation }) {
  const { user } = useAuth(); // retrieving the current user
  const [bookclubs, setBookclubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'bookclubs'), async (bookclubsSnapshot) => {
      setLoading(true); // Set loading to true when starting the snapshot fetch
      try {
        const bookclubsData = [];

        for (const bookclubDoc of bookclubsSnapshot.docs) {
          const bookclubData = bookclubDoc.data();
          // Check if the user is a member of the bookclub
          const isMember = bookclubData.members && bookclubData.members.includes(user.uid);
          if (!isMember) continue; // Skip if the user is not a member
          
          let currentBookTitle = 'No book selected';

          // Resolve currentBook ID to actual book title
          if (bookclubData.currentBook) {
            const bookRef = doc(db, 'books', bookclubData.currentBook);
            const bookDoc = await getDoc(bookRef);
            if (bookDoc.exists()) {
              currentBookTitle = bookDoc.data().title;
            }
          }

          bookclubsData.push({
            id: bookclubDoc.id,
            name: bookclubData.name,
            description: bookclubData.description,
            currentBookTitle,
          });
        }

        setBookclubs(bookclubsData);
      } catch (error) {
        console.error('Error fetching bookclubs:', error);
      } finally {
        setLoading(false); // Set loading to false when done fetching
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, [user.uid]); // Re-run the effect when the user UID changes

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.bookTitle}>{item.currentBookTitle}</Text>
      <Text
        style={styles.viewDetails}
        onPress={() => navigation.navigate('BookclubHome', { bookClubId: item.id })}
      >
        View Club!
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <FlatList
      data={bookclubs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0eb',
  },
  card: {
    backgroundColor: 'white',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    shadowOpacity: 0.15,
    elevation: 5,
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 15,
    color: '#555',
    lineHeight: 20,
    marginBottom: 12,
  },
  bookTitle: {
    fontSize: 16,
    color: '#6200ee',
    marginBottom: 12,
    fontWeight: '500',
  },
  viewDetails: {
    fontSize: 14,
    color: '#6200ee',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});
