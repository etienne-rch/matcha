import 'dotenv/config';

import app from '@/app';
import { connectDB } from '@/config/db';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
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

    process.on('unhandledRejection', (err) => {
      console.error('💥 Rejet non géré :', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('❌ Impossible de démarrer le serveur :', err);
    process.exit(1);
  }
})();
