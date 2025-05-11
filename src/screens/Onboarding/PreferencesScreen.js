import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button, Alert } from 'react-native';
import { useAuth } from '../../../AuthProvider';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';

const db = getFirestore();

export default function PreferencesScreen({ navigation }) {
  const { user, setPreferencesSet } = useAuth();

  const [fiction, setFiction] = useState(false);
  const [mystery, setMystery] = useState(false);
  const [scifi, setScifi] = useState(false);
  const [nonfiction, setNonfiction] = useState(false);
  const [thriller, setThriller] = useState(false);
  const [fantasy, setFantasy] = useState(false);
  const [history, setHistory] = useState(false);
  const [health, setHealth] = useState(false);

  const getSelectedGenres = () => {
    const genres = [];
    if (fiction) genres.push('Fiction');
    if (mystery) genres.push('Mystery');
    if (scifi) genres.push('Science fiction');
    if (nonfiction) genres.push('Non-fiction');
    if (thriller) genres.push('Thriller');
    if (fantasy) genres.push('Fantasy');
    if (history) genres.push('History');
    if (health) genres.push('Health');
    return genres;
  };

  const handleNext = async () => {
    const selectedGenres = getSelectedGenres();
    console.log('Selected genres:', selectedGenres);

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        genrePreferences: selectedGenres,
      });

      setPreferencesSet(true);
      navigation.navigate('FeedScreen'); // optionally navigate to next screen
    } catch (error) {
      console.error('Failed to save preferences:', error);
      Alert.alert('Error', 'Failed to save your preferences.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What genres do you like?</Text>

      {[
        ['Fiction', fiction, setFiction],
        ['Mystery', mystery, setMystery],
        ['Science fiction', scifi, setScifi],
        ['Non-fiction', nonfiction, setNonfiction],
        ['Thriller', thriller, setThriller],
        ['Fantasy', fantasy, setFantasy],
        ['History', history, setHistory],
        ['Health', health, setHealth],
      ].map(([label, value, setter]) => (
        <View style={styles.switchContainer} key={label}>
          <Text style={styles.label}>{label}</Text>
          <Switch value={value} onValueChange={setter} />
        </View>
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f1f0eb',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    alignSelf: 'center',
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
});