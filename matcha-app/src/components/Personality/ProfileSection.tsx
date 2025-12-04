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
    backgroundColor: 'rgba(255,255,255,0.97)',
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 20,
    paddingHorizontal: 18,
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  lastSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.greenDark.normal,
    marginBottom: 14,
  },
});
