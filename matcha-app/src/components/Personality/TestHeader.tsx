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
    <View style={styles.wrapper}>
      <View style={styles.headerCard}>
        <Text style={styles.title}>{title}</Text>
        {summary && <Text style={styles.summary}>{summary}</Text>}

        <View style={styles.progressRow}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion} / {totalQuestions}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 16,
  },
  headerCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    padding: 18,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#062314',
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#e7ede6',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.greenDark.normal,
    borderRadius: 999,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.greyDark.normal,
    minWidth: 52,
    textAlign: 'right',
  },
});
