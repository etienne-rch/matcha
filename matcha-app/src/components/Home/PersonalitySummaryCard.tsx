import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '@/themes/colors';

export default function PersonalitySummaryCard({ personality, onPress }: any) {
  if (!personality) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Ton profil Matcha</Text>

      <Text style={styles.label}>{personality.label}</Text>

      <View style={styles.badges}>
        {personality.strengths.slice(0, 3).map((s: any, i: any) => (
          <View key={i} style={styles.badge}>
            <Text style={styles.badgeText}>{s}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Voir mon analyse →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffffdd',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    color: '#062314',
    opacity: 0.7,
    marginBottom: 6,
  },
  type: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.orange.normal,
    marginBottom: 4,
  },
  label: {
    fontSize: 38,
    fontWeight: '800',
    color: Colors.orange.normal,
    marginBottom: 4,
  },
  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: Colors.greenLight.light.normal,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.greenLight.dark.normal,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
  },
});
