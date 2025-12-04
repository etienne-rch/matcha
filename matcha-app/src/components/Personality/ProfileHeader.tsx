import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Branding } from '@/assets';
import Colors from '@/themes/colors';

interface ProfileHeaderProps {
  label: string;
  showLogo?: boolean;
}

export default function ProfileHeader({
  label,
  showLogo = true,
}: ProfileHeaderProps) {
  return (
    <>
      {showLogo && (
        <View style={styles.logoContainer}>
          <Branding.Logo width={110} height={34} />
        </View>
      )}
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Ton profil</Text>
        <Text style={styles.profileLabel}>{label}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    paddingTop: 40,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeader: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  profileTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.greyDark.normal,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  profileLabel: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.orange.normal,
    textAlign: 'center',
  },
});
