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

  const sizeScale = 0.7 + (distanceFromMiddle / middleIndex) * 0.6;
  const circleSize = 32 * sizeScale;

  let circleColor = Colors.greyLight.normal;
  let borderColor = Colors.greyLight.dark.normal;
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
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: circleColor,
            borderColor: borderColor,
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
  },
});
