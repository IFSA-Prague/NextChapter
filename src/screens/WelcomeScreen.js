import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NextChapter</Text>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.button1text}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('LogIn')}
      >
        <Text style={styles.button2text}>Log In</Text>
      </TouchableOpacity>

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F0EB',
  },
  title: {
    fontFamily: 'BentonMod-Bold',
    fontSize: 50,
    color: '#000',
    marginBottom: 20,
  },
  button1: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginBottom: 12,
    width: '60%',
    alignItems: 'center',
  },
  button1text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'BentonMod-Bold',
  },
  button2: {
    borderColor: '#013220',
    borderWidth: 2,
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    width: '60%',
    alignItems: 'center',
  },
  button2text: {
    fontSize: 20,
    fontFamily: 'BentonMod-Bold',
  },
});
