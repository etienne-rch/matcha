import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/hooks/useAuth';
import { styles } from '@/themes/styles';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function RegistrationForm() {
  const [lastName, setLastname] = useState('');
  const [firstName, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { firstName: '', lastName: '', email: '', password: '' };

    if (!lastName.trim()) {
      newErrors.lastName = 'Le nom est requis';
      valid = false;
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'Le prénom est requis';
      valid = false;
    }

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

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register({ email, password, firstName, lastName });
      Toast.show({
        type: 'success',
        text1: 'Inscription réussie',
        text2: 'Vérifiez votre email pour confirmer votre compte',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } catch (_error) {
      Toast.show({
        type: 'error',
        text1: "Échec de l'inscription",
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
    <View style={styles.inputContainer}>
      <TextInput
        label="Prénom"
        value={firstName}
        onChangeText={setFirstname}
        mode="outlined"
        style={styles.input}
        error={!!errors.firstName}
        disabled={loading}
      />
      {errors.firstName && (
        <HelperText type="error">{errors.firstName}</HelperText>
      )}

      <TextInput
        label="Nom"
        value={lastName}
        onChangeText={setLastname}
        mode="outlined"
        style={styles.input}
        error={!!errors.lastName}
        disabled={loading}
      />
      {errors.lastName && (
        <HelperText type="error">{errors.lastName}</HelperText>
      )}

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
        onChangeText={setPassword}
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
        onPress={handleRegister}
        style={styles.continueButton}
        loading={loading}
        disabled={loading}
      >
        Continuer
      </Button>
    </View>
  );
}
