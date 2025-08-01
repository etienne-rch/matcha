import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function LoginLink() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.linkContainer}>
      <Text>Déjà inscrit ? </Text>
      <Button
        mode="text"
        compact
        style={styles.linkButton}
        labelStyle={styles.linkText}
        onPress={() => navigation.navigate('Login')}
      >
        Se connecter
      </Button>
    </View>
  );
}
