import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import GoogleAuth from '@/components/Auth/GoogleAuth';
import LoginLink from '@/components/Auth/LoginLink';
import SigninLink from '@/components/Auth/SigninLink';
import TextDivider from '@/components/Divider/TextDivider';
import { styles } from '@/themes/styles';

export default function ResetPasswordScreen() {
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
              Réinitialiser le mot de passe
            </Text>

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
