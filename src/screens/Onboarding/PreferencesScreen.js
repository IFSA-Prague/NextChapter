import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../../../AuthProvider';

const PreferencesScreen = ({ navigation }) => {
    const [interests, setInterests] = useState([]);

    const handleInterestChange = (interest) => {
        setInterests(prev => {
            if (prev.includes(interest)) {
                return prev.filter(i => i !== interest);
            } else {
                return [...prev, interest];
            }
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>What's your interest?</Text>
            <Checkbox label="Tech" onPress={() => handleInterestChange('Tech')} />
            <Checkbox label="Health" onPress={() => handleInterestChange('Health')} />
            <Button title="Next" onPress={() => navigation.navigate('ProfileSetup')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f1f0eb',
    },
    text: {
      fontSize: 18,
      color: '#333',
    },
  });
  