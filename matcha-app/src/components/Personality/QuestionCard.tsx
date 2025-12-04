import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/themes/colors';

import AnswerButton from './AnswerButton';

interface QuestionOption {
  value: number;
  label: string;
}

interface QuestionCardProps {
  questionNumber: number;
  questionText: string;
  options: QuestionOption[];
  selectedValue?: number;
  onAnswer: (value: number) => void;
}

export default function QuestionCard({
  questionNumber,
  questionText,
  options,
  selectedValue,
  onAnswer,
}: QuestionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question {questionNumber}</Text>
      <Text style={styles.questionText}>{questionText}</Text>

      <View style={styles.optionsWrapper}>
        <View style={styles.optionsContainer}>
          {options.map((option, index) => (
            <AnswerButton
              key={option.value}
              value={option.value}
              index={index}
              totalOptions={options.length}
              isSelected={selectedValue === option.value}
              onPress={() => onAnswer(option.value)}
            />
          ))}
        </View>
        <View style={styles.labelsContainer}>
          <Text style={styles.labelText}>Pas du tout d'accord</Text>
          <Text style={styles.labelText}>Tout à fait d'accord</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  questionNumber: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.orange.normal,
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 24,
    lineHeight: 24,
  },
  optionsWrapper: {
    gap: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    color: Colors.greyDark.normal,
    fontStyle: 'italic',
    maxWidth: '45%',
  },
});
