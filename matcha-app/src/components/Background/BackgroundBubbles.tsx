import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { Bubble } from './Bubble';

const { width, height } = Dimensions.get('window');

export default function BackgroundBubbles() {
  const bubbles = [...Array(10)].map((_, i) => {
    const x = Math.random() * width;
    const size = 60 + Math.random() * 80;
    const duration = 8000 + Math.random() * 6000;

    return (
      <Bubble
        key={i}
        x={x}
        size={size}
        duration={duration}
        screenHeight={height}
      />
    );
  });

  return <View style={StyleSheet.absoluteFillObject}>{bubbles}</View>;
}
