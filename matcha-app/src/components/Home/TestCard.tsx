import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TestCard({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.buttonLabel}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#062314',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    color: 'rgba(0,0,0,0.60)',
    lineHeight: 20,
  },
  button: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#0A2916',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#0A2916',
    fontSize: 15,
    fontWeight: '600',
  },
});
