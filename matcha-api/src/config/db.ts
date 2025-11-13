import mongoose from 'mongoose';

const { MONGODB_URI, MONGODB_DB, MONGODB_DB_TEST, NODE_ENV } = process.env;

const dbName =
  NODE_ENV === 'test'
    ? MONGODB_DB_TEST || 'matcha_test'
    : MONGODB_DB || 'matcha_dev';

const baseUri = MONGODB_URI?.endsWith('/')
  ? MONGODB_URI.slice(0, -1)
  : MONGODB_URI;
const uri = `${baseUri}/${dbName}`;

export const connectDB = async (): Promise<void> => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connecté à "${dbName}"`);
  } catch (error) {
    console.error('❌ Erreur de connexion MongoDB :', error);
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  await mongoose.connection.close();
  console.log('🛑 Déconnexion MongoDB');
};
