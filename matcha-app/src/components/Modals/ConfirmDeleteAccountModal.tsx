import React from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import rnpTheme from '@/themes/rnpTheme';

export default function ConfirmDeleteAccountModal({
  visible,
  onCancel,
  onConfirm,
}: {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onCancel}>
        <View />
      </Pressable>

      <View style={styles.modal}>
        <Text style={styles.title}>Supprimer mon compte</Text>

        <Text style={styles.text}>
          Es-tu sûr de vouloir supprimer ton compte ? Cette action est
          irréversible.
        </Text>

        <View style={styles.actions}>
          <Button mode="text" onPress={onCancel}>
            Annuler
          </Button>

          <Button
            mode="contained"
            onPress={onConfirm}
            buttonColor={rnpTheme.colors.error}
          >
            Supprimer
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  modal: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 24,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: rnpTheme.colors.primary,
  },
  text: {
    fontSize: 14,
    color: '#555',
    marginBottom: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});
