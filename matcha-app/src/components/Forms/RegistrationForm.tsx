import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { validateEmail, validatePassword } from '@/utils/validation';

export default function RegistrationForm() {
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { firstname: '', lastname: '', email: '', password: '' };

    if (!lastname.trim()) {
      newErrors.lastname = 'Le nom est requis';
      valid = false;
    }

    if (!firstname.trim()) {
      newErrors.firstname = 'Le prénom est requis';
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
      console.info('Validation failed');
    } else {
      fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          firstName: firstname,
          lastName: lastname,
          consentAccepted: true,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          navigation.navigate('Login');
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Nom"
        value={lastname}
        onChangeText={setLastname}
        mode="outlined"
        style={styles.input}
        error={!!errors.lastname}
      />
      {errors.lastname && (
        <HelperText type="error">{errors.lastname}</HelperText>
      )}

      <TextInput
        label="Prénom"
        value={firstname}
        onChangeText={setFirstname}
        mode="outlined"
        style={styles.input}
        error={!!errors.firstname}
      />
      {errors.firstname && (
        <HelperText type="error">{errors.firstname}</HelperText>
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
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Mot de Passe"
        value={password}
        onChangeText={setPassword}
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
        onPress={handleRegister}
        style={styles.continueButton}
      >
        Continuer
      </Button>
    </View>
  );
}
