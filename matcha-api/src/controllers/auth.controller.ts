import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

import User from '@/models/User';

// --- Initialize Google OAuth2 client ---
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * User login controller
 */
export const login = async (req: Request, res: Response) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }
    if (!user.passwordHash) {
      return res.status(401).json({ message: 'User has no local password' });
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Generate a JWT valid for 24h
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '24h' },
    );

    return res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscription: user.subscription,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
/**
 * Login with Google account
 */
export const googleLogin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      res.status(401).json({ message: 'Missing Google token' });
      return;
    }

    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (err) {
      res.status(401).json({ message: 'Invalid Google token' });
      return;
    }

    const payload = ticket?.getPayload();
    if (!payload || !payload.email) {
      res.status(401).json({ message: 'Invalid Google token' });
      return;
    }

    const { email, given_name, family_name, picture } = payload;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        email,
        firstName: given_name,
        lastName: family_name,
        avatarUrl: picture,
        passwordHash: 'google-oauth',
        consentAccepted: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'changeme',
      { expiresIn: '24h' },
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Error Google login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
