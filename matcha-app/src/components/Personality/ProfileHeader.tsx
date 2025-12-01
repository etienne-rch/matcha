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
          <Branding.Logo width={100} height={30} />
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
    paddingVertical: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.greyDark.normal,
    textAlign: 'center',
  },
  profileHeader: {
    backgroundColor: Colors.background,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  profileTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.greyDark.normal,
    textAlign: 'center',
    marginBottom: 8,
  },
  profileLabel: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.orange.normal,
    textAlign: 'center',
  },
});
