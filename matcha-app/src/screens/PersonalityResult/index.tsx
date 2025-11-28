import React, { useEffect, useRef } from 'react';
import {
  Animated,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { PersonalityResult } from '@/api/personality';
import {
  FloatingActionButton,
  ProfileHeader,
  ProfileSection,
  RadarChart,
  TagList,
} from '@/components/Personality';
import Colors from '@/themes/colors';

interface PersonalityResultScreenProps {
  result: PersonalityResult;
  onContinue: () => void;
}

export default function PersonalityResultScreen({
  result,
  onContinue,
}: PersonalityResultScreenProps) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, []);

  const normalizeScore = (score: number) => {
    return (score + 12) / 24;
  };

  const radarData = [
    {
      label: 'Créativité',
      value: normalizeScore(result.scoreBreakdown.SN),
    },
    {
      label: 'Initiative',
      value: normalizeScore(result.scoreBreakdown.EI),
    },
    {
      label: 'Rigueur',
      value: normalizeScore(result.scoreBreakdown.JP),
    },
    {
      label: 'Esprit pratique',
      value: normalizeScore(-result.scoreBreakdown.SN),
    },
    {
      label: 'Autonomie',
      value: normalizeScore(-result.scoreBreakdown.EI),
    },
    {
      label: 'Collaboration',
      value: normalizeScore(result.scoreBreakdown.TF),
    },
  ];

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
          <ProfileHeader label={result.label} showLogo={true} />

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

          <ProfileSection title="Métiers recommandés" isLast={true}>
            <View style={styles.jobsList}>
              {result.recommendedJobs.map((job, index) => (
                <View key={index} style={styles.jobItem}>
                  <View style={styles.jobBullet} />
                  <Text style={styles.jobText}>{job}</Text>
                </View>
              ))}
            </View>
          </ProfileSection>
        </ScrollView>

        <FloatingActionButton onPress={onContinue} scrollY={scrollY} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  logoContainer: {
    paddingVertical: 20,
    paddingTop: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.greyDark.normal,
    textAlign: 'center',
  },
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
  jobsList: {
    gap: 12,
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
});
