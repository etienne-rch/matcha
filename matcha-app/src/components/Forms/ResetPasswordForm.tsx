import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, Text, TextInput } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  const validatePassword = (pwd: string) => {
    // Au moins 8 caractères, une majuscule, une minuscule, un chiffre
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pwd);
  };

  const handleSubmit = () => {
    if (!password || !confirm) {
      setError('Tous les champs sont requis');
      return;
    }
    if (!validatePassword(password)) {
      setError(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre',
      );
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    setError('');
    setSuccess(true);
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  };

  if (success) {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Mot de passe modifié avec succès</Text>
      </View>
    );
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Nouveau mot de passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!error}
      />
      <TextInput
        label="Confirmer le mot de passe"
        value={confirm}
        onChangeText={setConfirm}
        mode="outlined"
        secureTextEntry
        style={styles.input}
        error={!!error}
      />
      {error && <HelperText type="error">{error}</HelperText>}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.continueButton}
      >
        Réinitialiser
      </Button>
    </View>
  );
}
