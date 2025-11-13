import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import GoogleAuth from '@/components/Auth/GoogleAuth';
import LoginLink from '@/components/Auth/LoginLink';
import SigninLink from '@/components/Auth/SigninLink';
import TextDivider from '@/components/Divider/TextDivider';
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm';
import { styles } from '@/themes/styles';
import { AuthStackParamList } from '@/types/navigation';

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleTokenSubmit = () => {
    if (token.trim()) {
      // Extraire le token si l'utilisateur a collé le lien complet
      let cleanToken = token.trim();
      const tokenMatch = cleanToken.match(/token=([^&\s]+)/);
      if (tokenMatch) {
        cleanToken = tokenMatch[1];
      }
      navigation.navigate('ResetPassword', { token: cleanToken });
    }
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
              Mot de passe oublié
            </Text>
            {sent ? (
              <View>
                <Text style={{ marginBottom: 20 }}>
                  Si cet email existe, un lien de réinitialisation a été envoyé.
                </Text>
                <Text style={{ marginBottom: 10, marginTop: 10 }}>
                  Mode test : Coller le token ici
                </Text>
                <Text
                  variant="bodySmall"
                  style={{ marginBottom: 15, color: '#666' }}
                >
                  Ouvrez l'email, copiez le lien complet ou juste le token après
                  "?token=" et collez-le ci-dessous.
                </Text>
                <TextInput
                  label="Token de réinitialisation"
                  value={token}
                  onChangeText={setToken}
                  mode="outlined"
                  placeholder="Collez le token depuis l'email"
                  style={styles.input}
                  multiline
                />
                <Button
                  mode="contained"
                  onPress={handleTokenSubmit}
                  style={styles.continueButton}
                  disabled={!token.trim()}
                >
                  Continuer avec ce token
                </Button>
                <Button
                  mode="text"
                  onPress={() => setSent(false)}
                  style={{ marginTop: 10 }}
                >
                  Renvoyer un email
                </Button>
              </View>
            ) : (
              <ForgotPasswordForm
                {...{
                  setSent,
                }}
              />
            )}

            <TextDivider text="OU" />
            <View style={styles.container}>
              <GoogleAuth />
            </View>
            <View style={styles.linksContainer}>
              <SigninLink />
              <LoginLink />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
