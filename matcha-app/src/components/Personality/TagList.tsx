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
    backgroundColor: 'rgba(232,244,238,0.9)',
    borderWidth: 1,
    borderColor: Colors.greenLight.normal,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  tagWarning: {
    backgroundColor: 'rgba(255,241,230,0.95)',
    borderColor: Colors.orange.normal,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.greenDark.normal,
  },
  tagTextWarning: {
    color: Colors.orange.dark.normal,
  },
});
