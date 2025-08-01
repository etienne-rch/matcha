import { NavigationContainer } from '@react-navigation/native';

import AuthStack from '@/navigation/AuthStack';
import TabNavigator from '@/navigation/TabNavigator';

export default function AppNavigator() {
  const user = false;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
