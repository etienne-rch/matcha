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
    outputRange: [0.8, 1, 1],
    extrapolate: 'clamp',
  });

  const buttonOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0.5, 1],
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
    bottom: 40,
    right: 30,
    zIndex: 10,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Colors.greenDark.normal,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  icon: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.background,
    lineHeight: 28,
  },
});
