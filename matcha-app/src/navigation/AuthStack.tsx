import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ForgotPasswordScreen from '@/screens/Auth/ForgotPasswordScreen';
import LoginScreen from '@/screens/Auth/Login';
import SigninScreen from '@/screens/Auth/Signin';
import { AuthStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
