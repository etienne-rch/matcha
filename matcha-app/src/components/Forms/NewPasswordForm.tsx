import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { resetPassword } from '@/api/auth';
import { newPasswordSchema } from '@/schemas/password-reset';
import { validateZod } from '@/utils/validation';

import { NewPasswordFormProps } from './types';

export default function NewPasswordForm({
  token,
  onSuccess,
}: NewPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState('');

  const handleSubmit = async () => {
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
      await resetPassword(token, password);

      Toast.show({
        type: 'success',
        text1: 'Mot de passe réinitialisé',
        text2: 'Vous pouvez maintenant vous connecter.',
      });

      setTimeout(onSuccess, 1200);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Le token est invalide ou expiré.';
      setError(errorMessage);

      Toast.show({
        type: 'error',
        text1: 'Échec de la réinitialisation',
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!showPassword}
        style={styles.input}
        disabled={loading}
        error={!!error}
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
        disabled={loading}
        error={!!error}
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
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
      >
        Réinitialiser le mot de passe
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  continueButton: {
    marginTop: 12,
    borderRadius: 12,
  },
});
