import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resetPersonalityTest } from '@/api/personality';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import {
  FloatingActionButton,
  ProfileHeader,
  ProfileSection,
  RadarChart,
  TagList,
} from '@/components/Personality';
import { useAuth } from '@/hooks/useAuth';
import Colors from '@/themes/colors';
import { HomeStackParamList } from '@/types/navigation';

type ResultRoute = RouteProp<HomeStackParamList, 'PersonalityResult'>;
type ResultNav = NativeStackNavigationProp<
  HomeStackParamList,
  'PersonalityResult'
>;

export default function PersonalityResultScreen() {
  const route = useRoute<ResultRoute>();
  const navigation = useNavigation<ResultNav>();
  const { refreshUser } = useAuth();

  const { result } = route.params;

  const scrollY = useRef(new Animated.Value(0)).current;
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: 1,
      duration: 900,
      useNativeDriver: false,
    }).start();
  }, []);

  const normalizeScore = (score: number) => (score + 12) / 24;

  const radarData = [
    { label: 'Créativité', value: normalizeScore(result.scoreBreakdown.SN) },
    { label: 'Initiative', value: normalizeScore(result.scoreBreakdown.EI) },
    { label: 'Rigueur', value: normalizeScore(result.scoreBreakdown.JP) },
    {
      label: 'Esprit pratique',
      value: normalizeScore(-result.scoreBreakdown.SN),
    },
    { label: 'Autonomie', value: normalizeScore(-result.scoreBreakdown.EI) },
    { label: 'Collaboration', value: normalizeScore(result.scoreBreakdown.TF) },
  ];

  const handleContinue = async () => {
    await refreshUser();
    navigation.navigate('HomeMain');
  };

  const handleRedoTest = async () => {
    await resetPersonalityTest(); // appel API
    await refreshUser();
    navigation.navigate('PersonalityTest');
  };

  return (
    <BackgroundRadial>
      <SafeAreaView style={styles.safeArea} />

      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
        >
          {/* HEADER */}
          <ProfileHeader label={result.label} showLogo={false} />

          {/* RADAR CHART */}
          <View style={styles.card}>
            <RadarChart data={radarData} size={280} />
          </View>

          {/* DESCRIPTION */}
          <ProfileSection title="Description">
            <Text style={styles.description}>{result.description}</Text>
          </ProfileSection>

          {/* FORCES */}
          <ProfileSection title="Forces">
            <TagList items={result.strengths} variant="success" />
          </ProfileSection>

          {/* FAIBLESSES */}
          <ProfileSection title="Points d'attention">
            <TagList items={result.weaknesses} variant="warning" />
          </ProfileSection>

          {/* METIERS */}
          <ProfileSection title="Métiers recommandés" isLast>
            <View style={styles.jobsList}>
              {result.recommendedJobs.map((job, i) => (
                <View key={i} style={styles.jobItem}>
                  <View style={styles.jobBullet} />
                  <Text style={styles.jobText}>{job}</Text>
                </View>
              ))}
            </View>
          </ProfileSection>

          <View style={{ height: 40 }} />

          <TouchableOpacity style={styles.redoButton} onPress={handleRedoTest}>
            <Text style={styles.redoButtonText}>Refaire le test</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* BOUTON FINAL */}
        <FloatingActionButton scrollY={scrollY} onPress={handleContinue} />
      </View>
    </BackgroundRadial>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },

  card: {
    backgroundColor: Colors.background,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  description: {
    fontSize: 16,
    lineHeight: 22,
    color: Colors.greyDark.normal,
  },

  jobsList: {
    gap: 14,
  },
  jobItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  jobBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.greenLight.normal,
  },
  jobText: {
    fontSize: 16,
    color: Colors.greyDark.normal,
  },
  redoButton: {
    backgroundColor: Colors.orange.normal,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignSelf: 'center',
    marginBottom: 40,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  redoButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
