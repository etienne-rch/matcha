import mongoose from 'mongoose';

import PersonalityTemplate from '@/models/PersonalityTemplate';
import PersonalityTest from '@/models/PersonalityTest';
import { computePersonality } from '@/services/personality';

describe('computePersonality', () => {
  beforeEach(async () => {
    await PersonalityTemplate.deleteMany({});
    await PersonalityTest.deleteMany({});

    await PersonalityTemplate.create({
      title: 'Test MBTI',
      summary: 'Test de personnalité de base',
      isActive: true,
      version: '1.0',
      questions: [
        { id: 'q1', text: '...', dimension: 'EI' },
        { id: 'q2', text: '...', dimension: 'SN' },
        { id: 'q3', text: '...', dimension: 'TF' },
        { id: 'q4', text: '...', dimension: 'JP' },
      ],
      profiles: [
        {
          key: 'ESTJ',
          label: 'Leader pragmatique',
          description: 'Orienté efficacité et action.',
          strengths: ['Efficace', 'Décisif'],
          weaknesses: ['Rigide'],
          recommendedJobs: ['Manager', 'Chef de projet'],
        },
      ],
    });
  });

  it('should compute the correct MBTI type and save it', async () => {
    const answers = [
      { questionId: 'q1', value: 2 },
      { questionId: 'q2', value: 1 },
      { questionId: 'q3', value: 2 },
      { questionId: 'q4', value: 1 },
    ];

    const result = await computePersonality(
      new mongoose.Types.ObjectId().toString(),
      answers,
    );

    expect(result.type).toBe('ESTJ');
    expect(result.label).toBe('Leader pragmatique');
    expect(result.strengths).toContain('Efficace');

    const testInDb = await PersonalityTest.findOne({ type: 'ESTJ' });
    expect(testInDb).not.toBeNull();
    expect(testInDb?.result).toBe('Leader pragmatique');
  });

  it('should throw if no active test exists', async () => {
    await PersonalityTemplate.deleteMany({});
    await expect(
      computePersonality(new mongoose.Types.ObjectId().toString(), []),
    ).rejects.toThrow('Aucun test actif trouvé.');
  });
});
