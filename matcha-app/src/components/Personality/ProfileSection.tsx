import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/themes/colors';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function ProfileSection({
  title,
  children,
  isLast = false,
}: ProfileSectionProps) {
  return (
    <View style={[styles.section, isLast && styles.lastSection]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.background,
    marginTop: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  lastSection: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.orange.normal,
    marginBottom: 16,
  },
});
