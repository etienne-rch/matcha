import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '@/screens/Home';
import PersonalityResultScreen from '@/screens/PersonalityResult';
import PersonalityTestScreen from '@/screens/PersonalityTest';
import { HomeStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="PersonalityTest" component={PersonalityTestScreen} />
      <Stack.Screen
        name="PersonalityResult"
        component={PersonalityResultScreen}
      />
    </Stack.Navigator>
  );
}
