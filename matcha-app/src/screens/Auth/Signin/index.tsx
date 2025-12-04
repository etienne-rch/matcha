import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import LoginLink from '@/components/Auth/LoginLink';
import BackgroundBubbles from '@/components/Background/BackgroundBubbles';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import RegistrationForm from '@/components/Forms/RegistrationForm';
import CGUModal from '@/components/Modals/CGUModal';
import PrivacyModal from '@/components/Modals/PrivacyModal';
import TermsAndPrivacyText from '@/components/Texts/TermsAndPrivacyText';
import { useModal } from '@/hooks/useModals';

export default function SigninScreen() {
  const termsModal = useModal();
  const privacyModal = useModal();

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
            <Text style={styles.title}>Inscription</Text>
            <Text style={styles.subtitle}>
              Crée ton compte pour accéder aux tests et recommandations.
            </Text>

            <RegistrationForm />

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
  },
  linksContainer: {
    marginTop: 12,
    alignItems: 'center',
    gap: 4,
  },
});
