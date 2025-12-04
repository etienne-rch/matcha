import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function BackgroundRadial({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          '#e6c598ff', // bas foncé
          '#f0d5aeff',
          '#fceedaff', // haut clair
        ]}
        start={{ x: 0.5, y: 1 }} // du bas
        end={{ x: 0.5, y: 0 }} // vers le haut
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
