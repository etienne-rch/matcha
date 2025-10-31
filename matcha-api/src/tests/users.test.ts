import crypto from 'crypto';
import mongoose from 'mongoose';
import request from 'supertest';

import app from '@/app';
import User from '@/models/User';

describe('POST /api/users', () => {
  const basePayload = {
    email: 'alice@example.com',
    password: 'SuperPassword1!',
    firstName: 'Alice',
    lastName: 'Test',
    consentAccepted: true,
  };

  it('should create a user successfully', async () => {
    const res = await request(app).post('/api/users').send(basePayload);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty(
      'message',
      'User created successfully. Please check your email to verify your account.',
    );
    expect(res.body).toHaveProperty('userId');

    const userInDB = await User.findOne({ email: basePayload.email });
    expect(userInDB).not.toBeNull();
  });

  it('should not create a user with missing required fields', async () => {
    const { email, ...incompletePayload } = basePayload;

    const res = await request(app).post('/api/users').send(incompletePayload);

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(Array.isArray(res.body.errors)).toBe(true);
    expect(res.body.errors.some((e: any) => e.path === 'email')).toBe(true);
  });

  it('should not allow duplicate email', async () => {
    await request(app).post('/api/users').send(basePayload);

    const res = await request(app).post('/api/users').send(basePayload);

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe('User with this email already exists');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        ...basePayload,
        email: 'notanemail',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e: any) => e.path === 'email')).toBe(true);
  });

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        ...basePayload,
        password: '123',
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors.some((e: any) => e.path === 'password')).toBe(true);
  });
});

describe('GET /api/users/:id', () => {
  let userId: string;

  beforeEach(async () => {
    const user = new User({
      email: 'test@example.com',
      passwordHash: 'hashed_password',
      firstName: 'John',
      lastName: 'Doe',
      consentAccepted: true,
    });
    const savedUser = await user.save();
    userId = savedUser._id.toString();
  });

  it('should return a user when given a valid ID', async () => {
    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('_id', userId);
    expect(res.body).toHaveProperty('email', 'test@example.com');
    expect(res.body).not.toHaveProperty('passwordHash');
  });

  it('should return 404 when user does not exist', async () => {
    const nonExistentId = new mongoose.Types.ObjectId();
    const res = await request(app).get(`/api/users/${nonExistentId}`);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message', 'User not found');
  });

  it('should return 400 for invalid MongoDB ID', async () => {
    const res = await request(app).get('/api/users/invalid-id');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('message', 'Invalid user ID');
  });
});

describe('GET /api/users/verify-email', () => {
  let token: string;

  beforeEach(async () => {
    token = crypto.randomBytes(32).toString('hex');
  });

  it('should verify email with a valid token', async () => {
    const user = await User.create({
      email: 'test@example.com',
      passwordHash: 'hashed',
      consentAccepted: true,
      emailVerificationToken: token,
      emailVerificationTokenExpires: new Date(Date.now() + 3600 * 1000), // 1h
    });

    const res = await request(app).get(
      `/api/users/verify-email?token=${token}`,
    );

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Email successfully verified');

    const updatedUser = await User.findById(user._id);
    expect(updatedUser?.isEmailVerified).toBe(true);
    expect(updatedUser?.emailVerificationToken).toBeUndefined();
    expect(updatedUser?.emailVerificationTokenExpires).toBeUndefined();
  });

  it('should return 400 for missing token', async () => {
    const res = await request(app).get('/api/users/verify-email');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Invalid or missing token');
  });

  it('should return 404 for invalid token', async () => {
    const res = await request(app).get('/api/users/verify-email?token=invalid');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Invalid or expired token');
  });

  it('should return 404 for expired token', async () => {
    await User.create({
      email: 'expired@example.com',
      passwordHash: 'hashed',
      consentAccepted: true,
      emailVerificationToken: token,
      emailVerificationTokenExpires: new Date(Date.now() - 3600 * 1000), // expired
    });

    const res = await request(app).get(
      `/api/users/verify-email?token=${token}`,
    );
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Invalid or expired token');
  });
});
