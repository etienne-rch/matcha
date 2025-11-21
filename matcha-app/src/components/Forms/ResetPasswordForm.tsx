import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { changePassword } from '@/api/profile';
import { newPasswordSchema } from '@/schemas/password-reset';
import { styles } from '@/themes/styles';
import { validateZod } from '@/utils/validation';

export default function ResetPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword.trim()) {
      setError('Le mot de passe actuel est requis');
      return;
    }

    const { valid, errors } = validateZod(newPasswordSchema, {
      password,
      confirm,
    });

    if (!valid) {
      setError(errors.password || errors.confirm);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await changePassword({
        oldPassword: currentPassword,
        newPassword: password,
        confirmNewPassword: confirm,
      });

      Toast.show({
        type: 'success',
        text1: 'Mot de passe modifié',
        text2: 'Votre mot de passe a été mis à jour',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });

      // Réinitialiser les champs
      setCurrentPassword('');
      setPassword('');
      setConfirm('');
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Échec du changement',
        text2: 'Veuillez réessayer',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text variant="headlineMedium" style={styles.title}>
        Réinitialiser le mot de passe
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="Mot de passe actuel"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          mode="outlined"
          secureTextEntry={!showCurrentPassword}
          style={styles.input}
          error={!!error}
          disabled={loading}
          right={
            <TextInput.Icon
              icon={showCurrentPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowCurrentPassword(!showCurrentPassword)}
            />
          }
        />
        <TextInput
          label="Nouveau mot de passe"
          value={password}
          onChangeText={setPassword}
          mode="outlined"
          secureTextEntry={!showPassword}
          style={styles.input}
          error={!!error}
          disabled={loading}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <TextInput
          label="Confirmer le mot de passe"
          value={confirm}
          onChangeText={setConfirm}
          mode="outlined"
          secureTextEntry={!showConfirm}
          style={styles.input}
          error={!!error}
          disabled={loading}
          right={
            <TextInput.Icon
              icon={showConfirm ? 'eye-off' : 'eye'}
              onPress={() => setShowConfirm(!showConfirm)}
            />
          }
        />
        {error && <HelperText type="error">{error}</HelperText>}
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.continueButton}
          loading={loading}
          disabled={loading}
        >
          Modifier le mot de passe
        </Button>
      </View>
    </View>
  );
}
