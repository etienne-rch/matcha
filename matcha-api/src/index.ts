import dotenv from 'dotenv';

import app from '@/app';
import { connectDB } from '@/config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });

  process.on('SIGINT', () => {
    console.log('\n🛑 Fermeture du serveur...');
    server.close(() => {
      console.log('✅ Serveur arrêté proprement');
      process.exit(0);
    });
  });
});
