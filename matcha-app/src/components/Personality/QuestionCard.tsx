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
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Question {questionNumber}</Text>
      </View>

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
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(10,41,22,0.06)',
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.greenDark.normal,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#062314',
    marginBottom: 22,
    lineHeight: 24,
  },
  optionsWrapper: {
    gap: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginTop: 8,
  },
  labelText: {
    fontSize: 12,
    color: Colors.greyDark.normal,
    maxWidth: '45%',
    fontStyle: 'italic',
  },
});
