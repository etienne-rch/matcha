import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { Images } from '@/assets';
import rnpTheme from '@/themes/rnpTheme';

export default function GoogleAuth() {
  return (
    <>
      <Button style={styles.googleBtn} mode="outlined">
        <View style={styles.content}>
          <Image source={Images.GoogleLogo} style={styles.googleLogo} />
          <Text style={styles.text}>S'inscrire via Google</Text>
        </View>
      </Button>
    </>
  );
}

const styles = StyleSheet.create({
  googleBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: rnpTheme.colors.background,
    borderColor: rnpTheme.colors.greyLight.dark.normal,
    borderRadius: 4,
    padding: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rnpTheme.spacing.sm,
  },
  text: {
    color: rnpTheme.colors.grey,
    fontSize: rnpTheme.fontSize.sm,
  },
  googleLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});
