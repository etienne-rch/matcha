import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/themes/colors';

interface TestHeaderProps {
  title: string;
  summary?: string;
  currentQuestion: number;
  totalQuestions: number;
}

export default function TestHeader({
  title,
  summary,
  currentQuestion,
  totalQuestions,
}: TestHeaderProps) {
  const progress = (currentQuestion / totalQuestions) * 100;

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {summary && <Text style={styles.summary}>{summary}</Text>}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentQuestion} / {totalQuestions}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyLight.divider,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: Colors.greyDark.normal,
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
    backgroundColor: Colors.greyLight.active,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.greenLight.normal,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.greenLight.dark.normal,
    minWidth: 50,
  },
});
