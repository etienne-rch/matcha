import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/themes/colors';

interface TagListProps {
  items: string[];
  variant?: 'success' | 'warning';
}

export default function TagList({ items, variant = 'success' }: TagListProps) {
  return (
    <View style={styles.tagContainer}>
      {items.map((item, index) => (
        <View
          key={index}
          style={[styles.tag, variant === 'warning' && styles.tagWarning]}
        >
          <Text
            style={[
              styles.tagText,
              variant === 'warning' && styles.tagTextWarning,
            ]}
          >
            {item}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    backgroundColor: Colors.greenLight.light.normal,
    borderWidth: 1,
    borderColor: Colors.greenLight.normal,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  tagWarning: {
    backgroundColor: Colors.orange.light.normal,
    borderColor: Colors.orange.normal,
  },
  tagText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.greenLight.dark.normal,
  },
  tagTextWarning: {
    color: Colors.orange.dark.normal,
  },
});
