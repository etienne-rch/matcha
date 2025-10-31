import { NextFunction, Request, Response } from 'express';

import ChatSession from '@/models/ChatSession';
import CvParsing from '@/models/CvParsing';
import LogFeedback from '@/models/LogFeedback';
import PersonalityTest from '@/models/PersonalityTest';
import Recommendation from '@/models/Recommendation';
import SkillsAssessment from '@/models/SkillsAssessment';
import User from '@/models/User';
import { UserProfile, UserProfileUpdateInput } from '@/types/user';
import { mapUserToProfile } from '@/utils/mapUserToProfile';

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const updateData: UserProfileUpdateInput = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('-passwordHash');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = mapUserToProfile(updatedUser);
    res.status(200).json({ message: 'Profile updated', user: profile });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile: UserProfile = mapUserToProfile(user);
    res.status(200).json({ user: profile });
  } catch (error) {
    next(error);
  }
};

export const deleteAccount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }

    await Promise.all([
      SkillsAssessment.deleteMany({ userId }),
      PersonalityTest.deleteMany({ userId }),
      Recommendation.deleteMany({ userId }),
      LogFeedback.deleteMany({ userId }),
      CvParsing.deleteMany({ userId }),
      ChatSession.deleteMany({ userId }),
    ]);

    await User.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ message: 'Account and related data deleted successfully' });
  } catch (error) {
    next(error);
  }
};
