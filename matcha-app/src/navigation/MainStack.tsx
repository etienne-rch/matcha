import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from '@/navigation/TabNavigator';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
}
