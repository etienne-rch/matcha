import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '@/navigation/TabNavigator';

import AuthStack from './AuthStack';

export default function AppNavigator() {
  const user = false;

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
