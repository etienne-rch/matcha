import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const rnpTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    background: 'white',
    surface: '#f2f2f2',
    text: '#000000',
    button: 'purple',
  },
  roundness: 8,
  styles: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
};

export default rnpTheme;
