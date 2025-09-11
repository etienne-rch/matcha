import bcrypt from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "@/models/User";
import { sendValidationEmail } from "@/services/email";
import { UserRegisterInput } from "@/types/user";

// --- Initialize Google OAuth2 client ---
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * User login (classic email/password)
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  // Check validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User does not exist" });
      return;
    }
    if (!user.passwordHash) {
      res.status(401).json({ message: "User has no local password" });
      return;
    }

    // Verify hashed password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    // Generate JWT valid for 24h
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET || "changeme",
    //   { expiresIn: "24h" }
    // );

    // Generate JWT valid for 24h et stockés dans jwtVersion
    const token = jwt.sign(
      { id: user._id, email: user.email, jwtVersion: user.jwtVersion },
      process.env.JWT_SECRET || "changeme",
      { expiresIn: "24h" }
    );
    

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Create new user (classic registration)
 */
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const input: UserRegisterInput = req.body;
    const { email, password, firstName, lastName, consentAccepted } = input;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "User with this email already exists" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const emailVerificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({
      email,
      passwordHash,
      firstName,
      lastName,
      consentAccepted,
      emailVerificationToken,
      emailVerificationTokenExpires: new Date(Date.now() + 1000 * 60 * 60), // 1h
    });

    await user.save();
    await sendValidationEmail(email, emailVerificationToken);

    res.status(201).json({
      message:
        "User created successfully. Please check your email to verify your account.",
      userId: user._id,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Get user by ID
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    const user = await User.findById(id).select("-passwordHash");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Verify email from token
 */
export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    res.status(400).json({ message: "Invalid or missing token" });
    return;
  }

  try {
    const user = await User.findOne({
      emailVerificationToken: token,
      emailVerificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid or expired token" });
      return;
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationTokenExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Email successfully verified" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * Login with Google account
 */
export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  const { idToken } = req.body;

  try {
    if (!idToken) {
      res.status(401).json({ message: "Missing Google token" });
      return;
    }

    let ticket;
    try {
      ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
    } catch (err) {
      res.status(401).json({ message: "Invalid Google token" });
      return;
    }

    const payload = ticket?.getPayload();
    if (!payload || !payload.email) {
      res.status(401).json({ message: "Invalid Google token" });
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
        passwordHash: "google-oauth",
        consentAccepted: true,
      });
    }

    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET || "changeme",
    //   { expiresIn: "24h" }
    // );

    const token = jwt.sign(
      { id: user._id, email: user.email, jwtVersion: user.jwtVersion },
      process.env.JWT_SECRET || "changeme",
      { expiresIn: "24h" }
    );
    

    res.status(200).json({ token, user });
  } catch (error) {
    console.error("Error Google login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

