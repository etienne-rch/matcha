import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';
import { validatePassword } from '@/utils/validation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ResetPasswordForm() {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation<NavigationProp>();

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
    Toast.show({
      type: 'success',
      text1: 'Mot de passe modifié avec succès',
      text2: "Vous allez être redirigé vers l'écran de connexion",
      position: 'top',
      visibilityTime: 3000,
    });
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  };

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
