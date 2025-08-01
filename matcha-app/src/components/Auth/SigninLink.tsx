import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function SigninLink() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.linkContainer}>
      <Text>Besoin d'un compte ? </Text>
      <Button
        mode="text"
        compact
        style={styles.linkButton}
        labelStyle={styles.linkText}
        onPress={() => navigation.navigate('Signin')}
      >
        S'inscrire
      </Button>
    </View>
  );
}
