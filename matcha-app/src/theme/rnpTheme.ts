import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

const rnpTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#90c496',
    secondary: '#f5ede2',
    background: '#ffffff',
    surface: '#ffffff',
    error: '#b00020',
    brown: {
      normal: '#edac7b',
      hover: '#d59b6f',
      active: '#be8a62',
      light: {
        normal: '#fdf7f2',
        hover: '#fcf3eb',
        active: '#f9e5d6',
      },
      dark: {
        normal: '#b2815c',
        hover: '#8e674a',
        active: '#6b4d37',
        darker: '#533c2b',
      },
    },
    orange: {
      normal: '#e66b14',
      hover: '#cf6012',
      active: '#b85610',
      light: {
        normal: '#fdf0e8',
        hover: '#fbe9dc',
        active: '#f7d1b6',
      },
      dark: {
        normal: '#ad500f',
        hover: '#8a400c',
        active: '#673009',
        darker: '#512507',
      },
    },
    greenDark: {
      normal: '#0a2916',
      hover: '#092514',
      active: '#082112',
      light: {
        normal: '#e7eae8',
        hover: '#dadfdc',
        active: '#b3bdb7',
      },
      dark: {
        normal: '#081f11',
        hover: '#06190d',
        active: '#05120a',
        darker: '#040e08',
      },
    },
    greenLight: {
      normal: '#90c496',
      hover: '#82b087',
      active: '#739d78',
      light: {
        normal: '#f4f9f5',
        hover: '#eef6ef',
        active: '#ddedde',
      },
      dark: {
        normal: '#6c9371',
        hover: '#56765a',
        active: '#415844',
        darker: '#324535',
      },
    },
    greyLight: {
      normal: '#f5ede2',
      hover: '#ddd5cb',
      active: '#c4beb5',
      light: {
        normal: '#fefdfc',
        hover: '#fefcfb',
        active: '#fcf9f6',
      },
      dark: {
        normal: '#b8b2aa',
        hover: '#938e88',
        active: '#6e6b66',
        darker: '#56534f',
      },
    },
    greyDark: {
      normal: '#2a2927',
      hover: '#262523',
      active: '#22211f',
      light: {
        normal: '#eaeae9',
        hover: '#dfdfdf',
        active: '#bdbdbc',
      },
      dark: {
        normal: '#201f1d',
        hover: '#191917',
        active: '#131212',
        darker: '#0f0e0e',
      },
    },
  },
  customFonts: {
    title: 'PolySans Trial, Helvetica, Arial, sans-serif',
    body: 'Montserrat, system-ui, -apple-system, sans-serif',
    logo: 'Croist, serif, Times New Roman',
  },
  fontSize: {
    xs: 10,
    sm: 13,
    base: 16,
    lg: 20,
    xl: 25,
    '2xl': 31,
    '3xl': 39,
    '4xl': 49,
    '5xl': 61,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  styles: StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
};

export default rnpTheme;
