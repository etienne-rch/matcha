import bcrypt from 'bcrypt';
import crypto from 'crypto';
import request from 'supertest';

import app from '@/app';
import User from '@/models/User';

beforeEach(async () => {
  const passwordHash = await bcrypt.hash('Password123!', 10);
  await User.create({
    email: 'test@example.com',
    passwordHash,
    firstName: 'John',
    lastName: 'Doe',
    consentAccepted: true,
    isEmailVerified: true, // Email vérifié pour permettre la connexion
  });
});

describe('POST /api/auth/login', () => {
  it('should return 200 and a valid JWT when credentials are correct', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'Password123!' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body.user.email).toBe('test@example.com');
    expect(res.body.token.split('.')).toHaveLength(3);
  });

  it('should return 401 for incorrect password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'WrongPassword123!' });

    expect(res.status).toBe(401);
  });

  it('should return 403 for unverified email', async () => {
    // Créer un utilisateur non vérifié
    const passwordHash = await bcrypt.hash('Password123!', 10);
    await User.create({
      email: 'unverified@example.com',
      passwordHash,
      firstName: 'Unverified',
      lastName: 'User',
      consentAccepted: true,
      isEmailVerified: false, // Email non vérifié
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'unverified@example.com', password: 'Password123!' });

    expect(res.status).toBe(403);
    expect(res.body.message).toContain('verify your email');
  });

  it('should return 400 for invalid input data', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'not-an-email', password: '123' });

    expect(res.status).toBe(400);
  });
});

describe('Password Reset Flow', () => {
  it('should create a reset token and send an email', async () => {
    const passwordHash = await bcrypt.hash('Password123!', 10);
    const user = await User.create({
      email: 'reset@example.com',
      passwordHash,
      firstName: 'Reset',
      lastName: 'User',
      consentAccepted: true,
    });

    const res = await request(app)
      .post('/api/auth/request-reset')
      .send({ email: user.email });

    expect(res.status).toBe(200);
    const updated = await User.findById(user._id);
    expect(updated?.resetPasswordTokenHash).toBeDefined();
    expect(updated?.resetPasswordExpires).toBeDefined();
  });

  it('should reset the password with a valid token', async () => {
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHash('sha256').update(token).digest('hex');

    const passwordHash = await bcrypt.hash('OldPassword123!', 10);
    const user = await User.create({
      email: 'reset2@example.com',
      passwordHash,
      resetPasswordTokenHash: hash,
      resetPasswordExpires: new Date(Date.now() + 10 * 60 * 1000),
      consentAccepted: true,
    });

    const res = await request(app)
      .post('/api/auth/reset-password')
      .send({ token, newPassword: 'NewPassword123!' });

    expect(res.status).toBe(200);

    const updated = await User.findById(user._id);
    expect(updated?.resetPasswordTokenHash).toBeUndefined();

    const ok = await bcrypt.compare('NewPassword123!', updated!.passwordHash);
    expect(ok).toBe(true);
  });
});
