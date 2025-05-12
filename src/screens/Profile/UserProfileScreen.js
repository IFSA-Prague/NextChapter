import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import PFP from '../../assets/PFP.jpg';  

const auth = getAuth();
const db = getFirestore();

export default function UserProfileScreen({ navigation }) {
  const [bookClubs, setBookClubs] = useState([]);
  const user = auth.curresntUser;

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

  return (
    <View style={styles.container}>
      {/* User Profile Picture */}

      <Image
        source={PFP}
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.userName}>Hello {user?.displayName}!</Text>
      
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

