import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { requestPasswordReset } from '@/api/auth';
import { ForgotPasswordFormProps } from '@/components/Forms/types';
import { styles } from '@/themes/styles';
import { validateEmail } from '@/utils/validation';

export default function ForgotPasswordForm({
  setSent,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      setError("L'email est requis");
      return;
    }
    if (!validateEmail(email)) {
      setError("Format d'email invalide");
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
        text2: 'Vérifiez votre boîte de réception',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } catch (err) {
      const errorMessage =
        (err as any)?.response?.data?.message || 'Veuillez réessayer';
      Toast.show({
        type: 'error',
        text1: "Échec de l'envoi",
        text2: errorMessage,
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
    <View style={styles.inputContainer}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        error={!!error}
        disabled={loading}
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.continueButton}
        loading={loading}
        disabled={loading}
      >
        Envoyer le lien
      </Button>
    </View>
  );
}
