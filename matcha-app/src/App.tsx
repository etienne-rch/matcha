import * as React from 'react';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppNavigator from '@/navigation/AppNavigator';
import rnpTheme from '@/themes/rnpTheme';

export default function App() {
  return (
    <SafeAreaView style={styles.appContainer}>
      <PaperProvider theme={rnpTheme}>
        <AppNavigator />
      </PaperProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
