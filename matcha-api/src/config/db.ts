import mongoose from 'mongoose';

// const dbName =
//   process.env.NODE_ENV === 'test'
//     ? process.env.MONGODB_DB_TEST || 'matcha_test'
//     : process.env.MONGODB_DB || 'matcha_dev';

// const uri = `${process.env.MONGODB_URI}/${dbName}`;


// const dbName =
//   process.env.NODE_ENV === 'test'
//     ? process.env.MONGODB_DB_TEST || 'matcha_test'
//     : process.env.MONGODB_DB || 'matcha_dev';

// const uri = `${process.env.MONGODB_URI}/${dbName}`;

const dbName = 'matcha'; // ou 'matcha_test' si tu veux

const uri = `mongodb://localhost:27017/${dbName}`; // <- URI directe

console.log('✅ URI utilisée :', uri);

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connecté à la base "${dbName}"`);
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB :', error);
    process.exit(1);
  }
};
