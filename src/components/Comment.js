// components/Comment.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

export default function Comment({ displayName, timestamp, text }) {
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.time}>{moment(timestamp?.toDate?.()).fromNow()}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
  },
  name: {
    fontWeight: 'bold',
  },
  time: {
    fontSize: 12,
    color: 'gray',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
  },
});
