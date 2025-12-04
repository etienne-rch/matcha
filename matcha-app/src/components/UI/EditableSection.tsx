import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';

export default function EditableSection({
  title,
  children,
  isEditing,
  onEdit,
}: {
  title: string;
  children: React.ReactNode;
  isEditing: boolean;
  onEdit: () => void;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        {!isEditing && (
          <TouchableOpacity onPress={onEdit}>
            <MaterialIcons
              name="edit"
              size={22}
              color={rnpTheme.colors.greenDark.normal}
            />
          </TouchableOpacity>
        )}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: rnpTheme.spacing.lg,
    borderRadius: 16,
    marginBottom: rnpTheme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: rnpTheme.spacing.md,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
});
