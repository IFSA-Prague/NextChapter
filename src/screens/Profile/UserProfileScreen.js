import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const auth = getAuth();
const db = getFirestore();

export default function UserProfileScreen({ navigation }) {
  const [bookClubs, setBookClubs] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchBookClubs = async () => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBookClubs(userData.bookClubs || []);
        }
      }
    };

    fetchBookClubs();
  }, [user]);

  const handleBookClubPress = (club) => {
    // Handle the button press, e.g., navigate to a specific book club screen
    console.log(`Navigating to ${club}`);
    // You can use navigation.navigate('BookClubScreen', { club }) if you have such a screen
  };

  const handleFindNextChapter = () => {
    // Navigate to the onboarding screen if no book clubs
    navigation.navigate('Intro');
  };

  return (
    <View style={styles.container}>
      {/* User Profile Picture */}
      <Image 
        source={{ uri: user?.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&s=120' }} 
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.userName}>{user?.displayName || 'User Name'}</Text>

      {/* Book Clubs */}
      <Text style={styles.bookClubsTitle}>Book Clubs I'm In:</Text>

      {bookClubs.length > 0 ? (
        // Show the list of book clubs if there are any
        bookClubs.map((club, index) => (
          <TouchableOpacity
            key={index}
            style={styles.clubButton}
            onPress={() => handleBookClubPress(club)}
          >
            <Text style={styles.clubButtonText}>{club}</Text>
          </TouchableOpacity>
        ))
      ) : (
        // If no book clubs, show this message and button
        <View style={styles.noBookClubsContainer}>
          <Text style={styles.noBookClubsText}>
            Hi {user?.displayName || 'User'}, you're not in any bookclubs yet! Let's get you started.
          </Text>
          <TouchableOpacity 
            style={styles.findNextChapterButton} onPress={handleFindNextChapter}>
            <Text style={styles.findNextChapterButtonText}>Find my next chapter</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#f1f0eb',
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bookClubsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  clubButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  clubButtonText: {
    fontSize: 18,
    color: '#fff',
  },
  noBookClubsContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noBookClubsText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  findNextChapterButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  findNextChapterButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

