import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LogoutScreen from '@/screens/Auth/Logout';
import ProfileScreen from '@/screens/Profile';

import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000000',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Deconnexion"
        component={LogoutScreen}
        options={{
          title: 'Deconnexion',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
