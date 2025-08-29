import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

dotenv.config({ path: '.env.test' });

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create({
    binary: { version: '7.0.14' },
  });

  const uri = mongo.getUri();
  await mongoose.connect(uri);

  console.log(`🧪 MongoDB en mémoire lancée sur ${uri}`);
});

afterEach(async () => {
  const db = mongoose.connection.db;
  if (!db) {
    console.warn('⚠️ Aucune connexion DB disponible dans afterEach');
    return;
  }

  const collections = await db.collections();
  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongo) {
    await mongo.stop();
  }
  console.log('🧹 MongoMemoryServer arrêté proprement');
});
