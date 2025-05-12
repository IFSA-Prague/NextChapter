import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../AuthProvider';
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const db = getFirestore();

export default function FeedScreen({ navigation }) {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!user) return;

      try {
        const userSnap = await getDoc(doc(db, 'users', user.uid));
        const userData = userSnap.data();

        const [booksSnap, clubsSnap] = await Promise.all([
          getDocs(collection(db, 'books')),
          getDocs(collection(db, 'bookclubs'))
        ]);

        const books = {};
        booksSnap.forEach(doc => books[doc.id] = doc.data());

        const results = [];

        clubsSnap.forEach(clubDoc => {
          const club = clubDoc.data();
          const currentBook = books[club.currentBook];
          let score = 0;

          if ((userData.genrePreferences || []).some(g => club.genres?.includes(g))) score += 3;
          if (currentBook) {
            if ((userData.authorPreferences || []).includes(currentBook.author)) score += 2;
            if (parseInt(currentBook.year) >= 2018) score += 1;
            if ((userData.completedBooks || []).includes(club.currentBook)) score -= 5;
          }
          if ((club.members || []).length > 5) score += 1;

          const percentage = Math.min(Math.round((score / 10) * 100), 100);

          results.push({
            id: clubDoc.id,
            name: club.name,
            score: percentage,
            members: club.members || [],
            currentBookTitle: currentBook?.title || 'Unknown Book',
          });
        });

        results.sort((a, b) => b.score - a.score);
        setRecommendations(results.slice(0, 10));
      } catch (err) {
        console.error('Error generating recommendations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [user]);

  const handleJoinClub = async (clubId, clubName, members) => {
    const alreadyMember = members.includes(user.uid);

    if (!alreadyMember) {
      Alert.alert(
        `Join ${clubName}?`,
        'Do you want to join this book club?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Yes, join',
            onPress: async () => {
              try {
                const clubRef = doc(db, 'bookclubs', clubId);
                const userRef = doc(db, 'users', user.uid);

                await Promise.all([
                  updateDoc(clubRef, {
                    members: arrayUnion(user.uid),
                  }),
                  updateDoc(userRef, {
                    joinedClubs: arrayUnion(clubId),
                  }),
                ]);

                console.log("Successfully joined club!");
                // navigation.navigate('BookclubHomeScreen', { bookClubId: clubId });
              } catch (err) {
                console.error('Failed to join club:', err);
                Alert.alert('Error', 'Failed to join the club.');
              }
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      navigation.navigate('BookclubHomeScreen', { bookClubId: clubId });
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recommended Book Clubs</Text>
      <FlatList
        data={recommendations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => handleJoinClub(item.id, item.name, item.members)}
          >
            <Text style={styles.clubName}>{item.name}</Text>
            <Text style={styles.detail}>📘 {item.currentBookTitle}</Text>
            <Text style={styles.detail}>👥 {item.members.length} members</Text>
            <Text style={styles.score}>✅ Match: {item.score}%</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0eb',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0eb',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
  score: {
    marginTop: 6,
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});
