import * as React from 'react';
import { View } from 'react-native';

import { Branding } from '@/assets';
import ResetPasswordForm from '@/components/Forms/ResetPasswordForm';
import { styles } from '@/themes/styles';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Branding.Logo />

      <ResetPasswordForm />
    </View>
  );
}
