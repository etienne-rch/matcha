import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import DeleteAccountModal from '@/components/Modals/DeleteAccountModal';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@/hooks/useModals';
import { styles } from '@/themes/styles';

export default function DeleteAccount() {
  const { deleteAccount } = useAuth();
  const modal = useModal();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      modal.hide();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.deleteAccountButton}
        onPress={modal.show}
        activeOpacity={0.7}
      >
        <Text style={styles.deleteAccountText}>Cliquez ici</Text>
      </TouchableOpacity>
      <DeleteAccountModal
        visible={modal.visible}
        onDismiss={modal.hide}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
}
