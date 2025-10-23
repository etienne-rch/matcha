import dotenv from 'dotenv';

import app from '@/app';
import { connectDB } from '@/config/db';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

connectDB().then(() => {
  const server = app.listen(PORT, HOST, () => {
    console.log(`🚀 Serveur lancé sur http://${HOST}:${PORT}`);
  });

  process.on('SIGINT', () => {
    console.log('\n🛑 Fermeture du serveur...');
    server.close(() => {
      console.log('✅ Serveur arrêté proprement');
      process.exit(0);
    });
  });
});
