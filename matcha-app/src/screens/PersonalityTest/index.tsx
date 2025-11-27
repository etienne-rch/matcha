import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import { useAuth } from '@/hooks/useAuth';

export default function PersonalityTestScreen() {
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

      await submitPersonalityTest(formattedAnswers);

      Toast.show({
        type: 'success',
        text1: 'Test terminé !',
        text2: 'Votre profil de personnalité a été enregistré',
      });

      await refreshUser();
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
  const progress = (answers.size / test.questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Header fixe avec progression */}
      <View style={styles.header}>
        <Text style={styles.title}>{test.title}</Text>
        {test.summary && <Text style={styles.summary}>{test.summary}</Text>}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {answers.size} / {test.questions.length}
          </Text>
        </View>
      </View>

      {/* Questions */}
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
            style={styles.questionContainer}
          >
            <Text style={styles.questionNumber}>Question {index + 1}</Text>
            <Text style={styles.questionText}>{question.text}</Text>

            <View style={styles.optionsContainer}>
              {question.options.map((option: any) => {
                const isSelected = answers.get(question.id) === option.value;
                return (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionButton,
                      isSelected && styles.optionButtonSelected,
                    ]}
                    onPress={() => handleAnswer(question.id, option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Bouton de soumission */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    minWidth: 50,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6366f1',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f9fafb',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  optionButtonSelected: {
    backgroundColor: '#eef2ff',
    borderColor: '#6366f1',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#6366f1',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#9ca3af',
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#dc2626',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc2626',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    paddingHorizontal: 32,
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginBottom: 12,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  logoutButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
});
