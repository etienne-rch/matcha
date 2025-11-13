import * as React from 'react';
import { ImageBackground, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AvatarStatic from '@/components/Avatar/Avatar';
import { styles } from '@/themes/styles';

export default function ProfileScreen() {
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
          <AvatarStatic />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}
