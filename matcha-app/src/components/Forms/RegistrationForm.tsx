import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';

import { RegistrationFormProps } from '@/components/Forms/types';
import { styles } from '@/themes/styles';

export default function RegistrationForm(
  props: RegistrationFormProps & { errors: any },
) {
  const {
    nom,
    prenom,
    email,
    motDePasse,
    setNom,
    setPrenom,
    setEmail,
    setMotDePasse,
    errors,
  } = props;

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
    </View>
  );
}
