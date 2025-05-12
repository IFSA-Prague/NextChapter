import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PFP from '../../assets/PFP.jpg';

const auth = getAuth();
const db = getFirestore();

export default function UserProfileScreen({ navigation }) {
  const [bookClubs, setBookClubs] = useState([]);
  const [favoriteAuthors, setFavoriteAuthors] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBookClubs(userData.bookClubs || []);
          setFavoriteAuthors(userData.authorPreferences || []);
          setFavoriteGenres(userData.genrePreferences || []);
          setFavoriteBooks(userData.bookPreferences || []);
        }
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <ScrollView style={styles.container}>
      <Image source={PFP} style={styles.profileImage} />
      <Text style={styles.userName}>Hello {user?.displayName}!</Text>

      <Text style={styles.sectionTitle}>Favorite Authors</Text>
      {favoriteAuthors.map((author, index) => (
        <Text key={index} style={styles.itemText}>{author}</Text>
      ))}

      <Text style={styles.sectionTitle}>Favorite Genres</Text>
      {favoriteGenres.map((genre, index) => (
        <Text key={index} style={styles.itemText}>{genre}</Text>
      ))}

      <Text style={styles.sectionTitle}>Favorite Books</Text>
      {favoriteBooks.map((book, index) => (
        <Text key={index} style={styles.itemText}>{book}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f0eb',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});
