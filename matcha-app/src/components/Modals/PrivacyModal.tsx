import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

import { modalStyles } from '@/components/Modals/styles';

import { ModalProps } from './types';

export default function PrivacyModal(props: ModalProps) {
  const { visible, onDismiss } = props;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={modalStyles.containerModal}
      >
        <ScrollView>
          <Text style={modalStyles.title}>
            Politique de Confidentialité – Matcha
          </Text>
          <Text style={modalStyles.update}>
            Dernière mise à jour : 25 juillet 2025
          </Text>

          <Text style={modalStyles.section}>
            1. Introduction{'\n'}
            La présente Politique de Confidentialité explique comment Matcha
            collecte, utilise et protège les informations personnelles des
            utilisateurs. Elle s’applique à toutes les fonctionnalités de
            l’application et vise à assurer la transparence sur le traitement
            des données.
          </Text>

          <Text style={modalStyles.section}>
            2. Données collectées{'\n'}
            Nous collectons les informations que vous fournissez lors de votre
            inscription (nom, prénom, email, mot de passe), ainsi que des
            données liées à votre utilisation de l’application (formations
            consultées, favoris, candidatures).
          </Text>

          <Text style={modalStyles.section}>
            3. Utilisation des données{'\n'}
            Les données sont utilisées pour :{'\n'}- Fournir nos services (mise
            en relation, notifications) ;{'\n'}- Améliorer l’expérience
            utilisateur et personnaliser le contenu ;{'\n'}- Garantir la
            sécurité des comptes et prévenir les abus ;{'\n'}- Respecter nos
            obligations légales.
          </Text>

          <Text style={modalStyles.section}>
            4. Partage des données{'\n'}
            Les données ne sont jamais vendues. Elles peuvent être partagées
            uniquement avec des partenaires de formation ou des entreprises
            lorsque vous postulez ou interagissez volontairement avec eux.
          </Text>

          <Text style={modalStyles.section}>
            5. Conservation et sécurité{'\n'}
            Vos données sont stockées sur des serveurs sécurisés. Nous mettons
            en œuvre des mesures techniques pour protéger vos informations
            contre tout accès non autorisé.
          </Text>

          <Text style={modalStyles.section}>
            6. Vos droits{'\n'}
            Vous disposez d’un droit d’accès, de rectification et de suppression
            de vos données personnelles. Pour exercer ces droits, contactez-nous
            à support@matcha-app.com.
          </Text>

          <Text style={modalStyles.section}>
            7. Modifications{'\n'}
            Nous nous réservons le droit de mettre à jour cette politique en cas
            de changement légal ou technique. Les utilisateurs seront informés
            des modifications importantes.
          </Text>

          <Button
            mode="contained"
            onPress={onDismiss}
            style={modalStyles.closeButton}
          >
            Fermer
          </Button>
        </ScrollView>
      </Modal>
    </Portal>
  );
}
