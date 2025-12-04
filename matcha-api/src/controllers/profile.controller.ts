import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';

import ChatSession from '@/models/ChatSession';
import CvParsing from '@/models/CvParsing';
import LogFeedback from '@/models/LogFeedback';
import PersonalityTest from '@/models/PersonalityTest';
import Recommendation from '@/models/Recommendation';
import SkillsAssessment from '@/models/SkillsAssessment';
import User from '@/models/User';
import { sendEmailChangeVerification } from '@/services/email';
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

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { location, ...rest } = updateData;

    if (location && location.coordinates) {
      user.location = {
        type: 'Point',
        coordinates: location.coordinates,
      };
    }

    const allowedFields: (keyof Omit<UserProfileUpdateInput, 'location'>)[] = [
      'firstName',
      'lastName',
      'birthYear',
      'gender',
      'subscription',
      'jobTypes',
      'locationPref',
      'remote',
      'avatarUrl',
      'avatarPublicId',
      'avatarUploadedAt',
      'skillsAssessmentId',
      'personalityTestId',
      'addressStreet',
      'addressCity',
      'addressPostalCode',
      'addressCountry',
      'consentAccepted',
    ];

    const restData: Partial<Omit<UserProfileUpdateInput, 'location'>> = rest;

    for (const key of allowedFields) {
      const value = restData[key];
      if (typeof value !== 'undefined') {
        (user as any)[key] = value;
      }
    }

    await user.save();

    const profile = mapUserToProfile(user);
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

export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ message: 'Missing or invalid token' });

    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: 'The passwords do not match' });
    }

    const user = await User.findById(userId).select('+passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Old password is incorrect' });
    }

    const sameAsCurrent = await bcrypt.compare(newPassword, user.passwordHash);
    if (sameAsCurrent) {
      return res.status(400).json({
        message: 'New password must be different from the current password',
      });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const requestEmailChange = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const { newEmail } = req.body;

    if (!userId)
      return res.status(401).json({ message: 'Missing or invalid token' });

    if (!newEmail || typeof newEmail !== 'string')
      return res.status(400).json({ message: 'Email is required' });

    const trimmed = newEmail.trim().toLowerCase();

    // Vérifier si email déjà utilisé
    const alreadyUsed = await User.findOne({ email: trimmed });
    if (alreadyUsed)
      return res.status(400).json({ message: 'Email is already in use' });

    // Génération du token
    const token = crypto.randomBytes(32).toString('hex');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.pendingEmail = trimmed;
    user.emailVerificationToken = token;
    user.emailVerificationTokenExpires = new Date(Date.now() + 1000 * 60 * 15);

    await user.save();

    await sendEmailChangeVerification(trimmed, token);

    return res.status(200).json({
      message: 'Verification email sent',
    });
  } catch (err) {
    next(err);
  }
};
