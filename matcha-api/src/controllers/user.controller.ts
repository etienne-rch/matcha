import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

import User from '@/models/User';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, consentAccepted } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      passwordHash,
      firstName,
      lastName,
      consentAccepted,
    });

    await user.save();

    res.status(201).json({
      message: 'User created successfully',
      userId: user._id,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const user = await User.findById(id).select('-passwordHash');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
