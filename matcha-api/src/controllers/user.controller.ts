import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

import User from '@/models/User';
import { sendValidationEmail } from '@/services/email';
import { UserRegisterInput } from '@/types/user';

/**
 * Create new user (registration)
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, firstName, lastName, consentAccepted } =
      req.body as UserRegisterInput;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: 'User with this email already exists' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    const user = await User.create({
      email,
      passwordHash,
      firstName,
      lastName,
      consentAccepted,
      emailVerificationToken,
      emailVerificationTokenExpires: new Date(Date.now() + 3600 * 1000), // 1h
    });

    // Skip sending email in tests
    if (process.env.NODE_ENV !== 'test') {
      await sendValidationEmail(email, emailVerificationToken);
    }

    res.status(201).json({
      message:
        'User created successfully. Please check your email to verify your account.',
      userId: user._id,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
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
    next(error);
  }
};

/**
 * Verify email from token
 */
export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    res.status(400).json({ message: 'Invalid or missing token' });
    return;
  }

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(404).json({ message: 'Invalid or expired token' });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Email successfully verified' });
  } catch (error) {
    next(error);
  }
};
