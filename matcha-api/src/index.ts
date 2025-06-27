import dotenv from 'dotenv';

import app from '@/app';
import { connectDB, mongoClient } from '@/config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

let server: ReturnType<typeof app.listen>;

connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
});

const gracefulShutdown = async () => {
  console.log('\n🛑 Fermeture du serveur en cours...');

  try {
    await mongoClient.close();
    console.log('✅ Connexion MongoDB fermée');
  } catch (error) {
    console.warn('⚠️ Erreur lors de la fermeture de MongoDB :', error);
  }

  setTimeout(() => {
    if (server) {
      server.close(() => {
        console.log('✅ Serveur arrêté proprement');
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  }, 3000);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
