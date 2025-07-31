import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { styles } from '@/themes/styles';

import { LoginFormProps } from './types';

export default function LoginForm({
  email,
  motDePasse,
  setEmail,
  setMotDePasse,
  errors,
}: LoginFormProps) {
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
    </View>
  );
}
