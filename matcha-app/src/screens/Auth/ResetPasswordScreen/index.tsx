import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import NewPasswordForm from '@/components/Forms/NewPasswordForm';
import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

type ResetPasswordScreenRouteProp = RouteProp<
  AuthStackParamList,
  'ResetPassword'
>;

export default function ResetPasswordScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const route = useRoute<ResetPasswordScreenRouteProp>();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (route.params?.token) {
      setToken(route.params.token);
    }
  }, [route.params]);

  const handleSuccess = () => {
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/default.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Branding.Logo />
          <View style={styles.formContainer}>
            <Text variant="headlineMedium" style={styles.title}>
              Nouveau mot de passe
            </Text>
            {token ? (
              <>
                <Text style={localStyles.centeredText}>
                  Veuillez saisir votre nouveau mot de passe
                </Text>
                <NewPasswordForm token={token} onSuccess={handleSuccess} />
              </>
            ) : (
              <View style={localStyles.centeredView}>
                <Text style={localStyles.centeredText}>
                  Aucun token de réinitialisation trouvé.
                </Text>
                <Button
                  mode="contained"
                  onPress={() => navigation.navigate('ForgotPassword')}
                  style={styles.continueButton}
                >
                  Demander un nouveau lien
                </Button>
              </View>
            )}
            <View style={styles.linksContainer}>
              <LoginLink />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const localStyles = StyleSheet.create({
  centeredText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  centeredView: {
    alignItems: 'center',
  },
});
