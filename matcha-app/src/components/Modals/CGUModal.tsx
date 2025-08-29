import * as React from 'react';
import { ScrollView } from 'react-native';
import { Button, Modal, Portal, Text } from 'react-native-paper';

import { modalStyles } from '@/components/Modals/styles';

import { ModalProps } from './types';

export default function CGUModal(props: ModalProps) {
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
            Conditions Générales d’Utilisation – Matcha
          </Text>
          <Text style={modalStyles.update}>
            Dernière mise à jour : 25 juillet 2025
          </Text>

          {/* 1. Objet */}
          <Text style={modalStyles.section}>
            1. Objet{'\n'}
            L’application Matcha a pour vocation de faciliter la mise en
            relation entre particuliers, organismes de formation et entreprises.
            Elle permet aux utilisateurs de rechercher des formations adaptées à
            leurs objectifs professionnels, de postuler directement à des
            opportunités, et d’échanger avec les formateurs ou recruteurs
            concernés. L’application vise également à fournir un espace sécurisé
            et ergonomique pour centraliser ces échanges et améliorer
            l’expérience utilisateur.
          </Text>

          {/* 2. Acceptation */}
          <Text style={modalStyles.section}>
            2. Acceptation{'\n'}
            L’utilisation de Matcha implique l’acceptation pleine et entière des
            présentes CGU. Si vous refusez une partie ou la totalité de ces
            conditions, vous ne devez pas utiliser l’application. L’accès ou la
            navigation sur l’application vaut acceptation sans réserve.
          </Text>

          {/* 3. Services proposés */}
          <Text style={modalStyles.section}>
            3. Services proposés{'\n'}
            Matcha propose les fonctionnalités suivantes :{'\n'}- Consultation
            d’un catalogue de formations vérifiées et mises à jour régulièrement
            ;{'\n'}- Mise en relation directe avec des organismes de formation
            et des entreprises partenaires ;{'\n'}- Suivi de vos candidatures et
            notifications en temps réel ;{'\n'}- Possibilité de sauvegarder vos
            favoris pour un accès rapide ;{'\n'}- Accès à un support utilisateur
            intégré pour toute question.
          </Text>

          {/* 4. Inscription et compte */}
          <Text style={modalStyles.section}>
            4. Inscription et compte{'\n'}
            Pour accéder à certaines fonctionnalités, vous devez créer un compte
            utilisateur. Lors de l’inscription, vous vous engagez à fournir des
            informations exactes, complètes et à jour. Vous êtes responsable de
            la confidentialité de vos identifiants et de toutes les actions
            effectuées avec ceux-ci. En cas de perte ou de suspicion
            d’utilisation frauduleuse de votre compte, vous devez immédiatement
            nous en informer afin que nous puissions sécuriser votre accès.
          </Text>

          {/* 5. Propriété intellectuelle */}
          <Text style={modalStyles.section}>
            5. Propriété intellectuelle{'\n'}
            Tous les éléments de l’application Matcha (textes, logos, design,
            fonctionnalités, bases de données) sont protégés par le droit
            d’auteur et demeurent la propriété exclusive de [Nom de la société].
            Toute reproduction, modification, distribution ou exploitation non
            autorisée est strictement interdite et pourra donner lieu à des
            poursuites.
          </Text>

          {/* 6. Responsabilité */}
          <Text style={modalStyles.section}>
            6. Responsabilité{'\n'}
            Matcha agit uniquement comme un intermédiaire. Nous ne garantissons
            pas la disponibilité continue des formations ou des offres publiées
            par les tiers, ni la véracité des informations fournies par ces
            derniers. Les décisions d’inscription à une formation ou de
            candidature à une offre relèvent exclusivement de l’utilisateur.
            Matcha ne pourra être tenu responsable en cas de litige entre un
            utilisateur et un organisme tiers.
          </Text>

          {/* 7. Données personnelles */}
          <Text style={modalStyles.section}>
            7. Données personnelles{'\n'}
            Les informations collectées sont utilisées pour le bon
            fonctionnement de l’application (recherche de formations, mise en
            relation, notifications). Vous disposez d’un droit d’accès, de
            rectification et de suppression de vos données conformément à la
            réglementation en vigueur. Une Politique de Confidentialité
            détaillée est disponible dans l’application.
          </Text>

          {/* 8. Comportement des utilisateurs */}
          <Text style={modalStyles.section}>
            8. Comportement des utilisateurs{'\n'}
            Vous vous engagez à utiliser Matcha de manière respectueuse et
            conforme à la loi. Sont notamment interdits :{'\n'}- L’usurpation
            d’identité ou la création de faux comptes ;{'\n'}- La diffusion de
            contenus injurieux, discriminatoires ou illégaux ;{'\n'}-
            L’utilisation de l’application à des fins commerciales non
            autorisées. Toute violation pourra entraîner la suspension ou la
            suppression de votre compte.
          </Text>

          {/* 9. Sécurité */}
          <Text style={modalStyles.section}>
            9. Sécurité{'\n'}
            Matcha met en place des mesures de sécurité techniques et
            organisationnelles afin de protéger vos données contre tout accès
            non autorisé, perte ou altération. Cependant, aucun système n’étant
            totalement inviolable, nous ne pouvons garantir une sécurité
            absolue. Vous êtes invité à utiliser un mot de passe fort et à ne
            pas le partager.
          </Text>

          {/* 10. Modifications */}
          <Text style={modalStyles.section}>
            10. Modifications des CGU{'\n'}
            Nous nous réservons le droit de modifier les présentes CGU afin de
            les adapter aux évolutions de l’application, des services proposés
            ou de la législation en vigueur. Les utilisateurs seront informés
            des changements majeurs via notification ou e-mail. L’utilisation
            continue de l’application après ces modifications vaut acceptation
            des nouvelles CGU.
          </Text>

          {/* 11. Support et contact */}
          <Text style={modalStyles.section}>
            11. Support et contact{'\n'}
            Pour toute question, réclamation ou demande d’assistance, vous
            pouvez contacter notre support via l’onglet “Aide” dans
            l’application ou par e-mail à support@matcha-app.com. Nous nous
            engageons à répondre dans un délai raisonnable.
          </Text>

          {/* 12. Droit applicable */}
          <Text style={modalStyles.section}>
            12. Droit applicable{'\n'}
            Les présentes CGU sont régies par la loi française. En cas de
            litige, une solution amiable sera privilégiée avant toute action
            judiciaire. À défaut d’accord, les tribunaux compétents seront ceux
            du ressort du siège social de l’éditeur.
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
