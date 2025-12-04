import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/hooks/useAuth';
import { registrationSchema } from '@/schemas/registration';
import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';
import { validateZod } from '@/utils/validation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function RegistrationForm() {
  const navigation = useNavigation<NavigationProp>();
  const { register } = useAuth();

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    const { valid, errors: zodErrors } = validateZod(registrationSchema, {
      firstName,
      lastName,
      email,
      password,
    });

    setErrors({
      firstName: zodErrors.firstName || '',
      lastName: zodErrors.lastName || '',
      email: zodErrors.email || '',
      password: zodErrors.password || '',
    });

    if (!valid) return;

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

      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');

      // Redirection vers l'écran de connexion après un court délai
      setTimeout(() => navigation.navigate('Login'), 1000);
    } catch {
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
        disabled={loading}
        error={!!errors.firstName}
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
        disabled={loading}
        error={!!errors.lastName}
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
        disabled={loading}
        error={!!errors.email}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Mot de Passe"
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        secureTextEntry={!showPassword}
        style={styles.input}
        disabled={loading}
        error={!!errors.password}
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
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
      >
        Continuer
      </Button>
    </View>
  );
}
