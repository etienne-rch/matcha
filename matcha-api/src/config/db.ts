import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const uri = `${process.env.MONGODB_URI}/${process.env.MONGODB_DB}`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connecté via Mongoose`);
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};
