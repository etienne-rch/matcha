import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import ForgotPasswordLink from '@/components/Auth/ForgotPasswordLink';
import GoogleAuth from '@/components/Auth/GoogleAuth';
import SigninLink from '@/components/Auth/SigninLink';
import TextDivider from '@/components/Divider/TextDivider';
import LoginForm from '@/components/Forms/LoginForm';
import { styles } from '@/themes/styles';

export default function LoginScreen() {
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
              Connexion
            </Text>

            <LoginForm />

            <TextDivider text="OU" />
            <View style={styles.container}>
              <GoogleAuth />
            </View>

            <View style={styles.linksContainer}>
              <SigninLink />
              <ForgotPasswordLink />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
