import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '@/navigation/TabNavigator';
import LoginScreen from '@/screens/Login/LoginScreen';

export default function AppNavigator() {
  const user = true;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
}
