import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function BackgroundBubbles() {
  const bubbles = [...Array(10)].map((_, i) => {
    const x = Math.random() * width;
    const size = 60 + Math.random() * 80;
    const duration = 8000 + Math.random() * 6000;

    const progress = useSharedValue(0);

    progress.value = withRepeat(withTiming(1, { duration }), -1, false);

    const style = useAnimatedStyle(() => ({
      position: 'absolute',
      width: size,
      height: size,
      borderRadius: size / 2,
      left: x,
      backgroundColor: 'rgba(255,255,255,0.35)',
      opacity: 0.3,
      top: height - progress.value * (height + 200),
      transform: [{ scale: 0.9 + Math.sin(progress.value * Math.PI) * 0.1 }],
    }));

    return <Animated.View key={i} style={[styles.bubble, style]} />;
  });

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {bubbles}
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    position: 'absolute',
    filter: 'blur(12px)',
  },
});
