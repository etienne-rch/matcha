import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { useAuth } from '@/hooks/useAuth';
import AuthStack from '@/navigation/AuthStack';
import TabNavigator from '@/navigation/TabNavigator';

const linking = {
  prefixes: [Linking.createURL('/'), 'matcha://', 'exp://'],
  config: {
    screens: {
      Login: 'login',
      Signin: 'signin',
      ForgotPassword: 'forgot-password',
      ResetPassword: {
        path: 'reset-password',
        parse: {
          token: (token: string) => token,
        },
      },
      Home: 'home',
      Deconnexion: 'logout',
    },
  },
};

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
