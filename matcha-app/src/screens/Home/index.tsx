import * as React from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Branding } from '@/assets';
import { styles } from '@/themes/styles';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('@/assets/backgrounds/default.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Branding.Logo />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
