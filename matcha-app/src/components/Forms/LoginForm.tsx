import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { useAuth } from '@/hooks/useAuth';
import { styles } from '@/themes/styles';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setMotDePasse] = useState('');
  const { login } = useAuth();

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'L’email est requis';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Format d’email invalide';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Le mot de passe est requis';
      valid = false;
    } else if (!validatePassword(password)) {
      newErrors.password =
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      console.info('Validation failed');
    } else {
      try {
        login(email, password);
      } catch (error) {
        console.error('Error:', error);
      }
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
        value={password}
        onChangeText={setMotDePasse}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!errors.password}
      />
      {errors.password && (
        <HelperText type="error">{errors.password}</HelperText>
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
