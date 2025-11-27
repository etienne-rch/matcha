import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { getActivePersonalityTest } from '@/api/personality';
import { useAuth } from '@/hooks/useAuth';
import TabNavigator from '@/navigation/TabNavigator';
import PersonalityTestScreen from '@/screens/PersonalityTest';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  const { user, loading: authLoading } = useAuth();
  const [testCompleted, setTestCompleted] = useState<boolean | null>(null);
  const [checkingTest, setCheckingTest] = useState(true);

  useEffect(() => {
    const verifyTestStatus = async () => {
      if (!user) {
        setCheckingTest(false);
        return;
      }

      try {
        console.log('🔍 Vérification du statut du test...');
        const status = await getActivePersonalityTest();
        console.log('📊 Statut du test:', status);
        setTestCompleted(status.completed);
      } catch (error) {
        console.error('❌ Erreur lors de la vérification du test:', error);
        // En cas d'erreur, on suppose que le test n'est pas fait
        setTestCompleted(false);
      } finally {
        setCheckingTest(false);
      }
    };

    verifyTestStatus();
  }, [user]);

  if (authLoading || checkingTest) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const needsPersonalityTest = user && testCompleted === false;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {needsPersonalityTest ? (
        <Stack.Screen
          name="PersonalityTest"
          component={PersonalityTestScreen}
          options={{ gestureEnabled: false }}
        />
      ) : (
        <Stack.Screen name="Main" component={TabNavigator} />
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
