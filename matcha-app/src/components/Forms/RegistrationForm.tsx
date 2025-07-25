import { View } from 'react-native';
import { TextInput } from 'react-native-paper';

import { RegistrationFormProps } from '@/components/Forms/types';
import { styles } from '@/themes/styles';

export default function RegistrationForm(props: RegistrationFormProps) {
  const {
    nom,
    prenom,
    email,
    motDePasse,
    setNom,
    setPrenom,
    setEmail,
    setMotDePasse,
  } = props;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Nom"
        value={nom}
        onChangeText={setNom}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Prénom"
        value={prenom}
        onChangeText={setPrenom}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        label="Mot de Passe"
        value={motDePasse}
        onChangeText={setMotDePasse}
        mode="outlined"
        secureTextEntry
        style={styles.input}
      />
    </View>
  );
}
