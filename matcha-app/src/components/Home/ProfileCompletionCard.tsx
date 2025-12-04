import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ProgressBar from '@/components/Animated/ProgressBar';

export default function ProfileCompletionCard({
  completion,
  onPress,
}: {
  completion: number;
  onPress: () => void;
}) {
  if (completion >= 100) return null;

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Complète ton profil</Text>

      <ProgressBar value={completion} />

      <Text style={styles.progressText}>Profil complété à {completion}%</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonLabel}>Compléter mon profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 28,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#062314',
    marginBottom: 14,
  },
  progressText: {
    fontSize: 14,
    marginTop: 10,
    color: 'rgba(0,0,0,0.60)',
  },
  primaryButton: {
    backgroundColor: '#0A2916',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 18,
    shadowColor: '#0A2916',
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  primaryButtonLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.4,
  },
});
