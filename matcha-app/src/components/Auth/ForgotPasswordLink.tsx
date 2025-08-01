import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Text } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ForgotPasswordLink() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <Text style={styles.loginText}>
        Mot de passe oublié ?{' '}
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          Cliquez ici
        </Text>
      </Text>
    </>
  );
}
