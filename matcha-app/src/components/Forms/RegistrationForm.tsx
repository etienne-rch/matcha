import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { styles } from '@/themes/styles';

export default function RegistrationForm() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
  });

  const validateForm = () => {
    let valid = true;
    let newErrors = { nom: '', prenom: '', email: '', motDePasse: '' };

    if (!nom.trim()) {
      newErrors.nom = 'Le nom est requis';
      valid = false;
    }

    if (!prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
      valid = false;
    }

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

  const handleRegister = () => {
    if (validateForm()) {
      console.log('Formulaire valide → Inscription...');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Nom"
        value={nom}
        onChangeText={setNom}
        mode="outlined"
        style={styles.input}
        error={!!errors.nom}
      />
      {errors.nom && <HelperText type="error">{errors.nom}</HelperText>}

      <TextInput
        label="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        mode="outlined"
        style={styles.input}
        error={!!errors.prenom}
      />
      {errors.prenom && <HelperText type="error">{errors.prenom}</HelperText>}

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
        onPress={handleRegister}
        style={styles.continueButton}
      >
        Continuer
      </Button>
    </View>
  );
}
