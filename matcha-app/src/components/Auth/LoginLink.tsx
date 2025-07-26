import React from 'react';
import { Text } from 'react-native-paper';

import { styles } from '@/themes/styles';

export default function LoginLink() {
  return (
    <>
      <Text style={styles.loginText}>
        Déjà inscrit ? <Text style={styles.linkText}>Se connecter</Text>
      </Text>
    </>
  );
}
