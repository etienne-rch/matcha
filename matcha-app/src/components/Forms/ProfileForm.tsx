import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { getProfile, updateProfile } from '@/api/profile';
import { useAuth } from '@/hooks/useAuth';
import { styles } from '@/themes/styles';
import { validateEmail } from '@/utils/validation';

export default function ProfileForm({ navigation }: any) {
  const { logout } = useAuth();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile().then((data) => {
      setEmail(data.user.email || '');
      setFirstName(data.user.firstName || '');
      setLastName(data.user.lastName || '');
    });
  }, []);

  const handleLogout = () => {
    Alert.alert('Déconnexion', 'Voulez-vous vraiment vous déconnecter ?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Se déconnecter',
        style: 'destructive',
        onPress: async () => {
          try {
            await logout();
          } catch (e) {
            console.error('Logout error:', e);
            Toast.show({
              type: 'error',
              text1: 'Erreur de déconnexion',
              text2: 'Une erreur est survenue',
              position: 'top',
            });
          }
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!email.trim() || !firstName.trim() || !lastName.trim()) {
      setError('Tous les champs sont requis');
      return;
    }
    if (!validateEmail(email)) {
      setError("Format d'email invalide");
      return;
    }

    setError('');
    setLoading(true);

    try {
      await updateProfile({
        email,
        firstName,
        lastName,
      });

      Toast.show({
        type: 'success',
        text1: 'Profil mis à jour',
        text2: 'Vos informations ont été sauvegardées',
        position: 'top',
        visibilityTime: 3000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message || 'Erreur lors de la sauvegarde';
      setError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Échec de la sauvegarde',
        text2: errorMessage,
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        error={!!error}
        disabled={loading}
      />

      <TextInput
        label="Prénom"
        value={firstName}
        onChangeText={setFirstName}
        mode="outlined"
        style={styles.input}
        error={!!error}
        disabled={loading}
      />

      <TextInput
        label="Nom"
        value={lastName}
        onChangeText={setLastName}
        mode="outlined"
        style={styles.input}
        error={!!error}
        disabled={loading}
      />

      {error && <HelperText type="error">{error}</HelperText>}

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('ChangePassword')}
        style={styles.continueButton}
        disabled={loading}
      >
        Modifier mon mot de passe
      </Button>

      <Button
        mode="contained"
        onPress={handleSave}
        style={styles.continueButton}
        loading={loading}
        disabled={loading}
      >
        Sauvegarder
      </Button>

      <Button
        mode="outlined"
        onPress={handleLogout}
        style={[
          styles.continueButton,
          { marginTop: 20, borderColor: '#dc3545' },
        ]}
        textColor="#dc3545"
        disabled={loading}
      >
        Se déconnecter
      </Button>
    </View>
  );
}
