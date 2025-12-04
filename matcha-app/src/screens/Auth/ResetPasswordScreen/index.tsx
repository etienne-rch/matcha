import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import BackgroundBubbles from '@/components/Background/BackgroundBubbles';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import NewPasswordForm from '@/components/Forms/NewPasswordForm';
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
    <BackgroundRadial>
      <View style={styles.bubblesLayer} pointerEvents="none">
        <BackgroundBubbles />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Branding.Logo />
          </View>

          <View style={styles.card}>
            <Text style={styles.title}>Nouveau mot de passe</Text>

            {token ? (
              <>
                <Text style={styles.subtitle}>
                  Veuillez saisir votre nouveau mot de passe.
                </Text>
                <NewPasswordForm token={token} onSuccess={handleSuccess} />
              </>
            ) : (
              <View style={styles.centeredView}>
                <Text style={styles.subtitle}>
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
    </BackgroundRadial>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 32,
    justifyContent: 'center',
  },
  bubblesLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
    zIndex: 5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    zIndex: 5,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#062314',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.55)',
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'left',
  },
  centeredView: {
    alignItems: 'center',
  },
  continueButton: {
    marginTop: 12,
    borderRadius: 12,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: 'center',
    gap: 4,
  },
});
