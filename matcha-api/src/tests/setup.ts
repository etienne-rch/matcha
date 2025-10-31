import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.test' });

jest.mock('@/services/email', () => ({
  sendValidationEmail: jest.fn().mockResolvedValue(undefined),
  sendResetPasswordEmail: jest.fn().mockResolvedValue(undefined),
}));

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  await mongoose.connect(uri);
  mongoose.set('strictQuery', true);

  if (process.env.NODE_ENV !== 'ci') {
    console.log(`🧪 MongoDB mémoire lancée : ${uri}`);
  }
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) return;

  const collections = await db.collections();
  await Promise.all(collections.map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
  if (process.env.NODE_ENV !== 'ci') {
    console.log('🧹 MongoMemoryServer arrêté proprement');
  }
});
