import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import AppNavigator from '@/navigation/AppNavigator';
import rnpTheme from '@/theme/rnpTheme';

export default function App() {
  return (
    <PaperProvider theme={rnpTheme}>
      <AppNavigator />
    </PaperProvider>
  );
}
