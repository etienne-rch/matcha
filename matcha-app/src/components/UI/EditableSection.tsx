import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EditableSection({
  title,
  isEditing,
  onEdit,
  children,
}: {
  title: string;
  isEditing: boolean;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>

        {!isEditing && (
          <TouchableOpacity onPress={onEdit}>
            <Text style={styles.editButton}>Modifier</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    marginBottom: 22,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#062314',
  },

  editButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0A2916',
  },

  content: {
    marginTop: 4,
    gap: 12,
  },
});
