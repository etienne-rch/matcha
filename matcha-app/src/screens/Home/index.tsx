import * as React from 'react';
import { View } from 'react-native';

import { Branding } from '@/assets';
import { styles } from '@/themes/styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Branding.Logo />
    </View>
  );
}
