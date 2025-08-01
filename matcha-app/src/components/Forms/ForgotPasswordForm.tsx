import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { ForgotPasswordFormProps } from '@/components/Forms/types';
import { styles } from '@/themes/styles';

export default function ForgotPasswordForm({
  setSent,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('L’email est requis');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Format d’email invalide');
      return;
    }
    setError('');
    setSent(true);
    // appel API
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
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.continueButton}
      >
        Envoyer le lien
      </Button>
    </View>
  );
}
