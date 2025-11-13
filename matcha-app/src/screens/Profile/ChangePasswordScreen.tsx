import * as React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import { changePassword } from '@/api/profile';
import { styles } from '@/themes/styles';
import { validatePassword } from '@/utils/validation';

export default function ChangePasswordScreen({ navigation }: any) {
  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async () => {
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError('Tous les champs sont requis');
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre',
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Les nouveaux mots de passe ne correspondent pas');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await changePassword({
        oldPassword,
        newPassword,
        confirmNewPassword,
      });

      Toast.show({
        type: 'success',
        text1: 'Mot de passe modifié',
        text2: 'Votre mot de passe a été changé avec succès',
        position: 'top',
        visibilityTime: 5000,
        autoHide: true,
        onPress: () => Toast.hide(),
      });

      setTimeout(() => navigation.goBack(), 1500);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        'Erreur lors du changement de mot de passe';
      setError(errorMessage);
      Toast.show({
        type: 'error',
        text1: 'Échec du changement',
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
          <View style={styles.inputContainer}>
            <TextInput
              label="Ancien mot de passe"
              value={oldPassword}
              onChangeText={setOldPassword}
              mode="outlined"
              secureTextEntry={!showOldPassword}
              style={styles.input}
              error={!!error}
              disabled={loading}
              right={
                <TextInput.Icon
                  icon={showOldPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowOldPassword(!showOldPassword)}
                />
              }
            />
            <TextInput
              label="Nouveau mot de passe"
              value={newPassword}
              onChangeText={setNewPassword}
              mode="outlined"
              secureTextEntry={!showNewPassword}
              style={styles.input}
              error={!!error}
              disabled={loading}
              right={
                <TextInput.Icon
                  icon={showNewPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowNewPassword(!showNewPassword)}
                />
              }
            />
            <TextInput
              label="Confirmer le nouveau mot de passe"
              value={confirmNewPassword}
              onChangeText={setConfirmNewPassword}
              mode="outlined"
              secureTextEntry={!showConfirmPassword}
              style={styles.input}
              error={!!error}
              disabled={loading}
              right={
                <TextInput.Icon
                  icon={showConfirmPassword ? 'eye-off' : 'eye'}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              }
            />
            {error && <HelperText type="error">{error}</HelperText>}
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.continueButton}
              loading={loading}
              disabled={loading}
            >
              Modifier le mot de passe
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.continueButton}
              disabled={loading}
            >
              Annuler
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
