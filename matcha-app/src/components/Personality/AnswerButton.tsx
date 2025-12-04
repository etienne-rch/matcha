import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '@/themes/colors';

interface AnswerButtonProps {
  value: number;
  index: number;
  totalOptions: number;
  isSelected: boolean;
  onPress: () => void;
}

export default function AnswerButton({
  index,
  totalOptions,
  isSelected,
  onPress,
}: AnswerButtonProps) {
  const middleIndex = (totalOptions - 1) / 2;
  const distanceFromMiddle = Math.abs(index - middleIndex);

  const sizeScale = 0.8 + (distanceFromMiddle / middleIndex) * 0.4;
  const circleSize = 30 * sizeScale;

  // Base neutre
  let circleColor = 'rgba(255,255,255,0.9)';
  let borderColor = 'rgba(0,0,0,0.06)';

  if (isSelected) {
    if (index < 2) {
      circleColor = Colors.orange.light.normal;
      borderColor = Colors.orange.normal;
    } else if (index === 2) {
      circleColor = Colors.greyLight.active;
      borderColor = Colors.greyLight.dark.normal;
    } else {
      circleColor = Colors.greenLight.normal;
      borderColor = Colors.greenLight.dark.normal;
    }
  }

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: circleColor,
            borderColor,
            shadowOpacity: isSelected ? 0.25 : 0.08,
          },
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
  },
  circle: {
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
});
