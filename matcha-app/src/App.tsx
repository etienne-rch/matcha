import * as React from 'react';
import { View } from 'react-native';
import { PaperProvider } from 'react-native-paper';

import rnpTheme from '@/theme/rnpTheme';

import { Branding } from '../assets';

export default function App() {
  return (
    <PaperProvider theme={rnpTheme}>
      <View style={rnpTheme.styles.container}>
        <Branding.Logo />
      </View>
    </PaperProvider>
  );
}
