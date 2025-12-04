import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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
    marginBottom: 32,
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
    backgroundColor: 'rgba(255,255,255,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#062314',
  },
  name: {
    marginTop: 14,
    fontSize: 22,
    fontWeight: '800',
    color: '#062314',
    letterSpacing: 0.3,
  },
  email: {
    marginTop: 4,
    fontSize: 14,
    color: 'rgba(0,0,0,0.55)',
  },
});
