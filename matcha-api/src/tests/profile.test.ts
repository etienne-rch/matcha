import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '@/app';
import User from '@/models/User';

const BASE_URL = '/api/profile';

const createUserAndGetToken = async () => {
  const uniqueEmail = `test-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 8)}@example.com`;

  const res = await request(app).post('/api/users').send({
    firstName: 'Test',
    lastName: 'User',
    email: uniqueEmail,
    password: 'StrongPassw0rd!',
    consentAccepted: true,
  });

  if (!res.body.userId) {
    console.error('User creation failed:', res.body);
    throw new Error('User creation failed');
  }

  const user = await User.findById(res.body.userId);
  if (!user) throw new Error('User not found');

  user.isEmailVerified = true;
  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET || 'etna-test',
  );

  return { token };
};

describe('POST /api/profile', () => {
  it('should update user profile successfully', async () => {
    const { token } = await createUserAndGetToken();

    const payload = {
      birthYear: 1990,
      gender: 'male',
      jobTypes: ['frontend', 'backend'],
      locationPref: 'remote',
      remote: true,
      addressStreet: '123 Rue Exemple',
      addressCity: 'Paris',
      addressPostalCode: '75000',
      addressCountry: 'France',
      location: {
        type: 'Point',
        coordinates: [2.3522, 48.8566], // Paris
      },
    };

    const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${token}`)
      .send(payload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Profile updated');
    expect(res.body.user).toHaveProperty('jobTypes');
    expect(res.body.user.gender).toBe('male');
    expect(res.body.user.addressCity).toBe('Paris');
  });

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).post(BASE_URL).send({});
    expect(res.status).toBe(401);
    expect(res.body.message).toMatch(/missing/i);
  });

  it('should reject invalid gender value', async () => {
    const { token } = await createUserAndGetToken();

    const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${token}`)
      .send({ gender: 'invalid' });

    expect(res.status).toBe(400);
    expect(res.body.errors.gender._errors[0]).toMatch(/invalid enum value/i);
  });

  it('should reject invalid coordinates', async () => {
    const { token } = await createUserAndGetToken();

    const res = await request(app)
      .post(BASE_URL)
      .set('Authorization', `Bearer ${token}`)
      .send({
        location: {
          type: 'Point',
          coordinates: ['not', 'valid'],
        },
      });

    expect(res.status).toBe(400);
    expect(res.body.errors.location.coordinates[0]._errors[0]).toMatch(
      /number/i,
    );
  });
});
