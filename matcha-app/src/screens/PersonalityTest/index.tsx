import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import {
  PersonalityAnswer,
  PersonalityTemplate,
  getActivePersonalityTest,
  submitPersonalityTest,
} from '@/api/personality';
import BackgroundBubbles from '@/components/Background/BackgroundBubbles';
import BackgroundRadial from '@/components/Background/BackgroundRadial';
import { QuestionCard, TestHeader } from '@/components/Personality';
import { useAuth } from '@/hooks/useAuth';
import Colors from '@/themes/colors';
import { HomeStackParamList } from '@/types/navigation';

type Nav = NativeStackNavigationProp<HomeStackParamList>;

export default function PersonalityTestScreen() {
  const navigation = useNavigation<Nav>();
  const { refreshUser, logout } = useAuth();

  const [test, setTest] = useState<PersonalityTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());

  const scrollViewRef = useRef<ScrollView>(null);
  const questionRefs = useRef<Map<string, View>>(new Map());

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      const response = await getActivePersonalityTest();

      if (response.completed) {
        await refreshUser();
        return;
      }
      if (response.test) setTest(response.test);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: error.response?.data?.message || 'Impossible de charger le test',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (questionId: string, value: number) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, value);
    setAnswers(newAnswers);

    if (!test) return;

    const index = test.questions.findIndex((q) => q.id === questionId);
    if (index < test.questions.length - 1) {
      const next = test.questions[index + 1];
      setTimeout(() => {
        const ref = questionRefs.current.get(next.id);
        if (ref) {
          ref.measureLayout(
            scrollViewRef.current as any,
            (_, y) =>
              scrollViewRef.current?.scrollTo({ y: y - 20, animated: true }),
            () => {},
          );
        }
      }, 100);
    }
  };

  const handleSubmit = async () => {
    if (!test) return;
    if (answers.size !== test.questions.length) {
      return Toast.show({
        type: 'error',
        text1: 'Test incomplet',
        text2: 'Veuillez répondre à toutes les questions',
      });
    }

    setSubmitting(true);

    try {
      const formattedAnswers: PersonalityAnswer[] = Array.from(
        answers.entries(),
      ).map(([id, value]) => ({ questionId: id, value }));

      const testResult = await submitPersonalityTest(formattedAnswers);

      navigation.navigate('PersonalityResult', { result: testResult });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2:
          error.response?.data?.message || 'Impossible de soumettre le test',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!test) {
    return (
      <BackgroundRadial>
        <View style={styles.bubblesLayer}>
          <BackgroundBubbles />
        </View>

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.centerContainer}>
            <Text style={styles.errorTitle}>Aucun test disponible</Text>
            <Text style={styles.errorMessage}>
              Le test de personnalité n'a pas pu être chargé.{'\n'}
              Vérifiez que le backend est démarré et que le test a été seedé.
            </Text>

            <TouchableOpacity style={styles.retryButton} onPress={loadTest}>
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
              <Text style={styles.logoutButtonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BackgroundRadial>
    );
  }

  const isComplete = answers.size === test.questions.length;

  return (
    <BackgroundRadial>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <TestHeader
            title={test.title}
            summary={test.summary}
            currentQuestion={answers.size}
            totalQuestions={test.questions.length}
          />

          <ScrollView
            ref={scrollViewRef}
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            {test.questions.map((q, index) => (
              <View
                key={q.id}
                ref={(ref) => {
                  if (ref) {
                    questionRefs.current.set(q.id, ref);
                  }
                }}
              >
                <QuestionCard
                  questionNumber={index + 1}
                  questionText={q.text}
                  options={q.options}
                  selectedValue={answers.get(q.id)}
                  onAnswer={(value) => handleAnswer(q.id, value)}
                />
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isComplete || submitting) && styles.submitButtonDisabled,
              ]}
              disabled={!isComplete || submitting}
              onPress={handleSubmit}
            >
              {submitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isComplete
                    ? 'Terminer le test'
                    : 'Complétez toutes les questions'}
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </SafeAreaView>
    </BackgroundRadial>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  bubblesLayer: { ...StyleSheet.absoluteFillObject, zIndex: 1 },
  background: { flex: 1 },
  container: { flex: 1, zIndex: 2 },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  submitButton: {
    backgroundColor: '#0A2916',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: { opacity: 0.5 },
  submitButtonText: { color: 'white', fontWeight: '600', fontSize: 16 },
  errorTitle: {
    color: 'red',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  errorMessage: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 22,
    color: '#333',
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#0A2916',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    marginBottom: 12,
  },
  retryButtonText: { color: 'white', fontWeight: '600' },
  logoutButton: {
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 12,
    borderColor: '#0A2916',
  },
  logoutButtonText: { color: '#0A2916', fontWeight: '600' },
});
