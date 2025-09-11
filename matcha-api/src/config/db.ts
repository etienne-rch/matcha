import mongoose from 'mongoose';

const dbName =
  process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_DB_TEST || 'matcha_test'
    : process.env.MONGODB_DB || 'matcha_dev';

const uri = `${process.env.MONGODB_URI}/${dbName}`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connecté à la base "${dbName}"`);
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};

