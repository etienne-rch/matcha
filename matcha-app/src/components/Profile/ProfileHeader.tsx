import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';
import { UserFull } from '@/types/user';

export default function ProfileHeader({ user }: { user: UserFull }) {
  const initials =
    `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase();

  return (
    <View style={styles.wrapper}>
      {user.avatarUrl ? (
        <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.initialsCircle}>
          <Text style={styles.initialsText}>{initials || 'U'}</Text>
        </View>
      )}

      <Text style={styles.name}>
        {user.firstName} {user.lastName}
      </Text>

      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginBottom: rnpTheme.spacing.lg,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  initialsCircle: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: rnpTheme.colors.greenLight.light.normal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 32,
    fontWeight: '700',
    color: rnpTheme.colors.greenDark.normal,
  },
  name: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: rnpTheme.colors.primary,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: '#666',
  },
});
