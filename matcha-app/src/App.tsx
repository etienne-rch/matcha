import * as React from 'react';
import { PaperProvider } from 'react-native-paper';

import rnpTheme from '@/theme/rnpTheme';

import HomeScreen from './screens/Home/HomeScreen';

export default function App() {
  return (
    <PaperProvider theme={rnpTheme}>
      <HomeScreen />
    </PaperProvider>
  );
}
