import dotenv from 'dotenv';
import { Db, MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGODB_URI!;

export const mongoClient = new MongoClient(uri);

let db: Db;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoClient.connect();
    db = mongoClient.db();
    console.log('✅ MongoDB connecté');
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error('❌ Base de données non connectée.');
  }
  return db;
};
