import * as React from 'react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

import AppNavigator from '@/navigation/AppNavigator';
import rnpTheme from '@/themes/rnpTheme';

export default function App() {
  return (
    <PaperProvider theme={rnpTheme}>
      <AppNavigator />
      <Toast />
    </PaperProvider>
  );
}
