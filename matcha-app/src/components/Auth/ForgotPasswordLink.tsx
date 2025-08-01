import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ForgotPasswordLink() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.linkContainer}>
      <Text>Mot de passe oublié ? </Text>
      <Button
        mode="text"
        compact
        style={styles.linkButton}
        labelStyle={styles.linkText}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Cliquez ici
      </Button>
    </View>
  );
}
