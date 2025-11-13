import { Request, Response } from 'express';

import PersonalityTemplate from '@/models/PersonalityTemplate';
import { computePersonality } from '@/services/personality';

export const getActiveTest = async (req: Request, res: Response) => {
  const test = await PersonalityTemplate.findOne({ isActive: true });
  if (!test) {
    return res.status(404).json({ message: 'Aucun test actif trouvé' });
  }
  res.json(test);
};

export const submitTest = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const answers = req.body.answers;
  if (!Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers must be an array' });
  }

  try {
    const result = await computePersonality(userId, answers);
    res.status(201).json({
      success: true,
      message: 'Test completed',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
