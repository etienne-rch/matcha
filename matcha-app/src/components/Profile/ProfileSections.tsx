import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { updateProfile } from '@/api/profile';
import BottomSheetSelect from '@/components/UI/BottomSheetSelect';
import DatePickerInput from '@/components/UI/DatePickerInput';
import rnpTheme from '@/themes/rnpTheme';
import { UserFull } from '@/types/user';

export default function ProfileSections({
  section,
  user,
  onCancel,
  onSaved,
}: {
  section: 'personal' | 'address' | 'work' | 'privacy' | 'email' | 'password';
  user: UserFull;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState(user.firstName ?? '');
  const [lastName, setLastName] = useState(user.lastName ?? '');
  const [birthDate, setBirthDate] = useState<Date | null>(
    user.birthYear ? new Date(user.birthYear, 0, 1) : null,
  );
  const [gender, setGender] = useState<UserFull['gender']>(
    user.gender ?? 'undisclosed',
  );

  const [street, setStreet] = useState(user.addressStreet ?? '');
  const [city, setCity] = useState(user.addressCity ?? '');
  const [postal, setPostal] = useState(user.addressPostalCode ?? '');
  const [country, setCountry] = useState(user.addressCountry ?? '');

  const [locationPref, setLocationPref] = useState<UserFull['locationPref']>(
    user.locationPref ?? 'remote',
  );
  const [remote, setRemote] = useState<boolean | null>(user.remote ?? null);

  const [consent, setConsent] = useState<boolean>(
    user.consentAccepted ?? false,
  );

  const [newEmail, setNewEmail] = useState(user.email);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = async () => {
    setLoading(true);

    try {
      let payload: any = {};

      if (section === 'personal') {
        payload = {
          firstName,
          lastName,
          birthYear: birthDate ? birthDate.getFullYear() : undefined,
          gender,
        };
      }

      if (section === 'address') {
        payload = {
          addressStreet: street,
          addressCity: city,
          addressPostalCode: postal,
          addressCountry: country,
        };
      }

      if (section === 'work') {
        payload = {
          locationPref,
          remote,
        };
      }

      if (section === 'privacy') {
        payload = {
          consentAccepted: consent,
        };
      }

      if (section === 'email') {
        payload = {
          email: newEmail,
        };
      }

      if (section === 'password') {
        if (newPassword !== confirmPassword) {
          Toast.show({
            type: 'error',
            text1: 'Erreur',
            text2: 'Les mots de passe ne correspondent pas',
          });
          setLoading(false);
          return;
        }

        payload = {
          currentPassword,
          newPassword,
        };
      }

      await updateProfile(payload);

      Toast.show({
        type: 'success',
        text1: 'Modifications enregistrées',
        position: 'top',
      });

      onSaved();
    } catch (e) {
      console.log('❌ updateProfile error =>', e);

      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'Impossible de modifier',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      {section === 'personal' && (
        <>
          <TextInput
            label="Prénom"
            mode="outlined"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.input}
          />

          <TextInput
            label="Nom"
            mode="outlined"
            value={lastName}
            onChangeText={setLastName}
            style={styles.input}
          />

          <DatePickerInput
            label="Date de naissance"
            value={birthDate}
            onChange={setBirthDate}
          />

          <BottomSheetSelect<UserFull['gender']>
            label="Genre"
            value={gender}
            onChange={setGender}
            options={[
              { label: 'Homme', value: 'male' },
              { label: 'Femme', value: 'female' },
              { label: 'Autre', value: 'other' },
              { label: 'Non renseigné', value: 'undisclosed' },
            ]}
          />
        </>
      )}

      {section === 'email' && (
        <>
          <TextInput
            label="Nouvel e-mail"
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            value={newEmail}
            onChangeText={setNewEmail}
            style={styles.input}
          />
        </>
      )}

      {section === 'password' && (
        <>
          <TextInput
            label="Mot de passe actuel"
            mode="outlined"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
          />

          <TextInput
            label="Nouveau mot de passe"
            mode="outlined"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />

          <TextInput
            label="Confirmer le mot de passe"
            mode="outlined"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
        </>
      )}

      {section === 'address' && (
        <>
          <TextInput
            label="Rue"
            mode="outlined"
            value={street}
            onChangeText={setStreet}
            style={styles.input}
          />

          <TextInput
            label="Ville"
            mode="outlined"
            value={city}
            onChangeText={setCity}
            style={styles.input}
          />

          <TextInput
            label="Code postal"
            mode="outlined"
            value={postal}
            onChangeText={setPostal}
            style={styles.input}
          />

          <TextInput
            label="Pays"
            mode="outlined"
            value={country}
            onChangeText={setCountry}
            style={styles.input}
          />
        </>
      )}

      {section === 'work' && (
        <>
          <BottomSheetSelect<UserFull['locationPref']>
            label="Mode de travail"
            value={locationPref}
            onChange={setLocationPref}
            options={[
              { label: 'Télétravail', value: 'remote' },
              { label: 'Hybride', value: 'hybrid' },
              { label: 'Sur site', value: 'on-site' },
            ]}
          />

          <BottomSheetSelect<boolean>
            label="Télétravail possible ?"
            value={remote}
            onChange={setRemote}
            options={[
              { label: 'Oui', value: true },
              { label: 'Non', value: false },
            ]}
          />
        </>
      )}

      {section === 'privacy' && (
        <>
          <BottomSheetSelect<boolean>
            label="Consentement RGPD"
            value={consent}
            onChange={setConsent}
            options={[
              { label: 'Oui', value: true },
              { label: 'Non', value: false },
            ]}
          />

          <Text style={styles.infoText}>
            Tu peux modifier ton consentement à tout moment conformément au
            RGPD.
          </Text>
        </>
      )}

      <View style={styles.actions}>
        <Button mode="text" onPress={onCancel} disabled={loading}>
          Annuler
        </Button>

        <Button
          mode="contained"
          onPress={handleSave}
          loading={loading}
          buttonColor={rnpTheme.colors.greenDark.normal}
        >
          Enregistrer
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: rnpTheme.spacing.lg,
    borderRadius: 16,
    marginBottom: rnpTheme.spacing.md,
    gap: rnpTheme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  input: {
    backgroundColor: rnpTheme.colors.background,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
});
