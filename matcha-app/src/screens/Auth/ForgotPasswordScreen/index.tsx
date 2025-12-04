import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import SigninLink from '@/components/Auth/SigninLink';
import BackgroundBubbles from '@/components/Background/BackgroundBubbles';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm';
import { AuthStackParamList } from '@/types/navigation';

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);
  const [token, setToken] = useState('');
  const navigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const handleTokenSubmit = () => {
    if (token.trim()) {
      let cleanToken = token.trim();
      const tokenMatch = cleanToken.match(/token=([^&\s]+)/);
      if (tokenMatch) cleanToken = tokenMatch[1];

      navigation.navigate('ResetPassword', { token: cleanToken });
    }
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
            <Text style={styles.title}>Mot de passe oublié</Text>

            {!sent ? (
              <ForgotPasswordForm setSent={setSent} />
            ) : (
              <View>
                <Text style={styles.infoText}>
                  Si cet email existe, un lien de réinitialisation a été envoyé.
                </Text>

                {/* Mode test */}
                <Text style={styles.subLabel}>
                  Mode test : collez le token ici
                </Text>
                <Text style={styles.helperText}>
                  Collez l’URL ou uniquement la valeur après ?token=
                </Text>

                <TextInput
                  mode="outlined"
                  label="Token de réinitialisation"
                  value={token}
                  onChangeText={setToken}
                  placeholder="Collez ici le token"
                  multiline
                  style={styles.input}
                />

                <Button
                  mode="contained"
                  onPress={handleTokenSubmit}
                  disabled={!token.trim()}
                  style={styles.continueButton}
                >
                  Continuer
                </Button>

                <Button
                  mode="text"
                  onPress={() => setSent(false)}
                  style={styles.resendButton}
                >
                  Renvoyer un email
                </Button>
              </View>
            )}

            <View style={styles.linksContainer}>
              <SigninLink />
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
  scroll: { flex: 1 },
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
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 20,
    lineHeight: 20,
  },
  subLabel: {
    fontSize: 14,
    marginBottom: 6,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  input: {
    marginBottom: 12,
  },
  continueButton: {
    marginTop: 8,
    borderRadius: 12,
  },
  resendButton: {
    marginTop: 8,
  },
  linksContainer: {
    marginTop: 16,
    alignItems: 'center',
    gap: 4,
  },
});
