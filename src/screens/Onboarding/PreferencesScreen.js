import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Button } from 'react-native';
import { useAuth } from '../../../AuthProvider'; // Access context

export default function PreferencesScreen({ navigation }) {
  const [tech, setTech] = useState(false);
  const [health, setHealth] = useState(false);
  const { setPreferencesSet } = useAuth(); // Accessing setPreferencesSet from context

  const getSelectedInterests = () => {
    const interests = [];
    if (tech) interests.push('Tech');
    if (health) interests.push('Health');
    return interests;
  };

  const handleNext = () => {
    const selectedInterests = getSelectedInterests();
    console.log('Selected interests:', selectedInterests);

    // Save interests to backend or storage if needed...

    // ✅ Set preferences as complete
    setPreferencesSet(true); // Update context to mark preferences as set
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>What's your interest?</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Tech</Text>
        <Switch value={tech} onValueChange={setTech} />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Health</Text>
        <Switch value={health} onValueChange={setHealth} />
      </View>

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
