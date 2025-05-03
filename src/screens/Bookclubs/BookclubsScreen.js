import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../../../AuthProvider';

const db = getFirestore();

export default function BookclubsScreen({ navigation }) {
  const { user } = useAuth(); // retrieving the current user
  const [bookclubs, setBookclubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookclubs = async () => {
      try {
        const bookclubsSnapshot = await getDocs(collection(db, 'bookclubs'));
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
        setLoading(false);
      }
    };

    fetchBookclubs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <Text style={styles.bookTitle}>{item.currentBookTitle}</Text>
      <Text
        style={styles.viewDetails}
        onPress={() => navigation.navigate('BookclubHome', { bookClubId: item.id })}
      >
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
    padding: 16,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  bookTitle: {
    fontSize: 16,
    color: '#6200ee',
    marginTop: 8,
  },
  viewDetails: {
    fontSize: 14,
    color: '#6200ee',
    marginTop: 12,
    textDecorationLine: 'underline',
  },
});
