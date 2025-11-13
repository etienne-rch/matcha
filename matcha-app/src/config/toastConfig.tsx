import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import rnpTheme from '@/themes/rnpTheme';

export const toastConfig = {
  success: (props: any) => (
    <TouchableOpacity
      style={styles.successToast}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <View style={styles.toastContent}>
        <Text style={styles.toastTitle}>{props.text1}</Text>
        {props.text2 && <Text style={styles.toastSubtitle}>{props.text2}</Text>}
      </View>
    </TouchableOpacity>
  ),
  error: (props: any) => (
    <TouchableOpacity
      style={styles.errorToast}
      onPress={props.onPress}
      activeOpacity={0.9}
    >
      <View style={styles.toastContent}>
        <Text style={styles.toastTitle}>{props.text1}</Text>
        {props.text2 && <Text style={styles.toastSubtitle}>{props.text2}</Text>}
      </View>
    </TouchableOpacity>
  ),
};

const styles = StyleSheet.create({
  successToast: {
    width: '90%',
    backgroundColor: rnpTheme.colors.success,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  errorToast: {
    width: '90%',
    backgroundColor: rnpTheme.colors.error,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  toastContent: {
    flex: 1,
  },
  toastTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  toastSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
