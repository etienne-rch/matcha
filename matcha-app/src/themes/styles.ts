import { StyleSheet } from 'react-native';

import rnpTheme from '@/themes/rnpTheme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: rnpTheme.fontSize.sm,
    marginBottom: rnpTheme.spacing.sm,
    backgroundColor: rnpTheme.colors.background,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: rnpTheme.spacing.lg,
  },
  formContainer: {
    backgroundColor: rnpTheme.colors.background,
    borderRadius: rnpTheme.borderRadius.lg,
    padding: rnpTheme.spacing.lg,
    shadowColor: rnpTheme.colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    textAlign: 'left',
    marginBottom: rnpTheme.spacing.md,
    fontWeight: 'bold',
    color: rnpTheme.colors.primary,
  },
  inputContainer: {
    padding: 0,
    margin: 0,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rnpTheme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: rnpTheme.colors.greyLight.divider,
  },
  dividerText: {
    marginHorizontal: rnpTheme.spacing.md,
    color: rnpTheme.colors.primary,
  },
  termsText: {
    textAlign: 'center',
    marginVertical: rnpTheme.spacing.md,
    lineHeight: rnpTheme.spacing.md,
    color: rnpTheme.colors.primary,
  },
  boldText: {
    color: rnpTheme.colors.greenDark.normal,
    fontWeight: 'bold',
  },
  linkText: {
    color: rnpTheme.colors.greenDark.normal,
    fontWeight: 'bold',
  },
  continueButton: {
    borderRadius: 6,
  },
  loginText: {
    textAlign: 'center',
    marginTop: 16,
    color: '#666',
  },
});

export { styles };
