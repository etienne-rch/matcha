import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { requestPasswordReset } from '@/api/auth';
import { forgotPasswordSchema } from '@/schemas/forgot-password';
import { validateZod } from '@/utils/validation';

import { ForgotPasswordFormProps } from './types';

export default function ForgotPasswordForm({
  setSent,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const { valid, errors } = validateZod(forgotPasswordSchema, { email });

    if (!valid) {
      setError(errors.email);
      return;
    }

    setError('');
    setLoading(true);

    try {
      await requestPasswordReset(email);

      setSent(true);

      Toast.show({
        type: 'success',
        text1: 'Email envoyé',
        text2: 'Vérifiez votre boîte de réception.',
      });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Veuillez réessayer.';
      Toast.show({
        type: 'error',
        text1: "Échec de l'envoi",
        text2: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        disabled={loading}
        error={!!error}
      />

      {error && <HelperText type="error">{error}</HelperText>}

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
      >
        Envoyer le lien
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
