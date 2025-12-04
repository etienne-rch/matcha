import { Request, Response } from 'express';

import PersonalityTemplate from '@/models/PersonalityTemplate';
import PersonalityTest from '@/models/PersonalityTest';
import User from '@/models/User';
import { computePersonality } from '@/services/personality';

export const getActiveTest = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const user = await User.findById(userId);

    if (user?.personalityTestId) {
      const existingTest = await PersonalityTest.findById(
        user.personalityTestId,
      );

      if (existingTest) {
        return res.json({
          completed: true,
          testId: user.personalityTestId,
          personalityType: existingTest.type,
          message: 'Test déjà complété',
        });
      }
    }

    const existingTest = await PersonalityTest.findOne({ userId });

    if (existingTest) {
      await User.findByIdAndUpdate(userId, {
        personalityTestId: existingTest._id,
      });

      return res.json({
        completed: true,
        testId: existingTest._id,
        personalityType: existingTest.type,
        message: 'Test déjà complété',
      });
    }

    const test = await PersonalityTemplate.findOne({ isActive: true });
    if (!test) {
      return res.status(404).json({ message: 'Aucun test actif trouvé' });
    }

    res.json({
      completed: false,
      test,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const submitTest = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ message: 'Unauthorized' });

  const answers = req.body.answers;
  if (!Array.isArray(answers)) {
    return res.status(400).json({ message: 'Answers must be an array' });
  }

  try {
    const user = await User.findById(userId);
    if (user?.personalityTestId) {
      return res.status(409).json({
        message: 'Vous avez déjà passé ce test',
        code: 'TEST_ALREADY_COMPLETED',
      });
    }

    const existingTest = await PersonalityTest.findOne({ userId });
    if (existingTest) {
      await User.findByIdAndUpdate(userId, {
        personalityTestId: existingTest._id,
      });

      return res.status(409).json({
        message: 'Vous avez déjà passé ce test',
        code: 'TEST_ALREADY_COMPLETED',
      });
    }

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

export const resetTest = async (req: Request, res: Response) => {
  const userId = req.user?.id;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.personalityTestId) {
    await PersonalityTest.findByIdAndDelete(user.personalityTestId);
    user.personalityTestId = undefined;
    await user.save();
  }

  res.json({ message: 'Personality test reset' });
};
