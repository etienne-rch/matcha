import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
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

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/default.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
        >
          <ProfileHeader label={result.label} showLogo />

          <View style={styles.chartContainer}>
            <RadarChart data={radarData} />
          </View>

          <ProfileSection title="Description">
            <Text style={styles.description}>{result.description}</Text>
          </ProfileSection>

          <ProfileSection title="Forces">
            <TagList items={result.strengths} variant="success" />
          </ProfileSection>

          <ProfileSection title="Points d'attention">
            <TagList items={result.weaknesses} variant="warning" />
          </ProfileSection>

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
        </ScrollView>

        <FloatingActionButton scrollY={scrollY} onPress={handleContinue} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 120 },
  chartContainer: {
    backgroundColor: Colors.background,
    paddingVertical: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight.divider,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.greyDark.normal,
  },
  jobsList: { gap: 12 },
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
});
