import * as React from 'react';
import { View } from 'react-native';

import rnpTheme from '@/theme/rnpTheme';

import { Branding } from '../../../assets';

export default function HomeScreen() {
  return (
    <View style={rnpTheme.styles.container}>
      <Branding.Logo />
    </View>
  );
}
