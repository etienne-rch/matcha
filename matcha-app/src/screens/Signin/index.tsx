import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import GoogleAuth from '@/components/Auth/googleAuth';
import TextDivider from '@/components/Divider/TextDivider';
import RegistrationForm from '@/components/Forms/RegistrationForm';
import CGUModal from '@/components/Modals/CGUModal';
import PrivacyModal from '@/components/Modals/PrivacyModal';
import TermsAndPrivacyText from '@/components/Texts/TermsAndPrivacyText';
import { useModal } from '@/hooks/useModals';
import { styles } from '@/themes/styles';

export default function SigninScreen() {
  const termsModal = useModal();
  const privacyModal = useModal();

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
              Inscription
            </Text>

            <RegistrationForm />

            <TextDivider text="OU" />

            <GoogleAuth />

            <Portal>
              <CGUModal
                visible={termsModal.visible}
                onDismiss={termsModal.hide}
              />
              <PrivacyModal
                visible={privacyModal.visible}
                onDismiss={privacyModal.hide}
              />
            </Portal>

            <TermsAndPrivacyText
              showModalTerms={termsModal.show}
              showModalPrivacy={privacyModal.show}
            />

            <View style={styles.linksContainer}>
              <LoginLink />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
