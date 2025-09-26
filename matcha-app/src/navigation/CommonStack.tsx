import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/Home';
import { CommonStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<CommonStackParamList>();

export default function CommonStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
