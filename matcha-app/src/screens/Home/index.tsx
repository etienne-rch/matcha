import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackgroundBubbles from '@/components/Background/BackgroundBubbles';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import PersonalitySummaryCard from '@/components/Home/PersonalitySummaryCard';
import ProfileCompletionCard from '@/components/Home/ProfileCompletionCard';
import TestCard from '@/components/Home/TestCard';
import { useProfile } from '@/hooks/useProfile';
import { computeProfileCompletion } from '@/utils/computeProfileCompletion';

export default function HomeScreen({ navigation }: any) {
  const { user, loading } = useProfile();

  if (loading || !user) return null;

  const completion = computeProfileCompletion(user);
  const personality = user.personality ?? null;
  const hasPersonality = !!personality;

  return (
    <BackgroundRadial>
      <View style={styles.bubblesLayer} pointerEvents="none">
        <BackgroundBubbles />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          {/* HEADER */}
          <Text style={styles.title}>Bonjour {user.firstName}</Text>
          <Text style={styles.subtitle}>
            Voici un aperçu de ton profil Matcha.
          </Text>

          {/* PROFILE COMPLETION CARD */}
          <ProfileCompletionCard
            completion={completion}
            onPress={() => navigation.navigate('Profil')}
          />

          {/* SECTION: Tests */}
          <Text style={styles.sectionTitle}>Tests & analyses</Text>

          {/* SI TEST DÉJÀ FAIT → CARD DE RÉSULTAT */}
          {hasPersonality && (
            <PersonalitySummaryCard
              personality={user.personality}
              onPress={() =>
                navigation.navigate('PersonalityResult', {
                  result: personality,
                })
              }
            />
          )}

          {/* SINON → CARD POUR PASSER LE TEST */}
          {!hasPersonality && (
            <TestCard
              title="Test de personnalité"
              description="Découvre ton profil Matcha et améliore tes recommandations."
              onPress={() => navigation.navigate('PersonalityTest')}
            />
          )}
        </View>
      </SafeAreaView>
    </BackgroundRadial>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  bubblesLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    zIndex: 5,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#062314',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.55)',
    lineHeight: 22,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#062314',
    marginTop: 10,
    marginBottom: 12,
  },
});
