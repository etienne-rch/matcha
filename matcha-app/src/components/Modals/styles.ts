import { StyleSheet } from 'react-native';

import rnpTheme from '@/themes/rnpTheme';

export const modalStyles = StyleSheet.create({
  title: {
    fontSize: rnpTheme.fontSize.lg,
    fontWeight: 'bold',
    marginBottom: rnpTheme.spacing.sm,
  },
  containerModal: {
    backgroundColor: rnpTheme.colors.background,
    padding: rnpTheme.spacing.lg,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    maxHeight: '80%',
  },
  update: {
    marginBottom: 8,
  },
  section: {
    marginBottom: 10,
  },
  closeButton: {
    marginTop: rnpTheme.spacing.md,
  },
});
