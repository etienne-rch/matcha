import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/hooks/useAuth';
import { styles } from '@/themes/styles';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setMotDePasse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      Toast.show({
        type: 'success',
        text1: 'Connexion réussie',
        text2: 'Bienvenue !',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || 'Veuillez réessayer';
      Toast.show({
        type: 'error',
        text1: 'Échec de la connexion',
        text2: errorMessage,
        position: 'top',
        visibilityTime: 8000,
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
        error={!!errors.email}
        disabled={loading}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Mot de Passe"
        value={password}
        onChangeText={setMotDePasse}
        mode="outlined"
        secureTextEntry={!showPassword}
        style={styles.input}
        error={!!errors.password}
        disabled={loading}
        right={
          <TextInput.Icon
            icon={showPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      {errors.password && (
        <HelperText type="error">{errors.password}</HelperText>
      )}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.continueButton}
        loading={loading}
        disabled={loading}
      >
        Continuer
      </Button>
    </View>
  );
}
