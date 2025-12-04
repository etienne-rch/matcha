import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import { toastConfig } from '@/config/toastConfig';
import { AuthProvider } from '@/contexts/AuthContext';
import AppNavigator from '@/navigation/AppNavigator';
import rnpTheme from '@/themes/rnpTheme';

export default function App() {
  return (
    <PaperProvider theme={rnpTheme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
      <Toast config={toastConfig} />
    </PaperProvider>
  );
}
