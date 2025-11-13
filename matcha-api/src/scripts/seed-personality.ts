import 'dotenv/config';

import { connectDB } from '@/config/db';
import { seedPersonalityTest } from '@/seeds/seedPersonalityTest';

(async () => {
  await connectDB();
  await seedPersonalityTest();
  console.log('✅ Personality test seeded successfully');
  process.exit(0);
})();
