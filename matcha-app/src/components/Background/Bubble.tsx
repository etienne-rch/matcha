import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type Props = {
  x: number;
  size: number;
  duration: number;
  screenHeight: number;
};

export function Bubble({ x, size, duration, screenHeight }: Props) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration }), -1, false);
  }, []);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    width: size,
    height: size,
    borderRadius: size / 2,
    left: x,
    backgroundColor: 'rgba(255,255,255,0.35)',
    opacity: 0.3,
    top: screenHeight - progress.value * (screenHeight + 200),
    transform: [{ scale: 0.9 + Math.sin(progress.value * Math.PI) * 0.1 }],
  }));

  return <Animated.View style={[styles.bubble, style]} />;
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
  },
});
