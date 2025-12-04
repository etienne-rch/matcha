import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import {
  PersonalityAnswer,
  PersonalityTemplate,
  getActivePersonalityTest,
  submitPersonalityTest,
} from '@/api/personality';
import { QuestionCard, TestHeader } from '@/components/Personality';
import { useAuth } from '@/hooks/useAuth';
import PersonalityResultScreen from '@/screens/PersonalityResult';
import Colors from '@/themes/colors';

export default function PersonalityTestScreen() {
  const { refreshUser, logout } = useAuth();
  const [test, setTest] = useState<PersonalityTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Map<string, number>>(new Map());
  const [result, setResult] = useState<any>(null);
  const [showResult, setShowResult] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const questionRefs = useRef<Map<string, View>>(new Map());

  useEffect(() => {
    loadTest();
  }, []);

  const loadTest = async () => {
    try {
      console.log('📡 Chargement du test...');
      const response = await getActivePersonalityTest();
      console.log('📊 Réponse:', response);

      if (response.completed) {
        console.log('✅ Test déjà complété, rafraîchissement...');
        await refreshUser();
        return;
      }

      if (response.test) {
        console.log('✅ Test chargé:', response.test.title);
        setTest(response.test);
      }
    } catch (error: any) {
      console.error('❌ Erreur:', error);
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

    if (test) {
      const currentIndex = test.questions.findIndex((q) => q.id === questionId);
      if (currentIndex < test.questions.length - 1) {
        const nextQuestion = test.questions[currentIndex + 1];
        setTimeout(() => {
          const nextView = questionRefs.current.get(nextQuestion.id);
          if (nextView) {
            nextView.measureLayout(
              scrollViewRef.current as any,
              (x, y) => {
                scrollViewRef.current?.scrollTo({
                  y: y - 20,
                  animated: true,
                });
              },
              () => {},
            );
          }
        }, 100);
      }
    }
  };

  const handleSubmit = async () => {
    if (!test) return;

    if (answers.size !== test.questions.length) {
      Toast.show({
        type: 'error',
        text1: 'Test incomplet',
        text2: 'Veuillez répondre à toutes les questions',
      });
      return;
    }

    setSubmitting(true);
    try {
      const formattedAnswers: PersonalityAnswer[] = Array.from(
        answers.entries(),
      ).map(([questionId, value]) => ({
        questionId,
        value,
      }));

      const testResult = await submitPersonalityTest(formattedAnswers);

      setResult(testResult);
      setShowResult(true);

      Toast.show({
        type: 'success',
        text1: 'Test terminé !',
        text2: 'Votre profil de personnalité a été enregistré',
      });
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

  const handleContinueFromResult = async () => {
    await refreshUser();
  };

  if (showResult && result) {
    return (
      <PersonalityResultScreen
        result={result}
        onContinue={handleContinueFromResult}
      />
    );
  }

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!test) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Aucun test disponible</Text>
        <Text style={styles.errorMessage}>
          Le test de personnalité n'a pas pu être chargé.{'\n'}
          Vérifiez que le backend est démarré et que le test a été seedé.
        </Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            loadTest();
          }}
        >
          <Text style={styles.retryButtonText}>Réessayer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            const { logout } = useAuth();
            await logout();
          }}
        >
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const isComplete = answers.size === test.questions.length;

  return (
    <ImageBackground
      source={require('@/assets/backgrounds/default.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
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
          {test.questions.map((question, index) => (
            <View
              key={question.id}
              ref={(ref) => {
                if (ref) {
                  questionRefs.current.set(question.id, ref);
                }
              }}
            >
              <QuestionCard
                questionNumber={index + 1}
                questionText={question.text}
                options={question.options}
                selectedValue={answers.get(question.id)}
                onAnswer={(value) => handleAnswer(question.id, value)}
              />
            </View>
          ))}

          <TouchableOpacity
            style={[
              styles.submitButton,
              (!isComplete || submitting) && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={!isComplete || submitting}
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
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.greyLight.normal,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: Colors.greyLight.dark.normal,
    opacity: 0.6,
  },
  submitButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: Colors.error,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.error,
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: Colors.greyDark.normal,
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  retryButtonText: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Colors.greyLight.normal,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: Colors.greyLight.dark.normal,
  },
  logoutButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
