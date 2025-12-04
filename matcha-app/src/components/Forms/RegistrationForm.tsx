import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/hooks/useAuth';
import { registrationSchema } from '@/schemas/registration';
import { AuthStackParamList } from '@/types/navigation';
import { validateZod } from '@/utils/validation';

type NavProps = NativeStackNavigationProp<AuthStackParamList>;

export default function RegistrationForm() {
  const navigation = useNavigation<NavProps>();
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
        text2: 'Vérifie tes emails pour activer ton compte.',
      });

      navigation.navigate('Login');
    } catch {
      Toast.show({
        type: 'error',
        text1: "Échec de l'inscription",
        text2: 'Veuillez réessayer.',
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
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
        disabled={loading}
        error={!!errors.email}
      />
      {errors.email && <HelperText type="error">{errors.email}</HelperText>}

      <TextInput
        label="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
        mode="outlined"
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
        loading={loading}
        disabled={loading}
        style={styles.continueButton}
        onPress={handleRegister}
      >
        Continuer
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    marginBottom: 8,
  },
  continueButton: {
    marginTop: 12,
    borderRadius: 12,
  },
});
