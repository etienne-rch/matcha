import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { styles } from '@/themes/styles';
import { validatePassword } from '@/utils/validation';

export default function ResetPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!currentPassword || !password || !confirm) {
      setError('Tous les champs sont requis');
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre',
      );
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setError('');
    Toast.show({
      type: 'success',
      text1: 'Mot de passe modifié avec succès',
      position: 'top',
      visibilityTime: 3000,
    });
    // Appel API pour modifier le mot de passe
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Mot de passe actuel"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!error}
      />
      <TextInput
        label="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!error}
      />
      <TextInput
        label="Confirmer le mot de passe"
        value={confirm}
        onChangeText={setConfirm}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!error}
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.continueButton}
      >
        Modifier le mot de passe
      </Button>
    </View>
  );
}
