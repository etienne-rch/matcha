import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Branding } from '@/assets';
import SigninLink from '@/components/Auth/SigninLink';
import GoogleAuth from '@/components/Auth/googleAuth';
import TextDivider from '@/components/Divider/TextDivider';
import LoginForm from '@/components/Forms/LoginForm';
import { styles } from '@/themes/styles';

export default function SigninScreen() {
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
    } else if (motDePasse.length < 6) {
      newErrors.motDePasse = 'Minimum 6 caractères';
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
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Branding.Logo />

      <View style={styles.formContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Connexion
        </Text>

        <LoginForm
          {...{
            email,
            motDePasse,
            setEmail,
            setMotDePasse,
            errors,
          }}
        />

        <TextDivider text="OU" />
        <View style={styles.container}>
          <GoogleAuth />

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.continueButton}
          >
            Continuer
          </Button>
        </View>

        <SigninLink />
      </View>
    </ScrollView>
  );
}
