import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '@/hooks/useAuth';
import AuthStack from '@/navigation/AuthStack';
import TabNavigator from '@/navigation/TabNavigator';

export default function AppNavigator() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}
