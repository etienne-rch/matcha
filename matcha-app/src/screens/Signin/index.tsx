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

export default function SigninScreen() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  const [errors, setErrors] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
  });

  const termsModal = useModal();
  const privacyModal = useModal();

  const validateForm = () => {
    let valid = true;
    let newErrors = { nom: '', prenom: '', email: '', motDePasse: '' };

    if (!nom.trim()) {
      newErrors.nom = 'Le nom est requis';
      valid = false;
    }

    if (!prenom.trim()) {
      newErrors.prenom = 'Le prénom est requis';
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'L’email est requis';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format d’email invalide';
      valid = false;
    }

    if (!motDePasse.trim()) {
      newErrors.motDePasse = 'Le mot de passe est requis';
      valid = false;
    } else if (motDePasse.length < 8) {
      newErrors.motDePasse = 'Minimum 8 caractères';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log('Formulaire valide → Inscription...');
    }
  };

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
            errors,
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
          onPress={handleRegister}
          style={styles.continueButton}
        >
          Continuer
        </Button>

        <LoginLink />
      </View>
    </ScrollView>
  );
}
