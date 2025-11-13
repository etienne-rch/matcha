import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useContext } from 'react';
import { Alert } from 'react-native';

import { AuthContext } from '@/contexts/AuthContext';

export default function LogoutScreen() {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const showConfirm = () => {
        Alert.alert(
          'Déconnexion',
          'Voulez-vous vraiment vous déconnecter ?',
          [
            {
              text: 'Annuler',
              style: 'cancel',
              onPress: () => {
                navigation.navigate('Home' as never);
              },
            },
            {
              text: 'Oui',
              style: 'destructive',
              onPress: async () => {
                try {
                  if (auth) {
                    await auth.logout();
                  }
                } catch (e) {
                  console.error('Logout error:', e);
                } finally {
                  navigation.navigate('Home' as never);
                }
              },
            },
          ],
          { cancelable: false },
        );
      };

      showConfirm();
      return () => {};
    }, [auth, navigation]),
  );

  return null;
}
