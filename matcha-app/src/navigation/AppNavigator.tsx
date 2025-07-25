import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '@/navigation/TabNavigator';
import SignInScreen from '@/screens/SignIn';

export default function AppNavigator() {
  const user = false;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <SignInScreen />}
    </NavigationContainer>
  );
}
