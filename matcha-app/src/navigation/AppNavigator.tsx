import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '@/navigation/TabNavigator';
import SigninScreen from '@/screens/Signin';

export default function AppNavigator() {
  const user = false;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <SigninScreen />}
    </NavigationContainer>
  );
}
