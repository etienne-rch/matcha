import React, { useState } from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import SigninLink from '@/components/Auth/SigninLink';
import GoogleAuth from '@/components/Auth/googleAuth';
import TextDivider from '@/components/Divider/TextDivider';
import ForgotPasswordForm from '@/components/Forms/ForgotPasswordForm';
import { styles } from '@/themes/styles';

export default function ForgotPasswordScreen() {
  const [sent, setSent] = useState(false);

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
              <Text style={{ marginVertical: 16 }}>
                Si cet email existe, un lien de réinitialisation a été envoyé.
              </Text>
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
