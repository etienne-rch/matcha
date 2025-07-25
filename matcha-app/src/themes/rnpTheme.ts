import { DefaultTheme } from 'react-native-paper';

import borderRadius from '@/themes/borderRadius';
import colors from '@/themes/colors';
import fontSize from '@/themes/fontSize';
import fonts from '@/themes/fonts';
import spacing from '@/themes/spacing';

const rnpTheme = {
  ...DefaultTheme,
  colors: colors,
  customFonts: fonts,
  fontSize: fontSize,
  spacing: spacing,
  borderRadius: borderRadius,
};

export default rnpTheme;
