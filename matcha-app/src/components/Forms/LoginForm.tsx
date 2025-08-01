import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { styles } from '@/themes/styles';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const [errors, setErrors] = useState({
    email: '',
    motDePasse: '',
  });
  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', motDePasse: '' };

    if (!email.trim()) {
      newErrors.email = 'L’email est requis';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format d’email invalide';
      valid = false;
    }

    if (!motDePasse.trim()) {
      newErrors.motDePasse = 'Le mot de passe est requis';
      valid = false;
    } else if (motDePasse.length < 8) {
      newErrors.motDePasse = 'Minimum 8 caractères';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      console.log('Formulaire valide → Inscription...');
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
        error={!!errors.email}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Mot de Passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!errors.motDePasse}
      />
      {errors.motDePasse && (
        <HelperText type="error">{errors.motDePasse}</HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.continueButton}
      >
        Continuer
      </Button>
    </View>
  );
}
