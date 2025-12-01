import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { useAuth } from '@/hooks/useAuth';
import AuthStack from '@/navigation/AuthStack';
import MainStack from '@/navigation/MainStack';

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
      PersonalityTest: 'personality-test',
    },
  },
};

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer linking={linking}>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
