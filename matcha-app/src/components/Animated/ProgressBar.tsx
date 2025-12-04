import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export default function ProgressBar({ value }: { value: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(value / 100, { duration: 700 });
  }, [value]);

  const animatedFill = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.fillContainer, animatedFill]}>
        <LinearGradient
          colors={['#0A2916', '#2e573e']}
          style={styles.gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 14,
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#e7ede6',
    overflow: 'hidden',
  },

  fillContainer: {
    height: '100%',
    overflow: 'hidden',
    borderRadius: 20,
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});
