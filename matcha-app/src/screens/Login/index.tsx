import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Portal, Text } from 'react-native-paper';

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

export default function LoginScreen() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const termsModal = useModal();
  const privacyModal = useModal();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Branding.Logo />

      <View style={styles.formContainer}>
        <Text variant="headlineMedium" style={styles.title}>
          Inscription
        </Text>

        <RegistrationForm
          {...{
            nom,
            prenom,
            email,
            motDePasse,
            setNom,
            setPrenom,
            setEmail,
            setMotDePasse,
          }}
        />

        <TextDivider text="OU" />

        <GoogleAuth />

        <Portal>
          <CGUModal visible={termsModal.visible} onDismiss={termsModal.hide} />
          <PrivacyModal
            visible={privacyModal.visible}
            onDismiss={privacyModal.hide}
          />
        </Portal>

        <TermsAndPrivacyText
          showModalTerms={termsModal.show}
          showModalPrivacy={privacyModal.show}
        />

        <Button
          mode="contained"
          onPress={() => console.log('Inscription')}
          style={styles.continueButton}
        >
          Continuer
        </Button>

        <LoginLink />
      </View>
    </ScrollView>
  );
}
