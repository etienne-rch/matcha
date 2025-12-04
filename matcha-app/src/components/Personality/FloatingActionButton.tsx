import React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Colors from '@/themes/colors';

interface FloatingActionButtonProps {
  onPress: () => void;
  scrollY: Animated.Value;
  icon?: string;
}

export default function FloatingActionButton({
  onPress,
  scrollY,
  icon = '→',
}: FloatingActionButtonProps) {
  const buttonScale = scrollY.interpolate({
    inputRange: [0, 100, 500],
    outputRange: [0.9, 1, 1],
    extrapolate: 'clamp',
  });

  const buttonOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0.6, 1],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: buttonScale }],
          opacity: buttonOpacity,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Text style={styles.icon}>{icon}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    zIndex: 10,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.greenDark.normal,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#062314',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    fontSize: 26,
    fontWeight: '700',
    color: Colors.background,
    lineHeight: 26,
  },
});
