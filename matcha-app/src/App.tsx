import { Text, View } from 'react-native';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import '../global.css';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '',
    secondary: 'yellow',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <View className="flex-1 items-center justify-center bg-green-white">
        <Text className="text-xl font-bold" style={{color: theme.colors.primary}}>
          Welcome to Matcha!
        </Text>
      </View>
    </PaperProvider>
  );
}
