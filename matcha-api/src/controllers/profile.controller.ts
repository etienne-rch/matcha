import { Request, Response } from 'express';

import User from '@/models/User';
import { UserProfile, UserProfileUpdateInput } from '@/types/user';
import { mapUserToProfile } from '@/utils/mapUserToProfile';

export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const updateData: UserProfileUpdateInput = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true },
    ).select('-passwordHash');

    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const profile = mapUserToProfile(updatedUser);
    res.status(200).json({ message: 'Profile updated', user: profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const user = await User.findById(userId).select('-passwordHash');

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const profile: UserProfile = mapUserToProfile(user);
    res.status(200).json({ user: profile });
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
